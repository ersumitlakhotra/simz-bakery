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
    const INITIAL_FRAMES = 20;
    const BATCH_SIZE = 50;
    const [frame, setFrame] = useState(1);
    const [loadedFrames, setLoadedFrames] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const targetFrame = useRef(1);
    const currentFrame = useRef(1);
    const lastFrame = useRef(1);

    const rafRef = useRef(null);

    /*
    ============================================================
    IMAGE CACHE
    ============================================================
    */

    const imageCache = useRef([]);
    const loadingFrames = useRef(new Set());
    const cancelledRef = useRef(false);
    const nextBatchRef = useRef(INITIAL_FRAMES + 1);
    const getFramePath = (frameNumber) => {
        return `/frames/frame_${String(frameNumber).padStart(4, "0")}.webp`;
    };

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

            image.onload = () => {
                loadingFrames.current.delete(frameNumber);

                if (cancelledRef.current) {
                    resolve();
                    return;
                }

                imageCache.current[frameNumber - 1] = image;

                setLoadedFrames((previous) =>
                    Math.min(TOTAL_FRAMES, previous + 1)
                );

                resolve();
            };

            image.onerror = () => {
                loadingFrames.current.delete(frameNumber);

                console.error(
                    `Failed to load frame: ${frameNumber}`,
                    getFramePath(frameNumber)
                );

                if (!cancelledRef.current) {
                    setLoadedFrames((previous) =>
                        Math.min(TOTAL_FRAMES, previous + 1)
                    );
                }

                resolve();
            };

            image.src = getFramePath(frameNumber);
        });
    };

    /*
    ============================================================
    LOAD BATCH
    ============================================================
    */

    const loadBatch = async (startFrame, endFrame) => {
        if (cancelledRef.current) {
            return;
        }

        const frames = [];

        for (
            let frameNumber = startFrame;
            frameNumber <= endFrame &&
            frameNumber <= TOTAL_FRAMES;
            frameNumber++
        ) {
            frames.push(frameNumber);
        }

        await Promise.all(
            frames.map((frameNumber) =>
                loadFrame(frameNumber)
            )
        );
    };

    /*
    ============================================================
    INITIAL LOAD
    ============================================================
    */

    useEffect(() => {
        cancelledRef.current = false;

        const loadInitialFrames = async () => {
            await loadBatch(1, INITIAL_FRAMES);

            if (cancelledRef.current) {
                return;
            }

            /*
            First 100 frames are ready.
            Show the website.
            */

            setIsReady(true);

            /*
            Start loading the remaining frames
            in the background.
            */

            nextBatchRef.current =
                INITIAL_FRAMES + 1;
        };

        loadInitialFrames();

        return () => {
            cancelledRef.current = true;
        };
    }, []);

    /*
    ============================================================
    BACKGROUND FRAME LOADING
    ============================================================
    */

    useEffect(() => {
        if (!isReady) {
            return;
        }

        let cancelled = false;

        const loadRemainingFrames = async () => {
            while (
                nextBatchRef.current <= TOTAL_FRAMES &&
                !cancelled &&
                !cancelledRef.current
            ) {
                const start =
                    nextBatchRef.current;

                const end =
                    Math.min(
                        start + BATCH_SIZE - 1,
                        TOTAL_FRAMES
                    );

                await loadBatch(start, end);

                nextBatchRef.current =
                    end + 1;

                /*
                Give the browser a small opportunity
                to render/handle scrolling before
                starting the next batch.
                */

                await new Promise((resolve) =>
                    setTimeout(resolve, 30)
                );
            }
        };

        loadRemainingFrames();

        return () => {
            cancelled = true;
        };
    }, [isReady]);

    /*
    ============================================================
    FORCE PAGE TO TOP
    ============================================================
    */

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

    /*
    ============================================================
    LOCK PAGE ONLY DURING INITIAL 100 FRAME LOAD
    ============================================================
    */

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

    /*
    ============================================================
    SCROLL → FRAME
    ============================================================
    */

    useEffect(() => {
        if (!isReady) {
            return;
        }

        const homeSection =
            document.querySelector(
                "main#Home > section"
            );

        if (!homeSection) {
            return;
        }

        const handleScroll = () => {
            /*
            ====================================================
            HOME SECTION POSITION
            ====================================================
            */

            const sectionTop =
                homeSection.offsetTop;

            const sectionHeight =
                homeSection.offsetHeight;

            /*
            Because the sticky container is h-screen,
            the usable scroll distance is:

            section height - viewport height
            */

            const scrollDistance =
                sectionHeight -
                window.innerHeight;

            if (scrollDistance <= 0) {
                return;
            }

            /*
            ====================================================
            RELATIVE HOME PROGRESS
            ====================================================
            */

            const relativeScroll =
                window.scrollY -
                sectionTop;

            const progress = Math.max(
                0,
                Math.min(
                    1,
                    relativeScroll /
                        scrollDistance
                )
            );

            /*
            ====================================================
            0 → 694
            ====================================================
            */

            const calculatedFrame =
                1 +
                progress *
                    (TOTAL_FRAMES - 1);

            targetFrame.current =
                calculatedFrame;
        };

        /*
        ========================================================
        FRAME ANIMATION
        ========================================================
        */

        const animate = () => {
            const difference =
                targetFrame.current -
                currentFrame.current;

            /*
            Smooth cinematic movement.
            */

            currentFrame.current +=
                difference * 0.10;

            if (Math.abs(difference) < 0.01) {
                currentFrame.current =
                    targetFrame.current;
            }

            const requestedFrame = Math.max(
                1,
                Math.min(
                    TOTAL_FRAMES,
                    Math.round(
                        currentFrame.current
                    )
                )
            );

            /*
            ====================================================
            IF FRAME IS LOADED
            ====================================================
            */

            if (
                imageCache.current[
                    requestedFrame - 1
                ]
            ) {
                if (
                    requestedFrame !==
                    lastFrame.current
                ) {
                    lastFrame.current =
                        requestedFrame;

                    setFrame(
                        requestedFrame
                    );
                }
            } else {
                /*
                =================================================
                FRAME NOT LOADED YET
                =================================================

                Find the closest loaded frame so
                the animation never goes blank.
                */

                let fallbackFrame =
                    lastFrame.current;

                /*
                Look forward a little.
                */

                for (
                    let i = 0;
                    i <= 10;
                    i++
                ) {
                    const candidate =
                        requestedFrame + i;

                    if (
                        candidate <=
                            TOTAL_FRAMES &&
                        imageCache.current[
                            candidate - 1
                        ]
                    ) {
                        fallbackFrame =
                            candidate;

                        break;
                    }
                }

                /*
                Look backward if necessary.
                */

                if (
                    !imageCache.current[
                        fallbackFrame - 1
                    ]
                ) {
                    for (
                        let i = 1;
                        i <= 10;
                        i++
                    ) {
                        const candidate =
                            requestedFrame -
                            i;

                        if (
                            candidate >= 1 &&
                            imageCache.current[
                                candidate - 1
                            ]
                        ) {
                            fallbackFrame =
                                candidate;

                            break;
                        }
                    }
                }

                if (
                    fallbackFrame !==
                    lastFrame.current
                ) {
                    lastFrame.current =
                        fallbackFrame;

                    setFrame(
                        fallbackFrame
                    );
                }
            }

            rafRef.current =
                requestAnimationFrame(
                    animate
                );
        };

        window.addEventListener(
            "scroll",
            handleScroll,
            {
                passive: true,
            }
        );

        handleScroll();

        rafRef.current =
            requestAnimationFrame(
                animate
            );

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );

            if (rafRef.current) {
                cancelAnimationFrame(
                    rafRef.current
                );
            }
        };
    }, [isReady]);

    /*
    ============================================================
    CURRENT IMAGE
    ============================================================
    */

    const currentImage =
        imageCache.current[
            frame - 1
        ];

    const currentImageSrc =
        currentImage?.src ||
        getFramePath(1);

    /*
    ============================================================
    LOADING PERCENTAGE
    ============================================================
    */

    const loadingPercentage =
        Math.min(
            100,
            Math.round(
                (
                    loadedFrames /
                    INITIAL_FRAMES
                ) * 100
            )
        );

    /*
    ============================================================
    MARKETING STEPS
    ============================================================
    */
    /*
    ============================================================
    LOADER
    ============================================================
    */

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

            <div className="fixed inset-0 z-0 h-screen w-screen overflow-hidden ">
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

