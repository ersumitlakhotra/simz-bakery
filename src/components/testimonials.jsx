
import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Sarah Mitchell",
        role: "Birthday Celebration",
        initials: "SM",
        quote: "The cake was absolutely beautiful. It looked even better than I imagined and tasted incredible. Everyone at the party kept asking where it was from.",
    },
    {
        id: 2,
        name: "Emily Carter",
        role: "Wedding Cake",
        initials: "EC",
        quote: "Simz Bakery turned our vision into something truly special. Every little detail was perfect, from the flowers to the finishing touches.",
    },
    {
        id: 3,
        name: "Olivia Thompson",
        role: "Baby Shower",
        initials: "OT",
        quote: "The cake was the highlight of our dessert table. It was delicate, beautiful and tasted so fresh. We couldn't have asked for anything better.",
    },
    {
        id: 4,
        name: "Daniel Wilson",
        role: "Anniversary",
        initials: "DW",
        quote: "We wanted something personal and elegant, and Simz Bakery delivered exactly that. The cake looked stunning and tasted even better.",
    },
    {
        id: 5,
        name: "Sophia Anderson",
        role: "Custom Celebration",
        initials: "SA",
        quote: "From the first conversation to the final cake, everything felt effortless. You can genuinely tell how much care goes into every creation.",
    },
    {
        id: 6,
        name: "James Parker",
        role: "Birthday Celebration",
        initials: "JP",
        quote: "Beautiful presentation, amazing flavour and wonderful service. Simz Bakery has officially become our go-to bakery for celebrations.",
    },
];

function Stars() {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={12}
                    fill="currentColor"
                    strokeWidth={1}
                    className="text-[#a76f3f]"
                />
            ))}
        </div>
    );
}

function TestimonialCard({ testimonial, index }) {
    return (
        <motion.article
            initial={{
                opacity: 0,
                y: 45,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            viewport={{
                once: true,
                amount: 0.15,
            }}
            transition={{
                duration: 0.8,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
                y: -6,
            }}
            className="group relative flex flex-col justify-between min-h-[330px] sm:min-h-[350px] lg:min-h-[370px] rounded-[28px] bg-white border border-[#47291d]/8 p-6 sm:p-7 lg:p-8 shadow-[0_20px_70px_rgba(71,41,29,0.06)] transition-shadow duration-700 hover:shadow-[0_30px_90px_rgba(71,41,29,0.11)]"
        >
            <div>
                <div className="flex items-center justify-between mb-7">
                    <div className="w-10 h-10 rounded-full bg-[#f5eee7] flex items-center justify-center">
                        <Quote
                            size={16}
                            strokeWidth={1.4}
                            className="text-[#a76f3f]"
                        />
                    </div>

                    <Stars />
                </div>

                <p className="font-serif text-xl sm:text-[22px] lg:text-[24px] leading-[1.35] text-[#47291d] tracking-[-0.015em]">
                    “{testimonial.quote}”
                </p>
            </div>

            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-[#47291d]/8">
                <div className="w-10 h-10 rounded-full bg-[#47291d] text-[#f6e8da] flex items-center justify-center text-[10px] tracking-[0.08em]">
                    {testimonial.initials}
                </div>

                <div className="min-w-0">
                    <p className="text-sm font-medium text-[#47291d] truncate">
                        {testimonial.name}
                    </p>

                    <p className="mt-0.5 text-[8px] uppercase tracking-[0.22em] text-[#a76f3f]">
                        {testimonial.role}
                    </p>
                </div>
            </div>

            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#b27b45]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </motion.article>
    );
}

export default function Testimonials() {
    return (
        <section className="relative w-full overflow-hidden bg-[#faf8f5] py-24 sm:py-28 md:py-36 lg:py-40">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute left-[-18%] top-[5%] w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] rounded-full bg-[#d6a77a]/10 blur-[110px] sm:blur-[140px]" />

                <div className="absolute right-[-18%] bottom-[0%] w-[380px] h-[380px] sm:w-[550px] sm:h-[550px] rounded-full bg-[#b98a68]/10 blur-[120px] sm:blur-[150px]" />
            </div>

            <div className="relative z-10 w-full max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 35,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                    transition={{
                        duration: 0.9,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-20 items-end mb-14 sm:mb-16 md:mb-20"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-5 sm:mb-6">
                            <span className="w-7 sm:w-8 h-px bg-[#a76f3f]/50" />

                            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[#a76f3f]">
                                Kind Words
                            </span>
                        </div>

                        <h2 className="font-serif text-[44px] leading-[0.94] tracking-[-0.04em] text-[#47291d] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px]">
                            Made with love,
                            <span className="block text-[#a76f3f] italic">
                                remembered with joy.
                            </span>
                        </h2>
                    </div>

                    <div className="lg:pb-2">
                        <p className="max-w-xl text-[13px] sm:text-sm md:text-base leading-6 sm:leading-7 text-[#806655]">
                            The sweetest part of what we do isn't just making
                            beautiful cakes. It's seeing them become part of
                            birthdays, weddings, anniversaries and moments
                            worth remembering.
                        </p>

                        <div className="flex items-center gap-4 mt-6">
                            <Stars />

                            <span className="w-px h-4 bg-[#47291d]/15" />

                            <span className="text-[9px] uppercase tracking-[0.22em] text-[#806655]">
                                Loved by our customers
                            </span>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard
                            key={testimonial.id}
                            testimonial={testimonial}
                            index={index}
                        />
                    ))}
                </div>

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 25,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.3,
                    }}
                    transition={{
                        duration: 0.8,
                        delay: 0.15,
                    }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mt-10 sm:mt-12 md:mt-14"
                >
                    <p className="text-xs sm:text-sm text-[#806655]">
                        Your celebration could be our next favourite story.
                    </p>

                    <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-[#a76f3f]">
                        <span className="w-5 h-px bg-[#a76f3f]/40" />
                        Simz Bakery
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

