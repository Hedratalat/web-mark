import { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import toast from "react-hot-toast";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

// ── Confirm Delete Modal ──────────────────────────────────────────
function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-7"
        style={{
          background: "#161616",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <p className="text-2xl mb-2">🗑️</p>
        <h3 className="text-xl font-bold mb-2">Are you sure?</h3>
        <p className="text-gray-400 text-base mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-base font-medium border text-gray-300"
            style={{
              borderColor: "rgba(255,255,255,0.12)",
              background: "#1f1f1f",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl text-base font-semibold"
            style={{ background: "#ff3b3b", color: "#fff" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Shared UI ─────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-lg rounded-2xl p-7 overflow-y-auto max-h-[90vh]"
        style={{
          background: "#161616",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-400 mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-xl px-4 py-3 text-base text-white outline-none"
      style={{
        background: "#0d0d0d",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    />
  );
}

function ModalActions({ onClose, onSave, saving, disabled }) {
  return (
    <div
      className="flex justify-end gap-3 mt-6 pt-5 border-t"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      <button
        onClick={onClose}
        className="px-6 py-2.5 rounded-xl text-base font-medium border text-gray-300"
        style={{ borderColor: "rgba(255,255,255,0.12)", background: "#1f1f1f" }}
      >
        Cancel
      </button>
      <button
        onClick={onSave}
        disabled={saving || disabled}
        className="px-7 py-2.5 rounded-xl text-base font-bold text-black disabled:opacity-40"
        style={{ background: "var(--accent)" }}
      >
        {saving ? "Saving…" : "Save"}
      </button>
    </div>
  );
}

// ── Software Tags Input ───────────────────────────────────────────
function SoftwareInput({ value, onChange }) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const add = () => {
    const trimmed = input.trim();
    if (!trimmed || value.includes(trimmed)) return;
    onChange([...value, trimmed]);
    setInput("");
  };

  const remove = (sw) => onChange(value.filter((s) => s !== sw));

  const onKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      add();
    }
    if (e.key === "Backspace" && !input && value.length)
      remove(value[value.length - 1]);
  };

  return (
    <div
      className="w-full rounded-xl px-3 py-2 flex flex-wrap gap-2 cursor-text min-h-[48px]"
      style={{
        background: "#0d0d0d",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {value.map((sw) => (
        <span
          key={sw}
          className="flex items-center gap-1.5 text-sm px-3 py-1 rounded-full font-medium"
          style={{
            background: "var(--accent-20)",
            color: "var(--accent)",
            border: "1px solid var(--accent-30)",
          }}
        >
          {sw}
          <button
            onClick={() => remove(sw)}
            className="leading-none hover:opacity-70 text-base"
          >
            ×
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKey}
        onBlur={add}
        placeholder={
          value.length === 0 ? "Type software name and press Enter…" : ""
        }
        className="flex-1 min-w-[140px] bg-transparent text-base text-white outline-none placeholder-gray-600"
      />
    </div>
  );
}

// ── Category Modal ────────────────────────────────────────────────
function CategoryModal({ initial, onClose, onSave }) {
  const [name, setName] = useState(initial?.name || "");
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl || "");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!name.trim()) return;
    setSaving(true);
    await onSave({ name, imageUrl });
    setSaving(false);
  };

  return (
    <Modal title={initial ? "Edit Category" : "New Category"} onClose={onClose}>
      <Field label="Category Name *">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Food & Beverages"
        />
      </Field>
      <Field label="Cover Image URL">
        <Input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://..."
        />
        {imageUrl && (
          <img
            src={imageUrl}
            alt="preview"
            className="mt-3 w-full h-32 object-cover rounded-xl"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          />
        )}
      </Field>
      <ModalActions
        onClose={onClose}
        onSave={save}
        saving={saving}
        disabled={!name.trim()}
      />
    </Modal>
  );
}

// ── Project Modal ─────────────────────────────────────────────────
function ProjectModal({ initial, categoryId, onClose, onSave }) {
  const [form, setForm] = useState({
    brandName: initial?.brandName || "",
    clientName: initial?.clientName || "",
    projectType: initial?.projectType || "",
    clientCountry: initial?.clientCountry || "",
    duration: initial?.duration || "",
    year: initial?.year || "",
    videoUrl: initial?.videoUrl || "",
    description: initial?.description || "",
    software: initial?.software || [],
  });
  const [saving, setSaving] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const save = async () => {
    if (!form.brandName.trim()) return;
    setSaving(true);
    await onSave(form, categoryId);
    setSaving(false);
  };

  return (
    <Modal title={initial ? "Edit Project" : "New Project"} onClose={onClose}>
      {/* Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Brand Name *">
          <Input
            value={form.brandName}
            onChange={set("brandName")}
            placeholder="e.g. Pepsi Egypt"
          />
        </Field>
        <Field label="Client Name">
          <Input
            value={form.clientName}
            onChange={set("clientName")}
            placeholder="e.g. JWT Agency"
          />
        </Field>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Project Type">
          <Input
            value={form.projectType}
            onChange={set("projectType")}
            placeholder="e.g. Commercial, Reel, Music Video…"
          />
        </Field>
        <Field label="Client Country">
          <Input
            value={form.clientCountry}
            onChange={set("clientCountry")}
            placeholder="e.g. Egypt, KSA, UAE…"
          />
        </Field>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Duration">
          <Input
            value={form.duration}
            onChange={set("duration")}
            placeholder="e.g. 30s, 2 min"
          />
        </Field>
        <Field label="Year">
          <Input value={form.year} onChange={set("year")} placeholder="2024" />
        </Field>
      </div>

      <Field label="Video URL (YouTube / Vimeo)">
        <Input
          value={form.videoUrl}
          onChange={set("videoUrl")}
          placeholder="https://youtube.com/watch?v=..."
        />
      </Field>

      <Field label="Description">
        <textarea
          value={form.description}
          onChange={set("description")}
          placeholder="What was this project about? Concept, goals, results…"
          rows={3}
          className="w-full rounded-xl px-4 py-3 text-base text-white outline-none resize-none"
          style={{
            background: "#0d0d0d",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        />
      </Field>

      <Field label="Software Used (press Enter to add)">
        <SoftwareInput
          value={form.software}
          onChange={(sw) => setForm((f) => ({ ...f, software: sw }))}
        />
      </Field>

      <ModalActions
        onClose={onClose}
        onSave={save}
        saving={saving}
        disabled={!form.brandName.trim()}
      />
    </Modal>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────
export default function PortfolioDash() {
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCatId, setOpenCatId] = useState(null);

  const [catModal, setCatModal] = useState(false);
  const [projModal, setProjModal] = useState(null);
  const [editCat, setEditCat] = useState(null);
  const [editProj, setEditProj] = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);

  const fetchAll = async () => {
    setLoading(true);
    const [cs, ps] = await Promise.all([
      getDocs(
        query(collection(db, "categories"), orderBy("createdAt", "desc")),
      ),
      getDocs(query(collection(db, "projects"), orderBy("createdAt", "desc"))),
    ]);
    setCategories(cs.docs.map((d) => ({ id: d.id, ...d.data() })));
    setProjects(ps.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const saveCategory = async (form) => {
    if (editCat) {
      await updateDoc(doc(db, "categories", editCat.id), form);
      toast.success("Category updated");
    } else {
      await addDoc(collection(db, "categories"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      toast.success("Category created");
    }
    setEditCat(null);
    setCatModal(false);
    fetchAll();
  };

  const saveProject = async (form, categoryId) => {
    if (editProj) {
      await updateDoc(doc(db, "projects", editProj.id), form);
      toast.success("Project updated");
    } else {
      await addDoc(collection(db, "projects"), {
        ...form,
        categoryId,
        createdAt: serverTimestamp(),
      });
      toast.success("Project added");
    }
    setEditProj(null);
    setProjModal(null);
    fetchAll();
  };

  const doConfirm = async () => {
    if (confirmDel.type === "category") {
      await deleteDoc(doc(db, "categories", confirmDel.id));
      toast.success("Category deleted");
    } else {
      await deleteDoc(doc(db, "projects", confirmDel.id));
      toast.success("Project deleted");
    }
    setConfirmDel(null);
    fetchAll();
  };

  return (
    <div className="min-h-screen text-white p-4 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black">
          Portfolio Dashboard
        </h2>
        <button
          onClick={() => {
            setEditCat(null);
            setCatModal(true);
          }}
          className="px-6 py-3 rounded-xl font-bold text-black text-base"
          style={{ background: "var(--accent)" }}
        >
          + New Category
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 bg-accent-light">
          <div className="w-16 h-16 border-4 border-accent-soft border-t-accent-30 rounded-full animate-spin"></div>
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center text-gray-500 py-24">
          <p className="text-5xl mb-4">📂</p>
          <p className="text-xl">
            No categories yet. Create one to get started.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {categories.map((cat) => {
            const catProjects = projects.filter((p) => p.categoryId === cat.id);
            const isOpen = openCatId === cat.id;
            return (
              <div
                key={cat.id}
                className="rounded-2xl border overflow-hidden"
                style={{
                  background: "#141414",
                  borderColor: "rgba(255,255,255,0.1)",
                }}
              >
                {/* Category Row */}
                <div
                  className="flex items-center justify-between p-5 sm:p-6 cursor-pointer gap-4 flex-wrap"
                  onClick={() => setOpenCatId(isOpen ? null : cat.id)}
                >
                  <div className="flex items-center gap-4">
                    {cat.imageUrl && (
                      <img
                        src={cat.imageUrl}
                        alt={cat.name}
                        className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                      />
                    )}
                    <div>
                      <p className="font-bold text-xl sm:text-2xl">
                        {cat.name}
                      </p>
                      <p className="text-base text-gray-400 mt-0.5">
                        {catProjects.length} project
                        {catProjects.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditCat(cat);
                        setCatModal(true);
                      }}
                      className="px-4 py-2 rounded-lg text-sm font-medium border text-gray-200"
                      style={{
                        borderColor: "rgba(255,255,255,0.15)",
                        background: "#1f1f1f",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmDel({
                          type: "category",
                          id: cat.id,
                          message: `"${cat.name}" will be permanently deleted.`,
                        });
                      }}
                      className="px-4 py-2 rounded-lg text-sm font-medium border text-red-400"
                      style={{
                        borderColor: "rgba(255,80,80,0.25)",
                        background: "rgba(255,80,80,0.08)",
                      }}
                    >
                      Delete
                    </button>
                    <span className="text-gray-500 ml-1 text-lg select-none">
                      {isOpen ? "▲" : "▼"}
                    </span>
                  </div>
                </div>

                {/* Projects */}
                {isOpen && (
                  <div
                    className="border-t px-5 sm:px-6 pb-6 pt-5"
                    style={{ borderColor: "rgba(255,255,255,0.08)" }}
                  >
                    <div className="flex justify-end mb-5">
                      <button
                        onClick={() => {
                          setEditProj(null);
                          setProjModal(cat.id);
                        }}
                        className="px-5 py-2.5 rounded-xl text-sm font-bold text-black"
                        style={{ background: "var(--accent)" }}
                      >
                        + Add Project
                      </button>
                    </div>

                    {catProjects.length === 0 ? (
                      <p className="text-gray-600 text-base text-center py-8">
                        No projects yet.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {catProjects.map((p) => (
                          <div
                            key={p.id}
                            className="rounded-xl overflow-hidden border flex flex-col"
                            style={{
                              background: "#1a1a1a",
                              borderColor: "rgba(255,255,255,0.09)",
                            }}
                          >
                            <div className="p-5 flex flex-col gap-2 flex-1">
                              {/* Brand + Type */}
                              <div className="flex items-start justify-between gap-2">
                                <p className="font-bold text-lg leading-tight">
                                  {p.brandName}
                                </p>
                                {p.projectType && (
                                  <span
                                    className="text-xs px-2.5 py-1 rounded-full flex-shrink-0 font-medium"
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

                              {/* Meta info */}
                              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400">
                                {p.clientName && <span>👤 {p.clientName}</span>}
                                {p.clientCountry && (
                                  <span>🌍 {p.clientCountry}</span>
                                )}
                                {p.year && <span>📅 {p.year}</span>}
                                {p.duration && <span>⏱ {p.duration}</span>}
                              </div>

                              {/* Description */}
                              {p.description && (
                                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                                  {p.description}
                                </p>
                              )}

                              {/* Software tags */}
                              {(p.software || []).length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-1">
                                  {p.software.map((s) => (
                                    <span
                                      key={s}
                                      className="text-xs px-2.5 py-0.5 rounded-full"
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
                              )}

                              {/* Video link */}
                              {p.videoUrl && (
                                <a
                                  href={p.videoUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-sm font-semibold mt-1 inline-flex items-center gap-1"
                                  style={{ color: "var(--accent)" }}
                                >
                                  ▶ Watch Video
                                </a>
                              )}
                            </div>

                            {/* Actions */}
                            <div
                              className="flex gap-2 px-5 py-3 border-t"
                              style={{ borderColor: "rgba(255,255,255,0.07)" }}
                            >
                              <button
                                onClick={() => {
                                  setEditProj(p);
                                  setProjModal(cat.id);
                                }}
                                className="flex-1 py-2 rounded-lg text-sm font-medium border text-gray-300"
                                style={{
                                  borderColor: "rgba(255,255,255,0.12)",
                                  background: "#111",
                                }}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  setConfirmDel({
                                    type: "project",
                                    id: p.id,
                                    message: `"${p.brandName}" will be permanently deleted.`,
                                  })
                                }
                                className="flex-1 py-2 rounded-lg text-sm font-medium border text-red-400"
                                style={{
                                  borderColor: "rgba(255,80,80,0.2)",
                                  background: "rgba(255,80,80,0.07)",
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {catModal && (
        <CategoryModal
          initial={editCat}
          onClose={() => {
            setCatModal(false);
            setEditCat(null);
          }}
          onSave={saveCategory}
        />
      )}

      {projModal && (
        <ProjectModal
          initial={editProj}
          categoryId={projModal}
          onClose={() => {
            setProjModal(null);
            setEditProj(null);
          }}
          onSave={saveProject}
        />
      )}

      {confirmDel && (
        <ConfirmModal
          message={confirmDel.message}
          onConfirm={doConfirm}
          onCancel={() => setConfirmDel(null)}
        />
      )}
    </div>
  );
}
