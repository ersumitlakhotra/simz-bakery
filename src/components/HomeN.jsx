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

    const TOTAL_FRAMES = 314;
    const [frame, setFrame] = useState(1);

    const getFramePath = (frameNumber) =>
        `/frames/frame_${String(frameNumber).padStart(4, "0")}.webp`;

    
useEffect(() => {
    const homeSection = document.querySelector("main#Home > section");

    if (!homeSection) return;

    let targetFrame = 1;
    let currentFrame = 1;
    let animationId = null;

    const handleScroll = () => {
        const sectionHeight = homeSection.offsetHeight;
        const maxScroll = sectionHeight - window.innerHeight;

        if (maxScroll <= 0) return;

        const scrollProgress = Math.min(
            1,
            Math.max(0, window.scrollY / maxScroll)
        );

        targetFrame = Math.round(
            scrollProgress * (TOTAL_FRAMES - 1)
        ) + 1;

        if (animationId === null) {
            animationId = requestAnimationFrame(animateFrame);
        }
    };

    const animateFrame = () => {
        const difference = targetFrame - currentFrame;

        // Smoothly approach the target frame
        currentFrame += difference * 0.15;

        if (Math.abs(difference) < 0.1) {
            currentFrame = targetFrame;
        }

        const nextFrame = Math.max(
            1,
            Math.min(TOTAL_FRAMES, Math.round(currentFrame))
        );

        setFrame((previousFrame) =>
            previousFrame !== nextFrame ? nextFrame : previousFrame
        );

        if (currentFrame !== targetFrame) {
            animationId = requestAnimationFrame(animateFrame);
        } else {
            animationId = null;
        }
    };

    window.addEventListener("scroll", handleScroll, {
        passive: true,
    });

    handleScroll();
}, []);

    const currentImage = getFramePath(frame - 1);


    //  const currentImageSrc = getFramePath(frame); // Keep this only if other parts of your component use it.
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
                    src={currentImage}
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

