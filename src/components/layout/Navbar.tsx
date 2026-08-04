"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/50 bg-[#f9f7eb]/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-600 to-blue-500 text-white shadow-lg shadow-sky-200/40">
            <span className="text-xl font-bold">S</span>
          </div>
          <div>
            <Link href="/" className="text-xl font-semibold text-slate-900">
              ServiceHub
            </Link>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Marketplace</p>
          </div>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-medium text-slate-700 hover:text-slate-900">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium text-slate-700 hover:text-slate-900">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium text-slate-700 hover:text-slate-900">
            Contact
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Login
          </Link>
          <Link href="/register" className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50">
            Register
          </Link>
          <Link href="/providers/become" className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-[#e85d0c]">
            Become a Provider
          </Link>
        </div>

        <button onClick={toggleMenu} className="md:hidden text-slate-700">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/60 bg-[#f9f7eb]/95 px-4 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-3">
            <Link href="/" onClick={toggleMenu} className="text-slate-700 font-medium">
              Home
            </Link>
            <Link href="/about" onClick={toggleMenu} className="text-slate-700 font-medium">
              About
            </Link>
            <Link href="/contact" onClick={toggleMenu} className="text-slate-700 font-medium">
              Contact
            </Link>
            <Link href="/login" onClick={toggleMenu} className="text-slate-700 font-medium">
              Login
            </Link>
            <Link href="/register" onClick={toggleMenu} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-center font-semibold text-slate-900">
              Register
            </Link>
            <Link href="/providers/become" onClick={toggleMenu} className="rounded-full bg-accent px-4 py-2 text-center font-semibold text-white">
              Become a Provider
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
