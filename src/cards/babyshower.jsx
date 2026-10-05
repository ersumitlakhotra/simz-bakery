import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Baby, Sparkles } from "lucide-react";

export default function BabyShowerCakeDetail({ frame }) {
    const showStart = 800;
    const showEnd = 850;
    const fadeOutEnd = 880;

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
            <div className="relative w-full max-w-[570px] h-[70vh] max-h-[700px] min-h-[500px] ml-auto mr-0 lg:mr-[5%] xl:mr-[9%] pointer-events-none">

                {/* Back depth */}
                <div className="absolute inset-x-[-10px] top-[12px] bottom-[-12px] rounded-[36px] bg-gradient-to-br from-[#d9edf4]/70 via-white/80 to-[#f2d6df]/70 border border-white/70 shadow-[0_30px_90px_rgba(80,70,90,0.15)] rotate-[1.4deg]" />

                <div className="absolute inset-x-[-5px] top-[5px] bottom-[-5px] rounded-[34px] bg-white/80 border border-white shadow-[0_20px_65px_rgba(80,70,90,0.1)] rotate-[-0.8deg]" />

                {/* Main card */}
                <div className="relative z-10 w-full h-full overflow-hidden rounded-[32px] border border-white/90 shadow-[0_35px_110px_rgba(65,65,80,0.2)]">

                    {/* Diagonal blue + pink base */}
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,#dceff6_0%,#dceff6_45%,#f8e7ed_55%,#f4d4df_100%)]" />

                    {/* Soft white diagonal blend */}
                    <div className="absolute inset-[-20%] bg-[linear-gradient(125deg,transparent_38%,rgba(255,255,255,0.72)_48%,rgba(255,255,255,0.3)_53%,transparent_64%)] pointer-events-none" />

                    {/* Blue ambient glow */}
                    <div className="absolute top-[-160px] left-[-130px] w-[400px] h-[400px] rounded-full bg-[#a9d5e3]/35 blur-3xl pointer-events-none" />

                    {/* Pink ambient glow */}
                    <div className="absolute bottom-[-150px] right-[-120px] w-[400px] h-[400px] rounded-full bg-[#e6aabd]/30 blur-3xl pointer-events-none" />

                    {/* Glossy top reflection */}
                    <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/85 via-white/25 to-transparent pointer-events-none" />

                    {/* Diagonal glass reflection */}
                    <div className="absolute top-[-20%] left-[42%] w-[18%] h-[150%] rotate-[22deg] bg-white/20 blur-xl pointer-events-none" />

                    {/* Small floating glossy dots */}
                    <div className="absolute top-[18%] right-[15%] w-2 h-2 rounded-full bg-white/70 shadow-[0_0_15px_rgba(255,255,255,0.9)]" />

                    <div className="absolute top-[23%] right-[11%] w-1.5 h-1.5 rounded-full bg-[#d98fa5]/60" />

                    <div className="absolute bottom-[25%] left-[12%] w-2 h-2 rounded-full bg-white/70 shadow-[0_0_15px_rgba(255,255,255,0.9)]" />

                    <div className="relative h-full px-7 sm:px-9 lg:px-10 py-9 flex flex-col">

                        {/* Header */}
                        <div className="flex items-center justify-between">

                            <div className="flex items-center gap-3">

                                <div className="w-11 h-11 rounded-full bg-white/75 border border-white/90 shadow-[0_10px_25px_rgba(70,90,100,0.1)] flex items-center justify-center backdrop-blur-md">
                                    <Baby size={17} className="text-[#729eac]" />
                                </div>

                                <div>
                                    <div className="text-[#7198a3] text-[8px] uppercase tracking-[0.3em] font-semibold">
                                        Baby Shower Collection
                                    </div>

                                    <div className="text-[#465d64] text-xs font-medium mt-1">
                                        A Little Love Is Coming
                                    </div>
                                </div>

                            </div>

                            <div className="flex items-center gap-3">
                                <Sparkles size={14} className="text-[#d98fa5]" />

                                <div className="text-[#7898a1] text-[9px] uppercase tracking-[0.25em] font-semibold">
                                    05 / 05
                                </div>
                            </div>

                        </div>

                        {/* Main content */}
                        <div className="relative flex-1 flex flex-col justify-center mt-8">

                            {/* Decorative vertical text */}
                            <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 hidden sm:block select-none">
                                <span className="[writing-mode:vertical-rl] text-white/35 text-[52px] tracking-[0.18em] font-serif">
                                    BABY
                                </span>
                            </div>

                            <div className="max-w-[450px]">

                                <div className="text-[#6e98a5] text-[8px] uppercase tracking-[0.3em] font-semibold">
                                    A little love is on the way
                                </div>

                                <h2 className="mt-4 font-serif text-[#40565d] text-4xl sm:text-[47px] lg:text-[56px] leading-[0.9] tracking-[-0.05em]">
                                    Sweet beginnings,
                                    <br />
                                    <span className="italic bg-gradient-to-r from-[#719fad] via-[#d98fa5] to-[#d98fa5] bg-clip-text text-transparent">
                                        beautiful memories.
                                    </span>
                                </h2>

                                <p className="mt-6 max-w-[400px] text-[#5e7075] text-xs sm:text-sm leading-5">
                                    Celebrate the arrival of something wonderful
                                    with a beautifully handcrafted cake made
                                    for the sweetest new chapter.
                                </p>

                            </div>

                            {/* Center divider */}
                            <div className="flex items-center gap-4 mt-8">

                                <div className="w-14 h-px bg-[#719fad]/45" />

                                <div className="flex items-center gap-2">
                                    <span className="text-[#719fad] text-[8px] uppercase tracking-[0.2em]">
                                        For every little one
                                    </span>

                                    <span className="w-1 h-1 rounded-full bg-[#d98fa5]" />
                                </div>

                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mt-6">

                                <div className="px-3.5 py-2 rounded-full bg-white/65 border border-white/90 text-[#526970] text-[9px] shadow-[0_7px_20px_rgba(70,90,100,0.06)] backdrop-blur-md">
                                    Baby Boy
                                </div>

                                <div className="px-3.5 py-2 rounded-full bg-[#719fad] text-white text-[9px] shadow-[0_8px_22px_rgba(113,159,173,0.2)]">
                                    Baby Girl
                                </div>

                                <div className="px-3.5 py-2 rounded-full bg-white/65 border border-white/90 text-[#725761] text-[9px] shadow-[0_7px_20px_rgba(100,45,65,0.05)] backdrop-blur-md">
                                    Custom Designs
                                </div>

                            </div>

                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-6 border-t border-white/70">

                            <div>
                                <div className="text-[#7299a4] text-[8px] uppercase tracking-[0.2em]">
                                    Simz Bakery
                                </div>

                                <div className="text-[#647277] text-[10px] mt-1">
                                    Sweetness for a new beginning.
                                </div>
                            </div>

                            <button
                                onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                                className="group bg-[#40565d] text-white px-5 py-3 rounded-full flex items-center gap-3 text-[10px] font-semibold shadow-[0_10px_28px_rgba(64,86,93,0.18)] hover:bg-[#526e76] transition-all duration-300 pointer-events-auto"
                            >
                                Create Your Cake

                                <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#719fad] to-[#d98fa5] flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
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