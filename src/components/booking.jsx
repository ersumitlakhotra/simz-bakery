
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowUpRight,
    CalendarDays,
    Check,
    ImagePlus,
    Mail,
    MessageCircle,
    Phone,
    Trash2,
    Upload,
    User,
} from "lucide-react";

const flavours = [
    "Vanilla",
    "Chocolate",
    "Red Velvet",
    "Butterscotch",
    "Strawberry",
    "Black Forest",
    "Pistachio",
    "Other",
];

const servingSizes = [
    "6–8 people",
    "10–12 people",
    "15–20 people",
    "25–30 people",
    "35–40 people",
    "50+ people",
];

export default function Booking() {
    const fileInputRef = useRef(null);

    const [form, setForm] = useState({
        name: "",
        flavour: "",
        servingSize: "",
        eventDate: "",
        phone: "",
        email: "",
        message: "",
    });

    const [images, setImages] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    const updateField = (field, value) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const handleImages = (event) => {
        const files = Array.from(event.target.files || []);

        const imageFiles = files.filter((file) =>
            file.type.startsWith("image/")
        );

        setImages((current) => [
            ...current,
            ...imageFiles.map((file) => ({
                file,
                preview: URL.createObjectURL(file),
                id: `${file.name}-${file.lastModified}-${Math.random()}`,
            })),
        ]);

        event.target.value = "";
    };

    const removeImage = (id) => {
        setImages((current) => {
            const image = current.find((item) => item.id === id);

            if (image) {
                URL.revokeObjectURL(image.preview);
            }

            return current.filter((item) => item.id !== id);
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setSubmitted(true);

        setTimeout(() => {
            setSubmitted(false);
        }, 4000);
    };

    return (
        <section className="relative w-full overflow-hidden bg-white py-24 sm:py-28 md:py-36 lg:py-40">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute left-[-20%] top-[8%] w-[350px] h-[350px] sm:w-[520px] sm:h-[520px] rounded-full bg-[#d6a77a]/10 blur-[120px] sm:blur-[150px]" />

                <div className="absolute right-[-20%] bottom-[5%] w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full bg-[#b98a68]/10 blur-[130px] sm:blur-[160px]" />
            </div>

            <div className="relative z-10 w-full max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                        duration: 0.9,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-24 items-start mb-14 sm:mb-16 md:mb-20"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-5 sm:mb-6">
                            <span className="w-7 sm:w-8 h-px bg-[#a76f3f]/50" />

                            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[#a76f3f]">
                                Let's Create Something
                            </span>
                        </div>

                        <h2 className="font-serif text-[46px] leading-[0.94] tracking-[-0.04em] text-[#47291d] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[82px]">
                            Tell us about
                            <span className="block text-[#a76f3f] italic">
                                your celebration.
                            </span>
                        </h2>
                    </div>

                    <div className="lg:pt-3">
                        <p className="max-w-xl text-[13px] sm:text-sm md:text-base leading-6 sm:leading-7 text-[#806655]">
                            Every cake begins with an idea. Tell us what you're
                            imagining, share some inspiration and we'll help
                            bring your perfect cake to life.
                        </p>

                        <div className="flex flex-wrap gap-3 mt-7">
                            <div className="flex items-center gap-2 rounded-full bg-white border border-[#47291d]/8 px-4 py-2.5">
                                <Check
                                    size={13}
                                    strokeWidth={1.6}
                                    className="text-[#a76f3f]"
                                />

                                <span className="text-[9px] uppercase tracking-[0.16em] text-[#806655]">
                                    Custom designs
                                </span>
                            </div>

                            <div className="flex items-center gap-2 rounded-full bg-white border border-[#47291d]/8 px-4 py-2.5">
                                <Check
                                    size={13}
                                    strokeWidth={1.6}
                                    className="text-[#a76f3f]"
                                />

                                <span className="text-[9px] uppercase tracking-[0.16em] text-[#806655]">
                                    Made fresh
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.08 }}
                    transition={{
                        duration: 0.9,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    onSubmit={handleSubmit}
                    className="relative bg-white rounded-[30px] sm:rounded-[36px] border border-[#47291d]/8 shadow-[0_30px_100px_rgba(71,41,29,0.07)] p-5 sm:p-7 md:p-10 lg:p-14"
                >
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                        <div className="space-y-7">
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.3em] text-[#a76f3f] mb-2">
                                    01
                                </p>

                                <h3 className="font-serif text-2xl sm:text-3xl text-[#47291d]">
                                    Your cake
                                </h3>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-5">
                                <FormField
                                    label="Your Name"
                                    icon={<User size={15} strokeWidth={1.4} />}
                                >
                                    <input
                                        type="text"
                                        required
                                        value={form.name}
                                        onChange={(e) =>
                                            updateField(
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Your name"
                                        className="form-input"
                                    />
                                </FormField>

                                <FormField
                                    label="Flavour"
                                    icon={
                                        <MessageCircle
                                            size={15}
                                            strokeWidth={1.4}
                                        />
                                    }
                                >
                                    <select
                                        required
                                        value={form.flavour}
                                        onChange={(e) =>
                                            updateField(
                                                "flavour",
                                                e.target.value
                                            )
                                        }
                                        className="form-input appearance-none"
                                    >
                                        <option value="">
                                            Select flavour
                                        </option>

                                        {flavours.map((flavour) => (
                                            <option
                                                key={flavour}
                                                value={flavour}
                                            >
                                                {flavour}
                                            </option>
                                        ))}
                                    </select>
                                </FormField>

                                <FormField
                                    label="Serving Size"
                                    icon={
                                        <Check
                                            size={15}
                                            strokeWidth={1.4}
                                        />
                                    }
                                >
                                    <select
                                        required
                                        value={form.servingSize}
                                        onChange={(e) =>
                                            updateField(
                                                "servingSize",
                                                e.target.value
                                            )
                                        }
                                        className="form-input appearance-none"
                                    >
                                        <option value="">
                                            Select serving size
                                        </option>

                                        {servingSizes.map((size) => (
                                            <option
                                                key={size}
                                                value={size}
                                            >
                                                {size}
                                            </option>
                                        ))}
                                    </select>
                                </FormField>

                                <FormField
                                    label="Event Date"
                                    icon={
                                        <CalendarDays
                                            size={15}
                                            strokeWidth={1.4}
                                        />
                                    }
                                >
                                    <input
                                        type="date"
                                        required
                                        value={form.eventDate}
                                        onChange={(e) =>
                                            updateField(
                                                "eventDate",
                                                e.target.value
                                            )
                                        }
                                        className="form-input"
                                    />
                                </FormField>
                            </div>

                            <div className="pt-2">
                                <FormField
                                    label="Tell us what you're imagining"
                                    icon={
                                        <MessageCircle
                                            size={15}
                                            strokeWidth={1.4}
                                        />
                                    }
                                >
                                    <textarea
                                        rows={6}
                                        value={form.message}
                                        onChange={(e) =>
                                            updateField(
                                                "message",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Colours, theme, design, flavour details, special requests..."
                                        className="form-input resize-none"
                                    />
                                </FormField>
                            </div>
                        </div>

                        <div className="space-y-7">
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.3em] text-[#a76f3f] mb-2">
                                    02
                                </p>

                                <h3 className="font-serif text-2xl sm:text-3xl text-[#47291d]">
                                    Inspiration & contact
                                </h3>
                            </div>

                            <FormField
                                label="Reference Images"
                                icon={
                                    <ImagePlus
                                        size={15}
                                        strokeWidth={1.4}
                                    />
                                }
                            >
                                <div
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    className="group cursor-pointer min-h-[220px] sm:min-h-[250px] rounded-[24px] border border-dashed border-[#b27b45]/25 bg-[#faf8f5] hover:bg-[#f7f1eb] transition-all duration-500 flex flex-col items-center justify-center p-6"
                                >
                                    <div className="w-14 h-14 rounded-full bg-white border border-[#47291d]/8 flex items-center justify-center mb-4 shadow-[0_10px_30px_rgba(71,41,29,0.06)] group-hover:scale-105 transition-transform duration-500">
                                        <Upload
                                            size={20}
                                            strokeWidth={1.3}
                                            className="text-[#a76f3f]"
                                        />
                                    </div>

                                    <p className="text-sm text-[#47291d]">
                                        Add reference images
                                    </p>

                                    <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-[#806655] text-center">
                                        JPG, PNG or WEBP · Multiple images
                                    </p>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImages}
                                        className="hidden"
                                    />
                                </div>
                            </FormField>

                            {images.length > 0 && (
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                    <AnimatePresence>
                                        {images.map((image) => (
                                            <motion.div
                                                key={image.id}
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0.8,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    scale: 0.8,
                                                }}
                                                className="group relative aspect-square rounded-2xl overflow-hidden bg-[#f5eee7]"
                                            >
                                                <img
                                                    src={image.preview}
                                                    alt="Cake reference"
                                                    className="w-full h-full object-cover"
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeImage(
                                                            image.id
                                                        )
                                                    }
                                                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"
                                                >
                                                    <Trash2
                                                        size={12}
                                                        strokeWidth={1.5}
                                                    />
                                                </button>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}

                            <div className="grid sm:grid-cols-2 gap-5">
                                <FormField
                                    label="Phone / Contact"
                                    icon={
                                        <Phone
                                            size={15}
                                            strokeWidth={1.4}
                                        />
                                    }
                                >
                                    <input
                                        type="tel"
                                        required
                                        value={form.phone}
                                        onChange={(e) =>
                                            updateField(
                                                "phone",
                                                e.target.value
                                            )
                                        }
                                        placeholder="+1 000 000 0000"
                                        className="form-input"
                                    />
                                </FormField>

                                <FormField
                                    label="Email"
                                    icon={
                                        <Mail
                                            size={15}
                                            strokeWidth={1.4}
                                        />
                                    }
                                >
                                    <input
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={(e) =>
                                            updateField(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                        placeholder="you@example.com"
                                        className="form-input"
                                    />
                                </FormField>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 lg:mt-14 pt-7 lg:pt-9 border-t border-[#47291d]/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div>
                            <p className="text-[9px] uppercase tracking-[0.22em] text-[#a76f3f]">
                                Almost there
                            </p>

                            <p className="mt-2 text-xs sm:text-sm text-[#806655]">
                                We'll get back to you with availability and
                                pricing.
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="group w-full sm:w-auto flex items-center justify-center gap-4 rounded-full bg-[#47291d] text-[#f6e8da] px-6 sm:px-7 py-3.5 sm:py-4 text-[9px] sm:text-[10px] uppercase tracking-[0.22em] hover:bg-[#5a3426] transition-all duration-500 shadow-[0_15px_40px_rgba(71,41,29,0.18)]"
                        >
                            Send Cake Enquiry

                            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-500">
                                <ArrowUpRight
                                    size={15}
                                    strokeWidth={1.4}
                                />
                            </span>
                        </button>
                    </div>

                    <AnimatePresence>
                        {submitted && (
                            <motion.div
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
                                    y: -10,
                                }}
                                className="absolute inset-x-5 sm:inset-x-8 bottom-5 sm:bottom-7 rounded-2xl bg-[#47291d] text-[#f6e8da] px-5 py-4 flex items-center gap-3 shadow-2xl"
                            >
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                    <Check
                                        size={15}
                                        strokeWidth={1.6}
                                    />
                                </div>

                                <div>
                                    <p className="text-xs font-medium">
                                        Thank you!
                                    </p>

                                    <p className="text-[9px] text-white/60 mt-0.5">
                                        Your cake enquiry has been received.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.form>
            </div>

            <style>{`
                .form-input {
                    width: 100%;
                    margin-top: 9px;
                    border-radius: 14px;
                    border: 1px solid rgba(71, 41, 29, 0.08);
                    background: #faf8f5;
                    padding: 13px 14px;
                    font-size: 13px;
                    color: #47291d;
                    outline: none;
                    transition: all 0.3s ease;
                }

                .form-input::placeholder {
                    color: rgba(128, 102, 85, 0.55);
                }

                .form-input:focus {
                    border-color: rgba(167, 111, 63, 0.45);
                    background: #ffffff;
                    box-shadow: 0 0 0 3px rgba(167, 111, 63, 0.06);
                }

                select.form-input {
                    color: #47291d;
                }

                input[type="date"].form-input {
                    color-scheme: light;
                }
            `}</style>
        </section>
    );
}

function FormField({ label, icon, children }) {
    return (
        <label className="block">
            <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-[#806655]">
                <span className="text-[#a76f3f]">
                    {icon}
                </span>

                {label}
            </span>

            {children}
        </label>
    );
}

