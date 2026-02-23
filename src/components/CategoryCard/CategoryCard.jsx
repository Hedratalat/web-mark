import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { FiFolder } from "react-icons/fi";

export default function CategoryCard() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDocs(
        query(collection(db, "categories"), orderBy("createdAt", "desc")),
      );
      const cats = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      const projSnap = await getDocs(collection(db, "projects"));
      const projects = projSnap.docs.map((d) => d.data());
      cats.forEach((c) => {
        c.projectCount = projects.filter((p) => p.categoryId === c.id).length;
      });
      setCategories(cats);
    };
    fetchData();
  }, []);

  // كل صف فيه عدد مختلف عشان يبان staggered
  const rows = [];
  let i = 0;
  const rowSizes = [2, 3, 2, 3]; // تتكرر
  let r = 0;
  while (i < categories.length) {
    const size = rowSizes[r % rowSizes.length];
    rows.push(categories.slice(i, i + size));
    i += size;
    r++;
  }

  return (
    <section id="portfolio" className="py-20 px-6 lg:px-20 overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col gap-16">
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
              ✦ Portfolio ✦
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "var(--accent-20)" }}
            />
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white">
            My{" "}
            <span
              style={{
                color: "var(--accent)",
                filter: "drop-shadow(0 0 14px var(--accent))",
              }}
            >
              Work
            </span>
          </h2>

          <p className="text-gray-500 text-base tracking-widest uppercase">
            Browse by category
          </p>
        </motion.div>

        {categories.length === 0 ? (
          <p className="flex flex-col items-center justify-center text-center text-gray-600 py-16 text-lg gap-4">
            <FiFolder className="w-10 h-10 text-gray-400" />
            No categories yet.
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat, rowIdx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: rowIdx * 0.08, duration: 0.5 }}
              >
                <motion.button
                  onClick={() => navigate(`/portfolio/${cat.id}`)}
                  className="flex items-center gap-4 group"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "999px",
                    padding: "8px 24px 8px 8px",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                  whileHover={{
                    scale: 1.05,
                    borderColor: "var(--accent)",
                    background: "var(--accent-10)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div
                    className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center text-3xl"
                    style={{
                      background: cat.imageUrl ? "none" : "var(--accent-soft)",
                      border: "2px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {cat.imageUrl ? (
                      <img
                        src={cat.imageUrl}
                        alt={cat.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      "🎬"
                    )}
                  </div>
                  <div className="text-left">
                    <p className="text-white font-bold text-lg leading-tight">
                      {cat.name}
                    </p>
                    <p
                      className="text-sm mt-0.5"
                      style={{ color: "var(--accent)" }}
                    >
                      {cat.projectCount} projects
                    </p>
                  </div>
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
