import { motion } from "framer-motion";

export function FrameContent({
    frame,
    startFrame,
    inFrames = 10,
    holdFrames = 30,
    outFrames = 10,
    exitAnimation = "fade",
    eyebrow,
    title,
    description,
    position = "center",
}) {
    const enterEnd = startFrame + inFrames;
    const holdEnd = enterEnd + holdFrames;
    const exitEnd = holdEnd + outFrames;

    const positions = {
        "top-left": {
            container: "items-start justify-start text-left",
            initial: { x: -100, y: -70 },
        },

        "top-center": {
            container: "items-start justify-center text-center",
            initial: { x: 0, y: -100 },
        },

        "top-right": {
            container: "items-start justify-end text-right",
            initial: { x: 100, y: -70 },
        },

        "middle-left": {
            container: "items-center justify-start text-left",
            initial: { x: -120, y: 0 },
        },

        "center": {
            container: "items-center justify-center text-center",
            initial: { x: 0, y: 40, scale: 0.96 },
        },

        "middle-right": {
            container: "items-center justify-end text-right",
            initial: { x: 120, y: 0 },
        },

        "bottom-left": {
            container: "items-end justify-start text-left",
            initial: { x: -100, y: 70 },
        },

        "bottom-center": {
            container: "items-end justify-center text-center",
            initial: { x: 0, y: 100 },
        },

        "bottom-right": {
            container: "items-end justify-end text-right",
            initial: { x: 100, y: 70 },
        },
    };

    const config = positions[position] || positions.center;

    if (frame < startFrame) {
        return null;
    }

    if (frame > exitEnd) {
        return null;
    }

    /*
        ENTER
    */
    if (frame <= enterEnd) {
        const progress = (frame - startFrame) / inFrames;
        const eased = 1 - Math.pow(1 - progress, 3);

        return (
            <motion.div
                initial={false}
                animate={{
                    opacity: eased,
                    x: config.initial.x * (1 - eased),
                    y: config.initial.y * (1 - eased),
                    scale: config.initial.scale ? config.initial.scale + (1 - config.initial.scale) * eased : 1,
                }}
                transition={{
                    duration: 0.12,
                    ease: "linear",
                }}
                className={`pointer-events-none fixed inset-0 z-20 flex px-6 py-16 ${config.container}`}
            >
                <Content
                    eyebrow={eyebrow}
                    title={title}
                    description={description}
                />
            </motion.div>
        );
    }

    /*
        HOLD
    */
    if (frame <= holdEnd) {
        return (
            <motion.div
                initial={false}
                animate={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                }}
                transition={{
                    duration: 0.15,
                    ease: "linear",
                }}
                className={`pointer-events-none fixed inset-0 z-20 flex px-6 py-16 ${config.container}`}
            >
                <Content
                    eyebrow={eyebrow}
                    title={title}
                    description={description}
                />
            </motion.div>
        );
    }

    /*
        EXIT
    */
    const progress = Math.max(
        0,
        Math.min(1, (frame - holdEnd) / outFrames)
    );

    const eased = Math.pow(progress, 3);

    /*
        FADE EXIT
    */
    if (exitAnimation === "fade") {
        return (
            <motion.div
                initial={false}
                animate={{
                    opacity: 1 - eased,
                    x: 0,
                    y: 0,
                    scale: 1,
                }}
                transition={{
                    duration: 0.12,
                    ease: "linear",
                }}
                className={`pointer-events-none fixed inset-0 z-20 flex px-6 py-16 ${config.container}`}
            >
                <Content
                    eyebrow={eyebrow}
                    title={title}
                    description={description}
                />
            </motion.div>
        );
    }

    /*
        DEFAULT EXIT
    */
    return (
        <motion.div
            initial={false}
            animate={{
                opacity: 1 - eased,
                x: config.initial.x * eased,
                y: config.initial.y * eased,
                scale: config.initial.scale ? 1 - (1 - config.initial.scale) * eased : 1,
            }}
            transition={{
                duration: 0.12,
                ease: "linear",
            }}
            className={`pointer-events-none fixed inset-0 z-20 flex px-6 py-16 ${config.container}`}
        >
            <Content
                eyebrow={eyebrow}
                title={title}
                description={description}
            />
        </motion.div>
    );
}

function Content({
    eyebrow,
    title,
    description,
}) {
    return (
        <div className="relative max-w-4xl mx-auto text-center">

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[260px] rounded-full bg-[#b83a5a]/12 blur-3xl pointer-events-none" />

            <div className="relative">

                <div className="flex items-center justify-center gap-3">

                    <div className="w-10 md:w-14 h-px bg-[#d85c78]/80" />

                    <p className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.42em] text-[#f0a1b4] ">
                        {eyebrow}
                    </p>

                    <div className="w-10 md:w-14 h-px bg-[#d85c78]/80" />

                </div>

                <h2 className="mt-6 font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[0.92] tracking-[-0.045em] text-white drop-shadow-[0_8px_25px_rgba(0,0,0,0.25)]">
                    {title}
                </h2>

                <p className="mt-7 max-w-2xl mx-auto text-sm md:text-lg leading-7 font-medium tracking-[0.01em]">
                    {description}
                </p>

                <div className="mt-8 flex items-center justify-center gap-3">

                    <div className="w-12 h-px bg-[#d85c78]/70" />

                    <div className="w-1.5 h-1.5 rounded-full bg-[#d85c78] shadow-[0_0_14px_rgba(216,92,120,0.7)]" />

                    <div className="w-12 h-px bg-[#d85c78]/70" />

                </div>

            </div>

        </div>
    );
}