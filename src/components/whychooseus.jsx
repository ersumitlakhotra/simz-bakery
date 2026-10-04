
import React from "react";
import { motion } from "framer-motion";
import { Clock3, Heart, Leaf, Sparkles } from "lucide-react";

const features = [
    {
        icon: Leaf,
        title: "Premium ingredients",
        text: "Only quality ingredients make it into our kitchen.",
    },
    {
        icon: Clock3,
        title: "Freshly baked",
        text: "Every cake is baked fresh for your special occasion.",
    },
    {
        icon: Sparkles,
        title: "Beautifully finished",
        text: "Every detail is carefully crafted by our cake artists.",
    },
    {
        icon: Heart,
        title: "Made with love",
        text: "Because the best celebrations deserve something personal.",
    },
];

function WhyChooseUs({ frame, startFrame = 30, endFrame = 120 }) {

    const fadeInFrames = 12;
    const fadeOutFrames = 12;

    const fadeInProgress = Math.max(
        0,
        Math.min(1, (frame - startFrame) / fadeInFrames)
    );

    const fadeOutProgress = Math.max(
        0,
        Math.min(1, (endFrame - frame) / fadeOutFrames)
    );

    const opacity = Math.min(fadeInProgress, fadeOutProgress);

    const enterProgress = Math.max(
        0,
        Math.min(1, (frame - startFrame) / fadeInFrames)
    );

    const exitProgress = Math.max(
        0,
        Math.min(1, (endFrame - frame) / fadeOutFrames)
    );

    const y =
        frame < startFrame
            ? 45
            : frame > endFrame
                ? -35
                : (1 - enterProgress) * 45;

    const scale =
        frame < startFrame
            ? 0.97
            : frame > endFrame
                ? 0.98
                : 0.97 + enterProgress * 0.03;

    const blur =
        frame < startFrame
            ? 8
            : frame > endFrame
                ? (1 - exitProgress) * 8
                : (1 - enterProgress) * 8;

    const isVisible = frame >= startFrame && frame <= endFrame;

    return (
        <motion.section
            id="why-choose-us"
            style={{
                opacity,
                y,
                scale,
                filter: `blur(${blur}px)`,
                pointerEvents: isVisible ? "auto" : "none",
            }}
            className="absolute inset-0 z-20 h-screen min-h-screen w-full overflow-hidden bg-transparent flex items-center justify-center"
        >

            {/* Ambient Background */}
            <div className="absolute -top-52 -left-52 w-[600px] h-[600px] rounded-full bg-[#c99a6b]/[0.07] blur-[120px] pointer-events-none" />

            <div className="absolute -bottom-52 -right-52 w-[600px] h-[600px] rounded-full bg-[#ead5bd]/[0.08] blur-[120px] pointer-events-none" />

            {/* Decorative Lines */}
            <div className="absolute top-0 left-[6%] w-px h-full bg-[#47291d]/[0.06] pointer-events-none" />

            <div className="absolute top-0 right-[6%] w-px h-full bg-[#47291d]/[0.06] pointer-events-none" />

            <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 md:px-10 lg:px-14">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    animate={{
                        opacity: isVisible ? 1 : 0,
                        y: isVisible ? 0 : 35,
                    }}
                    transition={{
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 md:mb-16"
                >

                    <div className="flex items-center gap-4 mb-7">

                        <div className="w-12 h-px bg-[#b27b45]" />

                        <span className="text-white text-[10px] uppercase tracking-[0.4em] font-semibold">
                            The sweet difference
                        </span>

                        <div className="w-12 h-px bg-[#b27b45]" />

                    </div>

                    <h2 className="font-serif  text-white text-5xl sm:text-6xl md:text-7xl leading-[0.92] tracking-[-0.045em]">
                        Small details.
                        <br />
                        <span className="italic text-white">
                            Big moments.
                        </span>
                    </h2>

                    <p className="mt-7 max-w-xl text-white text-base md:text-lg leading-7">
                        Everything we do is about creating cakes that look
                        beautiful, taste unforgettable, and make your
                        celebration feel truly yours.
                    </p>

                </motion.div>

                {/* Cards */}
                <div className="w-full max-w-6xl mx-auto">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">

                        {features.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, x: 120 }}
                                    animate={{
                                        opacity: isVisible ? 1 : 0,
                                        x: isVisible ? 0 : 120,
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        delay: index * 0.15,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    whileHover={{ y: -8 }}
                                    className="group"
                                >

                                    <div className="relative h-full min-h-[290px] rounded-[28px] border border-[#d8c4ae]/70 bg-white p-7 md:p-8 overflow-hidden shadow-[0_25px_80px_rgba(74,45,25,0.07)]">

                                        {/* Soft Card Glow */}
                                        <div className="absolute -top-24 -right-24 w-52 h-52 rounded-full bg-[#c99a6b]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                        {/* Number */}
                                        <span className="absolute top-6 right-7 font-serif text-5xl text-[#c99a6b] transition-colors duration-500">
                                            0{index + 1}
                                        </span>

                                        {/* Icon */}
                                        <div className="relative w-14 h-14 rounded-2xl bg-[#f1e1cd] border border-[#e2cdb4] flex items-center justify-center text-[#9d6d43] mb-9 group-hover:bg-[#c99a6b] group-hover:text-white group-hover:border-[#c99a6b] transition-all duration-500">
                                            <Icon size={22} strokeWidth={1.5} />
                                        </div>

                                        {/* Title */}
                                        <h3 className="relative font-serif text-[#47291d] text-2xl leading-tight">
                                            {item.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="relative mt-4 text-[#806655] text-sm leading-6">
                                            {item.text}
                                        </p>

                                        {/* Accent */}
                                        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-[#c99a6b]/70 via-[#c99a6b]/20 to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

                                    </div>

                                </motion.div>
                            );
                        })}

                    </div>

                </div>

                {/* Bottom Detail */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{
                        opacity: isVisible ? 1 : 0,
                        scaleX: isVisible ? 1 : 0,
                    }}
                    transition={{
                        duration: 1,
                        delay: 0.6,
                    }}
                    className="flex items-center justify-center gap-4 mt-14"
                >
                    <div className="w-20 md:w-32 h-px bg-[#d8c4ae]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#b27b45]" />
                    <div className="w-20 md:w-32 h-px bg-[#d8c4ae]" />
                </motion.div>

            </div>
        </motion.section>
    );
}

export default WhyChooseUs;
