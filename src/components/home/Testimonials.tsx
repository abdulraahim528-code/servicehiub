"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { testimonialsData } from '../../data/testimonials';

const Testimonials = () => {
  return (
    <section className="relative py-20">
      <div className="absolute inset-x-0 top-0 h-56 pointer-events-none bg-[radial-gradient(circle_at_10%_20%,_rgba(10,163,154,0.08),_transparent_30%),radial-gradient(circle_at_90%_20%,_rgba(255,177,58,0.06),_transparent_30%)]" />

      <div className="container mx-auto px-4 relative">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#0aa39a]">Testimonials</p>
          <h2 className="mt-3 text-4xl font-bold text-slate-950 sm:text-5xl">Loved by 48,000+ households</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 sm:text-lg">Real feedback from families and pros who use ServiceHub daily.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {testimonialsData.slice(0, 3).map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative group overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-8 shadow-[0_18px_50px_rgba(16,24,40,0.06)] transition-transform duration-300 hover:-translate-y-3 hover:shadow-[0_30px_90px_rgba(16,24,40,0.12)]"
            >
              <div className="absolute left-6 top-6 text-7xl font-serif leading-none text-slate-100">“</div>

              <div className="mb-4 flex items-center gap-4">
                <div className="flex items-center gap-2 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
              </div>

              <p className="mb-6 text-slate-700 text-base leading-7">“{t.feedback}”</p>

              <div className="mt-4 border-t border-slate-100 pt-4 flex items-center gap-4">
                <div className="h-12 w-12 flex-shrink-0 rounded-full bg-[#e8faf4] flex items-center justify-center text-sm font-semibold text-[#0aa39a]">{t.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
                <div>
                  <p className="font-semibold text-slate-900">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.role} · {t.location}</p>
                </div>
              </div>

              <div className="absolute -left-5 top-1/2 hidden h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-white shadow-md group-hover:flex">•</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
