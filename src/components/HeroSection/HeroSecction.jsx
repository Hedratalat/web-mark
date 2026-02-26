import { motion } from "framer-motion";
import { Facebook, Instagram, Video } from "lucide-react";
import { FaBehance, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { Navigate } from "react-router-dom";

const tools = [
  { name: "Pr", color: "#9999FF", bg: "#2a1a6e", top: "75%", left: "5%" },
  { name: "Ae", color: "#9999FF", bg: "#1a0a4e", top: "80%", left: "55%" },
  { name: "Dr", color: "#31A8FF", bg: "#0a2a4e", top: "8%", left: "58%" },
  { name: "Ai", color: "#FF7043", bg: "#3e1a0a", top: "10%", left: "5%" },
];

export default function HeroSection() {
  const scrollToSection = (id) => {
    const scroll = () => {
      const section = document.getElementById(id);
      const navbarHeight = document.querySelector("nav")?.offsetHeight || 80;
      if (section) {
        window.scrollTo({
          top:
            section.getBoundingClientRect().top +
            window.pageYOffset -
            navbarHeight,
          behavior: "smooth",
        });
      }
    };

    if (location.pathname !== "/") {
      Navigate("/");
      setTimeout(scroll, 100);
    } else {
      scroll();
    }
  };

  return (
    <section
      id="home"
      className="flex items-center px-6 lg:px-20 py-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT */}
        <motion.div
          className="relative flex justify-center items-center"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-80 h-80 md:w-[450px] md:h-[450px]">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--accent) 30%, transparent), transparent 70%)",
                animation: "pulse 3s ease-in-out infinite",
              }}
            />
            <div
              className="absolute inset-2 rounded-full border-2"
              style={{ borderColor: "var(--accent-20)" }}
            />
            <div
              className="absolute inset-4 rounded-full overflow-hidden border-2"
              style={{ borderColor: "var(--accent-30)" }}
            >
              <img
                src="/image.jfif"
                alt="mark yousry"
                className="w-full h-full object-cover object-[center_20%] scale-125"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.style.background =
                    "linear-gradient(135deg, color-mix(in srgb, var(--accent) 20%, #050505), #050505)";
                }}
              />
            </div>

            {tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                className="absolute w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center font-black text-xl shadow-2xl cursor-default select-none"
                style={{
                  top: tool.top,
                  left: tool.left,
                  background: tool.bg,
                  color: tool.color,
                  border: `1px solid ${tool.color}44`,
                  boxShadow: `0 0 20px ${tool.color}33`,
                }}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              >
                {tool.name}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.span
            className="flex items-center gap-2 w-fit px-4 py-1 rounded-full text-sm font-semibold border text-white"
            style={{
              borderColor: "var(--accent-30)",
              background: "var(--accent-10)",
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            ✦ Senior Video Editor
          </motion.span>

          <motion.span
            className="flex items-center gap-2 w-fit px-4 py-1 rounded-full text-sm font-semibold border text-white"
            style={{
              borderColor: "var(--accent-30)",
              background: "var(--accent-10)",
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Video size={16} />
            Videographer
          </motion.span>

          <h1 className="text-6xl md:text-7xl lg:text-7xl font-black leading-tight text-white">
            <span
              style={{
                color: "var(--accent)",
                filter: "drop-shadow(0 0 12px var(--accent))",
              }}
            >
              I'm{" "}
            </span>
            Mark
          </h1>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-300">
            Creative Director
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
            I'm a{" "}
            <span style={{ color: "var(--accent)", fontWeight: "bold" }}>
              Video Editor
            </span>
            , — passionate about turning raw footage into cinematic stories that
            leave a lasting impression. Skilled in visual storytelling, color
            grading, sound design, and motion graphics, bringing creativity and
            precision to every project.
          </p>

          <div className="flex flex-col gap-8 ">
            {" "}
            <div className="flex gap-8">
              {[
                { num: "300+", label: "Projects" },
                { num: "5+", label: "Years XP" },
                { num: "100%", label: "Quality" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col text-white">
                  <span className="text-3xl font-black ">{s.num}</span>
                  <span className="text-gray-500 text-sm">{s.label}</span>
                </div>
              ))}
            </div>
            {/* Social Media */}
            <div className="flex gap-4 mb-1 ">
              {[
                {
                  icon: <Facebook size={20} />,
                  label: "Facebook",
                  url: "https://www.facebook.com/share/17E2Rk2wEJ/?mibextid=wwXIfr",
                  color: "#1877F2",
                },
                {
                  icon: <Instagram size={20} />,
                  label: "Instagram",
                  url: "https://www.instagram.com/mark_yousry?igsh=a3B3N3l0Nmh3Y243&utm_source=qr",
                  color: "#E1306C",
                },
                {
                  icon: <FaTiktok size={20} />,
                  label: "TikTok",
                  url: "https://www.tiktok.com/@mark_youssry",
                  color: "#ffffff",
                },
                {
                  icon: <FaBehance size={20} />,
                  label: "Behance",
                  url: "https://www.behance.net/markyousry1",
                  color: "#1769FF",
                },
                {
                  icon: <FaWhatsapp size={20} />,
                  label: "WhatsApp",
                  url: "https://wa.me/201110711006",

                  color: "#25D366",
                },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm border"
                  style={{
                    color: s.color,
                    borderColor: `${s.color}44`,
                    background: `${s.color}11`,
                    boxShadow: `0 0 12px ${s.color}22`,
                  }}
                  title={s.label}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="flex gap-4 flex-wrap mt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 rounded-xl font-bold  text-lg"
              style={{
                background: "var(--accent)",
                boxShadow: "0 0 24px var(--accent-30)",
              }}
              onClick={() => scrollToSection("portfolio")}
            >
              View My Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 rounded-xl font-bold text-lg border"
              style={{
                borderColor: "var(--accent-30)",
                background: "var(--accent-10)",
              }}
              onClick={() => scrollToSection("portfolio")}
            >
              Contact Me
            </motion.button>
          </div>
        </motion.div>
      </div>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.05); } }`}</style>
    </section>
  );
}
