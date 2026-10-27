
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import Hero from "./Hero.jsx";
import BirthdayCakeCard from "../cards/birthday.jsx";
import BirthdayCakeCardMobile from "../cards/birthday_mobile.jsx";
import CustomCakeDetail from "../cards/custom.jsx";
import CustomCakeDetailMobile from "../cards/custom_mobile.jsx";
import MilestoneCakeDetail from "../cards/milestone.jsx";
import MilestoneCakeDetailMobile from "../cards/milestone_mobile.jsx";
import WeddingCakeDetail from "../cards/wedding.jsx";
import WeddingCakeDetailMobile from "../cards/wedding_mobile.jsx";
import BabyShowerCakeDetail from "../cards/babyshower.jsx";
import BabyShowerCakeDetailMobile from "../cards/babyshower_mobile.jsx";
import { LoaderCircle } from "lucide-react";

const TOTAL_FRAMES = 314;
const BATCH_SIZE = 10;

// Change this value whenever you replace the frame images.
const CACHE_VERSION = "simz-bakery-frames-v1";
const DB_NAME = "SimzBakeryAnimation";
const STORE_NAME = "frames";

const getFramePath = (frameNumber) =>
    `/frames/frame_${String(frameNumber).padStart(4, "0")}.webp`;

const getFrameKey = (frameNumber) =>
    `${CACHE_VERSION}-${String(frameNumber).padStart(4, "0")}`;

function openFrameDatabase() {
    return new Promise((resolve, reject) => {
        if (!("indexedDB" in window)) {
            reject(new Error("IndexedDB is not supported."));
            return;
        }

        const request = window.indexedDB.open(DB_NAME, 1);

        request.onupgradeneeded = () => {
            const db = request.result;

            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, {
                    keyPath: "key",
                });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () =>
            reject(request.error || new Error("Unable to open frame cache."));
        request.onblocked = () =>
            reject(new Error("The frame cache is blocked by another tab."));
    });
}

function getAllCachedFrames(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readonly");
        const request = transaction.objectStore(STORE_NAME).getAll();

        request.onsuccess = () => {
            const matchingFrames = new Map();

            for (const record of request.result || []) {
                if (
                    record.version === CACHE_VERSION &&
                    record.blob instanceof Blob
                ) {
                    matchingFrames.set(record.frameNumber, record.blob);
                }
            }

            resolve(matchingFrames);
        };

        request.onerror = () =>
            reject(request.error || new Error("Unable to read cached frames."));
    });
}

function saveFramesToDatabase(db, records) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);

        for (const record of records) {
            store.put(record);
        }

        transaction.oncomplete = () => resolve();
        transaction.onerror = () =>
            reject(transaction.error || new Error("Unable to save frames."));
        transaction.onabort = () =>
            reject(transaction.error || new Error("Saving frames was aborted."));
    });
}

function deleteCachedFrame(db, frameNumber) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");

        transaction.objectStore(STORE_NAME).delete(getFrameKey(frameNumber));

        transaction.oncomplete = () => resolve();
        transaction.onerror = () =>
            reject(transaction.error || new Error("Unable to repair frame cache."));
    });
}

function loadImageFromBlob(blob) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        const objectUrl = URL.createObjectURL(blob);
        let settled = false;

        const finish = (success) => {
            if (settled) return;
            settled = true;

            image.onload = null;
            image.onerror = null;

            if (!success || image.naturalWidth === 0) {
                URL.revokeObjectURL(objectUrl);
                reject(new Error("Cached frame could not be decoded."));
                return;
            }

            resolve({ image, objectUrl });
        };

        image.onload = async () => {
            try {
                if (typeof image.decode === "function") {
                    await image.decode();
                }

                finish(image.naturalWidth > 0);
            } catch {
                finish(image.naturalWidth > 0);
            }
        };

        image.onerror = () => finish(false);
        image.src = objectUrl;

        if (image.complete && image.naturalWidth > 0) {
            image.onload();
        }
    });
}

async function downloadFrame(frameNumber) {
    const response = await fetch(getFramePath(frameNumber), {
        cache: "force-cache",
    });

    if (!response.ok) {
        throw new Error(
            `Failed to download frame ${frameNumber} (${response.status}).`
        );
    }

    const blob = await response.blob();

    if (!blob.size) {
        throw new Error(`Frame ${frameNumber} is empty.`);
    }

    return blob;
}

export const HomeN = () => {
    const [frame, setFrame] = useState(1);
    const [isReady, setIsReady] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const [loadError, setLoadError] = useState("");

    const targetFrame = useRef(1);
    const currentFrame = useRef(1);
    const lastFrame = useRef(1);
    const rafRef = useRef(null);
    const imageRef = useRef(null);

    // Each item contains a decoded image and its object URL.
    const imageCache = useRef([]);
    const cancelledRef = useRef(false);

    useEffect(() => {
        let cancelled = false;
        let db;
        const createdObjectUrls = new Set();

        cancelledRef.current = false;

        const loadAllFrames = async () => {
            try {
                db = await openFrameDatabase();

                if (cancelled) {
                    db.close();
                    return;
                }

                const cachedBlobs = await getAllCachedFrames(db);
                const loadedImages = new Array(TOTAL_FRAMES);

                let completed = 0;

                for (
                    let start = 1;
                    start <= TOTAL_FRAMES;
                    start += BATCH_SIZE
                ) {
                    if (cancelled) return;

                    const end = Math.min(
                        start + BATCH_SIZE - 1,
                        TOTAL_FRAMES
                    );

                    const batchRecords = [];
                    const batchResults = await Promise.all(
                        Array.from(
                            { length: end - start + 1 },
                            async (_, index) => {
                                const frameNumber = start + index;
                                let blob = cachedBlobs.get(frameNumber);

                                // Try the saved image first.
                                if (blob) {
                                    try {
                                        const loaded = await loadImageFromBlob(blob);

                                        return {
                                            frameNumber,
                                            ...loaded,
                                        };
                                    } catch {
                                        // Invalid cache entry: remove and redownload.
                                        try {
                                            await deleteCachedFrame(db, frameNumber);
                                        } catch {
                                            // A fresh download can still be used in memory.
                                        }
                                    }
                                }

                                // Cache miss or corrupt entry.
                                blob = await downloadFrame(frameNumber);

                                let loaded;
                                try {
                                    loaded = await loadImageFromBlob(blob);
                                } catch {
                                    throw new Error(
                                        `Frame ${frameNumber} downloaded but could not be decoded.`
                                    );
                                }

                                batchRecords.push({
                                    key: getFrameKey(frameNumber),
                                    frameNumber,
                                    version: CACHE_VERSION,
                                    blob,
                                });

                                return {
                                    frameNumber,
                                    ...loaded,
                                };
                            }
                        )
                    );

                    if (cancelled) {
                        for (const result of batchResults) {
                            URL.revokeObjectURL(result.objectUrl);
                        }
                        return;
                    }

                    for (const result of batchResults) {
                        loadedImages[result.frameNumber - 1] = result;
                        createdObjectUrls.add(result.objectUrl);
                        completed++;
                    }

                    // Persist newly downloaded frames together.
                    if (batchRecords.length) {
                        try {
                            await saveFramesToDatabase(db, batchRecords);
                        } catch (error) {
                            console.warn(
                                "Frames are ready, but some could not be saved to IndexedDB:",
                                error
                            );
                        }
                    }

                    imageCache.current = loadedImages;
                    setLoadProgress(
                        Math.round((completed / TOTAL_FRAMES) * 100)
                    );

                    // Let Safari paint the loader between batches.
                    await new Promise((resolve) =>
                        window.setTimeout(resolve, 0)
                    );
                }

                if (cancelled) return;

                imageCache.current = loadedImages;

                targetFrame.current = 1;
                currentFrame.current = 1;
                lastFrame.current = 1;
                setFrame(1);

                if (imageRef.current && loadedImages[0]) {
                    imageRef.current.src = loadedImages[0].objectUrl;
                }

                // This flag is tab-specific; IndexedDB holds the actual frames.
                try {
                    sessionStorage.setItem(
                        `${CACHE_VERSION}-ready`,
                        "true"
                    );
                } catch {
                    // Storage may be disabled; animation can still run.
                }

                if ("scrollRestoration" in window.history) {
                    window.history.scrollRestoration = "manual";
                }

                window.scrollTo(0, 0);
                setIsReady(true);
            } catch (error) {
                if (!cancelled) {
                    console.error("Animation frame loading failed:", error);
                    setLoadError(
                        error?.message ||
                            "Unable to load the animation frames."
                    );
                }
            } finally {
                if (db) db.close();
            }
        };

        loadAllFrames();

        return () => {
            cancelled = true;
            cancelledRef.current = true;

            // Revoke URLs created by this effect after the page leaves.
            for (const url of createdObjectUrls) {
                URL.revokeObjectURL(url);
            }

            if (db) db.close();
        };
    }, []);

    // Lock scrolling until every frame is ready.
    useEffect(() => {
        if (isReady) {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            return;
        }

        const previousBodyOverflow = document.body.style.overflow;
        const previousHtmlOverflow = document.documentElement.style.overflow;

        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousBodyOverflow;
            document.documentElement.style.overflow = previousHtmlOverflow;
        };
    }, [isReady]);

    // Start at the top when the animation becomes ready.
    useEffect(() => {
        if (!isReady) return;

        window.scrollTo(0, 0);

        const resetScroll = requestAnimationFrame(() => {
            window.scrollTo(0, 0);
        });

        return () => cancelAnimationFrame(resetScroll);
    }, [isReady]);

    // Existing scroll-to-frame behavior.
    useEffect(() => {
        if (!isReady) return;

        const homeSection = document.querySelector(
            "main#Home > section"
        );

        if (!homeSection) {
            console.error("Animation section not found.");
            return;
        }

        let animationRunning = true;

        const handleScroll = () => {
            const sectionTop =
                homeSection.getBoundingClientRect().top + window.scrollY;

            const scrollDistance =
                homeSection.offsetHeight - window.innerHeight;

            if (scrollDistance <= 0) return;

            const relativeScroll = window.scrollY - sectionTop;

            const progress = Math.max(
                0,
                Math.min(1, relativeScroll / scrollDistance)
            );

            targetFrame.current =
                1 + progress * (TOTAL_FRAMES - 1);
        };

        const animate = () => {
            if (!animationRunning) return;

            const difference =
                targetFrame.current - currentFrame.current;

            // Keep the smoothing behavior from the existing animation.
            currentFrame.current += difference * 0.15;

            if (Math.abs(difference) < 0.05) {
                currentFrame.current = targetFrame.current;
            }

            const requestedFrame = Math.max(
                1,
                Math.min(
                    TOTAL_FRAMES,
                    Math.round(currentFrame.current)
                )
            );

            const cachedFrame = imageCache.current[requestedFrame - 1];

            if (
                cachedFrame &&
                requestedFrame !== lastFrame.current
            ) {
                lastFrame.current = requestedFrame;

                if (imageRef.current) {
                    imageRef.current.src = cachedFrame.objectUrl;
                }

                setFrame(requestedFrame);
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });
        window.addEventListener("resize", handleScroll);

        handleScroll();
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            animationRunning = false;
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);

            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
        };
    }, [isReady]);

    if (!isReady) {
        return (
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.95)",
                    color: "#ffffff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "16px",
                    padding: "24px",
                    textAlign: "center",
                    zIndex: 9999,
                }}
            >
                {!loadError && (
                    <LoaderCircle className="h-12 w-12 animate-spin" />
                )}

                <p>
                    {loadError
                        ? "Unable to load the animation."
                        : `Preparing your experience... ${loadProgress}%`}
                </p>

                {loadError && (
                    <>
                        <p style={{ fontSize: "12px", opacity: 0.75 }}>
                            {loadError}
                        </p>
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            style={{
                                padding: "10px 18px",
                                borderRadius: "8px",
                                background: "#ffffff",
                                color: "#111111",
                            }}
                        >
                            Try again
                        </button>
                    </>
                )}
            </div>
        );
    }

    return (
        <>
            <div className="fixed inset-0 z-0 h-screen w-screen overflow-hidden bg-black">
                <img
                    ref={imageRef}
                    src={imageCache.current[0]?.objectUrl || getFramePath(1)}
                    alt=""
                    draggable="false"
                    className="absolute inset-0 h-full w-full select-none object-cover object-left md:object-center"
                />
            </div>

            <Hero frame={frame} />

            {/* Laptop view */}
            <div className="hidden md:block">
                <BirthdayCakeCard frame={frame} />
                <CustomCakeDetail frame={frame} />
                <MilestoneCakeDetail frame={frame} />
                <WeddingCakeDetail frame={frame} />
                <BabyShowerCakeDetail frame={frame} />
            </div>

            {/* Mobile view */}
            <div className="block md:hidden">
                <BirthdayCakeCardMobile frame={frame} />
                <CustomCakeDetailMobile frame={frame} />
                <MilestoneCakeDetailMobile frame={frame} />
                <WeddingCakeDetailMobile frame={frame} />
                <BabyShowerCakeDetailMobile frame={frame} />
            </div>
        </>
    );
};
