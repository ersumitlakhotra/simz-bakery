
import { useEffect, useRef, useState } from "react";
import { FrameContent } from "./frame_content";
import ExperienceLoader from "./loading.jsx";
import { motion } from "framer-motion";
import {
    HeartHandshake,
    Megaphone,
    MessageCircle,
    TrendingUp,
} from "lucide-react";
import Hero from "./Hero.jsx";
import WhyChooseUs from "./whychooseus.jsx";
import BirthdayCakeCard from "../cards/birthday.jsx";
import CustomCakeDetail from "../cards/custom.jsx";
import MilestoneCakeDetail from "../cards/milestone.jsx";
import WeddingCakeDetail from "../cards/wedding.jsx";
import BabyShowerCakeDetail from "../cards/babyshower.jsx";


export default function Home() {
    const TOTAL_FRAMES = 839;
    const INITIAL_FRAMES = 100; // 839
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


    useEffect(() => {
        cancelledRef.current = false;

        const loadInitialFrames = async () => {
            await loadBatch(1, INITIAL_FRAMES);

            if (cancelledRef.current) {
                return;
            }

            setIsReady(true);

            nextBatchRef.current =
                INITIAL_FRAMES + 1;
        };

        loadInitialFrames();

        return () => {
            cancelledRef.current = true;
        };
    }, []);


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

            const sectionTop =
                homeSection.offsetTop;

            const sectionHeight =
                homeSection.offsetHeight;

            const scrollDistance =
                sectionHeight -
                window.innerHeight;

            if (scrollDistance <= 0) {
                return;
            }



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


            const calculatedFrame =
                1 +
                progress *
                (TOTAL_FRAMES - 1);

            targetFrame.current =
                calculatedFrame;
        };


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


                let fallbackFrame =
                    lastFrame.current;

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


    const currentImage =
        imageCache.current[
        frame - 1
        ];

    const currentImageSrc =
        currentImage?.src ||
        getFramePath(1);

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

    if (!isReady) {
        return (
            <ExperienceLoader
                progress={loadingPercentage}
            />
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


            <FrameContent
                frame={frame}
                startFrame={60}
                position="bottom-center"
                eyebrow="THE SIMZ SIGNATURE"
                title="Where every layer tells a story!"
                description="From the first fold of batter to the final delicate detail, every Simz cake is crafted with patience, precision, and a love for beautiful things."
            />

            <FrameContent
                frame={frame}
                startFrame={120}
                position="bottom-center"
                eyebrow="MADE TO BE SAVOURED"
                title="A beautiful cake should taste even better!"
                description="Light, rich, creamy, indulgent — every flavour is carefully balanced so the last bite is just as memorable as the first."
            />

            <FrameContent
                frame={frame}
                startFrame={190}
                position="bottom-center"
                eyebrow="YOUR VISION, OUR CRAFT"
                title="Imagine it. We'll bake it!"
                description="Tell us what you're celebrating, show us what inspires you, and we'll transform your ideas into a cake that feels unmistakably yours."
            />

            <FrameContent
                frame={frame}
                startFrame={260}
                position="bottom-center"
                eyebrow="SWEETENING LIFE'S MOMENTS"
                title="Some moments deserve more than a cake!"
                description="They deserve something beautiful. Something personal. Something everyone remembers long after the candles are gone."
            />


            <BirthdayCakeCard frame={frame} />
            <CustomCakeDetail frame={frame} />
            <MilestoneCakeDetail frame={frame} />
            <WeddingCakeDetail  frame={frame} />
            <BabyShowerCakeDetail frame={frame} />
        </>
    );
}

