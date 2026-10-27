
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

    const imageRef = useRef(null);
    const imageCache = useRef([]);
    const loadingFrames = useRef(new Map());

    const priorityFrameRef = useRef(null);
    const priorityLoadingRef = useRef(false);

    const getFramePath = (frameNumber) =>
        `/frames/frame_${String(frameNumber).padStart(4, "0")}.webp`;

    // Load and decode a frame before adding it to the cache.
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

                    image.onerror = () => finish(null);

                    image.src = src;

                    // Handle an image already available in browser cache.
                    if (image.complete) {
                        finish(
                            image.naturalWidth > 0 ? image : null
                        );
                    }
                });

                if (!loadedImage) {
                    console.warn(
                        `Frame ${frameNumber} failed to load:`,
                        src
                    );
                    continue;
                }

                if (typeof loadedImage.decode === "function") {
                    try {
                        await loadedImage.decode();
                    } catch {
                        // Check dimensions below before accepting the image.
                    }
                }

                if (loadedImage.naturalWidth > 0) {
                    imageCache.current[frameNumber - 1] = loadedImage;
                    return loadedImage;
                }
            }

            console.error(
                `Unable to load frame ${frameNumber}:`,
                getFramePath(frameNumber)
            );

            return null;
        })();

        loadingFrames.current.set(frameNumber, request);

        request.then(() => {
            if (loadingFrames.current.get(frameNumber) === request) {
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

    // Render a cached frame without changing the React image source prop.
    const renderFrame = (frameNumber) => {
        const image = imageCache.current[frameNumber - 1];

        if (!image || image.naturalWidth === 0) return;

        const imageElement = imageRef.current;

        if (imageElement && imageElement.src !== image.src) {
            imageElement.src = image.src;
        }

        if (frameNumber !== lastFrame.current) {
            lastFrame.current = frameNumber;
            setFrame(frameNumber);
        }
    };

    // Prioritize the latest requested frame without creating
    // hundreds of simultaneous image requests during fast scrolling.
    const requestPriorityFrame = (frameNumber) => {
        priorityFrameRef.current = frameNumber;

        if (priorityLoadingRef.current) return;

        priorityLoadingRef.current = true;

        const processPriorityFrames = async () => {
            try {
                while (priorityFrameRef.current !== null) {
                    const nextFrame = priorityFrameRef.current;
                    priorityFrameRef.current = null;

                    if (!imageCache.current[nextFrame - 1]) {
                        await loadFrame(nextFrame, 1);
                    }
                }
            } finally {
                priorityLoadingRef.current = false;

                // Handle a request arriving as the previous one finishes.
                if (priorityFrameRef.current !== null) {
                    requestPriorityFrame(priorityFrameRef.current);
                }
            }
        };

        processPriorityFrames();
    };

    // Load frame 1 first, then progressively load the remaining frames.
    useEffect(() => {
        let cancelled = false;

        const loadAllFrames = async () => {
            const firstImage = await loadFrame(1, 2);

            if (cancelled) return;

            if (!firstImage) {
                console.error(
                    "The first animation frame could not be loaded:",
                    getFramePath(1)
                );

                // Avoid a permanently stuck loader if the asset is missing.
                setIsReady(true);
                return;
            }

            targetFrame.current = 1;
            currentFrame.current = 1;
            lastFrame.current = 1;

            setFrame(1);
            setIsReady(true);

            await loadBatch(2, INITIAL_FRAMES);

            if (cancelled) return;

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

                await new Promise((resolve) =>
                    setTimeout(resolve, 30)
                );
            }

            if (!cancelled) {
                console.log(
                    "Frames loaded:",
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

    // Reset scroll position when the page is initialized.
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

    // Lock page scrolling until the first frame is ready.
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

    // Keep the existing scroll-to-frame calculation and interpolation.
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

            if (imageCache.current[requestedFrame - 1]) {
                renderFrame(requestedFrame);
            } else {
                // Load the frame currently needed by the animation first.
                requestPriorityFrame(requestedFrame);

                // Keep displaying the nearest already-loaded frame.
                let displayFrame = lastFrame.current;

                for (let distance = 1; distance <= 10; distance++) {
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

                renderFrame(displayFrame);
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
                    ref={imageRef}
                    src={getFramePath(1)}
                    alt=""
                    draggable="false"
                    className="absolute inset-0 h-full w-full select-none object-cover object-left md:object-center"
                    onError={() => {
                        console.error(
                            "Background image failed:",
                            imageRef.current?.src
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
