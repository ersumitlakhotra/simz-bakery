
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

            {/* Ambient Background Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-220px] right-[-180px] w-[600px] h-[600px] rounded-full bg-[#c99a6b]/10 blur-3xl" />
                <div className="absolute bottom-[-250px] left-[-180px] w-[600px] h-[600px] rounded-full bg-[#8c5637]/10 blur-3xl" />
                <div className="absolute top-[35%] left-[45%] w-[500px] h-[500px] rounded-full bg-[#d8b58d]/5 blur-3xl" />
            </div>

            {/* Decorative Vertical Lines 
            <div className="absolute top-0 left-[8%] w-px h-full bg-white/[0.05] pointer-events-none" />
            <div className="absolute top-0 right-[8%] w-px h-full bg-white/[0.05] pointer-events-none" />*/}

            <div className="relative max-w-7xl mx-auto min-h-screen px-6 md:px-10 lg:px-12 pt-32 pb-20 flex items-center">

                <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center w-full">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
                        className="relative z-10"
                    >

                        {/* Eyebrow */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-10 h-px bg-[#c79a6b]" />

                            <span className="text-white/60 text-[10px] uppercase tracking-[0.38em] font-medium">
                                Artisan Bakery
                            </span>

                            <Sparkles size={13} className="text-[#c99a6b]" />
                        </div>

                        {/* Heading */}
                        <h1 className="font-serif text-white text-5xl sm:text-6xl md:text-7xl lg:text-[78px] leading-[0.96] tracking-[-0.04em]">
                            Baked for
                            <br />
                            your{" "}
                            <span className="italic text-[#d6ad7e]">
                                sweetest
                            </span>
                            <br />
                            moments.
                        </h1>

                        {/* Decorative Divider */}
                        <div className="flex items-center gap-4 mt-8">
                            <div className="w-16 h-px bg-white/20" />
                            <div className="w-1.5 h-1.5 rounded-full bg-[#c99a6b]" />
                            <div className="w-8 h-px bg-white/10" />
                        </div>

                        {/* Description */}
                        <p className="mt-7 max-w-lg text-white/60 text-base md:text-lg leading-7">
                            Handcrafted cakes made with the finest ingredients,
                            beautiful details, and a whole lot of love. From
                            intimate celebrations to unforgettable moments.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-wrap items-center gap-4 mt-9">

                            <button
                                onClick={() => document.getElementById("custom")?.scrollIntoView({ behavior: "smooth" })}
                                className="group bg-white text-[#382117] px-7 py-4 rounded-full flex items-center gap-3 text-sm font-medium hover:bg-[#e8d0b5] transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.20)]"
                            >
                                Create Your Cake

                                <span className="w-7 h-7 rounded-full bg-[#382117] text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                                    <ArrowUpRight size={15} />
                                </span>
                            </button>

                            <button
                                onClick={() => document.getElementById("cakes")?.scrollIntoView({ behavior: "smooth" })}
                                className="px-6 py-4 rounded-full border border-white/20 bg-white/[0.04] text-white/90 text-sm font-medium backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all duration-300"
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
                                            className="text-[#c99a6b]"
                                        />
                                    ))}
                                </div>

                                <div className="text-white/40 text-[10px] mt-1 uppercase tracking-wider">
                                    Customer rating
                                </div>
                            </div>

                            <div className="w-px h-12 bg-white/10" />

                            <div>
                                <div className="text-white font-serif text-2xl">
                                    1,200+
                                </div>

                                <div className="text-white/40 text-xs mt-1">
                                    Happy celebrations
                                </div>
                            </div>

                        </div>

                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.35, ease: "easeOut" }}
                        className="relative"
                    >

                        <div className="relative max-w-[570px] mx-auto">

                            {/* Decorative Rings */}
                            <div className="absolute inset-[-18px] rounded-[45%] border border-white/[0.07]" />
                            <div className="absolute inset-[-35px] rounded-[45%] border border-[#c99a6b]/[0.08]" />

                            {/* Image Glow */}
                            <div className="absolute inset-5 rounded-[45%] bg-[#c89a6b]/20 blur-3xl" />

                            {/* Cake Image */}

                            <div className="relative">

                                {/* Ground shadow */}
                                <motion.div
                                    className="absolute left-[15%] right-[15%] bottom-[-5%] h-12 rounded-full bg-black/25 blur-2xl"
                                    animate={{
                                        scaleX: [1, 0.82, 1],
                                        opacity: [0.30, 0.18, 0.30],
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />

                                {/* Floating cake */}
                                <motion.div
                                    className="relative aspect-[0.86] rounded-[45%] overflow-hidden bg-[#4a2c1e]/20 shadow-[0_45px_100px_rgba(0,0,0,0.30),0_15px_35px_rgba(74,44,30,0.20)] border border-white/10"
                                    animate={{
                                        y: [0, -16, 0, 12, 0],
                                        rotate: [0, 0.4, 0, -0.4, 0],
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <img
                                        src="/images/hero-cake.jpg"
                                        alt="Beautiful handcrafted celebration cake"
                                        className="w-full h-full object-cover"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />

                                    <div className="absolute inset-0 rounded-[45%] shadow-[inset_0_0_80px_rgba(255,255,255,0.08)] pointer-events-none" />
                                </motion.div>

                            </div>

                            {/* Top Floating Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.7, delay: 1.25 }}
                                className="absolute right-[-5px] md:right-[-35px] top-14 bg-black/25 backdrop-blur-xl text-white rounded-2xl px-5 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.20)] border border-white/10"
                            >
                                <div className="text-[9px] uppercase tracking-[0.25em] text-[#d0a778]">
                                    Since 2018
                                </div>

                                <div className="font-serif text-xl mt-1">
                                    Simz Bakery
                                </div>
                            </motion.div>

                            {/* Bottom Floating Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 1.1 }}
                                className="absolute left-[-10px] md:left-[-35px] bottom-12 bg-white/[0.96] backdrop-blur-xl rounded-2xl px-5 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.20)]"
                            >
                                <div className="flex items-center gap-3">

                                    <div className="w-10 h-10 rounded-full bg-[#f1dfca] flex items-center justify-center text-[#9d6d43] text-lg">
                                        ♡
                                    </div>

                                    <div>
                                        <div className="text-[#4d2d20] text-sm font-semibold">
                                            Made with love
                                        </div>

                                        <div className="text-[#9a7963] text-xs mt-0.5">
                                            Freshly baked for you
                                        </div>
                                    </div>

                                </div>
                            </motion.div>

                            {/* Handmade Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.7 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 1.5 }}
                                className="absolute right-[-15px] md:right-[-45px] bottom-24 w-16 h-16 rounded-full bg-[#c99a6b] text-[#2c1a12] flex items-center justify-center shadow-[0_15px_40px_rgba(0,0,0,0.20)]"
                            >
                                <div className="text-center">
                                    <div className="font-serif text-lg leading-none">
                                        ♡
                                    </div>

                                    <div className="text-[7px] uppercase tracking-wider mt-1 font-semibold">
                                        Handmade
                                    </div>
                                </div>
                            </motion.div>

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
                <span className="text-[9px] uppercase tracking-[0.3em] text-white/35">
                    Scroll to explore
                </span>

                <motion.div
                    animate={{ y: [0, 7, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-px h-8 bg-[#c99a6b]"
                />
            </motion.div>

        </motion.section>
    );
}

