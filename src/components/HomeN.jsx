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

    const getFramePath = (frameNumber) =>
        `/frames/frame_${String(frameNumber).padStart(4, "0")}.webp`;

    useEffect(() => {
     let cancelled = false;
     let animationId = null;

     const imageCache = [];
     const loadingFrames = new Set();

     let targetFrame = 1;
     let currentFrame = 1;
     let lastFrame = 1;
     let nextBatch = INITIAL_FRAMES + 1;

     if ("scrollRestoration" in window.history) {
         window.history.scrollRestoration = "manual";
     }

     // Force scroll to top reliably on Safari refresh
     window.scrollTo(0, 0);
     const timer = setTimeout(() => {
         window.scrollTo(0, 0);
         handleScroll();
     }, 50);

const loadFrame = (frameNumber) => {
            if (
                cancelled ||
                frameNumber < 1 ||
                frameNumber > TOTAL_FRAMES ||
                imageCache[frameNumber - 1] ||
                loadingFrames.has(frameNumber)
            ) {
                return Promise.resolve();
            }

            loadingFrames.add(frameNumber);

            return new Promise((resolve) => {
                const image = new Image();
                let settled = false;

                const finish = (success) => {
                    if (settled) return;
                    settled = true;

                    loadingFrames.delete(frameNumber);

                    if (success && !cancelled) {
                        imageCache[frameNumber - 1] = image;
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

                if (image.complete) {
                    finish(image.naturalWidth > 0);
                }
            });
        };

        const loadBatch = async (startFrame, endFrame) => {
            if (cancelled) return;

            const framesToLoad = [];

            for (
                let i = startFrame;
                i <= Math.min(endFrame, TOTAL_FRAMES);
                i++
            ) {
                framesToLoad.push(i);
            }

            await Promise.all(
                framesToLoad.map((number) => loadFrame(number))
            );
        };


     const homeSection = document.querySelector("main#Home > section");

     const handleScroll = () => {
         if (!homeSection) return;

         const sectionTop =
             homeSection.getBoundingClientRect().top + window.scrollY;
         const scrollDistance =
             homeSection.offsetHeight - window.innerHeight;

         if (scrollDistance <= 0) {
             targetFrame = 1;
             return;
         }

         const progress = Math.max(
             0,
             Math.min(
                 1,
                 (window.scrollY - sectionTop) / scrollDistance
             )
         );

         targetFrame = 1 + progress * (TOTAL_FRAMES - 1);
     };

 const animate = () => {
            if (cancelled) return;

            const difference = targetFrame - currentFrame;

            currentFrame += difference * 0.15;

            if (Math.abs(difference) < 0.05) {
                currentFrame = targetFrame;
            }

            const requestedFrame = Math.max(
                1,
                Math.min(
                    TOTAL_FRAMES,
                    Math.round(currentFrame)
                )
            );

            let displayFrame = requestedFrame;

            // If the requested frame is not loaded, find the closest
            // available frame so the animation does not go blank.
            if (!imageCache[requestedFrame - 1]) {
                displayFrame = 0;

                for (
                    let distance = 1;
                    distance < TOTAL_FRAMES;
                    distance++
                ) {
                    const forward = requestedFrame + distance;
                    const backward = requestedFrame - distance;

                    if (
                        forward <= TOTAL_FRAMES &&
                        imageCache[forward - 1]
                    ) {
                        displayFrame = forward;
                        break;
                    }

                    if (
                        backward >= 1 &&
                        imageCache[backward - 1]
                    ) {
                        displayFrame = backward;
                        break;
                    }
                }
            }

            if (
                displayFrame > 0 &&
                imageCache[displayFrame - 1] &&
                displayFrame !== lastFrame
            ) {
                lastFrame = displayFrame;
                setFrame(displayFrame);
            }

            animationId = requestAnimationFrame(animate);
        };

        const loadAllFrames = async () => {
            // Load the first 20 frames first.
            await loadBatch(1, INITIAL_FRAMES);

            if (cancelled) return;

            // Load the remaining frames in batches of 40.
            while (
                nextBatch <= TOTAL_FRAMES &&
                !cancelled
            ) {
                const start = nextBatch;

                const end = Math.min(
                    start + BATCH_SIZE - 1,
                    TOTAL_FRAMES
                );

                await loadBatch(start, end);

                if (cancelled) return;

                nextBatch = end + 1;

                // Brief pause between batches.
                await new Promise((resolve) =>
                    setTimeout(resolve, 30)
                );
            }
        };


     window.addEventListener("scroll", handleScroll, { passive: true });
     window.addEventListener("resize", handleScroll);

     animationId = requestAnimationFrame(animate);
     loadAllFrames();

     return () => {
         cancelled = true;
         clearTimeout(timer);
         if (animationId !== null) cancelAnimationFrame(animationId);
         window.removeEventListener("scroll", handleScroll);
         window.removeEventListener("resize", handleScroll);

         if ("scrollRestoration" in window.history) {
             window.history.scrollRestoration = "auto";
         }
     };
 }, []);

    const currentImageSrc = getFramePath(frame); // Keep this only if other parts of your component use it.
    {/*if (!isReady) {
        return (
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 9999, // Ensure it's on top
                }}
            >
                <LoaderCircle className="h-12 w-12 animate-spin " />
            </div>
        );
    }*/}

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

