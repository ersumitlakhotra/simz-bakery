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
    const [isReady, setIsReady] = useState(false);

    const getFramePath = (frameNumber) =>
        `/frames/frame_${String(frameNumber).padStart(4, "0")}.webp`;

    const [frames, setFrames] = useState([]);

    useEffect(() => {
        let cancelled = false;

        const loadFrames = async () => {
            const loadedFrames = await Promise.all(
                Array.from({ length: TOTAL_FRAMES }, (_, index) => {
                    return new Promise((resolve, reject) => {
                        const image = new Image();

                        image.onload = () => resolve(image);
                        image.onerror = () =>
                            reject(new Error(`Failed to load frame ${index + 1}`));

                        image.src = getFramePath(index + 1);
                    });
                })
            );

            if (!cancelled) {
                setFrames(loadedFrames);
                setIsReady(true);
            }
        };

        loadFrames().catch((error) => {
            console.error("Failed to load animation frames:", error);
        });

        return () => {
            cancelled = true;
        };
    }, []);
    
    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });

        requestAnimationFrame(() => {
            window.scrollTo(0, 0);
        });
    }, []);

    useEffect(() => {
        if (!isReady) return;

        const homeSection = document.querySelector("main#Home > section");
        if (!homeSection) return;

        const handleScroll = () => {
            const scrollDistance =
                homeSection.offsetHeight - window.innerHeight;

            if (scrollDistance <= 0) return;

            const progress = Math.max(
                0,
                Math.min(
                    1,
                    (window.scrollY - homeSection.offsetTop) / scrollDistance
                )
            );

            setFrame(
                Math.min(
                    TOTAL_FRAMES,
                    Math.max(1, Math.round(1 + progress * (TOTAL_FRAMES - 1)))
                )
            );
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [isReady]);

    const currentImageSrc =
        frames[frame - 1]?.src || getFramePath(1);

    // Keep this only if other parts of your component use it.
    if (!isReady) {
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

