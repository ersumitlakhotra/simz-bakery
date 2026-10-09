
import React, { useRef, useState, useEffect } from "react";
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
    Sparkles,
} from "lucide-react";

const API_URL = "https://kd5tocotuvosipnfazqokllk6e0ntodc.lambda-url.ca-central-1.on.aws/api/simz-order-email";
//const API_URL = "http://localhost:3000/api/simz-order-email";
const MAX_IMAGES = 3;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const flavours = [
    "Vanilla",
    "Mango (Seasonal)",
    "Pineapple",
    "Strawberry",
    "Chocolate : + $5",
    "Chocolate Hazelnut : + $15",
    "Black Forest : + $5",
    "Strawberry shortcake : + $5",
    "Red Velvet : + $5",
    "Biscoff Cake : + $5",
    "Truffle Cake : + $15",
    "Rasmalai : + $10",
    "Gulab Jamun : + $10",
    "Mix Fruit : + $10",
    "Coconut Cake : + $10",
    "Other",
];

const servingSizes = [
    "6–10 people",
    "10–14 people",
    "14–20 people",
    "20–25 people",
    "25–30 people",
    "30–35 people",
    "35–40 people",
    "40+ people",
];

const initialForm = {
    name: "",
    flavour: "",
    servingSize: "",
    eventDate: "",
    phone: "",
    email: "",
    message: "",
};

export default function Booking() {
    const fileInputRef = useRef(null);
    const imagesRef = useRef([]);
    const notificationTimerRef = useRef(null);

    const [form, setForm] = useState(initialForm);
    const [images, setImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [submitMessage, setSubmitMessage] = useState("");

    useEffect(() => {
        imagesRef.current = images;
    }, [images]);

    useEffect(() => {
        return () => {
            imagesRef.current.forEach((image) => {
                URL.revokeObjectURL(image.preview);
            });

            if (notificationTimerRef.current) {
                clearTimeout(notificationTimerRef.current);
            }
        };
    }, []);

    const showNotification = (status, message) => {
        setSubmitStatus(status);
        setSubmitMessage(message);

        if (notificationTimerRef.current) {
            clearTimeout(notificationTimerRef.current);
        }

        notificationTimerRef.current = setTimeout(() => {
            setSubmitStatus(null);
            setSubmitMessage("");
        }, 4000);
    };

    const updateField = (field, value) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));

        setSubmitStatus(null);
        setSubmitMessage("");
    };

    const handleImages = (event) => {
        const files = Array.from(event.target.files || []);
        event.target.value = "";

        if (!files.length) return;

        const remaining = MAX_IMAGES - images.length;

        if (remaining <= 0) {
            showNotification(
                "error",
                "You can upload a maximum of 3 images."
            );
            return;
        }

        const validImages = [];
        let errorMessage = "";

        for (const file of files) {
            if (
                !["image/jpeg", "image/png", "image/webp"].includes(file.type)
            ) {
                errorMessage = "Please select JPG, PNG or WEBP images only.";
                continue;
            }

            if (file.size > MAX_IMAGE_SIZE) {
                errorMessage = `${file.name} exceeds the 5 MB limit.`;
                continue;
            }

            if (validImages.length >= remaining) {
                errorMessage = "You can upload a maximum of 3 images.";
                break;
            }

            validImages.push({
                file,
                preview: URL.createObjectURL(file),
                id: `${file.name}-${file.lastModified}-${Math.random()
                    .toString(36)
                    .slice(2)}`,
            });
        }

        setImages((current) => [...current, ...validImages]);

        if (errorMessage) {
            showNotification("error", errorMessage);
        } else {
            setSubmitStatus(null);
            setSubmitMessage("");
        }
    };

    const removeImage = (id) => {
        setImages((current) => {
            const image = current.find((item) => item.id === id);

            if (image) {
                URL.revokeObjectURL(image.preview);
            }

            return current.filter((item) => item.id !== id);
        });

        setSubmitStatus(null);
        setSubmitMessage("");
    };

   
const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (
        !form.name.trim() ||
        !form.email.trim() ||
        !form.phone.trim() ||
        !form.flavour ||
        !form.servingSize ||
        !form.eventDate
    ) {
        showNotification(
            "error",
            "Please complete all required fields before submitting."
        );
        return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");

    if (notificationTimerRef.current) {
        clearTimeout(notificationTimerRef.current);
    }

    try {
        const imageFiles = await Promise.all(
            images.map(async ({ file }) => {
                const base64 = await new Promise((resolve, reject) => {
                    const reader = new FileReader();

                    reader.onload = () => {
                        const result = reader.result;
                        resolve(String(result).split(",")[1]);
                    };

                    reader.onerror = () => {
                        reject(new Error("Failed to read an image."));
                    };

                    reader.readAsDataURL(file);
                });

                return {
                    name: file.name,
                    type: file.type,
                    data: base64,
                };
            })
        );

        const payload = {
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            flavour: form.flavour,
            serving: form.servingSize,
            eventDate: form.eventDate,
            message: form.message.trim(),
            images: imageFiles,
        };

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok || result.success !== true) {
            throw new Error(
                result.message ||
                "Unable to send your enquiry. Please try again."
            );
        }

        images.forEach(({ preview }) => {
            URL.revokeObjectURL(preview);
        });

        setImages([]);
        setForm({ ...initialForm });

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }

        showNotification(
            "success",
            result.message ||
                "Your cake enquiry has been received. We'll be in touch soon."
        );
    } catch (error) {
        showNotification(
            "error",
            error.message || "Something went wrong. Please try again."
        );
    } finally {
        setIsSubmitting(false);
    }
};
    return (
        <section className="relative w-full overflow-hidden bg-[#fffafd] py-24 sm:py-28 md:py-36 lg:py-40">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute left-[-18%] top-[5%] w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full bg-[#f3b8c8]/14 blur-[120px] sm:blur-[160px]" />

                <div className="absolute right-[-18%] bottom-[-5%] w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] rounded-full bg-[#d98fa5]/14 blur-[130px] sm:blur-[170px]" />

                <div className="absolute top-[-15%] left-[48%] w-[14%] h-[140%] rotate-[22deg] bg-white/80 blur-[55px]" />
            </div>

            <div className="relative z-10 w-full max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-24 items-end mb-14 sm:mb-16 md:mb-20"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-5 sm:mb-6">
                            <span className="w-8 h-px bg-[#d98fa5]" />

                            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[#b27a8b] font-semibold">
                                Order Your Cake
                            </span>

                            <Sparkles size={13} className="text-[#d98fa5]" />
                        </div>

                        <h2 className="font-serif text-[46px] leading-[0.94] tracking-[-0.04em] text-[#4d3038] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[82px]">
                            Let's make your
                            <span className="block text-[#d98fa5] italic">
                                sweetest moment.
                            </span>
                        </h2>
                    </div>

                    <div className="lg:pb-2">
                        <p className="max-w-xl text-[13px] sm:text-sm md:text-base leading-6 sm:leading-7 text-[#80656d]">
                            Tell us what you're imagining, choose your details
                            and share your inspiration. We'll create something
                            beautiful, fresh and made especially for you.
                        </p>

                        <div id="booking" className="flex flex-wrap gap-3 mt-7">
                            <div className="flex items-center gap-2 rounded-full bg-white border border-[#4d3038]/8 px-4 py-2.5 shadow-[0_8px_25px_rgba(77,48,56,0.04)]">
                                <Check size={13} strokeWidth={1.6} className="text-[#d98fa5]" />
                                <span className="text-[9px] uppercase tracking-[0.16em] text-[#80656d]">
                                    Custom designs
                                </span>
                            </div>

                            <div className="flex items-center gap-2 rounded-full bg-white border border-[#4d3038]/8 px-4 py-2.5 shadow-[0_8px_25px_rgba(77,48,56,0.04)]">
                                <Check size={13} strokeWidth={1.6} className="text-[#d98fa5]" />
                                <span className="text-[9px] uppercase tracking-[0.16em] text-[#80656d]">
                                    Made fresh
                                </span>
                            </div>

                            <div className="flex items-center gap-2 rounded-full bg-[#d98fa5] px-4 py-2.5 shadow-[0_8px_25px_rgba(217,143,165,0.18)]">
                                <Check size={13} strokeWidth={1.6} className="text-white" />
                                <span className="text-[9px] uppercase tracking-[0.16em] text-white">
                                    Made with love
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.08 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    onSubmit={handleSubmit}
                    className="relative overflow-hidden rounded-[30px] sm:rounded-[36px] border border-white bg-white/80 backdrop-blur-xl shadow-[0_35px_110px_rgba(77,48,56,0.1)] p-5 sm:p-7 md:p-10 lg:p-14"
                >
                    <div className="absolute top-0 left-0 right-0 h-[5px] bg-gradient-to-r from-[#f3d4de] via-[#d98fa5] to-[#f3d4de]" />

                    <div className="absolute top-[-180px] right-[-130px] w-[400px] h-[400px] rounded-full bg-[#f3b8c8]/10 blur-[100px] pointer-events-none" />

                    <div className="absolute bottom-[-180px] left-[-130px] w-[400px] h-[400px] rounded-full bg-[#d98fa5]/8 blur-[100px] pointer-events-none" />

                    <div className="relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-14">
                        <div className="space-y-7">
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.3em] text-[#b27a8b] mb-2">
                                    01
                                </p>
                                <h3 className="font-serif text-2xl sm:text-3xl text-[#4d3038]">
                                    Your cake
                                </h3>
                                <p className="mt-2 text-xs text-[#9a7c83]">
                                    Tell us the essentials for your celebration.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-5">
                                <FormField
                                    label="Your Name"
                                    icon={<User size={15} strokeWidth={1.4} />}
                                >
                                    <input
                                        type="text"
                                        name="name"
                                        autoComplete="name"
                                        required
                                        maxLength={100}
                                        value={form.name}
                                        onChange={(e) => updateField("name", e.target.value)}
                                        placeholder="Your name"
                                        className="form-input"
                                    />
                                </FormField>

                                <FormField
                                    label="Flavour"
                                    icon={<MessageCircle size={15} strokeWidth={1.4} />}
                                >
                                    <select
                                        name="flavour"
                                        required
                                        value={form.flavour}
                                        onChange={(e) => updateField("flavour", e.target.value)}
                                        className="form-input appearance-none"
                                    >
                                        <option value="">Select flavour</option>
                                        {flavours.map((flavour) => (
                                            <option key={flavour} value={flavour}>
                                                {flavour}
                                            </option>
                                        ))}
                                    </select>
                                </FormField>

                                <FormField
                                    label="Serving Size"
                                    icon={<Check size={15} strokeWidth={1.4} />}
                                >
                                    <select
                                        name="servingSize"
                                        required
                                        value={form.servingSize}
                                        onChange={(e) => updateField("servingSize", e.target.value)}
                                        className="form-input appearance-none"
                                    >
                                        <option value="">Select serving size</option>
                                        {servingSizes.map((size) => (
                                            <option key={size} value={size}>
                                                {size}
                                            </option>
                                        ))}
                                    </select>
                                </FormField>

                                <FormField
                                    label="Event Date"
                                    icon={<CalendarDays size={15} strokeWidth={1.4} />}
                                >
                                    <input
                                        type="datetime-local"
                                        name="eventDate"
                                        required
                                        min={new Date().toISOString().slice(0, 16)}
                                        value={form.eventDate}
                                        onChange={(e) => updateField("eventDate", e.target.value)}
                                        className="form-input"
                                    />
                                </FormField>
                            </div>

                            <div className="pt-2">
                                <FormField
                                    label="Tell us what you're imagining"
                                    icon={<MessageCircle size={15} strokeWidth={1.4} />}
                                >
                                    <textarea
                                        name="message"
                                        rows={7}
                                        maxLength={3000}
                                        value={form.message}
                                        onChange={(e) => updateField("message", e.target.value)}
                                        placeholder="Colours, theme, design, flavour details, special requests..."
                                        className="form-input resize-none"
                                    />
                                </FormField>
                            </div>
                        </div>

                        <div className="space-y-7">
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.3em] text-[#b27a8b] mb-2">
                                    02
                                </p>
                                <h3 className="font-serif text-2xl sm:text-3xl text-[#4d3038]">
                                    Inspiration & contact
                                </h3>
                                <p className="mt-2 text-xs text-[#9a7c83]">
                                    Show us what inspired your dream cake.
                                </p>
                            </div>

                            <FormField
                                label="Reference Images"
                                icon={<ImagePlus size={15} strokeWidth={1.4} />}
                            >
                                <div
                                    onClick={() => {
                                        if (images.length < MAX_IMAGES && !isSubmitting) {
                                            fileInputRef.current?.click();
                                        }
                                    }}
                                    className={`group min-h-[220px] sm:min-h-[250px] rounded-[24px] border border-dashed border-[#d98fa5]/35 bg-gradient-to-br from-[#fffafd] to-[#fcecf1] transition-all duration-500 flex flex-col items-center justify-center p-6 ${
                                        images.length >= MAX_IMAGES || isSubmitting
                                            ? "cursor-not-allowed opacity-60"
                                            : "cursor-pointer hover:from-[#fff7fa] hover:to-[#f8e0e7]"
                                    }`}
                                >
                                    <div className="w-14 h-14 rounded-full bg-white border border-[#d98fa5]/15 flex items-center justify-center mb-4 shadow-[0_10px_30px_rgba(77,48,56,0.06)] group-hover:scale-105 transition-all duration-500">
                                        <Upload size={20} strokeWidth={1.3} className="text-[#d98fa5]" />
                                    </div>

                                    <p className="text-sm text-[#4d3038]">
                                        {images.length >= MAX_IMAGES
                                            ? "Image limit reached"
                                            : "Add reference images"}
                                    </p>

                                    <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-[#9a7c83] text-center">
                                        JPG, PNG or WEBP · Maximum 3 images · 5 MB each
                                    </p>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        name="images"
                                        accept="image/jpeg,image/png,image/webp"
                                        multiple
                                        disabled={images.length >= MAX_IMAGES || isSubmitting}
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
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                className="group relative aspect-square rounded-2xl overflow-hidden bg-[#f7e6eb] border border-white shadow-[0_8px_25px_rgba(77,48,56,0.06)]"
                                            >
                                                <img
                                                    src={image.preview}
                                                    alt="Cake reference"
                                                    className="w-full h-full object-cover"
                                                />

                                                <div className="absolute inset-0 bg-gradient-to-t from-[#4d3038]/20 to-transparent pointer-events-none" />

                                                <button
                                                    type="button"
                                                    disabled={isSubmitting}
                                                    onClick={() => removeImage(image.id)}
                                                    aria-label="Remove image"
                                                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[#4d3038]/70 backdrop-blur-md text-white flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-40"
                                                >
                                                    <Trash2 size={12} strokeWidth={1.5} />
                                                </button>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}

                            <div className="grid sm:grid-cols-2 gap-5">
                                <FormField
                                    label="Phone / Contact"
                                    icon={<Phone size={15} strokeWidth={1.4} />}
                                >
                                    <input
                                        type="tel"
                                        name="phone"
                                        autoComplete="tel"
                                        required
                                        maxLength={30}
                                        value={form.phone}
                                        onChange={(e) => updateField("phone", e.target.value)}
                                        placeholder="+1 000 000 0000"
                                        className="form-input"
                                    />
                                </FormField>

                                <FormField
                                    label="Email"
                                    icon={<Mail size={15} strokeWidth={1.4} />}
                                >
                                    <input
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        required
                                        maxLength={254}
                                        value={form.email}
                                        onChange={(e) => updateField("email", e.target.value)}
                                        placeholder="you@example.com"
                                        className="form-input"
                                    />
                                </FormField>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 mt-10 lg:mt-14 pt-7 lg:pt-9 border-t border-[#4d3038]/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div>
                            <p className="text-[9px] uppercase tracking-[0.22em] text-[#b27a8b]">
                                Your celebration starts here
                            </p>
                            <p className="mt-2 text-xs sm:text-sm text-[#80656d]">
                                We'll get back to you with availability and pricing.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group w-full sm:w-auto flex items-center justify-center gap-4 rounded-full bg-[#d98fa5] text-white px-6 sm:px-7 py-3.5 sm:py-4 text-[9px] sm:text-[10px] uppercase tracking-[0.22em] hover:bg-[#c97f97] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-500 shadow-[0_15px_40px_rgba(217,143,165,0.25)]"
                        >
                            {isSubmitting ? "Sending Enquiry..." : "Send Enquiry"}

                            <span className="w-8 h-8 rounded-full bg-white text-[#d98fa5] flex items-center justify-center transition-transform duration-500">
                                {isSubmitting ? (
                                    <span className="w-4 h-4 rounded-full border-2 border-[#d98fa5]/30 border-t-[#d98fa5] animate-spin" />
                                ) : (
                                    <ArrowUpRight size={15} strokeWidth={1.4} />
                                )}
                            </span>
                        </button>
                    </div>

                    <AnimatePresence>
                        {submitMessage && (
                            <motion.div
                                key={`${submitStatus}-${submitMessage}`}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className={`absolute inset-x-5 sm:inset-x-8 bottom-5 sm:bottom-7 rounded-2xl px-5 py-4 flex items-center gap-3 shadow-2xl z-30 ${
                                    submitStatus === "success"
                                        ? "bg-[#4d3038] text-white"
                                        : "bg-[#fff0f2] text-[#8c3047] border border-[#edc4cf]"
                                }`}
                            >
                                <div
                                    className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${
                                        submitStatus === "success"
                                            ? "bg-[#d98fa5] text-white"
                                            : "bg-[#edc4cf] text-[#8c3047]"
                                    }`}
                                >
                                    {submitStatus === "success" ? (
                                        <Check size={15} strokeWidth={1.6} />
                                    ) : (
                                        <span className="text-sm font-semibold">!</span>
                                    )}
                                </div>

                                <div>
                                    <p className="text-xs font-medium">
                                        {submitStatus === "success"
                                            ? "Thank you!"
                                            : "Unable to submit"}
                                    </p>
                                    <p
                                        className={`mt-0.5 text-[10px] leading-5 ${
                                            submitStatus === "success"
                                                ? "text-white/70"
                                                : "text-[#8c3047]"
                                        }`}
                                    >
                                        {submitMessage}
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
                    border: 1px solid rgba(77, 48, 56, 0.08);
                    background: #fffafd;
                    padding: 13px 14px;
                    font-size: 13px;
                    color: #4d3038;
                    outline: none;
                    transition: all 0.3s ease;
                }

                .form-input::placeholder {
                    color: rgba(154, 124, 131, 0.65);
                }

                .form-input:hover {
                    border-color: rgba(217, 143, 165, 0.25);
                    background: #ffffff;
                }

                .form-input:focus {
                    border-color: rgba(217, 143, 165, 0.55);
                    background: #ffffff;
                    box-shadow: 0 0 0 3px rgba(217, 143, 165, 0.08);
                }

                select.form-input {
                    color: #4d3038;
                }

                input[type="datetime-local"].form-input {
                    color-scheme: light;
                }
            `}</style>
        </section>
    );
}

function FormField({ label, icon, children }) {
    return (
        <label className="block">
            <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-[#80656d]">
                <span className="text-[#d98fa5]">{icon}</span>
                {label}
            </span>
            {children}
        </label>
    );
}