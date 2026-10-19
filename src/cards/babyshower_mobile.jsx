
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Baby, Sparkles } from "lucide-react";

export default function BabyShowerCakeDetailMobile({ frame }) {
    const showStart = 280;
    const showEnd = 330;
    const fadeOutEnd = 340;

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

    const y = fadeOutProgress * -10;

    return (
        <motion.section
            style={{
                opacity,
                x,
                y,
                scale,
                rotateY,
                perspective: "1800px",
                pointerEvents: opacity < 0.05 ? "none" : "auto",
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
                            <Baby size={17} strokeWidth={1.5} />
                        </div>

                        <div>
                            <div className="text-[9px] font-semibold uppercase tracking-[0.28em] text-pink-200">
                                Baby Shower Collection
                            </div>

                            <div className="mt-1 text-xs font-medium tracking-wide text-white/90">
                                A Little Love Is Coming
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Sparkles size={14} className="text-pink-200" />

                        <div className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/70">
                            05 / 05
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative mt-8">
                    <div className="mb-3 flex items-center gap-3">
                        <span className="h-px w-7 bg-[#e8a6b8]" />

                        <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-pink-200">
                            A little love is on the way
                        </span>
                    </div>

                    <h2 className="font-serif text-[35px] leading-[1.08] font-light tracking-[-0.04em] text-white">
                        Sweet beginnings,
                        <br />
                        <span className="font-medium italic text-[#f0b7c7]">
                            beautiful memories.
                        </span>
                    </h2>

                    <p className="mt-5 max-w-[300px] text-[13px] leading-[1.85] tracking-[0.01em] text-white/85">
                        Celebrate the arrival of something wonderful
                        with a beautifully handcrafted cake made
                        for the sweetest new chapter.
                    </p>
                </div>

                {/* Center Divider */}
                <div className="mt-7 flex items-center gap-3">
                    <div className="h-px w-10 bg-white/35" />

                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-pink-200">
                            For every little one
                        </span>

                        <span className="h-1 w-1 rounded-full bg-[#d98fa5]" />
                    </div>
                </div>

                {/* Tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                    <div className="rounded-full border border-white/30 bg-white/10 px-3.5 py-2 text-[10px] font-medium text-white/90 backdrop-blur-md">
                        Baby Boy
                    </div>

                    <div className="rounded-full border border-[#d98fa5]/60 bg-[#d98fa5]/20 px-3.5 py-2 text-[10px] font-medium text-pink-100 backdrop-blur-md">
                        Baby Girl
                    </div>

                    <div className="rounded-full border border-white/30 bg-white/10 px-3.5 py-2 text-[10px] font-medium text-white/90 backdrop-blur-md">
                        Custom Designs
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 border-t border-white/25 pt-5">
                    <div className="mb-5">
                        <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-pink-200">
                            Simz Bakery
                        </div>

                        <div className="mt-1.5 text-[11px] tracking-wide text-white/75">
                            Sweetness for a new beginning.
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
                        Create Your Cake

                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d98fa5] text-white transition-transform duration-300 group-hover:rotate-45">
                            <ArrowUpRight size={15} />
                        </span>
                    </button>
                </div>
            </div>
        </motion.section>
    );
}
