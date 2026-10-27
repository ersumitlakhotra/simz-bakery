
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

export const HomeN = () => {
    const TOTAL_FRAMES = 380;
    const INITIAL_FRAMES = 20;
    const BATCH_SIZE = 40;

    const [frame, setFrame] = useState(1);
    const [isReady, setIsReady] = useState(false);

    const targetFrame = useRef(1);
    const currentFrame = useRef(1);
    const lastFrame = useRef(1);
    const rafRef = useRef(null);

    const imageCache = useRef([]);
    const loadingFrames = useRef(new Map());

    const getFramePath = (frameNumber) =>
        `/frames/frame_${String(frameNumber).padStart(4, "0")}.webp`;

    // Load and decode an image, with retries for failed requests.
    const loadFrame = (frameNumber, retries = 1) => {
        if (frameNumber < 1 || frameNumber > TOTAL_FRAMES) {
            return Promise.resolve(null);
        }

        const cachedImage = imageCache.current[frameNumber - 1];

        if (cachedImage?.complete && cachedImage.naturalWidth > 0) {
            return Promise.resolve(cachedImage);
        }

        const existingRequest = loadingFrames.current.get(frameNumber);

        if (existingRequest) {
            return existingRequest;
        }

        const request = (async () => {
            for (let attempt = 0; attempt <= retries; attempt++) {
                const image = new Image();
                const src = getFramePath(frameNumber);

                const loadedImage = await new Promise((resolve) => {
                    let settled = false;

                    const finish = (result) => {
                        if (settled) return;
                        settled = true;

                        image.onload = null;
                        image.onerror = null;

                        resolve(result);
                    };

                    image.onload = () => {
                        finish(
                            image.naturalWidth > 0 ? image : null
                        );
                    };

                    image.onerror = () => {
                        finish(null);
                    };

                    image.src = src;

                    // Handle images already available in browser cache.
                    if (image.complete) {
                        finish(
                            image.naturalWidth > 0 ? image : null
                        );
                    }
                });

                if (!loadedImage) {
                    console.error(
                        `Frame ${frameNumber} load attempt ${
                            attempt + 1
                        } failed:`,
                        src
                    );

                    continue;
                }

                // Decode before using the image when supported.
                if (typeof loadedImage.decode === "function") {
                    try {
                        await loadedImage.decode();
                    } catch {
                        // Some browsers reject decode even when the
                        // image is loaded. Verify its actual dimensions.
                    }
                }

                if (loadedImage.naturalWidth > 0) {
                    imageCache.current[frameNumber - 1] =
                        loadedImage;

                    return loadedImage;
                }
            }

       

            return null;
        })();

        loadingFrames.current.set(frameNumber, request);

        // Remove completed requests so failed frames can be retried.
        request.then(() => {
            if (
                loadingFrames.current.get(frameNumber) === request
            ) {
                loadingFrames.current.delete(frameNumber);
            }
        });

        return request;
    };

    const loadBatch = async (startFrame, endFrame) => {
        const frames = [];

        for (
            let i = startFrame;
            i <= Math.min(endFrame, TOTAL_FRAMES);
            i++
        ) {
            frames.push(i);
        }

        await Promise.all(
            frames.map((frameNumber) => loadFrame(frameNumber))
        );
    };

    // Load frame 1 before rendering the experience.
    // Then load all remaining frames in batches.
    useEffect(() => {
        let cancelled = false;

        const loadAllFrames = async () => {
            const firstImage = await loadFrame(1, 2);

            if (cancelled) return;

            if (firstImage) {
                imageCache.current[0] = firstImage;

                targetFrame.current = 1;
                currentFrame.current = 1;
                lastFrame.current = 1;

                setFrame(1);
                setIsReady(true);
            } else {
                // Avoid leaving the entire website stuck on the loader
                // if the first frame cannot be retrieved.
                console.error(
                    "Frame 1 could not be loaded. Check the deployed image path:",
                    getFramePath(1)
                );

                setIsReady(true);
                return;
            }

            // Load the initial frames immediately after frame 1.
            await loadBatch(2, INITIAL_FRAMES);

            if (cancelled) return;

            // Load the remaining frames in batches.
            for (
                let start = INITIAL_FRAMES + 1;
                start <= TOTAL_FRAMES;
                start += BATCH_SIZE
            ) {
                if (cancelled) return;

                const end = Math.min(
                    start + BATCH_SIZE - 1,
                    TOTAL_FRAMES
                );

                await loadBatch(start, end);

                if (cancelled) return;

                // Give the browser a brief opportunity to render.
                await new Promise((resolve) =>
                    setTimeout(resolve, 30)
                );
            }

            if (!cancelled) {
                console.log(
                    "Frame loading complete:",
                    imageCache.current.filter(Boolean).length,
                    "of",
                    TOTAL_FRAMES
                );
            }
        };

        loadAllFrames();

        return () => {
            cancelled = true;
        };
    }, []);

    // Start the page at the top and disable automatic scroll restoration.
    useEffect(() => {
        const previousRestoration = window.history.scrollRestoration;

        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

        window.scrollTo(0, 0);

        const resetScroll = requestAnimationFrame(() => {
            window.scrollTo(0, 0);
        });

        return () => {
            cancelAnimationFrame(resetScroll);

            if ("scrollRestoration" in window.history) {
                window.history.scrollRestoration =
                    previousRestoration;
            }
        };
    }, []);

    // Prevent scrolling until the first frame is ready.
    useEffect(() => {
        if (isReady) {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            return;
        }

        const previousBodyOverflow = document.body.style.overflow;
        const previousHtmlOverflow =
            document.documentElement.style.overflow;

        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousBodyOverflow;
            document.documentElement.style.overflow =
                previousHtmlOverflow;
        };
    }, [isReady]);

    // Animate frames according to the Home section's scroll progress.
    useEffect(() => {
        if (!isReady) return;

        const homeSection = document.querySelector(
            "main#Home > section"
        );

        if (!homeSection) {
            console.error(
                'Scroll animation section not found. Expected "main#Home > section".'
            );
            return;
        }

        let animationRunning = true;

        const handleScroll = () => {
            const sectionTop =
                homeSection.getBoundingClientRect().top +
                window.scrollY;

            const scrollDistance =
                homeSection.offsetHeight - window.innerHeight;

            if (scrollDistance <= 0) {
                targetFrame.current = 1;
                return;
            }

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

            currentFrame.current += difference * 0.1;

            if (Math.abs(difference) < 0.01) {
                currentFrame.current = targetFrame.current;
            }

            const requestedFrame = Math.max(
                1,
                Math.min(
                    TOTAL_FRAMES,
                    Math.round(currentFrame.current)
                )
            );

            let displayFrame = requestedFrame;

            // If the requested frame is not loaded yet, find the
            // closest available frame to avoid a blank background.
            if (!imageCache.current[requestedFrame - 1]) {
                displayFrame = lastFrame.current;

                for (let distance = 1; distance <= TOTAL_FRAMES; distance++) {
                    const forward = requestedFrame + distance;
                    const backward = requestedFrame - distance;

                    if (
                        forward <= TOTAL_FRAMES &&
                        imageCache.current[forward - 1]
                    ) {
                        displayFrame = forward;
                        break;
                    }

                    if (
                        backward >= 1 &&
                        imageCache.current[backward - 1]
                    ) {
                        displayFrame = backward;
                        break;
                    }
                }
            }

            if (
                imageCache.current[displayFrame - 1] &&
                displayFrame !== lastFrame.current
            ) {
                lastFrame.current = displayFrame;
                setFrame(displayFrame);
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

    const currentImage = imageCache.current[frame - 1];

    const currentImageSrc =
        currentImage?.src || getFramePath(1);

    if (!isReady) {
        return (
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 9999,
                }}
            >
                <LoaderCircle className="h-12 w-12 animate-spin" />
            </div>
        );
    }

    return (
        <>
            <div className="fixed inset-0 z-0 h-screen w-screen overflow-hidden bg-black">
                <img
                    key={currentImageSrc}
                    src={currentImageSrc}
                    alt=""
                    draggable="false"
                    className="absolute inset-0 h-full w-full select-none object-cover object-left md:object-center"
                    onError={() => {
                        console.error(
                            "Displayed frame failed to render:",
                            currentImageSrc
                        );
                    }}
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
