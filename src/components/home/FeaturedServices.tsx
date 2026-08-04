"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { servicesData } from '../../data/services';

const FeaturedServices = () => {
  return (
    <section className="bg-white/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Service Dashboard</p>
          <h2 className="mt-4 text-4xl font-bold text-slate-900">Every home service, one elegant place</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            Browse the categories our community books most � each backed by verified, reviewed professionals.
          </p>
        </div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {servicesData.slice(0, 6).map((service) => (
            <div key={service.id} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50 transition hover:-translate-y-1 hover:shadow-2xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-sky-50 text-2xl text-sky-600">
                🔧
              </div>
              <h3 className="text-2xl font-semibold text-slate-900">{service.title}</h3>
              <p className="mt-3 text-slate-500">Verified specialists</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedServices;
