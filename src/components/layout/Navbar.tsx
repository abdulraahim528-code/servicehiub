"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Settings, LogOut, LayoutDashboard } from "lucide-react";

interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: "customer" | "provider";
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch current user on every route change
  useEffect(() => {
    fetch("/api/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success) setUser(data.user);
        else setUser(null);
      })
      .catch(() => setUser(null));
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setUser(null);
    setDropdownOpen(false);
    router.push("/");
    router.refresh();
  };

  const dashboardHref = user?.role === "provider" ? "/providers/dashboard" : "/customer/dashboard";

  return (
    <nav className="sticky top-0 z-50 bg-[#f1f4e5]/95 shadow-sm shadow-slate-200/40 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-6 py-4 lg:px-10">
        {/* Logo */}
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

        {/* Desktop nav links */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-semibold transition ${
                  active ? "text-slate-950" : "text-slate-700 hover:text-slate-950"
                } pb-1 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-emerald-500 after:transition-all after:duration-300 hover:after:w-full ${
                  active ? "after:w-full" : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop right side */}
        <div className="hidden items-center gap-4 md:flex">
          {user ? (
            // ── Logged-in state ──
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0aa39a] text-xs font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[120px] truncate">{user.name}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
                  <div className="border-b border-slate-100 px-4 py-3">
                    <p className="text-xs text-slate-500">Signed in as</p>
                    <p className="truncate text-sm font-semibold text-slate-900">{user.email}</p>
                    <span className="mt-1 inline-block rounded-full bg-[#eaf7f6] px-2 py-0.5 text-xs font-semibold capitalize text-[#0aa39a]">
                      {user.role}
                    </span>
                  </div>
                  <div className="p-1">
                    <Link
                      href={dashboardHref}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                    >
                      <LayoutDashboard size={16} className="text-slate-400" />
                      Dashboard
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                    >
                      <Settings size={16} className="text-slate-400" />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // ── Logged-out state ──
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-slate-700 hover:text-slate-950"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full border border-slate-200 bg-white px-6 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
              >
                Register
              </Link>
              <Link
                href="/providers/become"
                className="rounded-full bg-[#ff9b1f] px-6 py-2 text-sm font-semibold text-[#693500] shadow-[0_18px_40px_rgba(255,128,28,0.28)] transition hover:bg-[#ffb35a]"
              >
                Become a Provider
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-700"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-slate-700 font-semibold"
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <>
                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  <p className="text-xs text-slate-500">Signed in as</p>
                  <p className="font-semibold text-slate-900">{user.name}</p>
                  <span className="mt-1 inline-block rounded-full bg-[#eaf7f6] px-2 py-0.5 text-xs font-semibold capitalize text-[#0aa39a]">
                    {user.role}
                  </span>
                </div>
                <Link
                  href={dashboardHref}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 font-semibold text-slate-700"
                >
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 font-semibold text-slate-700"
                >
                  <Settings size={16} /> Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 font-semibold text-red-600 text-left"
                >
                  <LogOut size={16} /> Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-slate-700 font-semibold"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-center font-semibold text-slate-900"
                >
                  Register
                </Link>
                <Link
                  href="/providers/become"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-[#ff9b1f] px-4 py-2 text-center font-semibold text-[#693500] shadow-[0_18px_40px_rgba(255,128,28,0.28)] transition hover:bg-[#ffb35a]"
                >
                  Become a Provider
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
