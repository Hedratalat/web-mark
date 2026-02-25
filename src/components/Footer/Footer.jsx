import { motion } from "framer-motion";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { FaBehance, FaTiktok } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const services = [
  "Promos",
  "Reels",
  "Medical Productions",
  "Sports Media & Training Coverage",
  "Café & Lifestyle Content",
  "2D & 3D Animation",
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
    color: "#ffffff",
  },
  {
    label: "Behance",
    href: "https://www.behance.net/markyousry1",
    icon: FaBehance,
    color: "#00A8FF",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/201110711006",
    icon: MessageCircle,
    color: "#25D366",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Portfolio", id: "portfolio" },
    { label: "Contact", id: "contact" },
  ];

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
      navigate("/");
      setTimeout(scroll, 100);
    } else {
      scroll();
    }
  };
  return (
    <footer className="relative overflow-hidden px-6 lg:px-20 pt-16 pb-8 mt-10">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--accent), transparent)",
        }}
      />
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-32 blur-3xl opacity-20 rounded-full"
        style={{ background: "var(--accent)" }}
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 items-start place-items-center sm:place-items-start">
          {/* Col 1 — Brand */}
          <motion.div
            className="flex flex-col gap-4 items-center text-center lg:items-start lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                Mark{" "}
                <span
                  style={{
                    color: "var(--accent)",
                    filter: "drop-shadow(0 0 8px var(--accent))",
                  }}
                >
                  Yousry
                </span>
              </h3>
              <p className="text-gray-300 text-xs tracking-[6px] uppercase mt-1">
                Senior Video Editor
              </p>
            </div>
            <p className="text-gray-300 text-base leading-relaxed">
              Transforming raw footage into compelling stories. 5+ years of
              professional editing for brands &amp; content creators.
            </p>
            {/* Socials */}
            <div className="flex gap-2 flex-wrap mt-1 justify-center lg:justify-start">
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center border"
                  style={{
                    borderColor: `${s.color}44`,
                    background: `${s.color}11`,
                    color: s.color,
                  }}
                  whileHover={{
                    scale: 1.15,
                    background: `${s.color}28`,
                    borderColor: `${s.color}88`,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <s.icon size={15} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Col 2 — Quick Links */}
          <motion.div
            className="flex flex-col gap-4 items-center text-center lg:items-start lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-white text-xs uppercase tracking-widest font-bold">
              Quick Links
            </p>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-200 text-base hover:text-white transition-colors duration-200 flex items-center justify-center lg:justify-start gap-2 group"
                  >
                    <span
                      className="w-0 group-hover:w-3 h-px transition-all duration-300 flex-shrink-0"
                      style={{ background: "var(--accent)" }}
                    />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3 — Services */}
          <motion.div
            className="flex flex-col gap-4 items-center text-center lg:items-start lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-white text-xs uppercase tracking-widest font-bold">
              Services
            </p>
            <ul className="flex flex-col gap-2">
              {services.map((s) => (
                <li
                  key={s}
                  className="text-gray-200 text-base flex items-center justify-center lg:justify-start gap-2"
                >
                  <span
                    className="w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: "var(--accent)" }}
                  />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4 — Contact */}
          <motion.div
            className="flex flex-col gap-4 items-center text-center lg:items-start lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-white text-xs uppercase tracking-widest font-bold">
              Get In Touch
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/201110711006"
                target="_blank"
                rel="noreferrer"
                className="text-gray-200 text-base hover:text-white transition-colors flex items-center justify-center lg:justify-start gap-2"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "#25D366" }}
                />
                +20 11 10711006
              </a>
              <a
                href="mailto:Markyousry008@gmail.com"
                className="text-gray-200 text-base hover:text-white transition-colors flex items-center justify-center lg:justify-start gap-2 break-all"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "#f5a623" }}
                />
                Markyousry008@gmail.com
              </a>
              <span className="text-gray-200 text-base flex items-center justify-center lg:justify-start gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "#00BFFF" }}
                />
                Egypt
              </span>
            </div>

            {/* CTA */}
            <button
              onClick={() => scrollToSection("contact")}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest self-center lg:self-start transition-all duration-200"
              style={{
                background: "var(--accent-20)",
                border: "1px solid var(--accent-30)",
                color: "var(--accent)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--accent-30)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--accent-20)";
              }}
            >
              🎬 Start a Project
            </button>
          </motion.div>
        </div>

        {/* ── DIVIDER ── */}
        <div
          className="w-full h-px"
          style={{ background: "var(--accent-20)" }}
        />

        {/* ── BOTTOM ROW ── */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 "
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-white text-sm font-semibold order-2 sm:order-1">
            © {year} <span style={{ color: "var(--accent)" }}>Mark Yousry</span>
            . All rights reserved.
          </p>

          <div className="flex items-center gap-2 order-1 sm:order-2">
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                style={{ background: "#00c896" }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: "#00c896" }}
              />
            </span>
            <p className="text-white text-sm font-semibold">
              Open for new projects
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
