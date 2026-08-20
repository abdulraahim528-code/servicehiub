"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";


interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<LoginFormValues>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setError("");

    try {
      setLoading(true);

      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.message || "Invalid email or password.");
        return;
      }

      // Redirect based on role
      if (result.user?.role === "provider") {
        router.push("/providers/dashboard");
      } else {
        router.push("/dashboard");
      }
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_7%_5%,_rgba(51,154,143,0.24),_transparent_36%),radial-gradient(circle_at_89%_11%,_rgba(255,190,78,0.24),_transparent_35%),linear-gradient(112deg,_#c4e2dc_0%,_#e7f1ee_39%,_#fff0cf_77%,_#f9fbfa_100%)] py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto px-8 grid gap-12 items-stretch lg:grid-cols-2">
          <div className="h-full rounded-[2.5rem] bg-gradient-to-br from-[#0aa39a] via-[#109a8c] to-[#0a6d9a] p-10 text-white shadow-[0_45px_120px_rgba(10,163,154,0.16)]">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100 shadow-sm shadow-slate-950/10">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-slate-100">★</span>
              Welcome back
            </div>
            <h1 className="mt-8 text-5xl font-bold leading-tight sm:text-6xl">
              One account. Every trusted pro in your city.
            </h1>
            <p className="mt-3 max-w-lg text-base text-slate-100/90 sm:text-lg">
              Book verified professionals or manage your service business with a profile that feels premium and ready to grow.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 rounded-3xl bg-white/10 p-4 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-white/15 text-white shadow-lg shadow-slate-950/20">
                  ✓
                </div>
                <p className="text-sm font-semibold text-slate-100">Verified professionals in every category</p>
              </div>
              <div className="flex items-center gap-3 rounded-3xl bg-white/10 p-4 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-white/15 text-white shadow-lg shadow-slate-950/20">
                  ★
                </div>
                <p className="text-sm font-semibold text-slate-100">4.9 average rating across 500k reviews</p>
              </div>
              <div className="flex items-center gap-3 rounded-3xl bg-white/10 p-4 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-white/15 text-white shadow-lg shadow-slate-950/20">
                  🔒
                </div>
                <p className="text-sm font-semibold text-slate-100">Secure contact and protected bookings</p>
              </div>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[2rem] bg-white/10 p-5 text-center shadow-sm">
                <p className="text-3xl font-bold text-white">10k+</p>
                <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-100/80">Customers</p>
              </div>
              <div className="rounded-[2rem] bg-white/10 p-5 text-center shadow-sm">
                <p className="text-3xl font-bold text-white">120+</p>
                <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-100/80">Cities</p>
              </div>
              <div className="rounded-[2rem] bg-white/10 p-5 text-center shadow-sm">
                <p className="text-3xl font-bold text-white">24/7</p>
                <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-100/80">Support</p>
              </div>
            </div>
          </div>

          <div className="h-full rounded-[2.5rem] bg-white p-10 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
            <div className="mb-6">
              <div className="inline-flex items-center rounded-full bg-[#eaf7ee] px-4 py-2 text-sm font-semibold text-[#0aa39a]">
                Log in
              </div>
              <h2 className="mt-6 text-3xl font-bold text-slate-950">Access your ServiceHub account</h2>
              <p className="mt-2 text-sm text-slate-500">
                New here?{' '}
                <Link href="/register" className="font-semibold text-[#0aa39a] hover:text-[#0a8a7b]">
                  Create an account
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-800">
                  Email address
                </label>
                <div className="mt-3 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M3 8.5v7A2.5 2.5 0 0 0 5.5 18h13a2.5 2.5 0 0 0 2.5-2.5v-7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M21 6.5L12 13 3 6.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <input
                    id="email"
                    type="email"
                    {...register('email', { required: true })}
                    placeholder="you@email.com"
                    className="w-full rounded-[1.75rem] border border-slate-200 bg-slate-50 px-4 py-3 pl-12 text-slate-900 placeholder:text-slate-400 focus:border-[#0aa39a] focus:outline-none focus:ring-2 focus:ring-[#0aa39a]/10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-slate-800">
                  Password
                </label>
                <div className="mt-3 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="3" y="11" width="18" height="10" rx="2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7 11V8a5 5 0 0 1 10 0v3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <input
                    id="password"
                    type="password"
                    {...register('password', { required: true })}
                    placeholder="••••••••"
                    className="w-full rounded-[1.75rem] border border-slate-200 bg-slate-50 px-4 py-3 pl-12 text-slate-900 placeholder:text-slate-400 focus:border-[#0aa39a] focus:outline-none focus:ring-2 focus:ring-[#0aa39a]/10"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-slate-500">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-[#0aa39a] focus:ring-[#0aa39a]" />
                  Remember me
                </label>
                <Link href="/forgot-password" className="font-semibold text-[#0aa39a] hover:text-[#0a8a7b]">
                  Forgot password?
                </Link>
              </div>

              {error && (
                <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-[1.75rem] bg-[#0aa39a] px-6 py-3 text-base font-semibold text-white shadow-[0_18px_40px_rgba(10,163,154,0.25)] transition hover:bg-[#0a8a7b] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              By continuing you agree to our{' '}
              <Link href="/terms" className="font-semibold text-slate-900 hover:text-slate-700">
                Terms
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="font-semibold text-slate-900 hover:text-slate-700">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;