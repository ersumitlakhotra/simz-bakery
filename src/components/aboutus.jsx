import React from "react";
import { motion } from "framer-motion";
import {
    ArrowUpRight,
    CakeSlice,
    Heart,
    MapPin,
    Sparkles
} from "lucide-react";

const values = [
    {
        icon: CakeSlice,
        title: "Baked with care",
        text: "Every creation is prepared with attention to flavour, texture and the smallest finishing detail.",
    },
    {
        icon: Heart,
        title: "Made for moments",
        text: "From quiet celebrations to once-in-a-lifetime milestones, every occasion deserves something special.",
    },
    {
        icon: Sparkles,
        title: "Made your way",
        text: "Your colours, your theme, your story. We love turning your ideas into something uniquely yours.",
    },
];

export default function About() {
    const googleMapsUrl =
        "https://www.google.com/maps/place/Simz+bakery/@43.649433,-79.7735127,773m/data=!3m1!1e3!4m6!3m5!1s0x882b15297bc86f2f:0x77defdc049fc7931!8m2!3d43.6486046!4d-79.7756672!16s%2Fg%2F11vzlg0g11?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D";

    const instagramUrl = "https://www.instagram.com/simzbakery_/";
    const youtubeUrl = "https://www.youtube.com/";

    return (
        <section id="about" className="relative w-full overflow-hidden bg-white py-24 sm:py-28 md:py-36 lg:py-40">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute left-[-18%] top-[5%] w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full bg-[#f3b8c8]/14 blur-[120px] sm:blur-[160px]" />

                <div className="absolute right-[-18%] bottom-[-5%] w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] rounded-full bg-[#d98fa5]/12 blur-[130px] sm:blur-[170px]" />

                <div className="absolute top-[-15%] left-[48%] w-[14%] h-[140%] rotate-[22deg] bg-white blur-[55px]" />
            </div>

            <div className="relative z-10 w-full max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -45 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                    >
                        <div className="relative w-full max-w-[650px] mx-auto">
                            <div className="absolute -top-5 -left-5 sm:-top-7 sm:-left-7 w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-[#d98fa5]/20" />

                            <div className="absolute -bottom-7 -right-7 sm:-bottom-10 sm:-right-10 w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-[#d98fa5]/12 blur-3xl" />

                            <div className="absolute top-[15%] right-[-4%] w-24 h-24 rounded-full bg-[#f3b8c8]/20 blur-3xl" />

                            <div className="relative w-full max-w-[560px] aspect-square rounded-full overflow-hidden bg-[#f4dce3] shadow-[0_40px_110px_rgba(77,48,56,0.16)]">
                                <img
                                    src="/images/aboutus.jpg"
                                    alt="Simz Bakery"
                                    className="w-full h-full object-cover"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-[#4d3038]/45 via-transparent to-white/5" />

                                <div className="absolute inset-4 sm:inset-5 rounded-[34%] border border-white/25 pointer-events-none" />

                                <div className="absolute left-5 bottom-5 sm:left-7 sm:bottom-7 right-5 sm:right-7 flex items-end justify-between gap-4">
                                    <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-xl border border-white/25 px-4 py-2.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white" />

                                        <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-white">
                                            Simz Bakery
                                        </span>
                                    </div>

                                    <div className="hidden sm:flex w-11 h-11 rounded-full bg-white/15 backdrop-blur-xl border border-white/25 items-center justify-center">
                                        <Heart
                                            size={16}
                                            strokeWidth={1.3}
                                            className="text-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.35 }}
                                className="absolute -bottom-7 left-5 sm:left-8 rounded-2xl sm:rounded-3xl bg-white shadow-[0_20px_60px_rgba(77,48,56,0.12)] border border-[#4d3038]/8 px-5 py-4 sm:px-6 sm:py-5"
                            >
                                <p className="text-[8px] uppercase tracking-[0.25em] text-[#b27a8b]">
                                    Our philosophy
                                </p>

                                <p className="mt-1.5 font-serif text-base sm:text-lg text-[#4d3038]">
                                    Simple. Personal. Sweet.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 45 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="flex items-center gap-3 mb-5 sm:mb-6">
                            <span className="w-8 h-px bg-[#d98fa5]" />

                            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[#b27a8b] font-semibold">
                                About Simz Bakery
                            </span>

                            <Sparkles
                                size={13}
                                className="text-[#d98fa5]"
                            />
                        </div>

                        <h2 className="font-serif text-[46px] leading-[0.94] tracking-[-0.04em] text-[#4d3038] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px]">
                            More than
                            <span className="block text-[#d98fa5] italic">
                                just cake.
                            </span>
                        </h2>

                        <div className="mt-7 sm:mt-8 max-w-xl space-y-5 text-[13px] sm:text-sm md:text-base leading-6 sm:leading-7 text-[#80656d]">
                            <p>
                                At Simz Bakery, we believe the best cakes are
                                the ones that become part of a memory.
                            </p>

                            <p>
                                Whether you're celebrating a birthday,
                                welcoming a little one, saying "I do", or
                                simply making an ordinary day a little
                                sweeter, we create cakes with the same care
                                we'd want for our own special moments.
                            </p>

                            <p>
                                From the first idea to the final finishing
                                touch, every creation is made to feel
                                personal, beautiful and completely yours.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-3 mt-9 sm:mt-10">
                            {values.map((value, index) => {
                                const Icon = value.icon;

                                return (
                                    <motion.div
                                        key={value.title}
                                        initial={{ opacity: 0, y: 25 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{
                                            duration: 0.7,
                                            delay: index * 0.1,
                                        }}
                                        className="group rounded-2xl bg-white border border-[#4d3038]/8 p-4 sm:p-5 shadow-[0_10px_35px_rgba(77,48,56,0.04)] hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(217,143,165,0.1)] transition-all duration-500"
                                    >
                                        <div className="w-9 h-9 rounded-full bg-[#f8e5eb] flex items-center justify-center mb-4 group-hover:bg-[#d98fa5] transition-colors duration-500">
                                            <Icon
                                                size={16}
                                                strokeWidth={1.35}
                                                className="text-[#d98fa5] group-hover:text-white transition-colors duration-500"
                                            />
                                        </div>

                                        <h3 className="font-serif text-base sm:text-lg text-[#4d3038]">
                                            {value.title}
                                        </h3>

                                        <p className="mt-2 text-[10px] sm:text-[11px] leading-5 text-[#80656d]">
                                            {value.text}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.9, delay: 0.1 }}
                    className="mt-20 sm:mt-24 md:mt-32"
                >
                    <div className="relative overflow-hidden rounded-[30px] sm:rounded-[38px] bg-[#d98fa5] text-white p-6 sm:p-8 md:p-10 lg:p-12 shadow-[0_30px_90px_rgba(217,143,165,0.2)]">
                        <div className="absolute right-[-100px] top-[-130px] w-[350px] h-[350px] rounded-full bg-white/15 blur-[100px]" />

                        <div className="absolute left-[35%] bottom-[-150px] w-[350px] h-[350px] rounded-full bg-[#8f304d]/15 blur-[110px]" />

                        <div className="absolute top-0 left-0 right-0 h-[45%] bg-gradient-to-b from-white/12 to-transparent pointer-events-none" />

                        <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-center">
                            <div>
                                <div className="flex items-center gap-3 mb-5">
                                    <MapPin
                                        size={17}
                                        strokeWidth={1.3}
                                        className="text-white/80"
                                    />

                                    <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-white/75">
                                        Find us in Brampton
                                    </span>
                                </div>

                                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em]">
                                    Come say hello.
                                </h3>

                                <p className="mt-4 max-w-xl text-xs sm:text-sm leading-6 text-white/70">
                                    We'd love to welcome you and share a
                                    little sweetness with you. Visit Simz
                                    Bakery in Brampton, Ontario.
                                </p>

                                <div className="mt-6">
                                    <p className="text-[8px] uppercase tracking-[0.25em] text-white/50 mb-2">
                                        Our location
                                    </p>

                                    <p className="text-sm sm:text-base text-white">
                                        6 Porter Creek Hollow
                                    </p>

                                    <p className="mt-1 text-xs sm:text-sm text-white/65">
                                        Brampton, ON L6Y 3A8
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-3 mt-7">
                                    <a
                                        href={instagramUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 hover:bg-white hover:text-[#8f304d] transition-all duration-500"
                                    >
                                      

                                        <span className="text-[9px] uppercase tracking-[0.2em]">
                                            Instagram
                                        </span>

                                        <ArrowUpRight
                                            size={12}
                                            strokeWidth={1.4}
                                            className="opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                                        />
                                    </a>

                                   {/* <a
                                        href={youtubeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 hover:bg-white hover:text-[#8f304d] transition-all duration-500"
                                    >
                                    

                                        <span className="text-[9px] uppercase tracking-[0.2em]">
                                            YouTube
                                        </span>

                                        <ArrowUpRight
                                            size={12}
                                            strokeWidth={1.4}
                                            className="opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                                        />
                                    </a>*/}
                                </div>
                            </div>

                            <a
                                href={googleMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center gap-3 rounded-full bg-white text-[#8f304d] px-6 py-3.5 text-[9px] uppercase tracking-[0.22em] hover:bg-[#fff5f8] transition-colors duration-500 whitespace-nowrap shadow-[0_15px_35px_rgba(77,48,56,0.12)]"
                            >
                                Get Directions

                                <span className="w-8 h-8 rounded-full bg-[#d98fa5]/15 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-500">
                                    <ArrowUpRight
                                        size={15}
                                        strokeWidth={1.4}
                                    />
                                </span>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}