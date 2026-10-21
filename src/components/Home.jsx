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
const INITIAL_FRAMES = 40;
const BATCH_SIZE = 50;
const MAX_CONCURRENT_LOADS = 8;

const [frame, setFrame] = useState(1);
const [isReady, setIsReady] = useState(false);

const targetFrame = useRef(1);
const currentFrame = useRef(1);
const lastFrame = useRef(1);
const rafRef = useRef(null);

const imageCache = useRef([]);
const loadingFrames = useRef(new Set());
const cancelledRef = useRef(false);

const loadQueue = useRef([]);
const queuedFrames = useRef(new Set());
const activeLoads = useRef(0);
const pumpQueueRef = useRef(null);

const getFramePath = (frameNumber) =>
    `/frames/frame_${String(frameNumber).padStart(4, "0")}.webp`;

// Load one image and decode it before adding it to the cache.
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
        let settled = false;

        const finish = (success) => {
            if (settled) return;
            settled = true;

            image.onload = null;
            image.onerror = null;
            loadingFrames.current.delete(frameNumber);

            if (success && !cancelledRef.current) {
                imageCache.current[frameNumber - 1] = image;
            }

            resolve();
        };

        image.onload = async () => {
            try {
                if (typeof image.decode === "function") {
                    await image.decode();
                }

                finish(image.naturalWidth > 0);
            } catch {
                // Some browsers reject decode even when the image is usable.
                finish(image.naturalWidth > 0);
            }
        };

        image.onerror = () => {
            console.error(
                `Failed to load frame ${frameNumber}:`,
                getFramePath(frameNumber)
            );

            finish(false);
        };

        image.src = getFramePath(frameNumber);

        if (image.complete) {
            if (image.naturalWidth > 0) {
                finish(true);
            } else {
                finish(false);
            }
        }
    });
};

// Process a limited number of image requests at a time.
// The closest frames to the current scroll position load first.
pumpQueueRef.current = () => {
    if (cancelledRef.current) return;

    loadQueue.current.sort(
        (a, b) =>
            Math.abs(a - targetFrame.current) -
            Math.abs(b - targetFrame.current)
    );

    while (
        activeLoads.current < MAX_CONCURRENT_LOADS &&
        loadQueue.current.length > 0
    ) {
        const frameNumber = loadQueue.current.shift();

        queuedFrames.current.delete(frameNumber);

        if (
            imageCache.current[frameNumber - 1] ||
            loadingFrames.current.has(frameNumber)
        ) {
            continue;
        }

        activeLoads.current++;

        loadFrame(frameNumber).finally(() => {
            activeLoads.current--;

            if (cancelledRef.current) return;

            // Update the displayed frame if this was the requested frame.
            if (
                Math.round(targetFrame.current) === frameNumber &&
                imageCache.current[frameNumber - 1]
            ) {
                lastFrame.current = frameNumber;
                setFrame(frameNumber);
            }

            pumpQueueRef.current?.();
        });
    }
};

const scheduleFrame = (frameNumber) => {
    if (
        frameNumber < 1 ||
        frameNumber > TOTAL_FRAMES ||
        imageCache.current[frameNumber - 1] ||
        loadingFrames.current.has(frameNumber) ||
        queuedFrames.current.has(frameNumber)
    ) {
        return;
    }

    loadQueue.current.push(frameNumber);
    queuedFrames.current.add(frameNumber);
};

const scheduleNearbyFrames = (centerFrame, radius = 20) => {
    const center = Math.round(centerFrame);

    for (
        let distance = 0;
        distance <= radius;
        distance++
    ) {
        scheduleFrame(center + distance);

        if (distance > 0) {
            scheduleFrame(center - distance);
        }
    }

    pumpQueueRef.current?.();
};

// Start with frame 1, then load the remaining frames in the background.
useEffect(() => {
    cancelledRef.current = false;

    const initialize = async () => {
        await loadFrame(1);

        if (cancelledRef.current) return;

        setFrame(1);
        lastFrame.current = 1;
        setIsReady(true);

        // Prioritize the opening frames.
        scheduleNearbyFrames(1, INITIAL_FRAMES - 1);

        // Queue the rest without starting hundreds of simultaneous requests.
        for (
            let start = INITIAL_FRAMES + 1;
            start <= TOTAL_FRAMES;
            start += BATCH_SIZE
        ) {
            if (cancelledRef.current) return;

            const end = Math.min(
                start + BATCH_SIZE - 1,
                TOTAL_FRAMES
            );

            for (let i = start; i <= end; i++) {
                scheduleFrame(i);
            }

            pumpQueueRef.current?.();
        }
    };

    initialize();

    return () => {
        cancelledRef.current = true;
        loadQueue.current = [];
        queuedFrames.current.clear();
    };
}, []);

// Reset scroll position when the page first mounts.
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

// Animate frames according to scrolling, without an always-running RAF loop.
useEffect(() => {
    if (!isReady) return;

    const homeSection = document.querySelector(
        "main#Home > section"
    );

    if (!homeSection) return;

    const animate = () => {
        rafRef.current = null;

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

        if (imageCache.current[requestedFrame - 1]) {
            if (lastFrame.current !== requestedFrame) {
                lastFrame.current = requestedFrame;
                setFrame(requestedFrame);
            }
        } else {
            // Keep the current image visible while the next frames load.
            scheduleNearbyFrames(requestedFrame, 20);
        }

        // Continue only while the animation is moving.
        if (
            Math.abs(
                targetFrame.current - currentFrame.current
            ) >= 0.05
        ) {
            rafRef.current = requestAnimationFrame(animate);
        }
    };

    const startAnimation = () => {
        if (rafRef.current === null) {
            rafRef.current = requestAnimationFrame(animate);
        }
    };

    const handleScroll = () => {
        const sectionTop =
            homeSection.getBoundingClientRect().top +
            window.scrollY;

        const sectionHeight = homeSection.offsetHeight;

        const scrollDistance =
            sectionHeight - window.innerHeight;

        if (scrollDistance <= 0) return;

        const relativeScroll =
            window.scrollY - sectionTop;

        const progress = Math.max(
            0,
            Math.min(1, relativeScroll / scrollDistance)
        );

        targetFrame.current =
            1 + progress * (TOTAL_FRAMES - 1);

        // Load the frames around the user's current scroll position first.
        scheduleNearbyFrames(targetFrame.current, 20);

        startAnimation();
    };

    window.addEventListener("scroll", handleScroll, {
        passive: true,
    });

    handleScroll();

    return () => {
        window.removeEventListener("scroll", handleScroll);

        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
    };
}, [isReady]);

const currentImage = imageCache.current[frame - 1];

const currentImageSrc =
    currentImage?.src || getFramePath(1);

// Keep your existing loading screen.
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
                    className="absolute inset-0 h-full w-full select-none object-cover object-left -translate-x-4 md:translate-x-0 md:object-center"
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

