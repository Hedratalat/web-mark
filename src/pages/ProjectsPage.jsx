import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const INITIAL_COUNT = 5;

export default function ProjectsPage() {
  const { catId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const [catDoc, snap] = await Promise.all([
        getDoc(doc(db, "categories", catId)),
        getDocs(
          query(collection(db, "projects"), where("categoryId", "==", catId)),
        ),
      ]);
      if (catDoc.exists()) setCategory({ id: catDoc.id, ...catDoc.data() });
      setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    };
    fetchData();
  }, [catId]);

  function getEmbedUrl(url) {
    if (!url) return null;
    const yt = url.match(
      /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&?\s]+)/,
    );
    const vimeo = url.match(/vimeo\.com\/(\d+)/);
    if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
    if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
    return null;
  }

  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_COUNT);

  return (
    <>
      <Navbar />
      <section className="min-h-screen py-5 sm:py-9 px-6 lg:px-20">
        <div className="max-w-6xl mx-auto flex flex-col gap-14">
          {/* Back */}
          <motion.button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 w-fit text-sm font-bold"
            style={{ color: "var(--accent)" }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -4 }}
          >
            ← Back
          </motion.button>

          {loading ? (
            <div className="flex justify-center py-20">
              <motion.img
                src="/logomark.png"
                alt="Loading"
                className="w-16 h-16 object-contain"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  filter: "drop-shadow(0 0 12px var(--accent))",
                }}
              />
            </div>
          ) : (
            <>
              <motion.div
                className="flex flex-col items-center text-center gap-3"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
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
                    ✦ Portfolio ✦
                  </span>
                  <div
                    className="flex-1 h-px"
                    style={{ background: "var(--accent-20)" }}
                  />
                </div>

                <h2 className="text-3xl md:text-6xl font-black text-white">
                  {category?.name ? (
                    <>
                      {category.name.split(" ")[0]}{" "}
                      <span
                        style={{
                          color: "var(--accent)",
                          filter: "drop-shadow(0 0 14px var(--accent))",
                        }}
                      >
                        {category.name.split(" ").slice(1).join(" ") || "Work"}
                      </span>
                    </>
                  ) : (
                    "Work"
                  )}
                </h2>

                <p className="text-gray-500 text-base tracking-widest uppercase">
                  {projects.length} project{projects.length !== 1 ? "s" : ""}
                </p>
              </motion.div>

              {/* Projects */}
              {projects.length === 0 ? (
                <motion.div
                  className="flex flex-col items-center gap-5 py-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                    style={{
                      background: "var(--accent-10)",
                      border: "1px solid var(--accent-20)",
                    }}
                  >
                    🎬
                  </div>
                  <p className="text-white font-bold text-xl">
                    No Projects Yet
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-px"
                      style={{ background: "var(--accent-20)" }}
                    />
                    <span
                      className="text-xs tracking-widest uppercase"
                      style={{ color: "var(--accent)" }}
                    >
                      coming soon
                    </span>
                    <div
                      className="w-8 h-px"
                      style={{ background: "var(--accent-20)" }}
                    />
                  </div>
                </motion.div>
              ) : (
                <>
                  <div className="flex flex-col gap-12">
                    {visibleProjects.map((p, i) => {
                      const embedUrl = getEmbedUrl(p.videoUrl);
                      const isEven = i % 2 === 0;
                      return (
                        <motion.div
                          key={p.id}
                          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
                        >
                          {/* Video */}
                          <div className={isEven ? "lg:order-1" : "lg:order-2"}>
                            {embedUrl ? (
                              <div
                                className="relative rounded-2xl overflow-hidden"
                                style={{
                                  aspectRatio: "16/9",
                                  border: "1px solid rgba(255,255,255,0.08)",
                                }}
                              >
                                <iframe
                                  src={embedUrl}
                                  className="w-full h-full"
                                  allowFullScreen
                                  title={p.brandName}
                                />
                                <div
                                  className="absolute -inset-1 -z-10 rounded-2xl blur-xl opacity-20"
                                  style={{ background: "var(--accent)" }}
                                />
                              </div>
                            ) : (
                              <div
                                className="rounded-2xl flex items-center justify-center text-6xl opacity-20"
                                style={{
                                  aspectRatio: "16/9",
                                  background: "#111",
                                  border: "1px solid rgba(255,255,255,0.07)",
                                }}
                              >
                                🎬
                              </div>
                            )}
                          </div>

                          {/* Details */}
                          <div
                            className={`flex flex-col gap-5 ${isEven ? "lg:order-2" : "lg:order-1"}`}
                          >
                            <div className="flex items-start gap-3 flex-wrap">
                              <h3 className="text-white font-black text-2xl md:text-3xl leading-tight">
                                {p.brandName}
                              </h3>
                              {p.projectType && (
                                <span
                                  className="text-sm px-3 py-1 rounded-full font-semibold mt-1"
                                  style={{
                                    background: "var(--accent-10)",
                                    color: "var(--accent)",
                                    border: "1px solid var(--accent-20)",
                                  }}
                                >
                                  {p.projectType}
                                </span>
                              )}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              {[
                                {
                                  icon: "👤",
                                  label: "Client",
                                  value: p.clientName,
                                },
                                {
                                  icon: "🌍",
                                  label: "Country",
                                  value: p.clientCountry,
                                },
                                { icon: "📅", label: "Year", value: p.year },
                                {
                                  icon: "⏱",
                                  label: "Duration",
                                  value: p.duration,
                                },
                              ]
                                .filter((m) => m.value)
                                .map((m) => (
                                  <div
                                    key={m.label}
                                    className="flex flex-col gap-0.5 px-4 py-3 rounded-xl"
                                    style={{
                                      background: "rgba(255,255,255,0.03)",
                                      border:
                                        "1px solid rgba(255,255,255,0.07)",
                                    }}
                                  >
                                    <span className="text-xs text-gray-500 uppercase tracking-widest">
                                      {m.icon} {m.label}
                                    </span>
                                    <span className="text-white font-semibold text-sm">
                                      {m.value}
                                    </span>
                                  </div>
                                ))}
                            </div>

                            <div
                              className="h-px"
                              style={{ background: "rgba(255,255,255,0.06)" }}
                            />

                            {p.description && (
                              <p className="text-gray-400 text-base leading-relaxed">
                                {p.description}
                              </p>
                            )}

                            {(p.software || []).length > 0 && (
                              <div className="flex flex-col gap-2">
                                <p className="text-xs text-gray-500 uppercase tracking-widest">
                                  Software Used
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {p.software.map((s) => (
                                    <span
                                      key={s}
                                      className="text-xs px-3 py-1 rounded-full font-medium"
                                      style={{
                                        background: "var(--accent-10)",
                                        color: "var(--accent)",
                                        border: "1px solid var(--accent-20)",
                                      }}
                                    >
                                      {s}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {p.videoUrl && (
                              <a
                                href={p.videoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 w-fit text-sm font-bold px-6 py-3 rounded-xl transition-all"
                                style={{
                                  background: "var(--accent)",
                                  color: "#000",
                                }}
                              >
                                ▶ Watch Full Video
                              </a>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Show More */}
                  {!showAll && projects.length > INITIAL_COUNT && (
                    <motion.div
                      className="flex justify-center mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <button
                        onClick={() => setShowAll(true)}
                        className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm border transition-all"
                        style={{
                          borderColor: "var(--accent-30)",
                          color: "var(--accent)",
                          background: "var(--accent-10)",
                        }}
                      >
                        Show More ({projects.length - INITIAL_COUNT} remaining)
                      </button>
                    </motion.div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
