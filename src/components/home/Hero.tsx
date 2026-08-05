"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const highlights = [
    { label: 'Verified Providers', icon: '✓' },
    { label: '24/7 Support', icon: '🎧' },
    { label: 'Fast Response', icon: '⚡' },
  ];

  const stats = [
    { value: '10,000+', label: 'Happy Customers' },
    { value: '500+', label: 'Verified Providers' },
    { value: '8+', label: 'Service Categories' },
    { value: '99%', label: 'Customer Satisfaction' },
  ];

  return (
    <section className="relative overflow-hidden bg-[#eaf7ee] py-16 lg:py-24">
      <div className="absolute inset-x-0 top-0 h-[46rem] bg-[radial-gradient(circle_at_10%_0%,_rgba(10,163,154,0.16),_transparent_26%),radial-gradient(circle_at_90%_12%,_rgba(255,177,58,0.14),_transparent_30%)]" />
      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex rounded-full border border-white/80 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                Verified professionals • Same-day booking • Secure payments
              </div>
              <h1 className="max-w-[44rem] text-5xl font-extrabold tracking-tight text-slate-950 sm:text-6xl">
                Find Trusted Local <span className="text-[#0aa39a]">Professionals</span> Near You
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                From electricians and plumbers to tutors and cleaners — ServiceHub connects you with verified experts in your city. Transparent pricing, honest reviews, and instant contact every single time.
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-4">
              <Link href="/services" className="inline-flex items-center justify-center rounded-full bg-[#ff6b16] px-8 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(255,107,22,0.28)] transition hover:bg-[#e85d0c]">
                Explore Services →
              </Link>
              <Link href="/providers/become" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50">
                Become Provider
              </Link>
            </div>

            <div className="grid gap-4 max-w-xl sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-slate-600 shadow-sm"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0aa39a]/10 text-[#0aa39a] font-semibold">
                    {item.icon}
                  </span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2.75rem] border-8 border-white bg-white shadow-[0_40px_120px_rgba(15,23,42,0.08)]">
              <img
                src="https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1000&q=80"
                alt="Service illustration"
                className="h-[440px] w-full object-cover"
              />
              <div className="absolute left-6 top-6 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#0aa39a] mr-2" />
                500+ Verified pros
              </div>
              <div className="absolute right-6 bottom-6 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm">
                ⭐ 4.9 / 5 average rating
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[1.75rem] bg-white px-6 py-6 text-center shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
              <p className="text-3xl font-bold text-[#0aa39a]">{stat.value}</p>
              <p className="mt-2 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
