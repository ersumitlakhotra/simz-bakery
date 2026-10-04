
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const galleryItems = [
    {
        id: 1,
        image: "/images/gallery/gallery-01.jpg",
        category: "Celebration",
        title: "Birthday Bloom",
        size: "large",
    },
    {
        id: 2,
        image: "/images/gallery/gallery-02.jpg",
        category: "Wedding",
        title: "Forever Begins",
        size: "small",
    },
    {
        id: 3,
        image: "/images/gallery/gallery-03.jpg",
        category: "Chocolate",
        title: "Chocolate Muse",
        size: "small",
    },
    {
        id: 4,
        image: "/images/gallery/gallery-04.jpg",
        category: "Baby Shower",
        title: "Little Wonder",
        size: "tall",
    },
    {
        id: 5,
        image: "/images/gallery/gallery-05.jpg",
        category: "Anniversary",
        title: "Forever Yours",
        size: "wide",
    },
    {
        id: 6,
        image: "/images/gallery/gallery-06.jpg",
        category: "Custom",
        title: "Made for You",
        size: "small",
    },
    {
        id: 7,
        image: "/images/gallery/gallery-07.jpg",
        category: "Wedding",
        title: "A Beautiful Beginning",
        size: "small",
    },
    {
        id: 8,
        image: "/images/gallery/gallery-08.jpg",
        category: "Celebration",
        title: "Sweet Moments",
        size: "large",
    },
    {
        id: 9,
        image: "/images/gallery/gallery-09.jpg",
        category: "Minimal",
        title: "Simply Elegant",
        size: "small",
    },
    {
        id: 10,
        image: "/images/gallery/gallery-10.jpg",
        category: "Floral",
        title: "Floral Story",
        size: "tall",
    },
    {
        id: 11,
        image: "/images/gallery/gallery-11.jpg",
        category: "Luxury",
        title: "Golden Dream",
        size: "small",
    },
    {
        id: 12,
        image: "/images/gallery/gallery-12.jpg",
        category: "Special Moments",
        title: "Your Story",
        size: "wide",
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.07,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 40,
        scale: 0.97,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

function GalleryItem({ item }) {
    return (
        <motion.div
            variants={itemVariants}
            className={`group relative overflow-hidden rounded-[24px] sm:rounded-[28px] ${
                item.size === "large"
                    ? "md:col-span-2 md:row-span-2"
                    : item.size === "wide"
                    ? "md:col-span-2"
                    : item.size === "tall"
                    ? "md:row-span-2"
                    : ""
            }`}
        >
            <motion.div
                whileHover={{ scale: 1.025 }}
                transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="relative w-full h-full min-h-[260px] sm:min-h-[320px] md:min-h-0 overflow-hidden"
            >
                <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-700" />

                <div className="absolute left-4 right-4 bottom-4 sm:left-6 sm:right-6 sm:bottom-6 md:left-7 md:right-7 md:bottom-7 text-white">
                    <div className="flex items-end justify-between gap-3">
                        <div className="min-w-0">
                            <p className="text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.28em] text-white/65 mb-1.5 sm:mb-2">
                                {item.category}
                            </p>

                            <h3 className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-tight">
                                {item.title}
                            </h3>
                        </div>

                        <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500">
                            <ArrowUpRight size={15} strokeWidth={1.4} />
                        </div>
                    </div>
                </div>

                <div className="absolute inset-3 sm:inset-4 rounded-[18px] sm:rounded-[22px] border border-white/0 group-hover:border-white/20 transition-all duration-700 pointer-events-none" />
            </motion.div>
        </motion.div>
    );
}

export default function Gallery() {
    return (
        <section className="relative w-full overflow-hidden bg-[#faf8f5] py-20 sm:py-24 md:py-32 lg:py-36">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute left-[-20%] top-[10%] w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] rounded-full bg-[#d6a77a]/10 blur-[100px] sm:blur-[130px]" />

                <div className="absolute right-[-20%] bottom-[10%] w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full bg-[#b98a68]/10 blur-[110px] sm:blur-[140px]" />
            </div>

            <div className="relative z-10 w-full max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                        duration: 0.9,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="w-full max-w-4xl mb-12 sm:mb-14 md:mb-20"
                >
                    <div className="flex items-center gap-3 mb-5 sm:mb-6">
                        <span className="w-7 sm:w-8 h-px bg-[#a76f3f]/50" />

                        <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[#a76f3f]">
                            The Gallery
                        </span>
                    </div>

                    <h2 className="font-serif text-[42px] leading-[0.94] tracking-[-0.04em] text-[#47291d] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[82px]">
                        A little sweetness,
                        <span className="block text-[#a76f3f] italic">
                            beautifully captured.
                        </span>
                    </h2>

                    <p className="mt-6 sm:mt-7 max-w-xl text-[13px] sm:text-sm md:text-base leading-6 sm:leading-7 text-[#806655]">
                        From intimate celebrations to unforgettable
                        milestones, every Simz Bakery creation is made to
                        become part of your sweetest memories.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        amount: 0.05,
                    }}
                    className="grid grid-cols-1 md:grid-cols-4 auto-rows-[300px] sm:auto-rows-[340px] md:auto-rows-[250px] lg:auto-rows-[270px] gap-3 sm:gap-4 md:gap-5"
                >
                    {galleryItems.map((item) => (
                        <GalleryItem
                            key={item.id}
                            item={item}
                        />
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.1,
                    }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-10 sm:mt-12 md:mt-16"
                >
                    <div>
                        <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-[#a76f3f]">
                            Made with intention
                        </p>

                        <p className="mt-2 text-xs sm:text-sm text-[#806655]">
                            Every cake has a story. Let's create yours.
                        </p>
                    </div>

                    <button className="group flex items-center gap-3 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#47291d]">
                        <span className="border-b border-[#47291d]/25 pb-2 group-hover:border-[#47291d] transition-colors duration-300">
                            Explore our creations
                        </span>

                        <span className="w-9 h-9 rounded-full border border-[#47291d]/15 flex items-center justify-center group-hover:bg-[#47291d] group-hover:text-white transition-all duration-500">
                            <ArrowUpRight
                                size={15}
                                strokeWidth={1.5}
                            />
                        </span>
                    </button>
                </motion.div>
            </div>
        </section>
    );
}

