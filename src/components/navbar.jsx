
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: "Home", id: "Home" },
        { name: "Our Cakes", id: "cakes" },
        { name: "Gallery", id: "gallery" },
        { name: "Feedback", id: "feedback" },
        { name: "About Us", id: "about" },
    ];

    const TOTAL_FRAMES = 839;

    const scrollToFrame = (targetFrame) => {
        const section = document.getElementById("HomeScroll");

        if (!section) return;

        const scrollableDistance = section.offsetHeight - window.innerHeight;
        const progress = targetFrame / (TOTAL_FRAMES - 1);

        const targetY = section.offsetTop + progress * scrollableDistance;

        window.scrollTo({
            top: targetY,
            behavior: "smooth",
        });

        setIsOpen(false);
    };

    const scrollToSection = (id) => {
        const section = document.getElementById(id);

        if (!section) return;

        section.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

        setIsOpen(false);
    };

    const handleNavigation = (id) => {
        if (id === "Home") {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

            setIsOpen(false);
            return;
        }

        if (id === "cakes") {
            scrollToFrame(500);
            return;
        }

        scrollToSection(id);
    };

    return (
        <motion.header
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 w-full"
        >
            <div className="w-full bg-white/55 backdrop-blur-xl border-b border-white/40 shadow-[0_12px_35px_rgba(60,30,40,0.16),0_4px_12px_rgba(217,143,165,0.08)]">
                <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 h-16 sm:h-[72px] flex items-center justify-between">

                    <button
                        onClick={() => handleNavigation("Home")}
                        className="flex items-center gap-2.5 sm:gap-3 text-left"
                    >
                        <img
                            src="/images/logo.png"
                            alt="Simz Bakery"
                            className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_2px_5px_rgba(60,30,40,0.12)]"
                        />

                        <div className="leading-none">
                            <div className="text-[#3a2528] font-serif text-lg sm:text-xl tracking-wide whitespace-nowrap drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)]">
                                Simz Bakery
                            </div>

                            <div className="hidden xs:block sm:text-[8px] text-[7px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#9d6675] mt-1 whitespace-nowrap">
                                Cakes • Bakes • Celebrations
                            </div>
                        </div>
                    </button>

                    <nav className="hidden lg:flex items-center gap-6 xl:gap-9">
                        {links.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => handleNavigation(link.id)}
                                className="relative text-sm text-[#4d383c] hover:text-[#c66f88] transition-colors duration-300 group drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)]"
                            >
                                {link.name}

                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#d98fa5] group-hover:w-full transition-all duration-300" />
                            </button>
                        ))}
                    </nav>

                    <div className="hidden lg:flex items-center gap-3">


                        <button
                            onClick={() => handleNavigation("booking")}
                            className="bg-[#d98fa5]/90 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#c8788f] transition-all duration-300 shadow-[0_7px_20px_rgba(100,40,60,0.20)]"
                        >
                            Order a Cake
                        </button>

                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#d98fa5]/90 backdrop-blur-md text-white flex items-center justify-center shrink-0 shadow-[0_5px_15px_rgba(80,35,50,0.18)]"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {isOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                    exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X size={19} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
                                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                    exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu size={19} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>

                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="lg:hidden w-full bg-white/70 backdrop-blur-2xl border-b border-white/50 shadow-[0_20px_45px_rgba(60,30,40,0.16)]"
                    >
                        <nav className="px-4 sm:px-6 py-3">

                            {links.map((link, index) => (
                                <motion.button
                                    key={link.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.04, duration: 0.2 }}
                                    onClick={() => handleNavigation(link.id)}
                                    className="w-full flex items-center justify-between py-3.5 px-2 text-left text-[#5a4145] text-sm border-b border-white/50 last:border-0 hover:text-[#d07891] transition-colors duration-300"
                                >
                                    <span>{link.name}</span>

                                    <span className="text-[#d98fa5] text-xs">
                                        →
                                    </span>
                                </motion.button>
                            ))}

                            <motion.button
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25 }}
                                onClick={() => handleNavigation("booking")}
                                className="mt-4 mb-2 w-full bg-[#d98fa5]/90 text-white text-center py-3.5 rounded-full text-sm font-medium hover:bg-[#c8788f] transition-all duration-300 shadow-[0_7px_20px_rgba(100,40,60,0.18)]"
                            >
                                Order a Cake
                            </motion.button>

                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

