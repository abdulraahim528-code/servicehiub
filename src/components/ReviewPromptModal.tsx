"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, Loader2 } from "lucide-react";

interface ReviewPromptModalProps {
  open: boolean;
  title?: string;
  subtitle?: string;
  /** Called when the user closes/dismisses without submitting. */
  onDismiss: () => void;
  /** Called after a review is successfully submitted. */
  onSubmitted: () => void;
}

const ReviewPromptModal: React.FC<ReviewPromptModalProps> = ({
  open,
  title = "Rate ServiceHub",
  subtitle = "How has your experience with ServiceHub been?",
  onDismiss,
  onSubmitted,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (rating < 1) {
      setError("Please select a star rating.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/platform-reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to submit your review.");
        setSaving(false);
        return;
      }
      setRating(0);
      setComment("");
      setSaving(false);
      onSubmitted();
    } catch {
      setError("Something went wrong.");
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md rounded-[2rem] bg-white p-8 shadow-2xl"
          >
            <button
              onClick={onDismiss}
              disabled={saving}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800 disabled:opacity-60"
            >
              <X size={18} />
            </button>

            <h3 className="text-xl font-bold text-slate-950">{title}</h3>
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>

            <div className="mt-6 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1"
                  aria-label={`${star} star${star > 1 ? "s" : ""}`}
                >
                  <Star
                    size={30}
                    className={star <= rating ? "fill-[#ff9b1f] text-[#ff9b1f]" : "text-slate-200"}
                  />
                </button>
              ))}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              placeholder="What's your experience been like? (optional)"
              className="mt-4 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-[#0aa39a] focus:outline-none focus:ring-2 focus:ring-[#0aa39a]/10"
            />

            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#ff9b1f] px-6 py-3 text-sm font-semibold text-[#693500] shadow-md transition hover:bg-[#ffb35a] disabled:opacity-60"
              >
                {saving ? <Loader2 size={15} className="animate-spin" /> : <Star size={15} />}
                {saving ? "Submitting..." : "Submit Review"}
              </button>
              <button
                onClick={onDismiss}
                disabled={saving}
                className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReviewPromptModal;