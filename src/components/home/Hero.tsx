"use client";

import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-transparent py-16 lg:py-20">
      <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_10%_0%,_rgba(43,143,132,0.13),_transparent_34%),radial-gradient(circle_at_90%_5%,_rgba(255,177,58,0.12),_transparent_33%)]" />
      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="max-w-3xl text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
                Find Trusted Local{' '}
                <span className="text-blue-600">Professionals</span>
                {' '}Near You
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                From electricians and plumbers to tutors and cleaners — ServiceHub connects you with background-checked experts in your city. Transparent pricing, honest reviews, and instant contact every single time.
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-4">
              <button onClick={() => { window.location.href = '/services'; }} className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-[#e85d0c]">
                Explore Services →
              </button>
              <button onClick={() => { window.location.href = '/providers/become'; }} className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50">
                Become Provider
              </button>
            </div>

            <div className="grid gap-4 max-w-xl sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
                <span className="rounded-full bg-sky-100 p-2 text-blue-600">✓</span>
                Verified Providers
              </div>
              <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
                <span className="rounded-full bg-sky-100 p-2 text-blue-600">🎧</span>
                24/7 Support
              </div>
              <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
                <span className="rounded-full bg-sky-100 p-2 text-blue-600">⚡</span>
                Fast Response
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-6 shadow-[0_40px_120px_rgba(15,23,42,0.08)]">
              <img
                src="https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=900&q=80"
                alt="Service illustration"
                className="h-[390px] w-full rounded-[2rem] object-cover lg:h-[460px]"
              />
              <div className="absolute left-6 top-6 rounded-3xl bg-white/95 px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-200/60 backdrop-blur-sm">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 mr-2" />
                500+ Verified pros
              </div>
              <div className="absolute bottom-6 right-6 rounded-3xl bg-white/95 px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-200/60 backdrop-blur-sm">
                ⭐ 4.9 / 5 average rating
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 rounded-[2rem] bg-white px-6 py-6 shadow-[0_40px_80px_rgba(15,23,42,0.06)]">
          <div className="grid gap-6 md:grid-cols-4 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-600">10,000+</p>
              <p className="mt-2 text-sm text-slate-500">Happy Customers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">500+</p>
              <p className="mt-2 text-sm text-slate-500">Verified Providers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">8+</p>
              <p className="mt-2 text-sm text-slate-500">Service Categories</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">99%</p>
              <p className="mt-2 text-sm text-slate-500">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
