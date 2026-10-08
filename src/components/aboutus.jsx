
import React from "react";
import { motion } from "framer-motion";
import {
    ArrowUpRight,
    Heart,
    MapPin,
    Sparkles,
} from "lucide-react";

export default function About() {
    const googleMapsUrl =
        "https://www.google.com/maps/place/Simz+bakery/@43.649433,-79.7735127,773m/data=!3m1!1e3!4m6!3m5!1s0x882b15297bc86f2f:0x77defdc049fc7931!8m2!3d43.6486046!4d-79.7756672!16s%2Fg%2F11vzlg0g11?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D";

    const instagramUrl = "https://www.instagram.com/simzbakery_/";

    return (
        <section id="about" className="relative w-full overflow-hidden bg-[#fffdfd] py-16 sm:py-20 md:py-24 lg:py-28">

            {/* Background atmosphere */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -left-[18%] top-[8%] w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full bg-[#f3b8c8]/10 blur-[140px]" />

                <div className="absolute -right-[15%] top-[38%] w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full bg-[#d98fa5]/10 blur-[160px]" />

                <div className="absolute left-[48%] top-0 w-px h-full bg-[#d98fa5]/[0.07]" />
            </div>

            <div className="relative z-10 max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12">

                {/* Main Story */}
                <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 xl:gap-28 items-center">

                    {/* LEFT — IMAGE */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                            duration: 1,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="relative"
                    >
                        <div className="relative max-w-[620px] mx-auto">

                            {/* Image */}
                            <div className="relative aspect-[0.86] rounded-[45%_45%_32px_32px] overflow-hidden bg-[#f3dfe5] shadow-[0_45px_120px_rgba(77,48,56,0.14)]">

                                <img
                                    src="/images/simran.jpg"
                                    alt="Simz Bakery founder"
                                    className="w-full h-full object-cover"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-[#351e27]/55 via-transparent to-white/5" />

                                {/* Image frame */}
                                <div className="absolute inset-5 sm:inset-7 rounded-[42%_42%_24px_24px] border border-white/20 pointer-events-none" />

                                {/* Image label */}
                                <div className="absolute top-6 left-6 sm:top-8 sm:left-8 flex items-center gap-2.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white" />

                                    <span className="text-[8px] uppercase tracking-[0.3em] text-white/80">
                                        Simz Bakery
                                    </span>
                                </div>

                                {/* Bottom image content */}
                                <div className="absolute left-6 right-6 bottom-7 sm:left-8 sm:right-8 sm:bottom-9">

                                    <div className="flex items-end justify-between gap-4">

                                        <div>
                                            <p className="text-[8px] uppercase tracking-[0.3em] text-white/55 mb-2">
                                                Founder
                                            </p>

                                            <p className="font-serif text-2xl sm:text-3xl text-white tracking-[-0.02em]">
                                                Simz Bakery
                                            </p>
                                        </div>

                                        <div className="w-11 h-11 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl flex items-center justify-center">
                                            <Heart
                                                size={16}
                                                strokeWidth={1.2}
                                                className="text-white"
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* FLOATING CARD */}
                            <motion.div
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.35,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="absolute -bottom-9 left-5 sm:left-10 rounded-[22px] bg-white/90 backdrop-blur-xl border border-[#4d3038]/[0.07] shadow-[0_25px_70px_rgba(77,48,56,0.14)] px-6 py-5 sm:px-7 sm:py-6"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-[#f8e5eb] flex items-center justify-center">
                                        <Sparkles
                                            size={14}
                                            strokeWidth={1.3}
                                            className="text-[#d98fa5]"
                                        />
                                    </div>

                                    <div>
                                        <p className="text-[7px] uppercase tracking-[0.3em] text-[#b27a8b]">
                                            The journey
                                        </p>

                                        <p className="mt-1 font-serif text-lg text-[#4d3038]">
                                            From art to cake.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* RIGHT — STORY */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                            duration: 1,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="relative"
                    >

                        {/* Eyebrow */}
                        <div className="flex items-center gap-3 mb-6 sm:mb-7">
                            <span className="w-10 h-px bg-[#d98fa5]" />

                            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.35em] text-[#b27a8b] font-semibold">
                                About Simz Bakery
                            </span>

                            <Sparkles
                                size={12}
                                strokeWidth={1.3}
                                className="text-[#d98fa5]"
                            />
                        </div>

                        {/* Heading */}
                        <h2 className="font-serif text-[48px] leading-[0.92] tracking-[-0.045em] text-[#4d3038] sm:text-6xl md:text-7xl lg:text-[72px] xl:text-[86px]">
                            My journey
                            <span className="block text-[#d98fa5] italic">
                                with baking.
                            </span>
                        </h2>

                        {/* Story */}
                        <div className="mt-7 sm:mt-8 max-w-[680px]">

                            <p className="text-[14px] sm:text-[15px] md:text-[16px] leading-7 sm:leading-8 text-[#80656d]">
                                My journey with baking began long before I ever baked my first cake.
                            </p>

                            <p className="mt-5 text-[14px] sm:text-[15px] md:text-[16px] leading-7 sm:leading-8 text-[#80656d]">
                                Since childhood, I have always been deeply connected to art. I was naturally drawn to painting, sketching, and creating beautiful artwork. I never learned these skills professionally — creativity simply came from within me. Art was always a part of who I was.
                            </p>

                            <p className="mt-5 text-[14px] sm:text-[15px] md:text-[16px] leading-7 sm:leading-8 text-[#80656d]">
                                However, for a long time, I felt that my talent was not truly appreciated, and I started believing it had no real purpose or future. Slowly, I stepped away from art and left that passion behind.
                            </p>

                            <div className="my-6 flex items-center gap-4">
                                <span className="w-10 h-px bg-[#d98fa5]/40" />
                                <span className="w-1.5 h-1.5 rounded-full bg-[#d98fa5]/60" />
                                <span className="flex-1 h-px bg-[#d98fa5]/20" />
                            </div>

                            <p className="text-[14px] sm:text-[15px] md:text-[16px] leading-7 sm:leading-8 text-[#80656d]">
                                Years later, after moving to Canada following my marriage, everything changed. For the first time, I discovered the world of artistic cakes created by talented cake artists. The designs, colors, and creativity amazed me in a way I had never experienced before. It awakened the artist inside me once again — but this time, my canvas became cake.
                            </p>

                            <p className="mt-5 text-[14px] sm:text-[15px] md:text-[16px] leading-7 sm:leading-8 text-[#80656d]">
                                I started learning how to bake and decorate cakes, and within just a few months, I developed my skills through passion, dedication, and creativity. The love and support I received from people gave me confidence and motivation to continue growing.
                            </p>

                            <p className="mt-5 text-[14px] sm:text-[15px] md:text-[16px] leading-7 sm:leading-8 text-[#80656d]">
                                Today, baking is more than just a business for me — it is a form of art, emotion, and happiness that I get to share with others. Every cake I create is made with love, creativity, and a piece of my journey.
                            </p>

                            {/* Closing */}
                            <div className="mt-7 sm:mt-8 pt-6 border-t border-[#4d3038]/10">
                                <p className="font-serif text-xl sm:text-2xl md:text-3xl leading-tight text-[#4d3038]">
                                    And that is how{" "}
                                    <span className="text-[#d98fa5] italic">
                                        Simz Bakery
                                    </span>{" "}
                                    began.
                                </p>
                            </div>

                        </div>
                    </motion.div>
                </div>

                {/* LOCATION */}
                <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.9 }}
                    className="mt-16 sm:mt-20 md:mt-24"
                >
                    <div className="relative overflow-hidden rounded-[30px] sm:rounded-[40px] bg-[#d98fa5] text-white p-7 sm:p-9 md:p-12 lg:p-14 shadow-[0_35px_100px_rgba(217,143,165,0.22)]">

                        <div className="absolute right-[-100px] top-[-140px] w-[400px] h-[400px] rounded-full bg-white/15 blur-[110px]" />

                        <div className="absolute left-[35%] bottom-[-180px] w-[400px] h-[400px] rounded-full bg-[#8f304d]/15 blur-[120px]" />

                        <div className="absolute inset-x-0 top-0 h-[50%] bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

                        <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-center">

                            <div>
                                <div className="flex items-center gap-3 mb-5">
                                    <MapPin
                                        size={17}
                                        strokeWidth={1.2}
                                        className="text-white/75"
                                    />

                                    <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-white/70">
                                        Find us in Brampton
                                    </span>
                                </div>

                                <h3 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-[-0.03em]">
                                    Come say hello.
                                </h3>

                                <p className="mt-5 max-w-xl text-xs sm:text-sm leading-6 text-white/70">
                                    We'd love to welcome you and share a
                                    little sweetness with you. Visit Simz
                                    Bakery in Brampton, Ontario.
                                </p>

                                <div className="mt-7">
                                    <p className="text-[8px] uppercase tracking-[0.25em] text-white/45 mb-2">
                                        Our location
                                    </p>

                                    <p className="text-sm sm:text-base text-white">
                                        6 Porter Creek Hollow
                                    </p>

                                    <p className="mt-1 text-xs sm:text-sm text-white/60">
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