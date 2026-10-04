
import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

const categories = [
    {
        name: "Birthday Cakes",
        label: "For joyful celebrations",
        description: "Fun, colorful and beautifully crafted cakes made for unforgettable birthdays.",
        image: "/images/birthday-cake.jpeg",
    },
    {
        name: "Baby Shower",
        label: "Sweet beginnings",
        description: "Delicate designs created to celebrate the arrival of something truly special.",
        image: "/images/category-baby-shower.jpg",
    },
    {
        name: "Anniversary",
        label: "Celebrate your story",
        description: "Elegant cakes made for the moments, memories and love you share together.",
        image: "/images/category-anniversary.jpg",
    },
    {
        name: "Wedding Cakes",
        label: "Made for forever",
        description: "Timeless wedding creations designed to become part of your beautiful day.",
        image: "/images/category-wedding.jpg",
    },
    {
        name: "Custom Cakes",
        label: "Made just for you",
        description: "Bring your imagination to life with a cake designed around your celebration.",
        image: "/images/category-custom.jpg",
    },
    {
        name: "Milestone Cakes",
        label: "Celebrate every chapter",
        description: "Mark the moments that deserve something extra special and memorable.",
        image: "/images/category-milestone.jpg",
    },
];

function FeaturedCakes() {
    const scrollContainer = React.useRef(null);

    const scroll = (direction) => {
        if (!scrollContainer.current) return;

        scrollContainer.current.scrollBy({
            left: direction === "right" ? 430 : -430,
            behavior: "smooth",
        });
    };

    return (
        <section id="cakes" className="relative w-full min-h-screen overflow-hidden bg-transparent py-28 md:py-36">

            {/* Ambient Background */}
            <div className="absolute -top-40 left-[-10%] w-[500px] h-[500px] rounded-full bg-[#c99a6b]/[0.07] blur-[130px] pointer-events-none" />

            <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#ead5bd]/[0.08] blur-[140px] pointer-events-none" />

            {/* Decorative Lines */}
           

            <div className="relative z-10 w-full">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-[1500px] mx-auto px-6 md:px-10 lg:px-14 flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-14 md:mb-16"
                >

                    <div className="max-w-3xl">

                        <div className="flex items-center gap-4 mb-7">
                            <div className="w-12 h-px bg-[#b27b45]" />

                            <span className="text-[#a07855] text-[10px] uppercase tracking-[0.42em] font-semibold">
                                Celebrate every moment
                            </span>
                        </div>

                        <h2 className="font-serif text-[#47291d] text-5xl sm:text-6xl md:text-7xl lg:text-[84px] leading-[0.9] tracking-[-0.05em]">
                            Cakes for
                            <br />
                            <span className="italic text-[#a76f3f]">
                                every occasion.
                            </span>
                        </h2>
                    </div>

                    <div className="max-w-md md:pb-2">
                        <p className="text-[#806655] text-base md:text-lg leading-7">
                            Whatever the occasion, we create beautiful
                            handcrafted cakes designed to make your
                            celebration even more memorable.
                        </p>
                    </div>
                </motion.div>

                {/* Horizontal Scroll Area */}
                <div
                    ref={scrollContainer}
                    className="flex gap-5 md:gap-6 overflow-x-auto overflow-y-hidden px-6 md:px-10 lg:px-[calc((100vw-1500px)/2+56px)] pb-8 snap-x snap-mandatory scrollbar-hide"
                >
                    {categories.map((category, index) => (
                        <motion.article
                            key={category.name}
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.1,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="group relative flex-none w-[82vw] sm:w-[60vw] md:w-[430px] lg:w-[470px] snap-start"
                        >
                            <div className="relative overflow-hidden rounded-[32px] bg-[#f7f0e8] border border-[#dcc9b6]/60 shadow-[0_25px_80px_rgba(74,45,25,0.08)] transition-all duration-700 group-hover:-translate-y-2 group-hover:shadow-[0_35px_100px_rgba(74,45,25,0.15)]">

                                {/* Image */}
                                <div className="relative aspect-[0.88] overflow-hidden">

                                    <motion.img
                                        src={category.image}
                                        alt={category.name}
                                        loading="lazy"
                                        className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.07 }}
                                        transition={{
                                            duration: 1.1,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                    />

                                    {/* Image Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#24140e]/75 via-[#24140e]/10 to-transparent" />

                                    {/* Number */}
                                    <span className="absolute top-6 left-6 font-serif text-white/80 text-sm tracking-[0.2em]">
                                        0{index + 1}
                                    </span>

                                    {/* Arrow */}
                                    <button
                                        aria-label={`Explore ${category.name}`}
                                        className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md text-[#47291d] flex items-center justify-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
                                    >
                                        <ArrowUpRight size={20} strokeWidth={1.7} />
                                    </button>

                                    {/* Image Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8">

                                        <span className="text-white/70 text-[9px] uppercase tracking-[0.3em] font-semibold">
                                            {category.label}
                                        </span>

                                        <h3 className="font-serif text-white text-3xl md:text-4xl mt-3 leading-none tracking-[-0.03em]">
                                            {category.name}
                                        </h3>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="px-7 py-6 md:px-8 md:py-7">

                                    <p className="text-[#806655] text-sm leading-6 max-w-sm">
                                        {category.description}
                                    </p>

                                    <div className="flex items-center justify-between mt-6">

                                        <span className="text-[9px] uppercase tracking-[0.28em] text-[#a07855] font-semibold">
                                            Explore collection
                                        </span>

                                        <div className="w-9 h-9 rounded-full bg-[#f1e1cd] text-[#9d6d43] flex items-center justify-center transition-all duration-500 group-hover:bg-[#b27b45] group-hover:text-white group-hover:rotate-45">
                                            <ArrowUpRight size={15} strokeWidth={1.7} />
                                        </div>

                                    </div>

                                    <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-[#b27b45]/70 via-[#d8c4ae] to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Scroll Controls */}
                <div className="max-w-[1500px] mx-auto px-6 md:px-10 lg:px-14 mt-8 flex items-center justify-between">

                    <div className="flex items-center gap-4">

                        <span className="text-[9px] uppercase tracking-[0.3em] text-[#a07855] font-semibold">
                            Explore occasions
                        </span>

                        <div className="w-20 md:w-32 h-px bg-[#d8c4ae]" />

                        <span className="w-1.5 h-1.5 rounded-full bg-[#b27b45]" />

                    </div>

                    <div className="flex items-center gap-2">

                        <button
                            onClick={() => scroll("left")}
                            aria-label="Previous categories"
                            className="w-12 h-12 rounded-full border border-[#d8c4ae] bg-white/40 backdrop-blur-xl text-[#47291d] flex items-center justify-center transition-all duration-300 hover:bg-[#47291d] hover:text-white hover:border-[#47291d]"
                        >
                            <ArrowLeft size={17} strokeWidth={1.6} />
                        </button>

                        <button
                            onClick={() => scroll("right")}
                            aria-label="Next categories"
                            className="w-12 h-12 rounded-full border border-[#d8c4ae] bg-white/40 backdrop-blur-xl text-[#47291d] flex items-center justify-center transition-all duration-300 hover:bg-[#47291d] hover:text-white hover:border-[#47291d]"
                        >
                            <ArrowRight size={17} strokeWidth={1.6} />
                        </button>

                    </div>
                </div>

            </div>
        </section>
    );
}

export default FeaturedCakes;

