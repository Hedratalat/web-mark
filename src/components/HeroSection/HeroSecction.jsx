import { motion } from "framer-motion";

const tools = [
  { name: "Pr", color: "#9999FF", bg: "#2a1a6e", top: "75%", left: "5%" },
  { name: "Ae", color: "#9999FF", bg: "#1a0a4e", top: "80%", left: "55%" },
  { name: "Ps", color: "#31A8FF", bg: "#0a2a4e", top: "8%", left: "58%" },
  { name: "Bl", color: "#FF7043", bg: "#3e1a0a", top: "10%", left: "5%" },
];

export default function HeroSection() {
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
                alt="Fares"
                className="w-full h-full object-cover object-top"
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
          className="flex flex-col gap-5"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.span
            className="w-fit px-4 py-1 rounded-full text-sm font-semibold border"
            style={{
              color: "var(--accent)",
              borderColor: "var(--accent-30)",
              background: "var(--accent-10)",
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            ✦ Senior Video Editor
          </motion.span>

          {/* كبرت من text-7xl لـ text-8xl */}
          <h1 className="text-6xl md:text-7xl lg:text-7xl font-black leading-tight text-white">
            I'm{" "}
            <span
              style={{
                color: "var(--accent)",
                filter: "drop-shadow(0 0 12px var(--accent))",
              }}
            >
              Mark
            </span>
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

          <div className="flex gap-8 my-2">
            {[
              { num: "50+", label: "Projects" },
              { num: "5+", label: "Years XP" },
              { num: "100%", label: "Quality" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col">
                <span
                  className="text-3xl font-black"
                  style={{ color: "var(--accent)" }}
                >
                  {s.num}
                </span>
                <span className="text-gray-500 text-sm">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-4 flex-wrap mt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 rounded-xl font-bold text-black text-lg"
              style={{
                background: "var(--accent)",
                boxShadow: "0 0 24px var(--accent-30)",
              }}
            >
              View My Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 rounded-xl font-bold text-lg border"
              style={{
                color: "var(--accent)",
                borderColor: "var(--accent-30)",
                background: "var(--accent-10)",
              }}
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
