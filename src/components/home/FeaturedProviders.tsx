"use client";

import React from 'react';
import { motion } from 'framer-motion';
import ProviderCard from '../providers/ProviderCard';
import { providersData } from '../../data/providers';

const FeaturedProviders: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-slate-900 sm:text-5xl">
            Meet Our Professionals
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 sm:text-lg">
            Handpicked professionals with outstanding ratings, fast response times and glowing reviews.
          </p>
        </div>

        <motion.div
          className="grid gap-8 xl:grid-cols-4 lg:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {providersData.slice(0, 4).map(provider => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <button className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50">
            View all providers →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProviders;
