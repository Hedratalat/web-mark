import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

function ConfirmModal({ onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/85"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="w-full max-w-sm rounded-2xl p-7 bg-[#161616] border border-white/10">
        <h3 className="text-xl font-bold mb-2 text-white">Are you sure?</h3>
        <p className="text-gray-400 text-base mb-6">
          This message will be permanently deleted.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-base font-medium border border-white/10 bg-[#1f1f1f] text-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl text-base font-semibold bg-red-500 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MessageDash() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmId, setConfirmId] = useState(null);

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(
      collection(db, "Messages"),
      (snapshot) => {
        const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        data.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
        setMessages(data);
        setLoading(false);
      },
      () => {
        toast.error("Failed to load messages.");
        setLoading(false);
      },
    );

    return () => unsub();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "Messages", confirmId));
      setMessages((prev) => prev.filter((m) => m.id !== confirmId));
      toast.success("Message deleted.");
    } catch {
      toast.error("Failed to delete.");
    } finally {
      setConfirmId(null);
    }
  };

  const fields = [
    { key: "fullName", label: "Full Name" },
    { key: "governorate", label: "City" },
    { key: "videoType", label: "Video Type" },
    { key: "videoDuration", label: "Duration (sec)" },
    { key: "expectedPrice", label: "Budget (EGP)" },
    { key: "phone", label: "WhatsApp" },
  ];

  return (
    <div className="min-h-screen text-white p-4 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black">
          Messages Dashboard
        </h2>
        <span className="text-gray-500 text-sm">
          {messages.length} request{messages.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-accent-soft border-t-accent-30 rounded-full animate-spin" />
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center text-gray-500 py-24">
          <p className="text-5xl mb-4">📭</p>
          <p className="text-xl">No messages yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                className="rounded-2xl border border-white/10 bg-[#141414] overflow-hidden flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.04 }}
              >
                {/* Fields */}
                <div className="p-5 flex flex-col gap-2 flex-1">
                  {fields.map(({ key, label }) => (
                    <div
                      key={key}
                      className="flex justify-between gap-2 text-sm"
                    >
                      <span className="text-accent/50   uppercase tracking-widest text-xs">
                        {label}
                      </span>
                      <span className="text-white  font-semibold text-right">
                        {msg[key] ?? "—"}
                      </span>
                    </div>
                  ))}

                  {/* Date */}
                  {msg.createdAt && (
                    <p className="text-accent/50 text-xs border-t border-white/5 pt-2 mt-1">
                      {new Date(msg.createdAt.seconds * 1000).toLocaleString(
                        "en-EG",
                      )}
                    </p>
                  )}
                </div>

                {/* Delete Button */}
                <div className="px-5 py-3 border-t border-white/[0.07]">
                  <button
                    onClick={() => setConfirmId(msg.id)}
                    className="w-full py-2 rounded-lg text-sm font-medium border border-red-500/20 bg-red-500/[0.07] text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Confirm Popup */}
      <AnimatePresence>
        {confirmId && (
          <ConfirmModal
            onConfirm={handleDelete}
            onCancel={() => setConfirmId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
