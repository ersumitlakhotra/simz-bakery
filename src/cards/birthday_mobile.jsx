
import { motion } from "framer-motion";
import { ArrowUpRight, CakeSlice, Sparkles } from "lucide-react";

export default function BirthdayCakeDetailMobile({ frame }) {
    const showStart = 20;
    const showEnd = 60;
    const fadeOutEnd = 80;

    const opacity =
        frame < showStart
            ? 0
            : frame < showEnd
                ? Math.min(1, (frame - showStart) / 8)
                : frame < fadeOutEnd
                    ? Math.max(0, 1 - (frame - showEnd) / (fadeOutEnd - showEnd))
                    : 0;

    const x =
        frame < showStart
            ? -60
            : frame < showEnd
                ? -60 + Math.min(1, (frame - showStart) / 8) * 60
                : frame < fadeOutEnd
                    ? -((frame - showEnd) / (fadeOutEnd - showEnd)) * 60
                    : -60;

    if (opacity <= 0) return null;

    return (

        <motion.section
            className="absolute inset-0 z-20 flex items-center px-6 py-10 md:hidden"
            initial={false}
            animate={{ opacity, x }}
            transition={{ duration: 0.15, ease: "linear" }}
            style={{ pointerEvents: opacity > 0.5 ? "auto" : "none" }}
        >
            {/* Subtle gradient instead of a full dark block */}
            <div className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-full bg-gradient-to-r from-black/55 via-black/25 to-transparent" />

            <div className="relative w-full max-w-sm text-white">
                <div className="mb-7 flex items-center gap-3">
                    <span className="h-px w-8 bg-[#e8a6b8]" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-pink-200">
                        The Celebration
                    </span>
                </div>

                <div className="mb-5 flex items-center gap-3 text-pink-200">
                    <CakeSlice size={20} strokeWidth={1.5} />
                    <span className="text-[10px] font-medium uppercase tracking-[0.25em]">
                        Birthday Collection
                    </span>
                </div>

                <h2 className="font-serif text-white text-5xl sm:text-6xl leading-[0.92] tracking-[-0.04em]">
                    Birthday
                    <br />
                    <span className="italic text-[#c87991]">
                        Cake.
                    </span>
                </h2>

                <p className="mb-7 max-w-[290px] text-[13px] leading-[1.9] font-normal tracking-[0.015em] text-white/85">
                    Beautifully handcrafted birthday cakes made
                    to turn every celebration into a moment
                    worth remembering.
                </p>

                <div className="mb-8 flex flex-wrap gap-x-4 gap-y-2">
                    {["Custom Designs", "Freshly Baked"].map((tag) => (
                        <span
                            key={tag}
                            className="text-[10px] font-medium tracking-[0.08em] text-white/90"
                        >
                            <span className="mr-2 text-[#e8a6b8]">✦</span>
                            {tag}
                        </span>
                    ))}
                </div>
                
                {/* Bottom */}
                <div className="mt-8 border-t border-white/25 pt-5">
                    <div className="mb-5">
                        <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-pink-200">
                            Simz Bakery
                        </div>

                        <div className="mt-1.5 text-[11px] tracking-wide text-white/75">
                            Your sweetest moments.
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            document
                                .getElementById("booking")
                                ?.scrollIntoView({ behavior: "smooth" })
                        }
                        className="group pointer-events-auto inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-xs font-medium text-[#51343c] shadow-[0_15px_45px_rgba(0,0,0,0.22)] transition-all duration-300 hover:bg-[#f3d7de]"
                    >
                        Order Now

                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d98fa5] text-white transition-transform duration-300 group-hover:rotate-45">
                            <ArrowUpRight size={15} />
                        </span>
                    </button>
                </div>

            </div>
        </motion.section>

    );
}
