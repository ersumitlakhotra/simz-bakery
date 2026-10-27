
/* eslint-disable react-hooks/exhaustive-deps */
import {
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";

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
    const BATCH_SIZE = 40;

    const [frame, setFrame] = useState(1);
    const [isReady, setIsReady] = useState(false);

    const targetFrame = useRef(1);
    const currentFrame = useRef(1);
    const lastFrame = useRef(1);
    const rafRef = useRef(null);

    const imageCache = useRef([]);

    const getFramePath = (frameNumber) =>
        `/frames/frame_${String(frameNumber).padStart(4, "0")}.webp`;

    // Reset the scroll position before the page paints.
    useLayoutEffect(() => {
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
                window.history.scrollRestoration = "auto";
            }
        };
    }, []);

    // Load every frame before removing the loader.
    useEffect(() => {
        let cancelled = false;

        const loadFrame = (frameNumber) =>
            new Promise((resolve) => {
                const image = new Image();
                let settled = false;

                const finish = (result) => {
                    if (settled) return;

                    settled = true;
                    resolve(result);
                };

                image.onload = () => finish(image);

                image.onerror = () => {
                    console.error(
                        `Failed to load frame ${frameNumber}:`,
                        getFramePath(frameNumber)
                    );

                    finish(null);
                };

                image.src = getFramePath(frameNumber);

                if (image.complete) {
                    finish(
                        image.naturalWidth > 0 ? image : null
                    );
                }
            });

        const loadAllFrames = async () => {
            const images = new Array(TOTAL_FRAMES);

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

            // Initialize frame and scroll state before displaying the page.
            targetFrame.current = 1;
            currentFrame.current = 1;
            lastFrame.current = 1;

            setFrame(1);

            window.scrollTo(0, 0);

            requestAnimationFrame(() => {
                if (cancelled) return;

                window.scrollTo(0, 0);
                setIsReady(true);
            });
        };

        loadAllFrames();

        return () => {
            cancelled = true;
        };
    }, []);

    // Prevent scrolling while frames are loading.
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

    // Animate frames using the actual document scroll position.
    
useEffect(() => {
    if (!isReady) return;

    const homeSection = document.getElementById("HomeScroll");

    if (!homeSection) {
        console.error("HomeScroll section not found");
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

        currentFrame.current += difference * 0.15;

        if (Math.abs(difference) < 0.05) {
            currentFrame.current = targetFrame.current;
        }

        const requestedFrame = Math.max(
            1,
            Math.min(
                TOTAL_FRAMES,
                Math.round(currentFrame.current)
            )
        );

        const image = imageCache.current[requestedFrame - 1];

        if (image && requestedFrame !== lastFrame.current) {
            lastFrame.current = requestedFrame;
            setFrame(requestedFrame);
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

    // Keep the loader visible until all frames finish loading.
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
            {/* Fixed background frame */}
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
};
