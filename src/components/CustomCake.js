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


/* --------------------------------------------------
   CATEGORY ORBIT ITEM
-------------------------------------------------- */

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

    const radius = 43;

    const x = 50 + Math.cos(angle) * radius;
    const y = 50 + Math.sin(angle) * radius;

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
                        scale: isSelected ? 1.15 : 1,
                    }}
                    whileHover={{
                        scale: isSelected ? 1.22 : 1.1,
                    }}
                    whileTap={{
                        scale: 0.92,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 20,
                    }}
                    className="group relative flex items-center justify-center"
                    aria-label={`View ${cake.category} cake`}
                >

                    {/* Glow */}
                    {isSelected && (
                        <motion.div
                            layoutId="activeCakeGlow"
                            className="absolute inset-[-12px] rounded-full bg-[#c74663]/15 blur-xl"
                        />
                    )}

                    {/* Icon Circle */}
                    <div
                        className={`relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full transition-all duration-500 ${
                            isSelected
                                ? "bg-[#b83a5a] text-white shadow-[0_15px_40px_rgba(184,58,90,0.28)]"
                                : "bg-white/90 text-[#73555c] border border-[#ead4da] shadow-[0_8px_25px_rgba(91,42,55,0.08)] group-hover:border-[#d85c78]/40 group-hover:text-[#b83a5a]"
                        }`}
                    >

                        <Icon
                            size={22}
                            strokeWidth={1.45}
                            className="relative z-10"
                        />

                    </div>

                    {/* Category */}
                    <motion.div
                        animate={{
                            opacity: isSelected ? 1 : 0,
                            y: isSelected ? 0 : 4,
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                        className="absolute top-[calc(100%+9px)] left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
                    >
                        <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-[#efd8df] shadow-[0_8px_25px_rgba(91,42,55,0.1)] text-[#b83a5a] text-[7px] uppercase tracking-[0.18em]">
                            {cake.category}
                        </span>
                    </motion.div>

                </motion.button>
            </motion.div>
        </div>
    );
}


/* --------------------------------------------------
   MAIN COMPONENT
-------------------------------------------------- */

export default function CustomCake({ sectionRef }) {

    const [selectedCake, setSelectedCake] = useState(0);
    const [direction, setDirection] = useState(1);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    /*
        Faster response than the previous version.
    */
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 140,
        damping: 24,
        mass: 0.18,
    });

    const orbitRotation = useTransform(
        smoothProgress,
        [0, 1],
        [0, 360]
    );

    const cakeScale = useTransform(
        smoothProgress,
        [0, 0.05, 0.5, 0.95, 1],
        [0.94, 1, 1, 1, 0.96]
    );

    const progressWidth = useTransform(
        smoothProgress,
        [0, 1],
        ["0%", "100%"]
    );


    /* --------------------------------------------------
       SCROLL → SELECT
    -------------------------------------------------- */

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


    /* --------------------------------------------------
       CLICK → SCROLL
    -------------------------------------------------- */

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

            {/* --------------------------------------------------
                BACKGROUND
            -------------------------------------------------- */}

            <div className="absolute inset-0 pointer-events-none overflow-hidden">

                <div className="absolute left-1/2 top-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c74663]/[0.055] blur-[130px]" />

                <div className="absolute left-1/2 top-1/2 w-[520px] h-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d85c78]/[0.08]" />

                <div className="absolute left-1/2 top-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d85c78]/[0.05]" />

            </div>


            {/* --------------------------------------------------
                TOP LABEL
            -------------------------------------------------- */}

            <div className="absolute top-8 md:top-10 left-6 md:left-12 z-50">

                <div className="flex items-center gap-3">

                    <span className="w-8 md:w-12 h-px bg-[#d85c78]" />

                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.38em] text-[#b83a5a] font-semibold">
                        Custom Cakes
                    </span>

                </div>

            </div>


            {/* --------------------------------------------------
                MAIN COMPOSITION
            -------------------------------------------------- */}

            <div className="absolute inset-0 flex items-center justify-center">


                {/* --------------------------------------------------
                    LEFT INFORMATION
                -------------------------------------------------- */}

                <div className="absolute left-6 md:left-10 lg:left-[6vw] xl:left-[8vw] top-1/2 -translate-y-1/2 z-30 w-[220px] xl:w-[280px] hidden md:block">

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
                            duration: 0.7,
                        }}
                        className="text-[9px] uppercase tracking-[0.32em] text-[#d85c78] mb-5 font-semibold"
                    >
                        Made for your moment
                    </motion.p>


                    <motion.h2
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
                        }}
                        transition={{
                            duration: 0.8,
                            delay: 0.08,
                        }}
                        className="font-serif text-4xl xl:text-5xl text-[#b83a5a] leading-[0.98] tracking-[-0.035em]"
                    >
                        Imagine it.
                        <br />
                        <span className="italic text-[#d85c78]">
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
                            duration: 0.7,
                            delay: 0.2,
                        }}
                        className="mt-6 text-sm leading-6 text-[#624b51] max-w-[250px] font-light"
                    >
                        From intimate celebrations to unforgettable moments,
                        every cake begins with your story.
                    </motion.p>


                    <div className="mt-8 space-y-3">

                        {[
                            "Choose your flavor",
                            "Choose your size",
                            "Make it yours",
                        ].map((item) => (

                            <div
                                key={item}
                                className="flex items-center gap-3"
                            >

                                <div className="w-5 h-5 rounded-full border border-[#d85c78]/30 bg-white/60 flex items-center justify-center">

                                    <Check
                                        size={10}
                                        className="text-[#c74663]"
                                    />

                                </div>

                                <span className="text-xs text-[#624b51]">
                                    {item}
                                </span>

                            </div>

                        ))}

                    </div>

                </div>


                {/* --------------------------------------------------
                    CENTER
                -------------------------------------------------- */}

                <div className="relative w-[86vw] max-w-[700px] aspect-square flex items-center justify-center">


                    {/* OUTER ORBIT */}

                    <motion.div
                        style={{
                            rotate: orbitRotation,
                        }}
                        className="absolute inset-0 rounded-full border border-[#d85c78]/15"
                    />


                    {/* INNER ORBIT */}

                    <motion.div
                        style={{
                            rotate: orbitRotation,
                        }}
                        className="absolute inset-[10%] rounded-full border border-[#d85c78]/[0.07]"
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


                    {/* CENTER HALO */}

                    <motion.div
                        animate={{
                            scale: [1, 1.04, 1],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute w-[61%] aspect-square rounded-full bg-[#c74663]/[0.07] blur-3xl pointer-events-none"
                    />


                    {/* CAKE SHADOW */}

                    <div className="absolute bottom-[16%] w-[45%] h-[9%] rounded-full bg-[#5c2937]/15 blur-2xl pointer-events-none" />


                    {/* MAIN CAKE */}

                    <motion.div
                        style={{
                            scale: cakeScale,
                        }}
                        className="relative z-20 w-[58%] aspect-square rounded-full overflow-hidden bg-[#f6e7eb] shadow-[0_45px_120px_rgba(78,32,45,0.22),0_10px_35px_rgba(199,70,99,0.1)]"
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
                                    x: direction * 35,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    x: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.96,
                                    x: direction * -35,
                                }}
                                transition={{
                                    duration: 0.42,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="absolute inset-0"
                            >

                                <img
                                    src={currentCake.image}
                                    alt={currentCake.name}
                                    className="w-full h-full object-cover"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-[#35151f]/65 via-transparent to-[#35151f]/5" />

                           

                            </motion.div>

                        </AnimatePresence>


                        <div className="absolute inset-0 rounded-full ring-1 ring-white/50 pointer-events-none" />

                        <div className="absolute inset-[3%] rounded-full ring-1 ring-white/15 pointer-events-none" />

                    </motion.div>

                </div>


                {/* --------------------------------------------------
                    RIGHT INFORMATION
                -------------------------------------------------- */}

                <div className="absolute right-6 md:right-10 lg:right-[6vw] xl:right-[8vw] top-1/2 -translate-y-1/2 z-30 w-[220px] xl:w-[280px] hidden md:block">

                    {/* CURRENT CATEGORY */}

                    <div className="flex items-center gap-4 mb-7">

                        <div className="relative w-12 h-12 rounded-full bg-white/80 backdrop-blur-xl border border-[#efd8df] shadow-[0_12px_35px_rgba(92,38,53,0.1)] flex items-center justify-center">

                            <AnimatePresence
                                mode="wait"
                                initial={false}
                            >

                                <motion.div
                                    key={currentCake.id}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.7,
                                        rotate: -12,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        rotate: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.7,
                                        rotate: 12,
                                    }}
                                    transition={{
                                        duration: 0.25,
                                    }}
                                >

                                    <CurrentIcon
                                        size={22}
                                        strokeWidth={1.5}
                                        className="text-[#b83a5a]"
                                    />

                                </motion.div>

                            </AnimatePresence>

                        </div>


                        <div>

                            <p className="text-[9px] uppercase tracking-[0.3em] text-[#d85c78] font-semibold">
                                Collection
                            </p>

                            <p className="text-xs text-[#624b51] mt-1">
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
                                    y: direction * 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: direction * -15,
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeOut",
                                }}
                            >

                                <p className="text-[10px] uppercase tracking-[0.3em] text-[#d85c78] mb-3">
                                    {String(
                                        selectedCake + 1
                                    ).padStart(2, "0")}
                                </p>

                                <h3 className="font-serif text-4xl xl:text-5xl text-[#b83a5a] leading-[0.94] tracking-[-0.035em]">
                                    {currentCake.name}
                                </h3>

                                <p className="mt-6 text-sm leading-6 text-[#624b51] font-light">
                                    {currentCake.description}
                                </p>

                            </motion.div>

                        </AnimatePresence>

                    </div>


                    {/* CTA */}

                    <button className="group mt-8 flex items-center gap-3 px-5 py-3 rounded-full bg-[#b83a5a] text-white text-xs uppercase tracking-[0.2em] shadow-[0_15px_35px_rgba(184,58,90,0.2)] hover:bg-[#9f304d] hover:-translate-y-0.5 transition-all duration-300">

                        <span>
                            Create your cake
                        </span>

                        <span className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#b83a5a] transition-all duration-300">

                            <ArrowUpRight size={14} />

                        </span>

                    </button>

                </div>

            </div>


            {/* --------------------------------------------------
                BOTTOM PROGRESS
            -------------------------------------------------- */}

            <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">

                <span className="text-[10px] tracking-[0.25em] text-[#b83a5a] font-medium">
                    {String(
                        selectedCake + 1
                    ).padStart(2, "0")}
                </span>

                <div className="relative w-[100px] md:w-[180px] h-[2px] bg-[#d85c78]/15 overflow-hidden rounded-full">

                    <motion.div
                        className="absolute left-0 top-0 h-full bg-[#c74663] rounded-full"
                        style={{
                            width: progressWidth,
                        }}
                    />

                </div>

                <span className="text-[10px] tracking-[0.25em] text-[#b83a5a] font-medium">
                    12
                </span>

            </div>


            {/* --------------------------------------------------
                MOBILE
            -------------------------------------------------- */}

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
                            duration: 0.3,
                        }}
                    >

                        <div className="flex items-center justify-center gap-2 mb-2">

                            <CurrentIcon
                                size={14}
                                strokeWidth={1.5}
                                className="text-[#c74663]"
                            />

                            <p className="text-[9px] uppercase tracking-[0.3em] text-[#b83a5a]">
                                {currentCake.category}
                            </p>

                        </div>

                        <h3 className="font-serif text-3xl text-[#b83a5a] tracking-[-0.03em]">
                            {currentCake.name}
                        </h3>

                    </motion.div>

                </AnimatePresence>

            </div>

        </>
    );
}