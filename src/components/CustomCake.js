
import React, { useEffect, useState } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import {
    ArrowUpRight,
    Check,
    CakeSlice,
    Baby,
    Heart,
    HeartHandshake,
    GraduationCap,
    Flower2,
    ToyBrick,
    Cookie,
    Cherry,
    Crown,
    PartyPopper,
} from "lucide-react";

const cakes = [
    {
        id: 1,
        name: "Birthday Bloom",
        category: "Birthday",
        image: "/images/custom/cake-01.jpg",
        icon: CakeSlice,
        description: "A joyful creation designed to make every birthday celebration feel beautifully unforgettable.",
    },
    {
        id: 2,
        name: "Little Wonder",
        category: "Baby Shower",
        image: "/images/custom/cake-02.jpg",
        icon: Baby,
        description: "A delicate and charming creation for celebrating life's sweetest new beginning.",
    },
    {
        id: 3,
        name: "The Wedding",
        category: "Wedding",
        image: "/images/custom/cake-03.jpg",
        icon: Heart,
        description: "An elegant centerpiece crafted to become part of the memories of your special day.",
    },
    {
        id: 4,
        name: "Forever",
        category: "Anniversary",
        image: "/images/custom/cake-04.jpg",
        icon: HeartHandshake,
        description: "A romantic creation celebrating the love, memories and beautiful journey you share.",
    },
    {
        id: 5,
        name: "The Graduate",
        category: "Graduation",
        image: "/images/custom/cake-05.jpg",
        icon: GraduationCap,
        description: "A celebratory design made to mark an achievement worth remembering for years to come.",
    },
    {
        id: 6,
        name: "Floral Story",
        category: "Floral",
        image: "/images/custom/cake-06.jpg",
        icon: Flower2,
        description: "Beautiful hand-finished floral details bring elegance, softness and natural charm to every celebration.",
    },
    {
        id: 7,
        name: "Little Star",
        category: "Kids Cartoon",
        image: "/images/custom/cake-07.jpg",
        icon: ToyBrick,
        description: "Playful, colorful and imaginative, made to create magical childhood memories.",
    },
    {
        id: 8,
        name: "Chocolate Muse",
        category: "Chocolate",
        image: "/images/custom/cake-08.jpg",
        icon: Cookie,
        description: "Rich chocolate indulgence crafted for those who believe every celebration deserves something irresistible.",
    },
    {
        id: 9,
        name: "Berry Love",
        category: "Strawberry",
        image: "/images/custom/cake-09.jpg",
        icon: Cherry,
        description: "Fresh strawberry-inspired elegance with delicate details and a beautifully sweet finish.",
    },
    {
        id: 10,
        name: "The Classic",
        category: "Minimalist",
        image: "/images/custom/cake-10.jpg",
        icon: CakeSlice,
        description: "Clean, refined and timeless, proving that beautiful simplicity never goes out of style.",
    },
    {
        id: 11,
        name: "Golden Dream",
        category: "Luxury Designer",
        image: "/images/custom/cake-11.jpg",
        icon: Crown,
        description: "A sophisticated statement cake created for celebrations that deserve an extraordinary centerpiece.",
    },
    {
        id: 12,
        name: "Your Story",
        category: "Celebration Theme",
        image: "/images/custom/cake-12.jpg",
        icon: PartyPopper,
        description: "Bring your imagination to life with a completely personalized cake made uniquely for your celebration.",
    },
];


/* ---------------------------------------------
   ORBIT ITEM
--------------------------------------------- */

function OrbitCake({
    cake,
    index,
    selectedCake,
    orbitRotation,
    onSelect,
}) {
    const Icon = cake.icon;

    const counterRotation = useTransform(
        orbitRotation,
        (value) => -value
    );

    const angle =
        (index / cakes.length) * Math.PI * 2 -
        Math.PI / 2;

    const x = 50 + Math.cos(angle) * 45;
    const y = 50 + Math.sin(angle) * 45;

    const isSelected = selectedCake === index;

    return (
        <div
            className="absolute w-0 h-0"
            style={{
                left: `${x}%`,
                top: `${y}%`,
            }}
        >
            <motion.div
                style={{
                    rotate: counterRotation,
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
                <motion.button
                    onClick={() => onSelect(index)}
                    animate={{
                        scale: isSelected ? 1.12 : 1,
                    }}
                    whileHover={{
                        scale: isSelected ? 1.18 : 1.08,
                    }}
                    whileTap={{
                        scale: 0.94,
                    }}
                    className="group relative flex flex-col items-center justify-center"
                    aria-label={`View ${cake.category} cake`}
                >

                    {/* Icon */}
                    <div
                        className={`relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full transition-all duration-500 ${
                            isSelected
                                ? "bg-[#47291d] shadow-[0_16px_40px_rgba(71,41,29,0.28)]"
                                : "bg-white shadow-[0_8px_25px_rgba(71,41,29,0.12)] border border-[#b27b45]/15 group-hover:border-[#b27b45]/40"
                        }`}
                    >

                        {/* Active Ring */}
                        {isSelected && (
                            <>
                                <div className="absolute inset-[-5px] rounded-full border border-[#a76f3f]/35" />
                                <div className="absolute inset-[-9px] rounded-full border border-[#a76f3f]/10" />
                            </>
                        )}

                        <Icon
                            size={25}
                            strokeWidth={1.45}
                            className={`relative z-10 transition-colors duration-500 ${
                                isSelected
                                    ? "text-[#f6e8da]"
                                    : "text-[#806655] group-hover:text-[#a76f3f]"
                            }`}
                        />

                    </div>


                    {/* Category */}
                    <div
                        className={`absolute top-[calc(100%+9px)] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-1 transition-all duration-500 ${
                            isSelected
                                ? "bg-[#47291d] text-[#f6e8da] shadow-[0_8px_20px_rgba(71,41,29,0.16)] opacity-100"
                                : "bg-white/95 text-[#806655] border border-[#b27b45]/10 opacity-80 group-hover:opacity-100"
                        }`}
                    >
                        <span className="text-[7px] sm:text-[8px] uppercase tracking-[0.16em]">
                            {cake.category}
                        </span>
                    </div>


                    {/* Active Dot */}
                    {isSelected && (
                        <motion.span
                            layoutId="activeCakeDot"
                            className="absolute -top-2 -right-1 w-2 h-2 rounded-full bg-[#a76f3f] ring-2 ring-[#f8f3ed]"
                        />
                    )}

                </motion.button>
            </motion.div>
        </div>
    );
}


/* ---------------------------------------------
   MAIN COMPONENT
--------------------------------------------- */

export default function CustomCake({ sectionRef }) {
    const [selectedCake, setSelectedCake] = useState(0);
    const [direction, setDirection] = useState(1);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 28,
        mass: 0.25,
    });

    const orbitRotation = useTransform(
        smoothProgress,
        [0, 1],
        [0, 360]
    );

    const cakeScale = useTransform(
        smoothProgress,
        [0, 0.04, 0.5, 0.96, 1],
        [0.96, 1, 1, 1, 0.97]
    );

    const progressWidth = useTransform(
        smoothProgress,
        [0, 1],
        ["0%", "100%"]
    );


    /* ---------------------------------------------
       SCROLL → SELECT CAKE
    --------------------------------------------- */

    useEffect(() => {
        const unsubscribe = scrollYProgress.on(
            "change",
            (progress) => {
                const next = Math.min(
                    cakes.length - 1,
                    Math.max(
                        0,
                        Math.round(
                            progress * (cakes.length - 1)
                        )
                    )
                );

                setSelectedCake((current) => {
                    if (current !== next) {
                        setDirection(
                            next > current ? 1 : -1
                        );

                        return next;
                    }

                    return current;
                });
            }
        );

        return () => unsubscribe();
    }, [scrollYProgress]);


    /* ---------------------------------------------
       CLICK ORBIT ITEM
       CLICK → SCROLL → SELECT
    --------------------------------------------- */

    const scrollToCake = (index) => {
        const section = sectionRef.current;

        if (!section) return;

        const sectionTop =
            section.getBoundingClientRect().top +
            window.scrollY;

        const scrollableHeight = Math.max(
            0,
            section.offsetHeight - window.innerHeight
        );

        const progress =
            index / (cakes.length - 1);

        const targetScroll =
            sectionTop +
            scrollableHeight * progress;

        window.scrollTo({
            top: targetScroll,
            behavior: "smooth",
        });
    };


    const currentCake = cakes[selectedCake];

    const CurrentIcon = currentCake.icon;


    return (
        <>

            {/* BACKGROUND */}

            <div className="absolute inset-0 pointer-events-none overflow-hidden">

                <div className="absolute left-1/2 top-1/2 w-[650px] h-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d6a77a]/10 blur-[120px]" />

                <div className="absolute left-1/2 top-1/2 w-[360px] h-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#b27b45]/5" />

            </div>


            {/* TOP LABEL */}

            <div className="absolute top-8 md:top-10 left-6 md:left-12 z-50">

                <div className="flex items-center gap-3">

                    <span className="w-8 h-px bg-[#a76f3f]" />

                    <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#806655]">
                        Custom Cakes
                    </span>

                </div>

            </div>


            {/* MAIN COMPOSITION */}

            <div className="absolute inset-0 flex items-center justify-center">


                {/* LEFT */}

                <div className="absolute left-6 md:left-12 lg:left-[7vw] top-1/2 -translate-y-1/2 z-30 w-[230px] xl:w-[280px] hidden md:block">

                    <motion.p
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.8,
                        }}
                        className="text-[10px] uppercase tracking-[0.3em] text-[#a76f3f] mb-5"
                    >
                        Made for your moment
                    </motion.p>


                    <motion.h2
                        initial={{
                            opacity: 0,
                            y: 30,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.9,
                            delay: 0.1,
                        }}
                        className="font-serif text-4xl xl:text-5xl text-[#47291d] leading-[1.02]"
                    >
                        Imagine it.
                        <br />
                        <span className="italic text-[#a76f3f]">
                            We'll create it.
                        </span>
                    </motion.h2>


                    <motion.p
                        initial={{
                            opacity: 0,
                        }}
                        whileInView={{
                            opacity: 1,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.8,
                            delay: 0.25,
                        }}
                        className="mt-6 text-sm leading-6 text-[#806655] max-w-[250px]"
                    >
                        From intimate celebrations to unforgettable moments,
                        every cake begins with your story.
                    </motion.p>


                    <div className="mt-9 space-y-3">

                        {[
                            "Choose your flavor",
                            "Choose your size",
                            "Make it yours",
                        ].map((item) => (

                            <div
                                key={item}
                                className="flex items-center gap-3"
                            >

                                <div className="w-5 h-5 rounded-full border border-[#b27b45]/30 flex items-center justify-center">

                                    <Check
                                        size={11}
                                        className="text-[#a76f3f]"
                                    />

                                </div>

                                <span className="text-xs text-[#806655]">
                                    {item}
                                </span>

                            </div>

                        ))}

                    </div>

                </div>


                {/* CENTER */}

                <div className="relative w-[88vw] max-w-[680px] aspect-square flex items-center justify-center">


                    {/* OUTER ORBIT */}

                    <motion.div
                        style={{
                            rotate: orbitRotation,
                        }}
                        className="absolute inset-0 rounded-full border border-[#b27b45]/20"
                    />


                    {/* INNER ORBIT */}

                    <motion.div
                        style={{
                            rotate: orbitRotation,
                        }}
                        className="absolute inset-[7%] rounded-full border border-[#b27b45]/10"
                    />


                    {/* ORBIT ITEMS */}

                    <motion.div
                        style={{
                            rotate: orbitRotation,
                        }}
                        className="absolute inset-0"
                    >

                        {cakes.map((cake, index) => (
                            <OrbitCake
                                key={cake.id}
                                cake={cake}
                                index={index}
                                selectedCake={selectedCake}
                                orbitRotation={orbitRotation}
                                onSelect={scrollToCake}
                            />
                        ))}

                    </motion.div>


                    {/* CENTER GLOW */}

                    <div className="absolute w-[56%] aspect-square rounded-full bg-[#d6a77a]/10 blur-3xl pointer-events-none" />


                    {/* MAIN CAKE */}

                    <motion.div
                        style={{
                            scale: cakeScale,
                        }}
                        className="relative z-20 w-[55%] aspect-square rounded-full overflow-hidden shadow-[0_40px_100px_rgba(71,41,29,0.25)] bg-[#e8d8c8]"
                    >

                        <AnimatePresence
                            initial={false}
                            custom={direction}
                            mode="sync"
                        >

                            <motion.div
                                key={currentCake.id}
                                custom={direction}
                                initial={{
                                    opacity: 0,
                                    scale: 1.08,
                                    x: direction * 25,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    x: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.94,
                                    x: direction * -25,
                                }}
                                transition={{
                                    duration: 0.7,
                                    ease: [
                                        0.22,
                                        1,
                                        0.36,
                                        1,
                                    ],
                                }}
                                className="absolute inset-0"
                            >

                                <img
                                    src={currentCake.image}
                                    alt={currentCake.name}
                                    className="w-full h-full object-cover"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/5" />

                                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white">

                                    <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-white/70 mb-1.5">
                                        {currentCake.category}
                                    </p>

                                    <h3 className="font-serif text-xl sm:text-2xl md:text-3xl">
                                        {currentCake.name}
                                    </h3>

                                </div>

                            </motion.div>

                        </AnimatePresence>


                        <div className="absolute inset-0 rounded-full ring-1 ring-white/40 pointer-events-none" />

                        <div className="absolute inset-[3%] rounded-full ring-1 ring-white/10 pointer-events-none" />

                    </motion.div>

                </div>


                {/* RIGHT */}

                <div className="absolute right-6 md:right-12 lg:right-[7vw] top-1/2 -translate-y-1/2 z-30 w-[220px] xl:w-[280px] hidden md:block">


                    {/* CURRENT ICON */}

                    <div className="flex items-center gap-4 mb-7">

                        <div className="relative w-12 h-12 rounded-full bg-white border border-[#b27b45]/20 shadow-[0_10px_30px_rgba(71,41,29,0.12)] flex items-center justify-center">

                            <AnimatePresence
                                mode="wait"
                                initial={false}
                            >

                                <motion.div
                                    key={currentCake.id}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.7,
                                        rotate: -15,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        rotate: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.7,
                                        rotate: 15,
                                    }}
                                    transition={{
                                        duration: 0.35,
                                    }}
                                >

                                    <CurrentIcon
                                        size={23}
                                        strokeWidth={1.5}
                                        className="text-[#a76f3f]"
                                    />

                                </motion.div>

                            </AnimatePresence>

                        </div>


                        <div>

                            <p className="text-[9px] uppercase tracking-[0.3em] text-[#a76f3f]">
                                Collection
                            </p>

                            <p className="text-xs text-[#806655] mt-1">
                                {currentCake.category}
                            </p>

                        </div>

                    </div>


                    {/* INFORMATION */}

                    <div className="overflow-hidden">

                        <AnimatePresence mode="wait">

                            <motion.div
                                key={currentCake.id}
                                initial={{
                                    opacity: 0,
                                    y: direction * 25,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: direction * -20,
                                }}
                                transition={{
                                    duration: 0.45,
                                }}
                            >

                                <p className="text-[10px] uppercase tracking-[0.3em] text-[#a76f3f] mb-3">
                                    {String(
                                        selectedCake + 1
                                    ).padStart(2, "0")}
                                </p>

                                <h3 className="font-serif text-4xl xl:text-5xl text-[#47291d] leading-[0.95]">
                                    {currentCake.name}
                                </h3>

                                <p className="mt-6 text-sm leading-6 text-[#806655]">
                                    {currentCake.description}
                                </p>

                            </motion.div>

                        </AnimatePresence>

                    </div>


                    {/* CTA */}

                    <button className="group mt-8 flex items-center gap-3 px-5 py-3 rounded-full bg-[#47291d] text-white text-xs uppercase tracking-[0.2em] shadow-[0_12px_30px_rgba(71,41,29,0.18)] hover:bg-[#5a3425] transition-all duration-300">

                        <span>
                            Create your cake
                        </span>

                        <span className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-[#f1dfcc] group-hover:text-[#47291d] transition-all duration-300">

                            <ArrowUpRight size={14} />

                        </span>

                    </button>

                </div>

            </div>


            {/* BOTTOM PROGRESS */}

            <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">

                <span className="text-[10px] tracking-[0.25em] text-[#806655]">
                    {String(
                        selectedCake + 1
                    ).padStart(2, "0")}
                </span>


                <div className="relative w-[100px] md:w-[180px] h-px bg-[#b27b45]/20 overflow-hidden">

                    <motion.div
                        className="absolute left-0 top-0 h-full bg-[#a76f3f]"
                        style={{
                            width: progressWidth,
                        }}
                    />

                </div>


                <span className="text-[10px] tracking-[0.25em] text-[#806655]">
                    12
                </span>

            </div>


            {/* MOBILE */}

            <div className="absolute bottom-14 left-5 right-5 z-50 md:hidden text-center">

                <AnimatePresence mode="wait">

                    <motion.div
                        key={currentCake.id}
                        initial={{
                            opacity: 0,
                            y: 15,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            y: -15,
                        }}
                        transition={{
                            duration: 0.4,
                        }}
                    >

                        <div className="flex items-center justify-center gap-2 mb-2">

                            <CurrentIcon
                                size={14}
                                strokeWidth={1.5}
                                className="text-[#a76f3f]"
                            />

                            <p className="text-[9px] uppercase tracking-[0.3em] text-[#a76f3f]">
                                {currentCake.category}
                            </p>

                        </div>


                        <h3 className="font-serif text-3xl text-[#47291d]">
                            {currentCake.name}
                        </h3>

                    </motion.div>

                </AnimatePresence>

            </div>

        </>
    );
}
