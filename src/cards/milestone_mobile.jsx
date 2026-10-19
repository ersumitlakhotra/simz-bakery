
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Heart, Sparkles } from "lucide-react";

export default function MilestoneDetailMobile({ frame }) {
    const showStart = 160;
    const showEnd = 220;
    const fadeOutEnd = 230;

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
            className="absolute inset-0 z-20 flex items-center overflow-hidden px-6 py-8 md:hidden"
        >
            {/* Premium dark gradient background */}
            <div className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-full bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

            <div className="relative w-full max-w-sm text-white">
                {/* Header */}
                <div className="mb-7 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-black/15 text-pink-200">
                            <Heart
                                size={16}
                                fill="currentColor"
                                strokeWidth={1.5}
                            />
                        </div>

                        <div>
                            <div className="text-[9px] font-semibold uppercase tracking-[0.28em] text-pink-200">
                                Milestone Collection
                            </div>

                            <div className="mt-1 text-xs font-medium tracking-wide text-white/90">
                                Celebrate Something Beautiful
                            </div>
                        </div>
                    </div>

                    <Sparkles size={16} className="text-pink-200" />
                </div>

                {/* Main Content */}
                <div className="mt-8">
                    <div className="mb-3 flex items-center gap-3">
                        <span className="h-px w-7 bg-[#e8a6b8]" />

                        <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-pink-200">
                            Every chapter deserves a cake
                        </span>
                    </div>

                    <h2 className="font-serif text-[36px] leading-[1.08] font-light tracking-[-0.04em] text-white">
                        Celebrate
                        <br />
                        <span className="font-medium italic text-[#f0b7c7]">
                            how far you've come.
                        </span>
                    </h2>

                    <p className="mt-5 max-w-[300px] text-[13px] leading-[1.85] tracking-[0.01em] text-white/85">
                        From first steps to unforgettable achievements,
                        create something beautiful for the moments
                        that deserve to be remembered.
                    </p>
                </div>

                {/* Center Ribbon */}
                <div className="mt-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/30" />

                    <span className="text-center text-[8px] font-semibold uppercase tracking-[0.16em] text-pink-200">
                        A moment worth celebrating
                    </span>

                    <div className="h-px flex-1 bg-white/30" />
                </div>

                {/* Details */}
                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-3">
                    <span className="text-[10px] font-medium tracking-wide text-white/85">
                        <span className="mr-2 text-pink-200">✦</span>
                        New Beginnings
                    </span>

                    <span className="text-[10px] font-medium tracking-wide text-white">
                        <span className="mr-2 text-pink-200">✦</span>
                        Big Achievements
                    </span>

                    <span className="text-[10px] font-medium tracking-wide text-white/85">
                        <span className="mr-2 text-pink-200">✦</span>
                        Special Moments
                    </span>
                </div>

                {/* Bottom */}
                <div className="mt-8 border-t border-white/25 pt-5">
                    <div className="mb-5">
                        <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-pink-200">
                            Simz Bakery
                        </div>

                        <div className="mt-1.5 text-[11px] tracking-wide text-white/75">
                            Made for your moment.
                        </div>
                    </div>

                    <button
                        onClick={() =>
                            document
                                .getElementById("booking")
                                ?.scrollIntoView({
                                    behavior: "smooth"
                                })
                        }
                        className="group bg-white text-[#3a2528] px-5 sm:px-7 py-3.5 sm:py-4 rounded-full flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-medium hover:bg-[#f3d7de] transition-all duration-300 shadow-[0_15px_45px_rgba(0,0,0,0.22)]"
                    >
                        Create Yours
                        <span className="w-7 h-7 rounded-full bg-[#d98fa5] text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300 shrink-0">
                            <ArrowUpRight size={15} />
                        </span>
                    </button>
                </div>
            </div>
        </motion.section>
    );
}
