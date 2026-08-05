"use client";

import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import ProviderCard from '../providers/ProviderCard';
import { providersData } from '../../data/providers';

const FeaturedProviders: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Featured experts</p>
          <h2 className="mt-3 text-4xl font-bold text-slate-950 sm:text-5xl">
            Meet Our Professionals
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 sm:text-lg">
            Handpicked professionals with top ratings, verified experience and fast response times.
          </p>
        </div>

        <motion.div
          className="grid gap-8 xl:grid-cols-4 lg:grid-cols-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {providersData.slice(0, 4).map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </motion.div>

        <div className="mt-10 flex justify-center">
          <Link href="/providers" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50">
            View all providers →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProviders;
