
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Star, Sparkles } from "lucide-react";

export default function Hero({ frame }) {

    const fadeStart = 5;
    const fadeEnd = 30;

    const progress = Math.max(
        0,
        Math.min(1, (frame - fadeStart) / (fadeEnd - fadeStart))
    );

    const opacity = 1 - progress;
    const scale = 1 - progress * 0.035;
    const blur = progress * 10;
    const y = progress * -25;

    return (
        <motion.section
            id="home"
            style={{
                opacity,
                scale,
                y,
                filter: `blur(${blur}px)`,
                pointerEvents: opacity < 0.05 ? "none" : "auto"
            }}
            className="absolute inset-0 z-20 min-h-screen overflow-hidden bg-transparent text-white"
        >

            {/* Soft Pink Ambient Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-250px] right-[-180px] w-[650px] h-[650px] rounded-full bg-[#d98fa5]/12 blur-3xl" />
                <div className="absolute bottom-[-280px] left-[-180px] w-[650px] h-[650px] rounded-full bg-[#f3d7de]/10 blur-3xl" />
                <div className="absolute top-[35%] left-[40%] w-[550px] h-[550px] rounded-full bg-[#d98fa5]/6 blur-3xl" />
            </div>

            {/* Main Content */}
            <div className="relative w-full min-h-screen px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-28 sm:pt-32 pb-20 flex items-center">

                <div className="w-full max-w-[1500px] mx-auto">

                    {/* Left Content - Full Width */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.9,
                            delay: 0.2,
                            ease: "easeOut"
                        }}
                        className="relative z-10 max-w-4xl"
                    >

                        {/* Eyebrow */}
                        <div className="flex items-center gap-4 mb-7">

                            <div className="w-12 h-px bg-[#d98fa5]" />

                            <span className="text-white/65 text-[10px] uppercase tracking-[0.38em] font-medium">
                                Artisan Bakery
                            </span>

                            <Sparkles
                                size={13}
                                className="text-[#f3b8c8]"
                            />

                        </div>

                        {/* Heading */}
                        <h1 className="font-serif text-white text-5xl sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[100px] leading-[0.92] tracking-[-0.045em]">

                            Baked for
                            <br />

                            your{" "}

                            <span className="italic text-[#D98FA5]">
                                sweetest
                            </span>

                            <br />

                            moments.

                        </h1>

                        {/* Decorative Divider */}
                        <div className="flex items-center gap-4 mt-8">

                            <div className="w-20 h-px bg-white/25" />

                            <div className="w-1.5 h-1.5 rounded-full bg-[#d98fa5]" />

                            <div className="w-10 h-px bg-white/15" />

                        </div>

                        {/* Description */}
                        <p className="mt-7 max-w-2xl text-white/65 text-base md:text-lg leading-7">
                            Handcrafted cakes made with the finest ingredients,
                            beautiful details, and a whole lot of love. From
                            intimate celebrations to unforgettable moments.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-wrap items-center gap-4 mt-9">

                            <button
                                onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                                className="group bg-white text-[#3a2528] px-7 py-4 rounded-full flex items-center gap-3 text-sm font-medium hover:bg-[#f3d7de] transition-all duration-300 shadow-[0_15px_45px_rgba(0,0,0,0.22)]"
                            >

                                Create Your Cake

                                <span className="w-7 h-7 rounded-full bg-[#d98fa5] text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                                    <ArrowUpRight size={15} />
                                </span>

                            </button>

                            <button
                                onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
                                className="px-6 py-4 rounded-full border border-white/25 bg-white/[0.06] text-white/90 text-sm font-medium backdrop-blur-md hover:bg-white/12 hover:border-white/40 transition-all duration-300"
                            >
                                Explore Cakes
                            </button>

                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-8 mt-12">

                            <div>

                                <div className="text-white font-serif text-2xl">
                                    4.9
                                </div>

                                <div className="flex gap-1 mt-1">

                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            size={11}
                                            fill="currentColor"
                                            className="text-[#e7a6b7]"
                                        />
                                    ))}

                                </div>

                                <div className="text-white/45 text-[10px] mt-1 uppercase tracking-wider">
                                    Customer rating
                                </div>

                            </div>

                            <div className="w-px h-12 bg-white/15" />

                            <div>

                                <div className="text-white font-serif text-2xl">
                                    1,200+
                                </div>

                                <div className="text-white/45 text-xs mt-1">
                                    Happy celebrations
                                </div>

                            </div>

                        </div>

                    </motion.div>

                </div>

            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
            >

                <span className="text-[9px] uppercase tracking-[0.3em] text-white/40">
                    Scroll to explore
                </span>

                <motion.div
                    animate={{ y: [0, 7, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="w-px h-8 bg-[#d98fa5]"
                />

            </motion.div>

        </motion.section>
    );
}

