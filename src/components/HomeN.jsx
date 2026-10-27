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


export const HomeN=()=> {
    
const TOTAL_FRAMES = 380;

const [frame, setFrame] = useState(1);
const [isReady, setIsReady] = useState(false);

const targetFrame = useRef(1);
const currentFrame = useRef(1);
const lastFrame = useRef(1);
const rafRef = useRef(null);
const imageCache = useRef([]);

const getFramePath = (frameNumber) =>
    `/frames/frame_${String(frameNumber).padStart(4, "0")}.webp`;

// Load all frames first, then remove the loader.
useEffect(() => {
    let cancelled = false;

    const loadAllFrames = async () => {
        const images = new Array(TOTAL_FRAMES);

        const loadFrame = (frameNumber) =>
            new Promise((resolve) => {
                const image = new Image();

                image.onload = () => resolve(image);

                image.onerror = () => {
                    console.error(
                        `Failed to load frame ${frameNumber}:`,
                        getFramePath(frameNumber)
                    );
                    resolve(null);
                };

                image.src = getFramePath(frameNumber);

                if (image.complete) {
                    resolve(
                        image.naturalWidth > 0 ? image : null
                    );
                }
            });

        // Load frames in batches to avoid too many simultaneous requests.
        const BATCH_SIZE = 40;

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

            const batch = await Promise.all(
                Array.from(
                    { length: end - start + 1 },
                    (_, index) => loadFrame(start + index)
                )
            );

            batch.forEach((image, index) => {
                images[start + index - 1] = image;
            });
        }

        if (cancelled) return;

        imageCache.current = images;

        // Remove the loader only after every frame has finished loading.
        setFrame(1);
        setIsReady(true);
    };

    loadAllFrames();

    return () => {
        cancelled = true;
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

// Manage scrolling while frames load.
useEffect(() => {
    document.body.style.overflow = isReady ? "" : "hidden";
    document.documentElement.style.overflow = isReady
        ? ""
        : "hidden";

    return () => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
    };
}, [isReady]);

// Animate frames according to page scrolling.
useEffect(() => {
    if (!isReady) return;

    const homeSection = document.querySelector(
        "main#Home > section"
    );

    if (!homeSection) return;

    const handleScroll = () => {
        const sectionTop = homeSection.offsetTop;
        const scrollDistance =
            homeSection.offsetHeight - window.innerHeight;

        if (scrollDistance <= 0) return;

        const progress = Math.max(
            0,
            Math.min(
                1,
                (window.scrollY - sectionTop) / scrollDistance
            )
        );

        targetFrame.current =
            1 + progress * (TOTAL_FRAMES - 1);
    };

    const animate = () => {
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

        if (
            imageCache.current[requestedFrame - 1] &&
            requestedFrame !== lastFrame.current
        ) {
            lastFrame.current = requestedFrame;
            setFrame(requestedFrame);
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

// Show the loader until all frames have finished loading.
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

