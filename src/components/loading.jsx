
import { motion } from "framer-motion";

export default function Loading({ progress }) {
    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-[#f8f1e7] text-[#4a2a1d]">

            {/* Ambient glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d9a86c]/15 blur-[130px]" />

            {/* Soft decorative circles */}
            <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full border border-[#c99b68]/10" />
            <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full border border-[#c99b68]/10" />

            <div className="relative w-[320px]">

                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <div className="font-serif text-3xl font-semibold tracking-tight text-[#4a2a1d]">
                        Simz <span className="italic text-[#a66d3f]">Bakery</span>
                    </div>

                    <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-[#9b806b]">
                        Artisan Cake Studio
                    </p>
                </motion.div>

                {/* Cupcake */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.25 }}
                    className="relative mx-auto mt-12 h-[150px] w-[150px]"
                >

                    {/* Glow behind candle */}
                    <motion.div
                        animate={{
                            opacity: [0.15, 0.3, 0.15],
                            scale: [0.9, 1.1, 0.9],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute left-1/2 top-0 h-20 w-20 -translate-x-1/2 rounded-full bg-[#e7a34e]/25 blur-2xl"
                    />

                    {/* Candle */}
                    <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2">

                        {/* Flame */}
                        <motion.div
                            animate={{
                                scale: [1, 1.12, 0.95, 1.08, 1],
                                rotate: [-3, 3, -2, 2, 0],
                            }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="relative mx-auto mb-1 h-7 w-4 origin-bottom"
                        >
                            <div className="absolute left-1/2 top-0 h-6 w-3 -translate-x-1/2 rounded-[70%_30%_65%_35%] bg-[#e7a34e] shadow-[0_0_12px_rgba(231,163,78,0.65)]" />

                            <div className="absolute left-1/2 top-2 h-3 w-1.5 -translate-x-1/2 rounded-full bg-[#fff4d6]" />
                        </motion.div>

                        {/* Candle */}
                        <div className="h-10 w-4 rounded-t-sm bg-[#f4d6a7] shadow-sm">
                            <div className="h-full w-1/2 bg-[#e6bc86]/50" />
                        </div>
                    </div>

                    {/* Frosting */}
                    <div className="absolute bottom-[48px] left-1/2 z-10 h-[65px] w-[105px] -translate-x-1/2">

                        <div className="absolute bottom-0 h-12 w-full rounded-[45%_45%_30%_30%] bg-[#fffaf2]" />

                        <div className="absolute left-[8px] top-[17px] h-10 w-10 rounded-full bg-[#fffaf2]" />
                        <div className="absolute left-[32px] top-[7px] h-12 w-12 rounded-full bg-[#fffaf2]" />
                        <div className="absolute right-[7px] top-[17px] h-10 w-10 rounded-full bg-[#fffaf2]" />

                        {/* Strawberry */}
                        <motion.div
                            animate={{ y: [0, -2, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity }}
                            className="absolute left-1/2 top-[-1px] h-5 w-6 -translate-x-1/2 rotate-[-8deg] rounded-[60%_60%_55%_55%] bg-[#b85c45]"
                        >
                            <div className="absolute left-1/2 top-[-5px] h-3 w-3 -translate-x-1/2 rounded-full bg-[#6d8a50]" />
                        </motion.div>
                    </div>

                    {/* Cupcake wrapper */}
                    <div className="absolute bottom-0 left-1/2 h-[58px] w-[105px] -translate-x-1/2 overflow-hidden rounded-b-[25px] bg-[#b8784d] shadow-[0_12px_20px_rgba(90,52,36,0.15)]">

                        <div className="absolute inset-x-0 top-0 h-2 bg-[#9e603e]" />

                        <div className="absolute left-[15px] top-0 h-full w-px rotate-[8deg] bg-[#d09263]/60" />
                        <div className="absolute left-[35px] top-0 h-full w-px rotate-[4deg] bg-[#d09263]/60" />
                        <div className="absolute left-1/2 top-0 h-full w-px bg-[#d09263]/60" />
                        <div className="absolute right-[35px] top-0 h-full w-px rotate-[-4deg] bg-[#d09263]/60" />
                        <div className="absolute right-[15px] top-0 h-full w-px rotate-[-8deg] bg-[#d09263]/60" />
                    </div>
                </motion.div>

                {/* Percentage */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-6 text-center"
                >
                    <div className="font-serif text-6xl font-semibold tracking-tight text-[#4a2a1d]">
                        {progress}
                        <span className="text-[#b27a47]">%</span>
                    </div>

                    <motion.p
                        key={progress}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 text-xs text-[#9b806b]"
                    >
                        {progress < 100
                            ? "Preparing something delicious"
                            : "Freshly baked and ready"}
                    </motion.p>
                </motion.div>

                {/* Progress */}
                <div className="mt-8 h-[3px] overflow-hidden rounded-full bg-[#e5d6c5]">
                    <motion.div
                        className="h-full origin-left rounded-full bg-[#a66d3f]"
                        animate={{ width: `${progress}%` }}
                        transition={{
                            duration: 0.25,
                            ease: "easeOut",
                        }}
                    />
                </div>

                {/* Status */}
                <div className="mt-3 flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-[#ad9681]">
                    <span>
                        {progress < 100
                            ? "Baking experience"
                            : "Ready"}
                    </span>

                    <span>
                        {progress} / 100
                    </span>
                </div>

                {/* Decorative animated line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="mx-auto mt-10 h-px w-24 origin-left bg-[#b27a47]/40"
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="mt-4 text-center text-[9px] tracking-[0.25em] text-[#b49b85]"
                >
                    MADE WITH LOVE
                </motion.div>

            </div>
        </div>
    );
}

