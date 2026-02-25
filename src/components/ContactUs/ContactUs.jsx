import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Youtube,
  MessageCircle,
  Facebook,
} from "lucide-react";
import toast from "react-hot-toast";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaBehance, FaTiktok } from "react-icons/fa";

const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters.")
    .max(40, "Full name is too long.")
    .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces."),
  governorate: z
    .string()
    .trim()
    .min(3, "City must be at least 3 characters.")
    .max(30, "City name is too long.")
    .regex(/^[a-zA-Z\s]+$/, "City can only contain letters and spaces."),
  videoType: z.string().trim().min(2, "Please specify the video type."),
  videoDuration: z.coerce
    .number({
      invalid_type_error: "Duration must be a number.",
    })
    .min(1, "Duration must be at least 1 second."),
  expectedPrice: z.coerce
    .number({
      invalid_type_error: "Expected price must be a number.",
    })
    .min(500, "Please enter a valid expected budget."),
  phone: z
    .string()
    .trim()
    .regex(/^(\+2)?[0-9]{11}$/, "Phone number must be exactly 11 digits."),
});

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+20 11 10711006",
    href: "tel:+20 11 10711006",
    color: "#9999FF",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+20 11 10711006",
    href: "https://wa.me/201110711006",
    color: "#25D366",
  },
  {
    icon: Mail,
    label: "Email",
    value: "Markyousry008@gmail.com",
    href: "mailto:markyousry008@gmail.com",
    color: "#f5a623",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Egypt",
    href: null,
    color: "#00BFFF",
  },
];
const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/mark_yousry?igsh=a3B3N3l0Nmh3Y243&utm_source=qr",
    icon: Instagram,
    color: "#E1306C",
  },

  {
    label: "Facebook",
    href: "https://www.facebook.com/share/17E2Rk2wEJ/?mibextid=wwXIfr",
    icon: Facebook,
    color: "#7DB3FF",
  },

  {
    label: "TikTok",
    href: "https://www.tiktok.com/@mark_youssry",
    icon: FaTiktok,
    color: "#FFFFFF",
  },

  {
    label: "Behance",
    href: "https://www.behance.net/markyousry1",
    icon: FaBehance,
    color: "#00A8FF",
  },
];

const inputClass = (hasError) =>
  `w-full rounded-xl px-4 py-3 text-sm bg-white/5 border ${
    hasError ? "border-red-500" : "border-white/10"
  } text-gray-200 placeholder-gray-600 focus:outline-none focus:border-[var(--accent)] transition-colors duration-200`;

function BehanceSVG({ color }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill={color}>
      <path d="M7.803 5.731c.589 0 1.119.051 1.605.155.483.103.895.273 1.243.508.343.235.611.547.804.939.187.393.28.863.28 1.41 0 .604-.141 1.111-.421 1.515-.28.407-.684.741-1.212 1.001.732.21 1.278.586 1.636 1.127.356.541.535 1.194.535 1.957 0 .608-.12 1.141-.362 1.601a3.257 3.257 0 0 1-.979 1.128 4.359 4.359 0 0 1-1.435.666 6.426 6.426 0 0 1-1.686.218H2V5.731h5.803zm-.351 4.972c.48 0 .878-.114 1.192-.345.312-.228.469-.588.469-1.073 0-.271-.05-.497-.147-.677a1.14 1.14 0 0 0-.404-.433 1.72 1.72 0 0 0-.59-.229 3.408 3.408 0 0 0-.71-.072H4.416v2.829h3.036zm.189 5.239c.267 0 .521-.025.76-.077.242-.053.454-.14.637-.261.182-.12.329-.283.437-.486.108-.203.163-.462.163-.775 0-.617-.173-1.063-.521-1.337-.348-.273-.804-.41-1.366-.41H4.416v3.346h3.225zm8.934.82a2.26 2.26 0 0 0 1.749-.67c.42-.447.651-1.007.651-1.663h-4.388c0 .668.212 1.232.637 1.676.424.444.978.657 1.351.657zm.081-8.357c-.567 0-1.051.167-1.449.501-.397.334-.641.831-.731 1.489h4.276c-.066-.658-.3-1.155-.703-1.489a2.119 2.119 0 0 0-1.393-.501zm0-1.768c.694 0 1.325.112 1.89.337.564.224 1.043.544 1.437.956.395.413.697.913.907 1.494.209.582.314 1.231.314 1.943 0 .138-.004.276-.013.416a3.66 3.66 0 0 1-.037.38h-6.572c.054.748.312 1.324.773 1.726.459.403 1.024.604 1.692.604.503 0 .938-.114 1.307-.341.367-.228.636-.514.805-.858h2.26a4.454 4.454 0 0 1-.636 1.394 4.384 4.384 0 0 1-1.068 1.054 4.849 4.849 0 0 1-1.389.655 5.576 5.576 0 0 1-1.613.225c-.748 0-1.43-.123-2.046-.368a4.574 4.574 0 0 1-1.581-1.041 4.727 4.727 0 0 1-1.019-1.618 5.804 5.804 0 0 1-.361-2.088c0-.748.118-1.44.355-2.073a4.825 4.825 0 0 1 1.012-1.627 4.603 4.603 0 0 1 1.584-1.062c.617-.252 1.308-.378 2.069-.378zm1.894-3.156h-5.278v1.38h5.278v-1.38z" />
    </svg>
  );
}

function WhatsAppSVG({ color }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill={color}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    try {
      const messagesRef = collection(db, "Messages");
      const q = query(messagesRef, where("phone", "==", data.phone));
      const snapshot = await getDocs(q);

      if (snapshot.size >= 2) {
        toast.error("You have already submitted 2 requests.");
        return;
      }

      await addDoc(messagesRef, {
        ...data,
        createdAt: new Date(),
      });

      toast.success("Your request was sent successfully");
      reset();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-20 px-6 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* ── Section Header ── */}
        <motion.div
          className="flex flex-col items-center text-center gap-3"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4 w-full max-w-2xl">
            <div
              className="flex-1 h-px"
              style={{ background: "var(--accent-20)" }}
            />
            <span
              className="text-sm tracking-[8px] uppercase font-black"
              style={{ color: "var(--accent)" }}
            >
              ✦ Contact Me ✦
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "var(--accent-20)" }}
            />
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white">
            Let's{" "}
            <span
              style={{
                color: "var(--accent)",
                filter: "drop-shadow(0 0 14px var(--accent))",
              }}
            >
              Work
            </span>{" "}
            Together
          </h2>

          <p className="text-gray-500 text-base tracking-widest uppercase">
            Request Your Project Now
          </p>
        </motion.div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* ── LEFT — Info + Socials ── */}
          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gray-400 text-base leading-relaxed">
              Have a{" "}
              <span style={{ color: "var(--accent)", fontWeight: "bold" }}>
                video project
              </span>{" "}
              in mind? Whether it's a commercial ad, social media content, or a
              professional video — I'm here to turn your idea into{" "}
              <span style={{ color: "var(--accent)", fontWeight: "bold" }}>
                stunning visual content
              </span>
              . Get in touch now!
            </p>

            {/* Contact Cards */}
            <div className="flex flex-col gap-3">
              {contactInfo.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href || undefined}
                  target={item.href ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-4 px-5 py-4 rounded-xl border"
                  style={{
                    borderColor: `${item.color}55`,
                    background: `${item.color}18`,
                    cursor: item.href ? "pointer" : "default",
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={item.href ? { scale: 1.02, x: 4 } : {}}
                >
                  <span
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.color}33` }}
                  >
                    <item.icon size={18} style={{ color: item.color }} />
                  </span>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-widest">
                      {item.label}
                    </p>
                    <p className="text-white text-sm font-semibold">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-gray-400 text-xs mb-4 uppercase tracking-widest">
                Follow My Work
              </p>
              <div className="flex flex-wrap gap-3">
                {socials.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold"
                    style={{
                      borderColor: `${s.color}66`,
                      background: `${s.color}1a`,
                      color: s.color,
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <span className="flex items-center justify-center">
                      {s.icon ? (
                        <s.icon size={16} />
                      ) : s.label === "Behance" ? (
                        <BehanceSVG color={s.color} />
                      ) : (
                        <WhatsAppSVG color={s.color} />
                      )}
                    </span>
                    {s.label}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Response time badge */}
            <motion.div
              className="self-start flex items-center gap-3 px-5 py-3 rounded-xl border"
              style={{
                borderColor: "var(--accent-30)",
                background: "var(--accent-10, rgba(108,0,255,0.08))",
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: "#00c896" }}
                />
                <span
                  className="relative inline-flex rounded-full h-2.5 w-2.5"
                  style={{ background: "#00c896" }}
                />
              </span>
              <span className="text-gray-300 text-sm">
                Usually replies within{" "}
                <span className="font-bold" style={{ color: "var(--accent)" }}>
                  a few hours
                </span>
              </span>
            </motion.div>
          </motion.div>

          {/* ── RIGHT — Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 p-6 rounded-2xl border"
              style={{
                borderColor: "var(--accent-30)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <p
                className="text-lg font-black text-white mb-1"
                style={{ letterSpacing: "0.05em" }}
              >
                Project Details
              </p>

              {/* Full Name */}
              <div>
                <label className="text-gray-300 text-xs uppercase tracking-widest mb-1 block">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  {...register("fullName")}
                  className={inputClass(errors.fullName)}
                />
                {errors.fullName && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Governorate */}
              <div>
                <label className="text-gray-300 text-xs uppercase tracking-widest mb-1 block">
                  Governorate / City *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cairo, Alexandria..."
                  {...register("governorate")}
                  className={inputClass(errors.governorate)}
                />
                {errors.governorate && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.governorate.message}
                  </p>
                )}
              </div>

              {/* Video Type */}
              <div>
                <label className="text-gray-300 text-xs uppercase tracking-widest mb-1 block">
                  Video Type *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Commercial Ad, Reels, Music Video..."
                  {...register("videoType")}
                  className={inputClass(errors.videoType)}
                />
                {errors.videoType && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.videoType.message}
                  </p>
                )}
              </div>

              {/* Video Duration */}
              <div>
                <label className="text-gray-300 text-xs uppercase tracking-widest mb-1 block">
                  Video Duration (in seconds) *
                </label>
                <input
                  type="number"
                  placeholder="Enter duration in seconds (e.g. 30, 60, 120)"
                  {...register("videoDuration")}
                  className={inputClass(errors.videoDuration)}
                />
                {errors.videoDuration && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.videoDuration.message}
                  </p>
                )}
              </div>

              {/* Expected Price */}
              <div>
                <label className="text-gray-300 text-xs uppercase tracking-widest mb-1 block">
                  Expected Budget *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 500 EGP, 1000 EGP..."
                  {...register("expectedPrice")}
                  className={inputClass(errors.expectedPrice)}
                />
                {errors.expectedPrice && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.expectedPrice.message}
                  </p>
                )}
              </div>

              {/* Phone (WhatsApp) */}
              <div>
                <label className="text-gray-300 text-xs uppercase tracking-widest mb-1 block">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  {...register("phone")}
                  className={inputClass(errors.phone)}
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full py-3 rounded-xl font-black text-sm tracking-widest uppercase"
                style={{
                  background: "var(--accent)",
                  color: "#fff",
                  boxShadow: "0 0 20px var(--accent-30)",
                  opacity: isSubmitting ? 0.7 : 1,
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 32px var(--accent)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? "Sending..." : "Send Request"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
