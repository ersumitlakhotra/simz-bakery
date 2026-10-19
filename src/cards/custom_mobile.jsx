
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, WandSparkles } from "lucide-react";

export default function CustomCakeDetailMobile({ frame }) {
    const showStart = 80;
    const showEnd = 140;
    const fadeOutEnd = 160;

    const fadeInProgress = Math.max(
        0,
        Math.min(1, (frame - showStart) / 25)
    );

    const fadeOutProgress = Math.max(
        0,
        Math.min(1, (frame - showEnd) / (fadeOutEnd - showEnd))
    );

    const opacity =
        frame < showStart
            ? 0
            : frame <= showEnd
                ? fadeInProgress
                : 1 - fadeOutProgress;

    const enterX = -70 + fadeInProgress * 70;
    const exitX = fadeOutProgress * -70;
    const x = frame <= showEnd ? enterX : exitX;

    const enterScale = 0.98 + fadeInProgress * 0.02;
    const exitScale = 1 - fadeOutProgress * 0.02;
    const scale = frame <= showEnd ? enterScale : exitScale;

    const enterRotateY = -2 + fadeInProgress * 2;
    const exitRotateY = fadeOutProgress * 2;
    const rotateY = frame <= showEnd ? enterRotateY : exitRotateY;

    const exitY = fadeOutProgress * -10;

    return (
        <motion.section
            style={{
                opacity,
                x,
                y: exitY,
                scale,
                rotateY,
                pointerEvents: opacity < 0.05 ? "none" : "auto",
                perspective: "1800px",
            }}
            className="absolute inset-0 z-20 flex items-center px-6 py-8 md:hidden overflow-hidden"
        >
            {/* Subtle dark gradient for readability */}
            <div className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-full bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

            <div className="relative w-full max-w-sm text-white">
                {/* Header */}
                <div className="mb-7 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-black/15 text-pink-200">
                            <WandSparkles size={17} strokeWidth={1.5} />
                        </div>

                        <div>
                            <div className="text-[9px] font-semibold uppercase tracking-[0.28em] text-pink-200">
                                Custom Collection
                            </div>

                            <div className="mt-1 text-xs font-medium tracking-wide text-white/90">
                                Made Just For You
                            </div>
                        </div>
                    </div>

                    <div className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/70">
                        02 / 05
                    </div>
                </div>

                {/* Heading */}
                <div className="mt-8">
                    <div className="mb-3 flex items-center gap-3">
                        <span className="h-px w-7 bg-[#e8a6b8]" />

                        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-pink-200">
                            Your vision
                        </span>
                    </div>

                    <h2 className="font-serif text-[38px] leading-[1.08] font-light tracking-[-0.04em] text-white">
                        Create something
                        <br />
                        <span className="font-medium italic text-[#f0b7c7]">
                            uniquely yours.
                        </span>
                    </h2>

                    <p className="mt-5 max-w-[300px] text-[13px] leading-[1.9] tracking-[0.01em] text-white/85">
                        Choose the flavour, colour, size and design.
                        We turn your ideas into a beautiful cake made
                        especially for your celebration.
                    </p>
                </div>

                {/* Options */}
                <div className="mt-7 grid grid-cols-3 gap-3">
                    <div className="border-t border-white/45 pt-3">
                        <div className="text-[9px] font-semibold tracking-[0.18em] text-pink-200">
                            01
                        </div>

                        <div className="mt-2 text-xs font-semibold text-white">
                            Flavour
                        </div>

                        <div className="mt-1 text-[10px] leading-4 text-white/65">
                            Your favourite
                        </div>
                    </div>

                    <div className="border-t border-white/45 pt-3">
                        <div className="text-[9px] font-semibold tracking-[0.18em] text-pink-200">
                            02
                        </div>

                        <div className="mt-2 text-xs font-semibold text-white">
                            Design
                        </div>

                        <div className="mt-1 text-[10px] leading-4 text-white/65">
                            Your vision
                        </div>
                    </div>

                    <div className="border-t border-white/45 pt-3">
                        <div className="text-[9px] font-semibold tracking-[0.18em] text-pink-200">
                            03
                        </div>

                        <div className="mt-2 text-xs font-semibold text-white">
                            Finish
                        </div>

                        <div className="mt-1 text-[10px] leading-4 text-white/65">
                            Every detail
                        </div>
                    </div>
                </div>

               {/* Bottom */}
                <div className="mt-8 border-t border-white/25 pt-5">
                    <div className="mb-5">
                        <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-pink-200">
                            Simz Bakery
                        </div>

                        <div className="mt-1.5 text-[11px] tracking-wide text-white/75">
                            Designed around you.
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            document
                                .getElementById("booking")
                                ?.scrollIntoView({ behavior: "smooth" })
                        }
                        className="group pointer-events-auto inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-xs font-medium text-[#51343c] shadow-[0_15px_45px_rgba(0,0,0,0.22)] transition-all duration-300 hover:bg-[#f3d7de]"
                    >
                        Start Creating

                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d98fa5] text-white transition-transform duration-300 group-hover:rotate-45">
                            <ArrowUpRight size={15} />
                        </span>
                    </button>
                </div>
            </div>
        </motion.section>
    );
}
