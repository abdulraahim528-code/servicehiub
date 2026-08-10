"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#f1f4e5]/95 shadow-sm shadow-slate-200/40 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-6 py-4 lg:px-10">
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
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-semibold transition ${active ? 'text-slate-950' : 'text-slate-700 hover:text-slate-950'} pb-1 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-emerald-500 after:transition-all after:duration-300 hover:after:w-full ${active ? 'after:w-full' : ''}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Link href="/login" className="text-sm font-semibold text-slate-700 hover:text-slate-950">
            Login
          </Link>
          <Link href="/register" className="rounded-full border border-slate-200 bg-white px-6 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50">
            Register
          </Link>
          <Link href="/providers/become" className="rounded-full bg-[#ff9b1f] px-6 py-2 text-sm font-semibold text-[#693500] shadow-[0_18px_40px_rgba(255,128,28,0.28)] transition hover:bg-[#ffb35a]">
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
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-slate-700 font-semibold">
                {link.label}
              </Link>
            ))}
            <Link href="/login" className="text-slate-700 font-semibold">
              Login
            </Link>
            <Link href="/register" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-center font-semibold text-slate-900">
              Register
            </Link>
            <Link href="/providers/become" className="rounded-full bg-[#ff9b1f] px-4 py-2 text-center font-semibold text-[#693500] shadow-[0_18px_40px_rgba(255,128,28,0.28)] transition hover:bg-[#ffb35a]">
              Become a Provider
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
