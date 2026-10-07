import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";

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
    {
        id: 13,
        image: "/images/gallery/gallery-13.jpg",
        category: "Birthday",
        title: "A Day to Remember",
        size: "large",
    },
    {
        id: 14,
        image: "/images/gallery/gallery-14.jpg",
        category: "Baby Shower",
        title: "Sweet Little Joy",
        size: "small",
    },
    {
        id: 15,
        image: "/images/gallery/gallery-15.jpg",
        category: "Chocolate",
        title: "Velvet Indulgence",
        size: "tall",
    },
    {
        id: 16,
        image: "/images/gallery/gallery-16.jpg",
        category: "Floral",
        title: "Garden of Sweets",
        size: "small",
    },
    {
        id: 17,
        image: "/images/gallery/gallery-17.jpg",
        category: "Anniversary",
        title: "Love in Every Layer",
        size: "wide",
    },
    {
        id: 18,
        image: "/images/gallery/gallery-18.jpg",
        category: "Custom",
        title: "Designed with Love",
        size: "small",
    },
    {
        id: 19,
        image: "/images/gallery/gallery-19.jpg",
        category: "Wedding",
        title: "The Sweetest Vows",
        size: "large",
    },
    {
        id: 20,
        image: "/images/gallery/gallery-20.jpg",
        category: "Luxury",
        title: "Rose Gold Elegance",
        size: "tall",
    },
    {
        id: 21,
        image: "/images/gallery/gallery-21.jpg",
        category: "Celebration",
        title: "Cheers to You",
        size: "small",
    },
    {
        id: 22,
        image: "/images/gallery/gallery-22.jpg",
        category: "Minimal",
        title: "Pure & Simple",
        size: "wide",
    },
    {
        id: 23,
        image: "/images/gallery/gallery-23.jpg",
        category: "Special Moments",
        title: "Made for the Moment",
        size: "small",
    },
    {
        id: 24,
        image: "/images/gallery/gallery-24.jpg",
        category: "Birthday",
        title: "Make a Wish",
        size: "large",
    },
    {
        id: 25,
        image: "/images/gallery/gallery-25.jpg",
        category: "Luxury",
        title: "The Grand Celebration",
        size: "large",
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

function GalleryItem({ item, onClick }) {
    return (
        <motion.div
            variants={itemVariants}
            onClick={onClick}
            className={`group relative overflow-hidden rounded-[24px] sm:rounded-[28px] cursor-pointer ${item.size === "large"
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

                <div className="absolute inset-0 bg-gradient-to-t from-[#251018]/80 via-[#251018]/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-700" />

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

                        <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500">
                            <ArrowUpRight size={15} strokeWidth={1.4} />
                        </div>
                    </div>
                </div>

                <div className="absolute inset-3 sm:inset-4 rounded-[18px] sm:rounded-[22px] border border-white/0 group-hover:border-white/30 transition-all duration-700 pointer-events-none" />
            </motion.div>
        </motion.div>
    );
}

function GalleryLightbox({ selectedIndex, onClose, onPrevious, onNext }) {
    const item = galleryItems[selectedIndex];

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }

            if (event.key === "ArrowLeft") {
                onPrevious();
            }

            if (event.key === "ArrowRight") {
                onNext();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose, onPrevious, onNext]);

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
        >
            {/* Visible Blurred Website Background */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-[#351520]/35 backdrop-blur-md cursor-pointer"
            />

            {/* Soft Rose Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#f6c4d2]/15 blur-[130px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[550px] h-[550px] rounded-full bg-[#d98fa5]/20 blur-[140px]" />
            </div>

            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute z-30 top-5 right-5 sm:top-7 sm:right-7 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-[#4d3038] transition-all duration-300"
            >
                <X size={19} strokeWidth={1.5} />
            </button>

            {/* Counter */}
            <div className="absolute z-30 top-6 left-6 sm:top-8 sm:left-8 text-white/70 text-[9px] uppercase tracking-[0.3em]">
                {String(selectedIndex + 1).padStart(2, "0")} / {String(galleryItems.length).padStart(2, "0")}
            </div>

            {/* Main Popup */}
            <div className="relative z-20 w-full h-full flex items-center justify-center px-5 sm:px-12 lg:px-24">
                {/* Previous */}
                <button
                    onClick={onPrevious}
                    className="absolute z-30 left-4 sm:left-7 lg:left-12 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-[#4d3038] transition-all duration-300"
                >
                    <ArrowLeft size={18} strokeWidth={1.4} />
                </button>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedIndex}
                        initial={{ opacity: 0, x: 70, scale: 0.96 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -70, scale: 0.96 }}
                        transition={{
                            duration: 0.45,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="relative w-full max-w-[1100px] h-[72vh] sm:h-[78vh] flex items-center justify-center"
                    >
                        <div className="relative w-full h-full rounded-[24px] sm:rounded-[32px] overflow-hidden border border-white/30 bg-white/10 backdrop-blur-sm shadow-[0_35px_120px_rgba(0,0,0,0.3)]">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-contain"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-[#241018]/80 via-transparent to-transparent pointer-events-none" />

                            <div className="absolute left-6 right-6 bottom-6 sm:left-9 sm:right-9 sm:bottom-9 text-white">
                                <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-white/65 mb-2">
                                    {item.category}
                                </p>

                                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em]">
                                    {item.title}
                                </h2>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Next */}
                <button
                    onClick={onNext}
                    className="absolute z-30 right-4 sm:right-7 lg:right-12 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-[#4d3038] transition-all duration-300"
                >
                    <ArrowRight size={18} strokeWidth={1.4} />
                </button>
            </div>

            {/* Keyboard Hint */}
            <div className="absolute z-30 bottom-5 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-[0.25em] text-white/40 hidden sm:block">
                Use ← → to explore
            </div>
        </motion.div>
    );
}


export default function Gallery() {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const openGallery = (index) => {
        setSelectedIndex(index);
    };

    const closeGallery = () => {
        setSelectedIndex(null);
    };

    const showPrevious = () => {
        setSelectedIndex((current) => {
            if (current === null) return null;
            return current === 0 ? galleryItems.length - 1 : current - 1;
        });
    };

    const showNext = () => {
        setSelectedIndex((current) => {
            if (current === null) return null;
            return current === galleryItems.length - 1 ? 0 : current + 1;
        });
    };

    return (
        <>
            <section className="relative w-full overflow-hidden bg-[#d98fa5]/90 py-20 sm:py-24 md:py-32 lg:py-36">

                {/* Glossy Royal Rose Atmosphere */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">

                    <div className="absolute inset-0 bg-[#d98fa5]/90" />

                    <div className="absolute top-[-25%] left-[-10%] w-[600px] h-[500px] rounded-full bg-white/18 blur-[120px]" />

                    <div className="absolute top-[20%] right-[-15%] w-[500px] h-[500px] rounded-full bg-[#f6c4d2]/20 blur-[130px]" />

                    <div className="absolute bottom-[-25%] left-[10%] w-[600px] h-[450px] rounded-full bg-[#9f5069]/20 blur-[140px]" />

                    <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[450px] rounded-full bg-white/10 blur-[120px]" />

                    <div className="absolute top-[-30%] left-[42%] w-[14%] h-[160%] rotate-[22deg] bg-white/10 blur-[35px]" />

                </div>

                <div className="relative z-10 w-full max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">

                    {/* Header */}
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
                            <span className="w-7 sm:w-8 h-px bg-white/55" />

                            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.35em] text-white/80">
                                The Gallery
                            </span>
                        </div>

                        <h2 className="font-serif text-[42px] leading-[0.94] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-[82px]">
                            A little sweetness,
                            <span className="block text-[#fff1f5] italic">
                                beautifully captured.
                            </span>
                        </h2>

                        <p className="mt-6 sm:mt-7 max-w-xl text-[13px] sm:text-sm md:text-base leading-6 sm:leading-7 text-white/75">
                            From intimate celebrations to unforgettable
                            milestones, every Simz Bakery creation is made to
                            become part of your sweetest memories.
                        </p>
                    </motion.div>

                    {/* Gallery Grid */}
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
                        {galleryItems.map((item, index) => (
                            <GalleryItem
                                key={item.id}
                                item={item}
                                onClick={() => openGallery(index)}
                            />
                        ))}
                    </motion.div>

                    {/* Bottom */}
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
                            <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-white/65">
                                Made with intention
                            </p>

                            <p className="mt-2 text-xs sm:text-sm text-white/70">
                                Every cake has a story. Let's create yours.
                            </p>
                        </div>

                        <button
                            onClick={() => openGallery(0)}
                            className="group flex items-center gap-3 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.22em] text-white"
                        >
                            <span className="border-b border-white/30 pb-2 group-hover:border-white transition-colors duration-300">
                                Explore our creations
                            </span>

                            <span className="w-9 h-9 rounded-full border border-white/25 bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-[#8f304d] transition-all duration-500">
                                <ArrowUpRight size={15} strokeWidth={1.5} />
                            </span>
                        </button>
                    </motion.div>

                </div>
            </section>

            <AnimatePresence>
                {selectedIndex !== null && (
                    <GalleryLightbox
                        selectedIndex={selectedIndex}
                        onClose={closeGallery}
                        onPrevious={showPrevious}
                        onNext={showNext}
                    />
                )}
            </AnimatePresence>
        </>
    );
}