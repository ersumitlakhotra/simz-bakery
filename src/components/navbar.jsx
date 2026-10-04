
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: "Home", id: "home" },
        { name: "Our Cakes", id: "cakes" },
        { name: "Custom Cakes", id: "custom" },
        { name: "Gallery", id: "gallery" },
        { name: "About Us", id: "about" },
    ];

    const scrollToSection = (id) => {
        const section = document.getElementById(id);

        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }

        setIsOpen(false);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        setIsOpen(false);
    };

    return (
        <motion.header
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 md:px-8 pt-4 md:pt-5"
        >
            <div className="max-w-7xl mx-auto">

                {/* Navbar */}
                <div className="bg-[#fffaf3]/95 backdrop-blur-xl border border-[#eadfce] rounded-full px-4 sm:px-5 md:px-7 h-14 sm:h-16 flex items-center justify-between shadow-[0_10px_40px_rgba(74,45,25,0.08)]">

                    {/* Logo */}
                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2.5 sm:gap-3 text-left"
                    >
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#5a3424] flex items-center justify-center shadow-sm shrink-0">
                            <span className="text-[#f8e5bd] text-base sm:text-lg font-serif font-semibold">
                                S
                            </span>
                        </div>

                        <div className="leading-none">
                            <div className="text-[#4a2a1d] font-serif text-lg sm:text-xl tracking-wide whitespace-nowrap">
                                Simz Bakery
                            </div>

                            <div className="hidden xs:block sm:text-[8px] text-[7px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#a67c52] mt-1 whitespace-nowrap">
                                Cakes • Bakes • Celebrations
                            </div>
                        </div>
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                        {links.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => scrollToSection(link.id)}
                                className="relative text-sm text-[#654838] hover:text-[#b27b45] transition-colors duration-300 group"
                            >
                                {link.name}

                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#b27b45] group-hover:w-full transition-all duration-300" />
                            </button>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center gap-3">

                        <button
                            onClick={() => scrollToSection("cakes")}
                            aria-label="View cakes"
                            className="w-10 h-10 rounded-full border border-[#dfd0bc] flex items-center justify-center text-[#5a3424] hover:bg-[#5a3424] hover:text-white transition-all duration-300"
                        >
                            <ShoppingBag size={17} strokeWidth={1.7} />
                        </button>

                        <button
                            onClick={() => scrollToSection("custom")}
                            className="bg-[#5a3424] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#3f2419] transition-all duration-300"
                        >
                            Order a Cake
                        </button>

                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#5a3424] text-white flex items-center justify-center shrink-0"
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

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -15, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -15, scale: 0.96 }}
                            transition={{
                                duration: 0.25,
                                ease: "easeOut",
                            }}
                            className="lg:hidden mt-3 bg-[#fffaf3]/98 backdrop-blur-xl border border-[#eadfce] rounded-[28px] p-4 shadow-[0_20px_50px_rgba(74,45,25,0.12)]"
                        >
                            <nav className="flex flex-col">

                                {links.map((link, index) => (
                                    <motion.button
                                        key={link.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: index * 0.04,
                                            duration: 0.2,
                                        }}
                                        onClick={() => scrollToSection(link.id)}
                                        className="w-full flex items-center justify-between py-3.5 px-3 text-left text-[#5a3424] text-sm border-b border-[#eadfce] last:border-0 hover:text-[#b27b45] transition-colors duration-300"
                                    >
                                        <span>{link.name}</span>

                                        <span className="text-[#b27b45] text-xs">
                                            →
                                        </span>
                                    </motion.button>
                                ))}

                                {/* Mobile CTA */}
                                <motion.button
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25 }}
                                    onClick={() => scrollToSection("custom")}
                                    className="mt-4 w-full bg-[#5a3424] text-white text-center py-3.5 rounded-full text-sm font-medium hover:bg-[#3f2419] transition-all duration-300"
                                >
                                    Order a Cake
                                </motion.button>

                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </motion.header>
    );
}

