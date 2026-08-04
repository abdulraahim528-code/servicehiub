"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, DollarSign, Lock, Clock3, Users, Headphones } from 'lucide-react';

const features = [
  {
    title: 'Verified Experts',
    description: 'Every provider is ID-checked, skill-tested and continuously reviewed.',
    icon: ShieldCheck,
  },
  {
    title: 'Affordable Services',
    description: 'Upfront hourly rates with no hidden platform fees or surprise charges.',
    icon: DollarSign,
  },
  {
    title: 'Secure Contact',
    description: 'Protected contact channels and encrypted data on every interaction.',
    icon: Lock,
  },
  {
    title: 'Quick Response',
    description: 'Average first reply in under 9 minutes, seven days a week.',
    icon: Clock3,
  },
  {
    title: 'Trusted Community',
    description: '250,000+ households and half a million verified reviews and counting.',
    icon: Users,
  },
  {
    title: '24/7 Availability',
    description: 'Round-the-clock support team for emergencies and rebookings.',
    icon: Headphones,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-slate-900 sm:text-5xl">
          Built on trust, obsessed with quality
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 sm:text-lg">
          The details that make booking a local professional feel effortless and safe.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="rounded-[2rem] border border-slate-200 bg-white p-8 text-left shadow-[0_24px_80px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-2 hover:border-sky-200 hover:shadow-[0_28px_85px_rgba(15,23,42,0.12)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-50 text-blue-600 shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
