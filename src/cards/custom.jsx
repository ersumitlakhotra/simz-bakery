import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, WandSparkles } from "lucide-react";

export default function CustomCakeDetail({ frame }) {
    const showStart = 580;
    const showEnd = 640;
    const fadeOutEnd = 670;

    const fadeInProgress = Math.max(0, Math.min(1, (frame - showStart) / 25));
    const fadeOutProgress = Math.max(0, Math.min(1, (frame - showEnd) / (fadeOutEnd - showEnd)));

    const opacity =
        frame < showStart
            ? 0
            : frame <= showEnd
                ? fadeInProgress
                : 1 - fadeOutProgress;

    const enterX = -70 + fadeInProgress * 70;
    const exitX = fadeOutProgress * -70;
    const x = frame <= showEnd ? enterX : exitX;

    const enterScale = 0.96 + fadeInProgress * 0.04;
    const exitScale = 1 - fadeOutProgress * 0.03;
    const scale = frame <= showEnd ? enterScale : exitScale;

    const enterRotateY = -5 + fadeInProgress * 5;
    const exitRotateY = fadeOutProgress * 5;
    const rotateY = frame <= showEnd ? enterRotateY : exitRotateY;

    const exitY = fadeOutProgress * -20;

    return (
        <motion.section
            style={{
                opacity,
                x,
                y: exitY,
                scale,
                rotateY,
                pointerEvents: opacity < 0.05 ? "none" : "auto",
                perspective: "1800px"
            }}
            className="absolute inset-0 z-20 flex items-center justify-center lg:justify-end px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 overflow-hidden pointer-events-none"
        >
            {/* Right Side */}
            <div className="relative w-full max-w-[570px] ml-auto mr-0 lg:mr-[5%] xl:mr-[9%] pointer-events-none">

                {/* Soft Shadow Layer */}
                <div className="absolute inset-x-[-12px] top-[14px] bottom-[-12px] rounded-[34px] bg-[#3a2528]/25 blur-[2px] rotate-[-1.5deg]" />

                {/* 3D Depth Layer */}
                <div className="absolute inset-x-[-6px] top-[7px] bottom-[-7px] rounded-[32px] bg-[#f2dfe4] border border-white/50 shadow-[0_25px_70px_rgba(45,25,30,0.18)] rotate-[1deg]" />

                {/* Main Glossy Card */}
                <div className="relative z-10 overflow-hidden rounded-[30px] border border-white/70 bg-[#fffafc]/95 backdrop-blur-2xl shadow-[0_30px_90px_rgba(45,25,30,0.22)]">

                    {/* Gloss Highlight */}
                    <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/80 via-white/20 to-transparent pointer-events-none" />

                    {/* Soft Pink Reflection */}
                    <div className="absolute top-[-100px] right-[-80px] w-[260px] h-[260px] rounded-full bg-[#f3b8c8]/15 blur-3xl pointer-events-none" />

                    {/* Fine Pink Edge */}
                    <div className="absolute left-0 top-8 bottom-8 w-[3px] rounded-full bg-[#d98fa5]" />

                    <div className="relative px-7 sm:px-9 lg:px-10 py-9">

                        {/* Header */}
                        <div className="flex items-center justify-between">

                            <div className="flex items-center gap-3">

                                <div className="w-10 h-10 rounded-full bg-[#3a2528] text-white flex items-center justify-center shadow-[0_8px_22px_rgba(58,37,40,0.18)]">
                                    <WandSparkles size={16} />
                                </div>

                                <div>
                                    <div className="text-[#a27b84] text-[9px] uppercase tracking-[0.25em] font-semibold">
                                        Custom Collection
                                    </div>

                                    <div className="text-[#3a2528] text-sm font-medium mt-1">
                                        Made Just For You
                                    </div>
                                </div>

                            </div>

                            <div className="text-[#d98fa5] text-[10px] uppercase tracking-[0.2em] font-semibold">
                                02 / 05
                            </div>

                        </div>

                        {/* Heading */}
                        <div className="mt-10">

                            <div className="text-[#a27b84] text-[9px] uppercase tracking-[0.3em] font-semibold">
                                Your vision
                            </div>

                            <h2 className="mt-3 font-serif text-[#3a2528] text-4xl sm:text-5xl lg:text-[55px] leading-[0.94] tracking-[-0.045em]">
                                Create something
                                <br />
                                <span className="italic text-[#d98fa5]">
                                    uniquely yours.
                                </span>
                            </h2>

                            <p className="mt-6 max-w-[440px] text-[#725a60] text-sm sm:text-[15px] leading-6">
                                Choose the flavour, colour, size and design.
                                We turn your ideas into a beautiful cake made
                                especially for your celebration.
                            </p>

                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-3 gap-3 mt-8">

                            <div className="rounded-2xl bg-white/80 border border-[#eadde1] px-4 py-4 shadow-[0_8px_25px_rgba(60,35,40,0.05)]">
                                <div className="text-[#d98fa5] text-[9px] uppercase tracking-[0.18em] font-semibold">
                                    01
                                </div>

                                <div className="mt-2 text-[#3a2528] text-sm font-semibold">
                                    Flavour
                                </div>

                                <div className="mt-1 text-[#9a7c83] text-[10px]">
                                    Your favourite
                                </div>
                            </div>   
                            
                            <div className="rounded-2xl bg-white/80 border border-[#eadde1] px-4 py-4 shadow-[0_8px_25px_rgba(60,35,40,0.05)]">
                                <div className="text-[#d98fa5] text-[9px] uppercase tracking-[0.18em] font-semibold">
                                    02
                                </div>

                                <div className="mt-2 text-[#3a2528] text-sm font-semibold">
                                    Design
                                </div>

                                <div className="mt-1 text-[#9a7c83] text-[10px]">
                                    Your vision
                                </div>
                            </div>

                     

                            <div className="rounded-2xl bg-white/80 border border-[#eadde1] px-4 py-4 shadow-[0_8px_25px_rgba(60,35,40,0.05)]">
                                <div className="text-[#d98fa5] text-[9px] uppercase tracking-[0.18em] font-semibold">
                                    03
                                </div>

                                <div className="mt-2 text-[#3a2528] text-sm font-semibold">
                                    Finish
                                </div>

                                <div className="mt-1 text-[#9a7c83] text-[10px]">
                                    Every detail
                                </div>
                            </div>

                        </div>

                        {/* Bottom */}
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#eadde1]">

                            <span className="text-[#9a7c83] text-[10px] uppercase tracking-[0.18em]">
                                Designed around you
                            </span>

                            <button
                                onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                                className="group bg-[#3a2528] text-white px-5 py-3 rounded-full flex items-center gap-3 text-xs font-semibold shadow-[0_10px_25px_rgba(58,37,40,0.18)] hover:bg-[#4a3037] transition-all duration-300 pointer-events-auto"
                            >
                                Start Creating

                                <span className="w-7 h-7 rounded-full bg-[#d98fa5] flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                                    <ArrowUpRight size={14} />
                                </span>
                            </button>

                        </div>

                    </div>
                </div>

                {/* Very subtle floating animation */}
                <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 pointer-events-none"
                />

            </div>
        </motion.section>
    );
}