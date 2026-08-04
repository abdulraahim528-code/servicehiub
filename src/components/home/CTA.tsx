"use client";

import { motion } from 'framer-motion';

const CTA = () => {
    return (
        <section className="relative overflow-hidden rounded-[3rem] bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 py-20 text-white shadow-2xl shadow-sky-400/20">
            <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.35),_transparent_45%)]" />
            <div className="container relative mx-auto px-4 text-center">
                <motion.h2 
                    className="text-4xl font-bold sm:text-5xl"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Find Your Trusted Professional Today
                </motion.h2>
                <motion.p 
                    className="mx-auto mt-5 max-w-2xl text-base text-slate-100 sm:text-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                >
                    Join a quarter of a million people who stopped guessing and started booking pros they can rely on.
                </motion.p>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <button className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-900/10 transition hover:opacity-95">
                        Explore Services →
                    </button>
                    <button className="rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
                        Become a Provider
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CTA;
