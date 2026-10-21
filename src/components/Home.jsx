
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

export default function Home() {
    const TOTAL_FRAMES = 380;
    const BATCH_SIZE = 50;

    const [frame, setFrame] = useState(1);
    const [isReady, setIsReady] = useState(false);

    const targetFrame = useRef(1);
    const currentFrame = useRef(1);
    const lastFrame = useRef(1);
    const rafRef = useRef(null);

    const imageCache = useRef([]);
    const loadingFrames = useRef(new Map());
    const cancelledRef = useRef(false);
    const nextBatchRef = useRef(2);

    const getFramePath = (frameNumber) =>
        `/frames/frame_${String(frameNumber).padStart(4, "0")}.webp`;

    // Load an individual frame and cache it after successful loading. 
    const loadFrame = (frameNumber) => {
        if (
            frameNumber < 1 ||
            frameNumber > TOTAL_FRAMES ||
            imageCache.current[frameNumber - 1]
        ) {
            return Promise.resolve(
                Boolean(imageCache.current[frameNumber - 1])
            );
        }

        // Avoid duplicate requests for the same frame.
        if (loadingFrames.current.has(frameNumber)) {
            return loadingFrames.current.get(frameNumber);
        }

        const promise = new Promise((resolve) => {
            const image = new Image();
            let settled = false;

            const finish = (success) => {
                if (settled) return;
                settled = true;

                if (success) {
                    imageCache.current[frameNumber - 1] = image;
                }

                loadingFrames.current.delete(frameNumber);
                resolve(success);
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

            // Handle frames already available in the browser cache.
            if (image.complete) {
                finish(image.naturalWidth > 0);
            }
        });

        loadingFrames.current.set(frameNumber, promise);

        return promise;
    };

    // Load a group of frames concurrently.
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

    // Load the first frame before starting the experience.
    // Load the remaining frames progressively in the background.
    useEffect(() => {
        let active = true;

        cancelledRef.current = false;

        const loadRemainingFrames = async () => {
            while (
                nextBatchRef.current <= TOTAL_FRAMES &&
                active
            ) {
                const startFrame = nextBatchRef.current;
                const endFrame = Math.min(
                    startFrame + BATCH_SIZE - 1,
                    TOTAL_FRAMES
                );

                await loadBatch(startFrame, endFrame);

                if (!active) return;

                nextBatchRef.current = endFrame + 1;

                // Give mobile browsers time to render between batches.
                await new Promise((resolve) =>
                    setTimeout(resolve, 30)
                );
            }
        };

        const initialize = async () => {
            const firstFrameLoaded = await loadFrame(1);

            if (!active) return;

            if (!firstFrameLoaded) {
                console.error(
                    "The first animation frame could not be loaded."
                );
                return;
            }

            setFrame(1);
            setIsReady(true);

            // Continue loading frames without blocking the page.
            loadRemainingFrames();
        };

        initialize();

        return () => {
            active = false;
            cancelledRef.current = true;
        };
    }, []);

    // Start at the top and avoid browser scroll restoration.
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

    // Allow normal scrolling once the first frame is ready.
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

    // Animate frames according to the current scroll position.
    useEffect(() => {
        if (!isReady) return;

        const homeSection = document.querySelector(
            "main#Home > section"
        );

        if (!homeSection) {
            console.error(
                "Scroll animation section was not found. Check main#Home > section."
            );
            return;
        }

        let animationActive = true;

        const handleScroll = () => {
            const sectionTop =
                homeSection.getBoundingClientRect().top +
                window.scrollY;

            const sectionHeight = homeSection.offsetHeight;

            const scrollDistance =
                sectionHeight - window.innerHeight;

            if (scrollDistance <= 0) {
                targetFrame.current = window.scrollY >= sectionTop
                    ? TOTAL_FRAMES
                    : 1;

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

        const handlePageShow = () => {
            handleScroll();
        };

        const animate = () => {
            if (!animationActive) return;

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

            // Use the requested frame if it is already loaded.
            if (!imageCache.current[requestedFrame - 1]) {
                displayFrame = lastFrame.current;

                // Prioritize loading the frame needed right now.
                loadFrame(requestedFrame);

                // Find the nearest loaded frame as a fallback.
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

        window.addEventListener("resize", handleScroll);
        window.addEventListener("pageshow", handlePageShow);

        // Set the correct frame before starting the animation loop.
        handleScroll();

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            animationActive = false;

            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
            window.removeEventListener("pageshow", handlePageShow);

            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
        };
    }, [isReady]);

    const currentImage = imageCache.current[frame - 1];

    const currentImageSrc =
        currentImage?.src || getFramePath(1);

    // Display a loader until the first frame is ready.
    if (!isReady) {
        return (
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
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
                    src={currentImageSrc}
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
}
