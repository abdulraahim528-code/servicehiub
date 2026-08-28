"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { fetchJson } from "@/lib/fetchJson";

interface PlatformReviewRow {
  id: number;
  rating: number;
  comment: string | null;
  created_at: string;
  reviewer_name: string;
  reviewer_role: "customer" | "provider";
}

// Comments longer than this get truncated on the card, with a "Read more"
// link that opens the full text in a popup.
const COMMENT_PREVIEW_LIMIT = 130;

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-2 text-yellow-400">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={`text-sm ${i < rating ? "" : "text-slate-200"}`}>
        ★
      </span>
    ))}
  </div>
);

const Testimonials = () => {
  const [reviews, setReviews] = useState<PlatformReviewRow[]>([]);
  const [reviewCount, setReviewCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeReview, setActiveReview] = useState<PlatformReviewRow | null>(
    null,
  );

  useEffect(() => {
    // Real feedback about ServiceHub itself, from both customers and providers.
    fetchJson<{ success: boolean; data: PlatformReviewRow[]; total: number }>(
      "/api/platform-reviews?limit=100",
    )
      .then((json) => {
        if (json?.success) {
          setReviews(json.data);
          setReviewCount(json.total);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // Lock page scroll while the popup is open.
  useEffect(() => {
    document.body.style.overflow = activeReview ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeReview]);

  return (
    <section className="relative py-20">
      <div className="absolute inset-x-0 top-0 h-56 pointer-events-none bg-[radial-gradient(circle_at_10%_20%,_rgba(10,163,154,0.08),_transparent_30%),radial-gradient(circle_at_90%_20%,_rgba(255,177,58,0.06),_transparent_30%)]" />

      <div className="container mx-auto px-4 relative">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#0aa39a]">
            Testimonials
          </p>
          <h2 className="mt-3 text-4xl font-bold text-slate-950 sm:text-5xl">
            Loved by {reviewCount !== null ? `${reviewCount}+` : "..."} real
            reviews
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 sm:text-lg">
            What our customers and providers say about ServiceHub.
          </p>
        </div>

        {!loading && reviews.length === 0 ? (
          <p className="text-center text-slate-500">
            No reviews yet — be the first to rate ServiceHub from your account
            settings!
          </p>
        ) : (
          <div className="relative">
            {/* fade hints at the left/right edges of the scroll area */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#faf7ec] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#faf7ec] to-transparent" />

            <div className="overflow-x-auto pb-4 [scrollbar-width:thin] [scrollbar-color:#0aa39a_transparent] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#0aa39a]/40">
              <div className="flex snap-x snap-mandatory gap-6 px-1 py-2">
                {reviews.map((r) => {
                  const isLong =
                    (r.comment?.length ?? 0) > COMMENT_PREVIEW_LIMIT;
                  const preview = isLong
                    ? `${r.comment!.slice(0, COMMENT_PREVIEW_LIMIT).trim()}…`
                    : r.comment;

                  return (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      // Fixed height so every card matches, no matter how long the review is.
                      className="relative group flex h-[320px] w-[320px] flex-shrink-0 snap-start flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-8 shadow-[0_18px_50px_rgba(16,24,40,0.06)] transition-transform duration-300 hover:-translate-y-3 hover:shadow-[0_30px_90px_rgba(16,24,40,0.12)]"
                    >
                      <div className="absolute left-6 top-6 text-7xl font-serif leading-none text-slate-100">
                        {" "}
                        &ldquo;{" "}
                      </div>

                      <div className="mb-4">
                        <Stars rating={r.rating} />
                      </div>

                      <div className="flex-1 overflow-hidden">
                        <p className="text-slate-700 text-base leading-7">
                          &ldquo;{preview}&rdquo;
                          {isLong && (
                            <button
                              onClick={() => setActiveReview(r)}
                              className="ml-1 font-semibold text-[#0aa39a] hover:underline"
                            >
                              Read more
                            </button>
                          )}
                        </p>
                      </div>

                      <div className="mt-4 border-t border-slate-100 pt-4 flex items-center gap-4">
                        <div className="h-12 w-12 flex-shrink-0 rounded-full bg-[#e8faf4] flex items-center justify-center text-sm font-semibold text-[#0aa39a]">
                          {getInitials(r.reviewer_name)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">
                            {r.reviewer_name}
                          </p>
                          <p className="text-sm text-slate-500 capitalize">
                            {r.reviewer_role}
                          </p>
                        </div>
                      </div>

                      <div className="absolute -left-5 top-1/2 hidden h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-white shadow-md group-hover:flex">
                        •
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Read more popup ── */}
      <AnimatePresence>
        {activeReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4"
            onClick={() => setActiveReview(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-[2rem] bg-white p-8 shadow-2xl"
            >
              <button
                onClick={() => setActiveReview(null)}
                aria-label="Close"
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
              >
                <X size={18} />
              </button>

              <Stars rating={activeReview.rating} />
              <p className="mt-4 text-base leading-7 text-slate-700">
                &ldquo;{activeReview.comment}&rdquo;
              </p>

              <div className="mt-6 border-t border-slate-100 pt-4 flex items-center gap-4">
                <div className="h-12 w-12 flex-shrink-0 rounded-full bg-[#e8faf4] flex items-center justify-center text-sm font-semibold text-[#0aa39a]">
                  {getInitials(activeReview.reviewer_name)}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    {activeReview.reviewer_name}
                  </p>
                  <p className="text-sm text-slate-500 capitalize">
                    {activeReview.reviewer_role}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;
