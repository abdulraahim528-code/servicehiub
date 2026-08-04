"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, Phone } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Step 01',
    headline: 'Search Service',
    description: 'Tell us what you need and where. Filter by category, city and rating in seconds.',
    icon: Search,
  },
  {
    id: 2,
    title: 'Step 02',
    headline: 'Choose Provider',
    description: 'Compare verified profiles, real reviews and transparent hourly rates side by side.',
    icon: Sparkles,
  },
  {
    id: 3,
    title: 'Step 03',
    headline: 'Contact Instantly',
    description: 'Call, WhatsApp or email your pro directly — no middlemen, no waiting around.',
    icon: Phone,
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white/30 py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-slate-900 sm:text-5xl">
          Three steps from problem to solved
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 sm:text-lg">
          No quotes to chase, no phone tag. Just a clear path to the right professional.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-[0_24px_80px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-2 hover:border-sky-200 hover:shadow-[0_28px_85px_rgba(15,23,42,0.14)]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-200/50">
                  <Icon className="h-10 w-10" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600 mb-4">{step.title}</p>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">{step.headline}</h3>
                <p className="text-slate-500">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
