import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Heart, Sparkles } from "lucide-react";

export default function MilestoneCakeDetail({ frame }) {
    const showStart = 160;
    const showEnd = 220;
    const fadeOutEnd = 230;

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

    const enterScale = 0.96 + fadeInProgress * 0.04;
    const exitScale = 1 - fadeOutProgress * 0.04;
    const scale = frame <= showEnd ? enterScale : exitScale;

    const enterRotateY = 7 - fadeInProgress * 7;
    const exitRotateY = fadeOutProgress * 7;
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
            <div className="relative w-full max-w-[570px] h-[70vh] max-h-[700px] min-h-[430px] ml-auto mr-0 lg:mr-[5%] xl:mr-[9%] pointer-events-none">

                {/* 3D Back Layer */}
                <div className="absolute inset-x-[-9px] top-[10px] bottom-[-10px] rounded-[32px] bg-[#d98fa5]/25 border border-white/40 shadow-[0_25px_70px_rgba(100,45,65,0.16)] rotate-[1.5deg]" />

                {/* Depth Layer */}
                <div className="absolute inset-x-[-5px] top-[5px] bottom-[-5px] rounded-[30px] bg-[#f7dce4]/80 border border-white/70 shadow-[0_20px_55px_rgba(100,45,65,0.1)] rotate-[-1deg]" />

                {/* Main Glossy Card */}
                <div className="relative z-10 w-full h-full overflow-hidden rounded-[30px] border border-white/80 bg-gradient-to-br from-[#fffafd] via-[#fcebf1] to-[#f5d5df] shadow-[0_30px_80px_rgba(100,45,65,0.2)]">

                    {/* Gloss */}
                    <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/90 via-white/30 to-transparent pointer-events-none" />

                    {/* Pearl Reflection */}
                    <div className="absolute top-[-120px] right-[-100px] w-[300px] h-[300px] rounded-full bg-white/60 blur-3xl pointer-events-none" />

                    {/* Pink Reflection */}
                    <div className="absolute bottom-[-120px] left-[-100px] w-[280px] h-[280px] rounded-full bg-[#d98fa5]/15 blur-3xl pointer-events-none" />

                    <div className="relative h-full px-7 sm:px-9 lg:px-10 py-7 sm:py-8 flex flex-col">

                        {/* Header */}
                        <div className="flex items-center justify-between">

                            <div className="flex items-center gap-3">

                                <div className="w-9 h-9 rounded-full bg-white/80 border border-white shadow-[0_7px_20px_rgba(100,45,65,0.07)] flex items-center justify-center">
                                    <Heart size={14} fill="currentColor" className="text-[#d98fa5]" />
                                </div>

                                <div>
                                    <div className="text-[#b27a8b] text-[8px] uppercase tracking-[0.28em] font-semibold">
                                        Milestone Collection
                                    </div>

                                    <div className="text-[#4d3038] text-xs font-medium mt-1">
                                        Celebrate Something Beautiful
                                    </div>
                                </div>

                            </div>

                            <Sparkles size={15} className="text-[#d98fa5]" />

                        </div>

                        {/* Main Content */}
                        <div className="mt-7">

                            <div className="text-[#b27a8b] text-[8px] uppercase tracking-[0.3em] font-semibold">
                                Every chapter deserves a cake
                            </div>

                            <h2 className="mt-3 font-serif text-[#4d3038] text-4xl sm:text-[44px] lg:text-[50px] leading-[0.9] tracking-[-0.05em]">
                                Celebrate
                                <br />
                                <span className="italic text-[#d98fa5]">
                                    how far you've come.
                                </span>
                            </h2>

                            <p className="mt-5 max-w-[420px] text-[#765761] text-xs sm:text-sm leading-5">
                                From first steps to unforgettable achievements,
                                create something beautiful for the moments
                                that deserve to be remembered.
                            </p>

                        </div>

                        {/* Center Ribbon */}
                        <div className="mt-6 flex items-center gap-3">

                            <div className="h-px flex-1 bg-[#d98fa5]/20" />

                            <span className="px-3 py-1.5 rounded-full bg-white/70 border border-white text-[#a96578] text-[8px] uppercase tracking-[0.2em] font-semibold shadow-[0_5px_15px_rgba(100,45,65,0.04)]">
                                A moment worth celebrating
                            </span>

                            <div className="h-px flex-1 bg-[#d98fa5]/20" />

                        </div>

                        {/* Details */}
                        <div className="flex flex-wrap gap-2 mt-5">

                            <div className="px-3.5 py-2 rounded-full bg-white/65 border border-white text-[#68434d] text-[9px] shadow-[0_5px_15px_rgba(100,45,65,0.04)]">
                                New Beginnings
                            </div>

                            <div className="px-3.5 py-2 rounded-full bg-[#d98fa5] text-white text-[9px] shadow-[0_7px_18px_rgba(217,143,165,0.2)]">
                                Big Achievements
                            </div>

                            <div className="px-3.5 py-2 rounded-full bg-white/65 border border-white text-[#68434d] text-[9px] shadow-[0_5px_15px_rgba(100,45,65,0.04)]">
                                Special Moments
                            </div>

                        </div>

                        {/* Bottom */}
                        <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/60">

                            <div>
                                <div className="text-[#a96578] text-[8px] uppercase tracking-[0.2em]">
                                    Simz Bakery
                                </div>

                                <div className="text-[#765761] text-[10px] mt-1">
                                    Made for your moment.
                                </div>
                            </div>

                            <button
                                onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                                className="group bg-[#4d3038] text-white px-4 py-2.5 rounded-full flex items-center gap-2.5 text-[10px] font-semibold shadow-[0_10px_25px_rgba(77,48,56,0.16)] hover:bg-[#603b45] transition-all duration-300 pointer-events-auto"
                            >
                                Create Yours

                                <span className="w-6 h-6 rounded-full bg-[#d98fa5] flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                                    <ArrowUpRight size={12} />
                                </span>
                            </button>

                        </div>

                    </div>
                </div>

            </div>
        </motion.section>
    );
}