import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CakeSlice, Sparkles } from "lucide-react";

export default function BirthdayCakeDetail({ frame }) {
    const showStart = 20;
    const showEnd = 60;
    const fadeOutEnd = 80;

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

    const enterX = 80 - fadeInProgress * 80;
    const exitX = fadeOutProgress * 80;

    const x = frame <= showEnd ? enterX : exitX;

    const enterScale = 0.94 + fadeInProgress * 0.06;
    const exitScale = 1 - fadeOutProgress * 0.04;

    const scale =
        frame <= showEnd
            ? enterScale
            : exitScale;

    const enterRotateY = 8 - fadeInProgress * 8;
    const exitRotateY = fadeOutProgress * -6;

    const rotateY =
        frame <= showEnd
            ? enterRotateY
            : exitRotateY;

    const exitY = fadeOutProgress * -25;

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
            className="absolute inset-0 z-20 pointer-events-none overflow-hidden bg-transparent"
        >
            <div className="relative w-full min-h-screen px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-28 sm:pt-32 pb-20 flex items-center justify-center lg:justify-end">
                
                <div
                    className="relative w-full max-w-[560px] mr-0 lg:mr-[5%] xl:mr-[9%]"
                    style={{ perspective: "1800px" }}
                >
                    
                    {/* Ambient Glow */}
                    <div className="absolute -inset-24 rounded-full bg-[#d98fa5]/10 blur-[110px] pointer-events-none" />

                    {/* Ground Shadow */}
                    <motion.div
                        animate={{
                            scaleX: [1, 0.94, 1],
                            opacity: [0.32, 0.22, 0.32]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute bottom-[-45px] left-[12%] right-[8%] h-16 rounded-full bg-black/50 blur-3xl"
                    />

                    {/* Deep 3D Layer */}
                    <div className="absolute inset-0 translate-x-[20px] translate-y-[23px] rounded-[32px] bg-[#8f5968]/35" />

                    {/* Secondary Depth */}
                    <div className="absolute inset-0 translate-x-[11px] translate-y-[14px] rounded-[32px] bg-white/10 border border-white/10" />

                    {/* Main Card */}
                    <motion.div
                        animate={{
                            y: [0, -5, 0],
                            rotateX: [0, 0.5, 0]
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            transformStyle: "preserve-3d"
                        }}
                        className="relative min-h-[410px] rounded-[32px] border border-white/30 bg-[#fffafc]/95 backdrop-blur-2xl shadow-[0_35px_100px_rgba(0,0,0,0.32)] overflow-visible"
                    >

                        {/* Premium Shine */}
                        <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-white/90 via-transparent to-[#f3d7de]/30 pointer-events-none" />

                        {/* Top Highlight */}
                        <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-[#d98fa5]/70 to-transparent" />

                        {/* Decorative Glow */}
                        <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full bg-[#d98fa5]/10 blur-3xl" />

                        {/* Header */}
                        <div className="absolute top-8 left-9 sm:left-10 flex items-center gap-3">
                            
                            <div className="w-9 h-9 rounded-full bg-[#d98fa5]/15 border border-[#d98fa5]/25 flex items-center justify-center">
                                <CakeSlice
                                    size={15}
                                    className="text-[#b96d82]"
                                />
                            </div>

                            <div>
                                <div className="text-[#6f5158]/55 text-[9px] uppercase tracking-[0.3em]">
                                    The Celebration
                                </div>

                                <div className="text-[#3a2528] text-xs font-medium mt-0.5">
                                    Birthday Collection
                                </div>
                            </div>

                        </div>

                        {/* Sparkle */}
                        <Sparkles
                            size={18}
                            className="absolute top-9 right-9 text-[#d98fa5]/60"
                        />

                        {/* Main Content */}
                        <div className="relative z-10 p-9 sm:p-10 min-h-[410px] flex flex-col justify-center">
                            
                            <div className="max-w-[410px]">
                                
                                {/* Divider */}
                                <div className="w-12 h-px bg-[#d98fa5] mb-6" />

                                {/* Heading */}
                                <h2 className="font-serif text-[#3a2528] text-5xl sm:text-6xl leading-[0.92] tracking-[-0.04em]">
                                    Birthday
                                    <br />
                                    <span className="italic text-[#c87991]">
                                        Cake.
                                    </span>
                                </h2>

                                {/* Description */}
                                <p className="mt-7 text-[#6f5158]/75 text-sm md:text-[15px] leading-6 max-w-[390px]">
                                    Beautifully handcrafted birthday cakes made
                                    to turn every celebration into a moment
                                    worth remembering.
                                </p>

                                {/* Feature Tags */}
                                <div className="flex flex-wrap gap-2.5 mt-7">
                                    
                                    <span className="px-3.5 py-2 rounded-full bg-white border border-[#d98fa5]/30 text-[#5b3d44] text-[10px] font-medium uppercase tracking-[0.1em] shadow-[0_4px_15px_rgba(80,40,50,0.06)]">
                                        Custom Designs
                                    </span>

                                    <span className="px-3.5 py-2 rounded-full bg-white border border-[#d98fa5]/30 text-[#5b3d44] text-[10px] font-medium uppercase tracking-[0.1em] shadow-[0_4px_15px_rgba(80,40,50,0.06)]">
                                        Freshly Baked
                                    </span>

                                </div>

                                {/* Create Button */}
                                <button
                                    onClick={() =>
                                        document
                                            .getElementById("booking")
                                            ?.scrollIntoView({
                                                behavior: "smooth"
                                            })
                                    }
                                    className="group mt-8 bg-white text-[#3a2528] px-5 py-3 rounded-full flex items-center gap-3 text-xs font-semibold shadow-[0_12px_30px_rgba(0,0,0,0.14)] border border-[#eadde1] hover:bg-[#fdf3f6] hover:shadow-[0_16px_35px_rgba(0,0,0,0.18)] transition-all duration-300 pointer-events-auto"
                                >
                                    <span>
                                        Create Your Cake
                                    </span>

                                    <span className="w-7 h-7 rounded-full bg-[#d98fa5] text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                                        <ArrowUpRight size={14} />
                                    </span>
                                </button>

                            </div>

                            {/* Bottom Detail */}
                            <div className="absolute bottom-8 right-9 sm:right-10 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#d98fa5]" />

                                    <span className="text-[#6f5158]/60 text-[9px] uppercase tracking-[0.2em]">
                                        Your sweetest moments
                                    </span>
                                </div>
                            </div>

                        </div>

                        {/* Made With Love Badge */}
                        <motion.div
                            animate={{
                                y: [0, -4, 0]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            style={{
                                transform: "translateZ(100px)"
                            }}
                            className="absolute z-30 top-[102px] right-8 sm:right-9 px-3.5 py-2.5 rounded-2xl bg-white/95 border border-[#eadde1] shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#d98fa5] shadow-[0_0_10px_rgba(217,143,165,0.7)]" />

                                <span className="text-[#3a2528] text-[9px] font-semibold uppercase tracking-[0.12em]">
                                    Made with love
                                </span>
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}