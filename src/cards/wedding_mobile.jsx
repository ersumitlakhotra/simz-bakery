
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Heart, Sparkles, Gem } from "lucide-react";

export default function WeddingCakeDetailMobile({ frame }) {
    const showStart = 230;
    const showEnd = 270;
    const fadeOutEnd = 280;

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
                            <Heart
                                size={16}
                                fill="currentColor"
                                strokeWidth={1.5}
                            />
                        </div>

                        <div>
                            <div className="text-[9px] font-semibold uppercase tracking-[0.28em] text-pink-200">
                                Wedding Collection
                            </div>

                            <div className="mt-1 text-xs font-medium tracking-wide text-white/90">
                                Made For Forever
                            </div>
                        </div>
                    </div>

                    <div className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/70">
                        04 / 05
                    </div>
                </div>

                {/* Wedding Rings */}
                <div className="pointer-events-none absolute right-0 top-12 h-[105px] w-[135px] opacity-80">
                    <div className="absolute left-[10px] top-[25px] h-[68px] w-[68px] rotate-[-12deg] rounded-full border-[6px] border-[#c88b9c] shadow-[0_8px_25px_rgba(130,65,85,0.14)]" />

                    <div className="absolute left-[48px] top-[15px] h-[68px] w-[68px] rotate-[12deg] rounded-full border-[6px] border-[#e3c7b4] shadow-[0_8px_25px_rgba(130,65,85,0.12)]" />

                    <div className="absolute left-[31px] top-[17px] h-3 w-3 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.95)]" />
                </div>

                <Sparkles
                    size={16}
                    className="absolute right-0 top-10 text-pink-200/70"
                />

                {/* Main Content */}
                <div className="relative mt-8">
                    <div className="mb-3 flex items-center gap-3">
                        <span className="h-px w-7 bg-[#e8a6b8]" />

                        <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-pink-200">
                            The beginning of forever
                        </span>
                    </div>

                    <h2 className="font-serif text-[38px] leading-[1.08] font-light tracking-[-0.04em] text-white">
                        Made for
                        <br />
                        <span className="font-medium italic text-[#f0b7c7]">
                            your forever.
                        </span>
                    </h2>

                    <p className="mt-5 max-w-[300px] text-[13px] leading-[1.85] tracking-[0.01em] text-white/85">
                        Elegant wedding cakes crafted with delicate
                        details, beautiful finishes, and a little
                        sweetness for the beginning of forever.
                    </p>
                </div>

                {/* Wedding Details */}
                <div className="mt-7 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-black/15">
                            <Gem size={13} className="text-pink-200" />
                        </div>

                        <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-pink-200">
                            Elegant
                        </span>
                    </div>

                    <div className="h-5 w-px bg-white/30" />

                    <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/80">
                        Personal · Unforgettable
                    </span>
                </div>

                {/* Bottom */}
                <div className="mt-8 border-t border-white/25 pt-5">
                    <div className="mb-5">
                        <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-pink-200">
                            Simz Bakery
                        </div>

                        <div className="mt-1.5 text-[11px] tracking-wide text-white/75">
                            Crafted for your forever.
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
                        Plan Your Cake

                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d98fa5] text-white transition-transform duration-300 group-hover:rotate-45">
                            <ArrowUpRight size={15} />
                        </span>
                    </button>
                </div>
            </div>
        </motion.section>
    );
}
