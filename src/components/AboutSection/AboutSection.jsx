import { motion } from "framer-motion";

const tools = [
  { name: "Premiere Pro", icon: "Pr", color: "#9999FF" },
  { name: "After Effects", icon: "Ae", color: "#9999FF" },
  { name: "AI Workflows", icon: "AI", color: "#00c896" },
  { name: "Color Grading", icon: "CG", color: "#f5a623" },
];

const industries = [
  "🍽️ Restaurants",
  "🏥 Medical Content",
  "☕ Cafés",
  "⚽ Sports Clubs",
  "🎨 Animation",
  "✈️ Travel & Tourism",
  "📢 Commercial Promos",
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-6 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
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
              ✦ About Me ✦
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "var(--accent-20)" }}
            />
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white">
            Mark{" "}
            <span
              style={{
                color: "var(--accent)",
                filter: "drop-shadow(0 0 14px var(--accent))",
              }}
            >
              Yousry
            </span>
          </h2>

          <p className="text-gray-500 text-base tracking-widest uppercase">
            Senior Video Editor
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT — Photo */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-80 h-[420px]">
              <div
                className="absolute -inset-4 rounded-2xl blur-2xl opacity-20"
                style={{ background: "var(--accent)" }}
              />
              <img
                src="/image.jfif"
                alt="Mark Yousry"
                className="relative w-full h-full object-cover object-top rounded-2xl"
                style={{ border: "2px solid var(--accent-30)" }}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.style.background =
                    "linear-gradient(135deg, color-mix(in srgb, var(--accent) 20%, #050505), #050505)";
                }}
              />
              <motion.div
                className="absolute -bottom-5 -right-5 px-5 py-3 rounded-xl text-sm font-bold"
                style={{
                  background: "var(--accent)",
                  color: "#000",
                  boxShadow: "0 0 24px var(--accent-30)",
                }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                5+ Years XP 🎬
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT — Text  */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-gray-400 text-base leading-relaxed">
              Senior{" "}
              <span style={{ color: "var(--accent)", fontWeight: "bold" }}>
                Video Editor
              </span>{" "}
              with 5 years of professional experience. Skilled in{" "}
              <span style={{ color: "var(--accent)", fontWeight: "bold" }}>
                Adobe Premiere Pro
              </span>{" "}
              and{" "}
              <span style={{ color: "var(--accent)", fontWeight: "bold" }}>
                After Effects
              </span>
              , with strong expertise in AI-powered tools and workflows.
            </p>
            <p className="text-gray-400 text-base leading-relaxed">
              I focus on high-quality visuals, creative storytelling, and
              delivering impactful content that meets deadlines with
              professional standards.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-2">
              {tools.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                  style={{
                    borderColor: `${tool.color}33`,
                    background: `${tool.color}0d`,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <span
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm flex-shrink-0"
                    style={{ background: `${tool.color}22`, color: tool.color }}
                  >
                    {tool.icon}
                  </span>
                  <span className="text-gray-300 text-sm font-semibold">
                    {tool.name}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Industries */}
            <div className="mt-2">
              <p className="text-gray-500 text-xs mb-3 uppercase tracking-widest">
                Industries
              </p>
              <div className="flex flex-wrap gap-2">
                {industries.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full text-sm border"
                    style={{
                      color: "var(--accent)",
                      borderColor: "var(--accent-30)",
                      background: "var(--accent-10)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
