
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const categories = [
    {
        name: "Birthday Cakes",
        number: "01",
        label: "For joyful celebrations",
        description: "Fun, colorful and beautifully crafted cakes made for unforgettable birthdays.",
        image: "/images/birthday-cake.jpeg",
    },
    {
        name: "Baby Shower",
        number: "02",
        label: "Sweet beginnings",
        description: "Delicate designs created to celebrate the arrival of something truly special.",
        image: "/images/babyshower-cake.jpeg",
    },
    {
        name: "Anniversary",
        number: "03",
        label: "Celebrate your story",
        description: "Elegant cakes made for the moments, memories and love you share together.",
        image: "/images/Anniversary-cake.jpeg",
    },
    {
        name: "Wedding Cakes",
        number: "04",
        label: "Made for forever",
        description: "Timeless wedding creations designed to become part of your beautiful day.",
        image: "/images/wedding-cake.jpeg",
    },
    {
        name: "Custom Cakes",
        number: "05",
        label: "Made just for you",
        description: "Bring your imagination to life with a cake designed around your celebration.",
        image: "/images/custom-cake.jpeg",
    },
    {
        name: "Milestone Cakes",
        number: "06",
        label: "Celebrate every chapter",
        description: "Mark the moments that deserve something extra special and memorable.",
        image: "/images/milestone-cake.jpeg",
    },
];

const ease = [0.22, 1, 0.36, 1];

function FeaturedCakes() {
    const [active, setActive] = useState(0);

    const current = categories[active];

    return (
        <section id="cakes" className="relative min-h-screen overflow-hidden bg-[#fffafa] py-24 md:py-32">

            {/* Ambient Light */}
            <div className="absolute top-[-20%] left-[-15%] w-[700px] h-[700px] rounded-full bg-[#d85c78]/[0.07] blur-[180px] pointer-events-none" />

            <div className="absolute bottom-[-25%] right-[-15%] w-[700px] h-[700px] rounded-full bg-[#f3cbd5]/[0.14] blur-[180px] pointer-events-none" />

            <div className="relative z-10 max-w-[1550px] mx-auto px-6 md:px-10 lg:px-16">

                {/* Top Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease }}
                    className="flex items-center gap-4 mb-16 md:mb-20"
                >
                    <span className="w-12 h-px bg-[#d85c78]" />

                    <span className="text-[#b83a5a] text-[10px] uppercase tracking-[0.45em] font-semibold">
                        The Simz Collection
                    </span>
                </motion.div>

                {/* Main Layout */}
                <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-12 lg:gap-20 items-center">

                    {/* LEFT */}
                    <div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease }}
                        >

                            <p className="text-[#8e6d75] text-sm tracking-wide mb-5">
                                Every celebration deserves
                            </p>

                            <h2 className="font-serif text-[#7c3045] text-6xl sm:text-7xl md:text-8xl lg:text-[92px] leading-[0.82] tracking-[-0.06em]">
                                A cake
                                <br />
                                <span className="italic text-[#d85c78]">
                                    worth
                                </span>
                                <br />
                                remembering.
                            </h2>

                        </motion.div>

                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: 0.15, ease }}
                            className="mt-10 max-w-md"
                        >

                            <p className="text-[#654c52] text-base leading-7 font-light">
                                From intimate celebrations to unforgettable
                                milestones, every Simz creation is handcrafted
                                with care, detail and a little sweetness.
                            </p>

                        </motion.div>

                        {/* Occasion Navigation */}
                        <div className="mt-12 md:mt-16">

                            {categories.map((category, index) => {

                                const isActive = index === active;

                                return (
                                    <button
                                        key={category.name}
                                        onMouseEnter={() => setActive(index)}
                                        onFocus={() => setActive(index)}
                                        onClick={() => setActive(index)}
                                        className="group relative w-full text-left"
                                    >

                                        <div className="flex items-center gap-5 py-4 md:py-5">

                                            {/* Number */}
                                            <span
                                                className={`text-[10px] tracking-[0.2em] transition-colors duration-500 ${isActive ? "text-[#b83a5a]" : "text-[#bca5ab]"}`}
                                            >
                                                {category.number}
                                            </span>

                                            {/* Active Line */}
                                            <div className="relative w-7 h-px overflow-hidden">

                                                <motion.div
                                                    animate={{
                                                        width: isActive ? "100%" : "0%",
                                                    }}
                                                    transition={{
                                                        duration: 0.5,
                                                        ease,
                                                    }}
                                                    className="absolute left-0 top-0 h-full bg-[#d85c78]"
                                                />

                                            </div>

                                            {/* Name */}
                                            <span
                                                className={`font-serif text-xl md:text-2xl transition-all duration-500 ${isActive ? "text-[#7c3045] translate-x-2" : "text-[#9f858b] group-hover:text-[#7c3045]"}`}
                                            >
                                                {category.name}
                                            </span>

                                            {/* Arrow */}
                                            <motion.div
                                                animate={{
                                                    opacity: isActive ? 1 : 0,
                                                    x: isActive ? 0 : -8,
                                                }}
                                                transition={{ duration: 0.4, ease }}
                                                className="ml-auto text-[#b83a5a]"
                                            >
                                                <ArrowUpRight
                                                    size={17}
                                                    strokeWidth={1.5}
                                                />
                                            </motion.div>

                                        </div>

                                        {/* Bottom Line */}
                                        <div className="h-px bg-[#eadde0]" />

                                    </button>
                                );
                            })}

                        </div>

                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="relative">

                        {/* Decorative Number */}
                        <div className="absolute -top-10 -right-2 md:-right-6 z-20">

                            <span className="font-serif text-[#d85c78]/20 text-[120px] md:text-[180px] leading-none">
                                {current.number}
                            </span>

                        </div>

                        {/* Image Frame */}
                        <div className="relative aspect-[0.82] md:aspect-[0.9] lg:aspect-[0.86] overflow-hidden rounded-[42px]">

                            <AnimatePresence mode="wait">

                                <motion.img
                                    key={current.image}
                                    src={current.image}
                                    alt={current.name}
                                    initial={{
                                        opacity: 0,
                                        scale: 1.08,
                                        x: 25,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        x: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.97,
                                        x: -20,
                                    }}
                                    transition={{
                                        duration: 0.9,
                                        ease,
                                    }}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />

                            </AnimatePresence>

                            {/* Image Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#35151f]/75 via-transparent to-[#35151f]/5 pointer-events-none" />

                            {/* Top Metadata */}
                            <div className="absolute top-7 left-7 right-7 flex items-center justify-between">

                                <span className="text-white/80 text-[9px] uppercase tracking-[0.35em] font-semibold">
                                    Simz Bakery
                                </span>

                                <div className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-xl flex items-center justify-center text-[#b83a5a]">
                                    <ArrowUpRight
                                        size={17}
                                        strokeWidth={1.5}
                                    />
                                </div>

                            </div>

                            {/* Bottom Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10">

                                <AnimatePresence mode="wait">

                                    <motion.div
                                        key={current.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.5, ease }}
                                    >

                                        <span className="text-white/65 text-[9px] uppercase tracking-[0.35em]">
                                            {current.label}
                                        </span>

                                        <h3 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl leading-[0.9] tracking-[-0.04em] mt-3">
                                            {current.name}
                                        </h3>

                                        <p className="text-white/65 text-sm leading-6 max-w-md mt-5 font-light">
                                            {current.description}
                                        </p>

                                    </motion.div>

                                </AnimatePresence>

                            </div>

                        </div>

                        {/* Floating Caption */}
                        <motion.div
                            key={current.name}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease }}
                            className="absolute -bottom-6 -left-3 md:-left-8 bg-white rounded-2xl px-6 py-4 shadow-[0_20px_60px_rgba(92,38,53,0.12)] border border-[#f0e0e4]"
                        >

                            <span className="block text-[8px] uppercase tracking-[0.3em] text-[#a58a91] mb-1">
                                Currently exploring
                            </span>

                            <span className="font-serif text-[#7c3045] text-lg">
                                {current.name}
                            </span>

                        </motion.div>

                    </div>

                </div>

                {/* Bottom */}
                <div className="flex items-center justify-between mt-20 pt-8 border-t border-[#eadde0]">

                    <span className="text-[#a58a91] text-[9px] uppercase tracking-[0.35em]">
                        Handcrafted in every detail
                    </span>

                    <span className="font-serif italic text-[#d85c78] text-lg">
                        Made with love.
                    </span>

                </div>

            </div>
        </section>
    );
}

export default FeaturedCakes;

