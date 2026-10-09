/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import ExperienceLoader from "./loading.jsx";
import Hero from "./Hero.jsx";
import BirthdayCakeCard from "../cards/birthday.jsx";
import CustomCakeDetail from "../cards/custom.jsx";
import MilestoneCakeDetail from "../cards/milestone.jsx";
import WeddingCakeDetail from "../cards/wedding.jsx";
import BabyShowerCakeDetail from "../cards/babyshower.jsx";


export default function Home() {
    const TOTAL_FRAMES = 380;
    const INITIAL_FRAMES = 10;
    const BATCH_SIZE = 50;

    const [frame, setFrame] = useState(1);
    const [loadedFrames, setLoadedFrames] = useState(0);
    const [isReady, setIsReady] = useState(false);

    const targetFrame = useRef(1);
    const currentFrame = useRef(1);
    const lastFrame = useRef(1);
    const rafRef = useRef(null);

    const imageCache = useRef([]);
    const loadingFrames = useRef(new Set());
    const cancelledRef = useRef(false);
    const nextBatchRef = useRef(INITIAL_FRAMES + 1);

    const getFramePath = (frameNumber) =>
        `/frames/frame_${String(frameNumber).padStart(4, "0")}.webp`;

    const loadFrame = (frameNumber) => {
        if (
            frameNumber < 1 ||
            frameNumber > TOTAL_FRAMES ||
            imageCache.current[frameNumber - 1] ||
            loadingFrames.current.has(frameNumber)
        ) {
            return Promise.resolve();
        }

        loadingFrames.current.add(frameNumber);

        return new Promise((resolve) => {
            const image = new Image();
            let settled = false;

            const finish = (success) => {
                if (settled) return;
                settled = true;

                loadingFrames.current.delete(frameNumber);

                if (success && !cancelledRef.current) {
                    imageCache.current[frameNumber - 1] = image;
                }

                if (!cancelledRef.current) {
                    setLoadedFrames((previous) =>
                        Math.min(
                            TOTAL_FRAMES,
                            previous + 1
                        )
                    );
                }

                resolve();
            };

            image.onload = () => finish(true);
            image.onerror = () => {
                console.error(
                    `Failed to load frame ${frameNumber}:`,
                    getFramePath(frameNumber)
                );
                finish(false);
            };

            image.src = getFramePath(frameNumber);

            // Handle images already available in browser cache.
            if (image.complete) {
                finish(image.naturalWidth > 0);
            }
        });
    };

    const loadBatch = async (startFrame, endFrame) => {
        if (cancelledRef.current) return;

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

    // Render the website immediately; load frames in the background.
    useEffect(() => {
        cancelledRef.current = false;

        setIsReady(true);

        const loadAllFrames = async () => {
            await loadBatch(1, INITIAL_FRAMES);

            if (cancelledRef.current) return;

            nextBatchRef.current = INITIAL_FRAMES + 1;

            while (
                nextBatchRef.current <= TOTAL_FRAMES &&
                !cancelledRef.current
            ) {
                const start = nextBatchRef.current;
                const end = Math.min(
                    start + BATCH_SIZE - 1,
                    TOTAL_FRAMES
                );

                await loadBatch(start, end);

                if (cancelledRef.current) return;

                nextBatchRef.current = end + 1;

                await new Promise((resolve) =>
                    setTimeout(resolve, 30)
                );
            }
        };

        loadAllFrames();

        return () => {
            cancelledRef.current = true;
        };
    }, []);

    // Restore normal scrolling and start at the top.
    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

        window.scrollTo(0, 0);

        return () => {
            if ("scrollRestoration" in window.history) {
                window.history.scrollRestoration = "auto";
            }
        };
    }, []);

    // Manage page scrolling while the experience initializes.
    useEffect(() => {
        if (isReady) {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            return;
        }

        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, [isReady]);

    // Animate the frame sequence according to page scrolling.
    useEffect(() => {
        if (!isReady) return;

        const homeSection = document.querySelector(
            "main#Home > section"
        );

        if (!homeSection) return;

        const handleScroll = () => {
            const sectionTop = homeSection.offsetTop;
            const sectionHeight = homeSection.offsetHeight;

            const scrollDistance =
                sectionHeight - window.innerHeight;

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
            const difference =
                targetFrame.current - currentFrame.current;

            currentFrame.current += difference * 0.10;

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

            // Prefer the requested frame when it is loaded.
            if (!imageCache.current[requestedFrame - 1]) {
                displayFrame = lastFrame.current;

                // Find the nearest available frame.
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

        handleScroll();

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("scroll", handleScroll);

            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [isReady]);

    const currentImage = imageCache.current[frame - 1];

    const currentImageSrc =
        currentImage?.src || getFramePath(1);

    const loadingPercentage = Math.min(
        100,
        Math.round((loadedFrames / INITIAL_FRAMES) * 100)
    );

    // Keep this only if other parts of your component use it.
    if (!isReady) {
        return (
            <ExperienceLoader progress={loadingPercentage} />
        );
    }

    return (
        <>
            <div className="relative inset-0 z-0 h-screen w-screen overflow-hidden bg-black">
                <img
                    src={currentImageSrc}
                    alt=""
                    draggable="false"
                    className="absolute inset-0 h-full w-full select-none object-cover"
                />
            </div>

            <Hero frame={frame} />

            <BirthdayCakeCard frame={frame} />
            <CustomCakeDetail frame={frame} />
            <MilestoneCakeDetail frame={frame} />
            <WeddingCakeDetail frame={frame} />
            <BabyShowerCakeDetail frame={frame} />
        </>
    );
}

