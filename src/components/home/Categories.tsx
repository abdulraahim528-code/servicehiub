"use client";

import Link from 'next/link';
import {
  Zap,
  Droplet,
  Brush,
  Sparkles,
  Wrench,
  Hammer,
  BookOpen,
  Snowflake,
} from 'lucide-react';

const categoryItems = [
  { id: 'electrician', title: 'Electrician', icon: Zap },
  { id: 'plumber', title: 'Plumber', icon: Droplet },
  { id: 'painter', title: 'Painter', icon: Brush },
  { id: 'cleaner', title: 'Cleaner', icon: Sparkles },
  { id: 'mechanic', title: 'Mechanic', icon: Wrench },
  { id: 'carpenter', title: 'Carpenter', icon: Hammer },
  { id: 'home-tutor', title: 'Home Tutor', icon: BookOpen },
  { id: 'ac-technician', title: 'AC Technician', icon: Snowflake },
];

const Categories: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Popular categories</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Every home service, one elegant place
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 sm:text-lg">
            Browse the categories our community books most — each backed by verified professionals.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-2">
          {categoryItems.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                href="/services"
                key={category.id}
                className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-slate-300"
              >
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#0aa39a]/10 text-[#0aa39a] shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-950 mb-2">{category.title}</h3>
                <p className="text-sm text-slate-500">Verified specialists</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
