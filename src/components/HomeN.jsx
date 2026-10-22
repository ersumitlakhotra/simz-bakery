
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

export const HomeN = () => {
    const TOTAL_FRAMES = 350;

    const [frame, setFrame] = useState(1);

    // Store preloaded images between renders.
    const images = useRef([]);
    const loadedFrames = useRef(new Set());
    const targetFrame = useRef(1);
    const currentFrame = useRef(1);
    const animationId = useRef(null);

    const getFramePath = (frameNumber) =>
        `/frames/frame_${String(frameNumber).padStart(4, "0")}.webp`;

    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

        window.scrollTo(0, 0);
    }, []);

    // Preload all 314 frames.
    useEffect(() => {
        let cancelled = false;

        images.current = [];
        loadedFrames.current = new Set();

        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new Image();

            img.onload = async () => {
                try {
                    await img.decode();

                    if (cancelled) return;

                    loadedFrames.current.add(i);

                } catch (error) {
                }
            };

            images.current[i] = img;
            img.src = getFramePath(i);
        }

        return () => {
            cancelled = true;

            images.current.forEach((img) => {
                if (img) {
                    img.onload = null;
                    img.onerror = null;
                }
            });
        };
    }, []);

    // Map scroll position to frames and animate smoothly.
  
useEffect(() => {
    let rafId = null;
    let disposed = false;
    let currentFrame = 1;
    let targetFrame = 1;

    const getHomeSection = () =>
        document.querySelector("main#Home > section");

    const updateTargetFrame = () => {
        const homeSection = getHomeSection();

        if (!homeSection) return;

        const sectionTop =
            homeSection.getBoundingClientRect().top + window.scrollY;

        const sectionHeight = homeSection.offsetHeight;
        const maxScroll = sectionHeight - window.innerHeight;

        if (maxScroll <= 0) {
            targetFrame = 1;
            return;
        }

        const progress = Math.max(
            0,
            Math.min(
                1,
                (window.scrollY - sectionTop) / maxScroll
            )
        );

        targetFrame =
            Math.round(progress * (TOTAL_FRAMES - 1)) + 1;
    };

    const animate = () => {
        if (disposed) return;

        const difference = targetFrame - currentFrame;

        currentFrame += difference * 0.25;

        if (Math.abs(difference) < 0.1) {
            currentFrame = targetFrame;
        }

        const nextFrame = Math.max(
            1,
            Math.min(TOTAL_FRAMES, Math.round(currentFrame))
        );

        // Always update the requested frame.
        // Do not stop the animation because a frame isn't loaded yet.
        setFrame((previousFrame) =>
            previousFrame === nextFrame ? previousFrame : nextFrame
        );

        if (currentFrame !== targetFrame) {
            rafId = requestAnimationFrame(animate);
        } else {
            rafId = null;
        }
    };

    const handleScroll = () => {
        updateTargetFrame();

        if (rafId === null) {
            rafId = requestAnimationFrame(animate);
        }
    };

    const syncAfterLayout = () => {
        if (disposed) return;

        handleScroll();

        // Recheck after the browser restores scroll position and layout.
        requestAnimationFrame(() => {
            if (!disposed) handleScroll();
        });
    };

    window.addEventListener("scroll", handleScroll, {
        passive: true,
    });

    window.addEventListener("resize", handleScroll);
    window.addEventListener("pageshow", syncAfterLayout);

    // Initial calculation.
    syncAfterLayout();

    // Additional synchronization after page refresh.
    const timer = window.setTimeout(syncAfterLayout, 500);
    const secondTimer = window.setTimeout(syncAfterLayout, 1500);

    return () => {
        disposed = true;

        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
        window.removeEventListener("pageshow", syncAfterLayout);

        window.clearTimeout(timer);
        window.clearTimeout(secondTimer);

        if (rafId !== null) {
            cancelAnimationFrame(rafId);
        }
    };
}, []);

    const currentImage = getFramePath(frame);

    return (
        <>
            {/* Fixed frame animation background */}
            <div className="fixed inset-0 z-0 h-screen w-screen overflow-hidden bg-black">
                <img
                    src={currentImage}
                    alt=""
                    draggable="false"
                    decoding="async"
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
