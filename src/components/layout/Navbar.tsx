"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#f1f4e5]/95 shadow-sm shadow-slate-200/40 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0aa39a] text-white shadow-lg shadow-[#0aa39a]/20">
            <span className="text-xl font-bold">S</span>
          </div>
          <div>
            <Link href="/" className="text-lg font-semibold text-slate-950">
              ServiceHub
            </Link>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Marketplace</p>
          </div>
        </div>

        <div className="hidden items-center gap-10 md:flex">
          <Link href="/" className="text-sm font-semibold text-slate-700 hover:text-slate-950">
            Home
          </Link>
          <Link href="/about" className="text-sm font-semibold text-slate-700 hover:text-slate-950">
            About
          </Link>
          <Link href="/contact" className="text-sm font-semibold text-slate-700 hover:text-slate-950">
            Contact
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login" className="text-sm font-semibold text-slate-700 hover:text-slate-950">
            Login
          </Link>
          <Link href="/register" className="rounded-full border border-slate-200 bg-white px-6 py-2 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-50">
            Register
          </Link>
          <Link href="/providers/become" className="rounded-full bg-[#ff6b16] px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-[#ff6b16]/25 transition hover:bg-[#e85d0c]">
            Become a Provider
          </Link>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-700">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-3">
            <Link href="/" className="text-slate-700 font-semibold">
              Home
            </Link>
            <Link href="/about" className="text-slate-700 font-semibold">
              About
            </Link>
            <Link href="/contact" className="text-slate-700 font-semibold">
              Contact
            </Link>
            <Link href="/login" className="text-slate-700 font-semibold">
              Login
            </Link>
            <Link href="/register" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-center font-semibold text-slate-900">
              Register
            </Link>
            <Link href="/providers/become" className="rounded-full bg-[#ff6b16] px-4 py-2 text-center font-semibold text-white">
              Become a Provider
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
