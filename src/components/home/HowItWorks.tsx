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
    <section className="py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-500">How it works</p>
          <h2 className="mt-3 text-4xl font-bold text-slate-950 sm:text-5xl">
            Three steps from problem to solved
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 sm:text-lg">
            No quotes to chase, no phone tag. Just a clear path to the right professional.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                className="group rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-[0_24px_80px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#0aa39a] hover:shadow-[0_28px_85px_rgba(15,23,42,0.12)]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#e8faf4] text-[#0aa39a] shadow-sm transition duration-300 group-hover:bg-[#0aa39a] group-hover:text-white">
                  <Icon className="h-10 w-10" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0aa39a] mb-4 group-hover:text-slate-950">{step.title}</p>
                <h3 className="text-2xl font-semibold text-slate-950 mb-4">{step.headline}</h3>
                <p className="text-slate-500 group-hover:text-slate-600">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
