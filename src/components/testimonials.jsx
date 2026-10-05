
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Quote, Star, ArrowUpRight } from "lucide-react";

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
                <Star key={star} size={11} fill="currentColor" strokeWidth={1} className="text-[#d98fa5]" />
            ))}
        </div>
    );
}

function TestimonialCard({ testimonial, index, progress }) {
    const positions = [
        { x: -125, y: 35, rotate: -17, scale: 0.92 },
        { x: -65, y: 5, rotate: -9, scale: 0.96 },
        { x: 0, y: -18, rotate: 0, scale: 1 },
        { x: 65, y: 5, rotate: 9, scale: 0.96 },
        { x: 125, y: 35, rotate: 17, scale: 0.92 },
    ];

    const position = positions[index];

    const startX = index === 0 ? 0 : 12;
    const startY = 145 - index * 8;
    const startRotate = index % 2 === 0 ? -2 : 2;

    const cardProgress = Math.max(0, Math.min(1, (progress - index * 0.11) / 0.38));

    const x = startX + (position.x - startX) * cardProgress;
    const y = startY + (position.y - startY) * cardProgress;
    const rotate = startRotate + (position.rotate - startRotate) * cardProgress;
    const scale = 0.78 + (position.scale - 0.78) * cardProgress;
    const opacity = Math.min(1, cardProgress * 2);

    return (
        <motion.article
            initial={false}
            whileHover={{
                x: x,
                y: y - 55,
                rotate: 0,
                scale: Math.min(scale + 0.12, 1.12),
                zIndex: 100,
                transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }
            }}
            style={{
                x,
                y,
                rotate,
                scale,
                opacity,
                zIndex: index + 10,
                transformPerspective: 1200
            }}
            className="absolute left-1/2 top-1/2 w-[220px] xs:w-[230px] sm:w-[275px] lg:w-[290px] h-[315px] xs:h-[325px] sm:h-[385px] lg:h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-[24px] sm:rounded-[30px] overflow-hidden border border-white/90 bg-white shadow-[0_30px_80px_rgba(77,48,56,0.2)] origin-bottom cursor-pointer"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white via-[#fff8fa] to-[#f3d4de]" />

            <div className="absolute top-[-90px] right-[-80px] w-[260px] h-[260px] rounded-full bg-[#d98fa5]/18 blur-3xl" />

            <div className="absolute bottom-[-100px] left-[-80px] w-[240px] h-[240px] rounded-full bg-[#f3b8c8]/18 blur-3xl" />

            <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/90 via-white/30 to-transparent" />

            <div className="relative h-full p-5 sm:p-7 flex flex-col">
                <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-full bg-[#d98fa5] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(217,143,165,0.2)]">
                        <Quote size={14} strokeWidth={1.4} />
                    </div>

                    <Stars />
                </div>

                <div className="mt-5 sm:mt-6">
                    <p className="text-[7px] uppercase tracking-[0.25em] text-[#b27a8b] font-semibold">
                        {testimonial.role}
                    </p>

                    <p className="mt-3 sm:mt-4 font-serif text-[#4d3038] text-[16px] sm:text-[20px] leading-[1.3] tracking-[-0.02em]">
                        “{testimonial.quote}”
                    </p>
                </div>

                <div className="mt-auto pt-4 sm:pt-5 border-t border-[#d98fa5]/15 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-[#4d3038] text-white flex items-center justify-center text-[8px] tracking-[0.08em]">
                            {testimonial.initials}
                        </div>

                        <div>
                            <p className="text-[10px] sm:text-[11px] font-medium text-[#4d3038]">
                                {testimonial.name}
                            </p>

                            <p className="mt-0.5 text-[7px] uppercase tracking-[0.18em] text-[#b27a8b]">
                                Customer
                            </p>
                        </div>
                    </div>

                    <div className="text-[#d98fa5]">
                        <ArrowUpRight size={15} strokeWidth={1.4} />
                    </div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, x: "-100%" }}
                whileHover={{
                    opacity: 1,
                    x: "100%",
                    transition: {
                        duration: 0.7,
                        ease: "easeInOut"
                    }
                }}
                className="absolute inset-y-0 left-[-35%] w-[35%] rotate-[15deg] bg-white/35 blur-xl pointer-events-none"
            />
        </motion.article>
    );
}

function CardDeck({ progress }) {
    return (
        <div className="relative w-full h-[500px] sm:h-[590px] lg:h-[670px] flex items-center justify-center">
            <div className="absolute bottom-[12%] left-1/2 -translate-x-1/2 w-[300px] sm:w-[380px] h-[200px] sm:h-[250px] rounded-full bg-[#d98fa5]/15 blur-[100px]" />

            <div className="absolute inset-0">
                {testimonials.slice(0, 5).map((testimonial, index) => (
                    <TestimonialCard
                        key={testimonial.id}
                        testimonial={testimonial}
                        index={index}
                        progress={progress}
                    />
                ))}
            </div>

            <motion.div
                style={{
                    scale: 1 - progress * 0.03,
                    y: progress * 20,
                }}
                className="absolute bottom-[6%] sm:bottom-[7%] left-1/2 -translate-x-1/2 w-[220px] sm:w-[285px] lg:w-[300px] h-[82px] sm:h-[100px] rounded-[22px] z-[5]"
            >
                <div className="absolute inset-x-[-15px] bottom-[-18px] h-[65px] rounded-full bg-[#4d3038]/15 blur-2xl" />

                <div className="absolute inset-x-[-7px] top-[9px] bottom-[-7px] rounded-[22px] bg-[#e7b9c5] border border-white/60 rotate-[1deg]" />

                <div className="absolute inset-x-[-4px] top-[5px] bottom-[-4px] rounded-[21px] bg-[#f5dce3] border border-white/80 rotate-[-1deg]" />

                <div className="relative w-full h-full rounded-[20px] overflow-hidden border border-white bg-gradient-to-br from-[#f5d4df] via-[#d98fa5] to-[#b96b83] shadow-[0_20px_50px_rgba(77,48,56,0.22)]">
                    <div className="absolute inset-x-0 top-0 h-[45%] bg-white/25" />

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[78%] h-[62%] rounded-[14px] border border-white/40 flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-white/75 text-[7px] uppercase tracking-[0.3em]">
                                    Simz Bakery
                                </p>

                                <p className="mt-2 font-serif text-white text-lg italic">
                                    Kind Words
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function Testimonials() {
    const sectionRef = useRef(null);
    const [progress, setProgress] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (value) => {
            setProgress(value);
        });

        return () => unsubscribe();
    }, [scrollYProgress]);

    const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-[220vh] bg-[#fffafd]"
        >
            <div className="sticky top-0 h-screen overflow-hidden">
                <div className="relative z-10 w-full h-full max-w-[1500px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12">
                    <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-2 sm:gap-8 lg:gap-16 xl:gap-20 h-full items-center">
                        <motion.div
                            style={{ opacity: headingOpacity }}
                            className="relative z-20 max-w-xl lg:pb-20 pt-8 sm:pt-0"
                        >
                            <div className="flex items-center gap-3 mb-4 sm:mb-6">
                                <span className="w-8 h-px bg-[#d98fa5]" />

                                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-[#b27a8b] font-semibold">
                                    Kind Words
                                </span>
                            </div>

                            <h2 className="font-serif text-[38px] leading-[0.93] tracking-[-0.045em] text-[#4d3038] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[78px]">
                                Made with love,
                                <span className="block text-[#d98fa5] italic">
                                    remembered with joy.
                                </span>
                            </h2>

                            <p className="mt-5 sm:mt-7 max-w-lg text-[12px] sm:text-sm md:text-base leading-5 sm:leading-7 text-[#80656d]">
                                The sweetest part of what we do isn't just making
                                beautiful cakes. It's seeing them become part of
                                birthdays, weddings, anniversaries and moments
                                worth remembering.
                            </p>

                            <div className="flex items-center gap-5 mt-6 sm:mt-8">
                                <Stars />

                                <div className="w-px h-5 bg-[#4d3038]/15" />

                                <div>
                                    <div className="text-[#4d3038] text-sm font-medium">
                                        4.9 / 5
                                    </div>

                                    <div className="text-[#9a7c83] text-[8px] uppercase tracking-[0.2em] mt-1">
                                        Loved by our customers
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 sm:mt-10 flex items-center gap-3">
                                <div className="w-10 h-px bg-[#d98fa5]/40" />

                                <span className="text-[8px] uppercase tracking-[0.25em] text-[#b27a8b]">
                                    Scroll to reveal
                                </span>
                            </div>
                        </motion.div>

                        
<div className="relative w-full h-full min-h-0 flex items-center justify-center lg:justify-end overflow-visible -translate-y-[55px] sm:-translate-y-[35px] lg:translate-y-0">
    <CardDeck progress={progress} />
</div>

                    </div>
                </div>

                <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
                    {testimonials.slice(0, 5).map((_, index) => {
                        const cardStart = index * 0.11;
                        const active = progress >= cardStart + 0.22;

                        return (
                            <div
                                key={index}
                                className={`h-1 rounded-full transition-all duration-500 ${active ? "w-8 bg-[#d98fa5]" : "w-2 bg-[#d98fa5]/20"}`}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
