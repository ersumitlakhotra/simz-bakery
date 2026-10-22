
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
                    console.error(`Failed to decode frame ${i}`, error);
                }
            };

            img.onerror = () => {
                console.error(`Failed to load frame ${i}: ${getFramePath(i)}`);
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
        const homeSection = document.querySelector(
            "main#Home > section"
        );

        if (!homeSection) {
            console.error('Could not find "main#Home > section".');
            return;
        }

        let rafId = null;

        const animateFrame = () => {
            const difference =
                targetFrame.current - currentFrame.current;

            // Higher values follow scrolling more closely.
            currentFrame.current += difference * 0.10;

            if (Math.abs(difference) < 0.05) {
                currentFrame.current = targetFrame.current;
            }

            const nextFrame = Math.max(
                1,
                Math.min(
                    TOTAL_FRAMES,
                    Math.round(currentFrame.current)
                )
            );

            // Display only frames that have loaded successfully.
            if (loadedFrames.current.has(nextFrame)) {
                setFrame((previousFrame) =>
                    previousFrame === nextFrame
                        ? previousFrame
                        : nextFrame
                );
            }

            if (currentFrame.current !== targetFrame.current) {
                rafId = requestAnimationFrame(animateFrame);
            } else {
                rafId = null;
            }

            animationId.current = rafId;
        };

        const handleScroll = () => {
            const rect = homeSection.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            const sectionHeight = homeSection.offsetHeight;

            const maxScroll = sectionHeight - window.innerHeight;

            if (maxScroll <= 0) {
                targetFrame.current = 1;
            } else {
                const sectionScroll = window.scrollY - sectionTop;

                const progress = Math.max(
                    0,
                    Math.min(1, sectionScroll / maxScroll)
                );

                targetFrame.current =
                    Math.round(progress * (TOTAL_FRAMES - 1)) + 1;
            }

            if (rafId === null) {
                rafId = requestAnimationFrame(animateFrame);
                animationId.current = rafId;
            }
        };

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        window.addEventListener("resize", handleScroll);

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);

            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }

            animationId.current = null;
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
