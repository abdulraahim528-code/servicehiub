"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { testimonialsData } from '../../data/testimonials';

const Testimonials = () => {
  return (
    <section className="bg-white/30 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-slate-900">Loved by households and pros alike</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            Half a million reviews and a 4.9 average across every category we serve.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {testimonialsData.slice(0, 3).map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute right-6 top-6 text-7xl font-serif leading-none text-slate-100">“</div>

              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-yellow-400">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <div className="text-sm text-slate-400">{testimonial.rating}.0</div>
              </div>

              <p className="mb-8 text-slate-700 text-base">“{testimonial.feedback}”</p>

              <div className="flex items-center gap-4">
                <img src={testimonial.profileImage} alt={testimonial.name} className="h-14 w-14 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role} · {testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
