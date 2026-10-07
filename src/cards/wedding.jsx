import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Heart, Sparkles, Gem } from "lucide-react";

export default function WeddingCakeDetail({ frame }) {
    const showStart = 230;
    const showEnd = 270;
    const fadeOutEnd = 280;

    const fadeInProgress = Math.max(0, Math.min(1, (frame - showStart) / 25));
    const fadeOutProgress = Math.max(0, Math.min(1, (frame - showEnd) / (fadeOutEnd - showEnd)));

    const opacity =
        frame < showStart
            ? 0
            : frame <= showEnd
                ? fadeInProgress
                : 1 - fadeOutProgress;

    const enterX = 90 - fadeInProgress * 90;
    const exitX = fadeOutProgress * 90;

    const x = frame <= showEnd ? enterX : exitX;

    const enterScale = 0.95 + fadeInProgress * 0.05;
    const exitScale = 1 - fadeOutProgress * 0.04;
    const scale = frame <= showEnd ? enterScale : exitScale;

    const enterRotateY = 6 - fadeInProgress * 6;
    const exitRotateY = fadeOutProgress * 6;
    const rotateY = frame <= showEnd ? enterRotateY : exitRotateY;

    const y = fadeOutProgress * -15;

    return (
        <motion.section
            style={{
                opacity,
                x,
                y,
                scale,
                rotateY,
                perspective: "1800px",
                pointerEvents: opacity < 0.05 ? "none" : "auto"
            }}
            className="absolute inset-0 z-20 flex items-center justify-center lg:justify-end px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 overflow-hidden pointer-events-none"
        >
            <div className="relative w-full max-w-[570px] h-[60vh] max-h-[600px] min-h-[430px] ml-auto mr-0 lg:mr-[5%] xl:mr-[9%] pointer-events-none">

                {/* Rose depth */}
                <div className="absolute inset-x-[-9px] top-[10px] bottom-[-10px] rounded-[34px] bg-[#d9a0ae]/55 border border-white/70 shadow-[0_30px_80px_rgba(115,55,70,0.16)] rotate-[-1.5deg]" />

                {/* Champagne depth */}
                <div className="absolute inset-x-[-5px] top-[5px] bottom-[-5px] rounded-[32px] bg-[#fff6f3]/95 border border-white shadow-[0_20px_60px_rgba(115,55,70,0.1)] rotate-[1deg]" />

                {/* Main Card */}
                <div className="relative z-10 w-full h-full overflow-hidden rounded-[30px] border border-white/95 bg-gradient-to-br from-[#fffdfb] via-[#fff5f5] to-[#f0d5dc] shadow-[0_35px_100px_rgba(115,55,70,0.22)]">

                    {/* Gloss */}
                    <div className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white via-white/35 to-transparent pointer-events-none" />

                    {/* Rose glow */}
                    <div className="absolute top-[-120px] right-[-100px] w-[340px] h-[340px] rounded-full bg-[#d9a0ae]/25 blur-3xl pointer-events-none" />

                    {/* Champagne glow */}
                    <div className="absolute bottom-[-140px] left-[-100px] w-[320px] h-[320px] rounded-full bg-[#ead7c8]/30 blur-3xl pointer-events-none" />

                    {/* Wedding ring glow */}
                    <div className="absolute top-[65px] right-[40px] w-[190px] h-[190px] rounded-full bg-white/60 blur-2xl pointer-events-none" />

                    {/* Gloss line */}
                    <div className="absolute top-0 left-10 right-10 h-px bg-white" />

                    {/* Wedding Rings */}
                    <div className="absolute top-[65px] right-[48px] w-[170px] h-[120px] pointer-events-none opacity-80">

                        <div className="absolute left-[20px] top-[30px] w-[82px] h-[82px] rounded-full border-[7px] border-[#c88b9c] rotate-[-12deg] shadow-[0_8px_25px_rgba(130,65,85,0.14)]" />

                        <div className="absolute left-[68px] top-[18px] w-[82px] h-[82px] rounded-full border-[7px] border-[#e3c7b4] rotate-[12deg] shadow-[0_8px_25px_rgba(130,65,85,0.12)]" />

                        <div className="absolute left-[46px] top-[20px] w-3 h-3 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.95)]" />

                    </div>

                    {/* Tiny wedding sparkle */}
                    <Sparkles size={18} className="absolute top-[52px] right-[28px] text-[#d19aaa]/60" />

                    <div className="relative h-full px-7 sm:px-9 lg:px-10 py-8 flex flex-col">

                        {/* Header */}
                        <div className="flex items-center justify-between">

                            <div className="flex items-center gap-3">

                                <div className="w-10 h-10 rounded-full bg-white/80 border border-white shadow-[0_8px_22px_rgba(115,55,70,0.08)] flex items-center justify-center backdrop-blur-md">
                                    <Heart size={15} fill="currentColor" className="text-[#c88b9c]" />
                                </div>

                                <div>
                                    <div className="text-[#b27687] text-[8px] uppercase tracking-[0.3em] font-semibold">
                                        Wedding Collection
                                    </div>

                                    <div className="text-[#51343c] text-xs font-medium mt-1">
                                        Made For Forever
                                    </div>
                                </div>

                            </div>

                            <div className="text-[#c88b9c] text-[9px] uppercase tracking-[0.25em] font-semibold">
                                04 / 05
                            </div>

                        </div>

                        {/* Main */}
                        <div className="relative mt-8 flex-1 flex flex-col justify-center">

                            {/* Vertical Wedding */}
                            <div className="absolute right-[-2px] bottom-[15%] hidden sm:block select-none">
                                <span className="[writing-mode:vertical-rl] text-[#c88b9c]/15 text-[52px] tracking-[0.18em] font-serif">
                                    WEDDING
                                </span>
                            </div>

                            <div className="max-w-[430px]">

                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-px bg-[#c88b9c]/50" />

                                    <div className="text-[#b27687] text-[8px] uppercase tracking-[0.3em] font-semibold">
                                        The beginning of forever
                                    </div>
                                </div>

                                <h2 className="mt-4 font-serif text-[#51343c] text-4xl sm:text-[46px] lg:text-[54px] leading-[0.92] tracking-[-0.05em]">
                                    Made for
                                    <br />
                                    <span className="italic text-[#c88b9c]">
                                        your forever.
                                    </span>
                                </h2>

                                <p className="mt-6 max-w-[390px] text-[#765761] text-xs sm:text-sm leading-5">
                                    Elegant wedding cakes crafted with delicate
                                    details, beautiful finishes, and a little
                                    sweetness for the beginning of forever.
                                </p>

                            </div>

                            {/* Wedding detail */}
                            <div className="flex items-center gap-4 mt-7">

                                <div className="flex items-center gap-2">

                                    <div className="w-8 h-8 rounded-full bg-white/70 border border-white flex items-center justify-center shadow-[0_6px_18px_rgba(115,55,70,0.06)]">
                                        <Gem size={13} className="text-[#c88b9c]" />
                                    </div>

                                    <span className="text-[#9f6879] text-[8px] uppercase tracking-[0.22em]">
                                        Elegant
                                    </span>

                                </div>

                                <div className="w-px h-5 bg-[#c88b9c]/20" />

                                <span className="text-[#9f6879] text-[8px] uppercase tracking-[0.22em]">
                                    Personal · Unforgettable
                                </span>

                            </div>

                        </div>

                        {/* Bottom */}
                        <div className="flex items-center justify-between pt-5 border-t border-white/70">

                            <div>
                                <div className="text-[#a96578] text-[8px] uppercase tracking-[0.2em]">
                                    Simz Bakery
                                </div>

                                <div className="text-[#765761] text-[10px] mt-1">
                                    Crafted for your forever.
                                </div>
                            </div>

                            <button
                                onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                                className="group bg-[#51343c] text-white px-5 py-3 rounded-full flex items-center gap-3 text-[10px] font-semibold shadow-[0_10px_28px_rgba(81,52,60,0.18)] hover:bg-[#65414b] transition-all duration-300 pointer-events-auto"
                            >
                                Plan Your Cake

                                <span className="w-7 h-7 rounded-full bg-[#c88b9c] flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                                    <ArrowUpRight size={13} />
                                </span>
                            </button>

                        </div>

                    </div>
                </div>
            </div>
        </motion.section>
    );
}