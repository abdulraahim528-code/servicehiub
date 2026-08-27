"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CountUp: React.FC<{ target: number; suffix?: string; label: string }> = ({ target, suffix = '', label }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const duration = 900;
    const steps = 35;
    const stepTime = Math.max(20, Math.floor(duration / steps));
    const increment = Math.ceil(target / steps);
    let current = 0;

    const timer = window.setInterval(() => {
      current += increment;
      if (current >= target) {
        setValue(target);
        window.clearInterval(timer);
      } else {
        setValue(current);
      }
    }, stepTime);

    return () => window.clearInterval(timer);
  }, [active, target]);

  return (
    <div ref={ref} className="rounded-[1.75rem] bg-white px-5 py-6 text-center shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(15,23,42,0.1)]">
      <p className="text-3xl font-bold text-[#0aa39a] sm:text-4xl">{value.toLocaleString()}{suffix}</p>
      <p className="mt-3 text-sm font-medium text-slate-500">{label}</p>
    </div>
  );
};

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
    <section className="relative overflow-hidden bg-[linear-gradient(120deg,_#e8f4eb_0%,_#f8f0dc_45%,_#fff7ef_100%)] py-16 lg:py-24">
      <div className="absolute inset-x-0 top-0 h-[46rem] bg-[radial-gradient(circle_at_20%_10%,_rgba(10,163,154,0.14),_transparent_24%),radial-gradient(circle_at_80%_0%,_rgba(255,149,41,0.18),_transparent_22%)]" />
      <div className="container relative mx-auto px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="space-y-8 lg:pr-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="max-w-[40rem] text-5xl font-extrabold tracking-tight text-slate-950 sm:text-6xl">
                Find Trusted Local <span className="bg-gradient-to-r from-[#0f8b6d] to-[#0a6f59] bg-clip-text text-transparent">Professionals</span> Near You
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[#42534e]">
                From electricians and plumbers to tutors and cleaners — ServiceHub connects you with background-checked experts in your city. Transparent pricing, honest reviews and instant contact, every single time.
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-4">
              <Link href="/services" className="inline-flex items-center justify-center rounded-full bg-[#ff9b1f] px-8 py-3 text-sm font-semibold text-[#693500] shadow-[0_18px_40px_rgba(255,128,28,0.28)] transition hover:bg-[#ffb35a]">
                Explore Services →
              </Link>
              <Link href="/providers/become" className="inline-flex items-center justify-center rounded-full bg-[#ff9b1f] px-8 py-3 text-sm font-semibold text-[#693500] shadow-[0_18px_40px_rgba(255,128,28,0.28)] transition hover:bg-[#ffb35a]">
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
            className="relative lg:-mr-8 xl:-mr-12"
          >
            <div className="relative overflow-hidden rounded-[2.75rem] border-8 border-white bg-white shadow-[0_40px_120px_rgba(15,23,42,0.08)]">
              <img
                src="/images/hero-image.png"
                alt="Home services illustration"
                className="h-[460px] w-full object-cover"
              />
            
            </div>
          </motion.div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:max-w-6xl xl:mx-auto">
          <CountUp target={10000} suffix="+" label="Happy Customers" />
          <CountUp target={500} suffix="+" label="Verified Providers" />
          <CountUp target={8} suffix="+" label="Service Categories" />
          <CountUp target={99} suffix="%" label="Customer Satisfaction" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
