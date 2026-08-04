"use client";

import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { register, handleSubmit } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_7%_5%,_rgba(51,154,143,0.24),_transparent_36%),radial-gradient(circle_at_89%_11%,_rgba(255,190,78,0.24),_transparent_35%),linear-gradient(112deg,_#c4e2dc_0%,_#e7f1ee_39%,_#fff0cf_77%,_#f9fbfa_100%)] py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto px-8 grid gap-12 items-stretch lg:grid-cols-2">
          <div className="h-full rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-blue-600 to-sky-500 p-10 text-white shadow-2xl shadow-slate-900/15">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-slate-100 shadow-sm">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-slate-100">★</span>
              Welcome back
            </div>
            <h1 className="mt-8 text-5xl font-bold leading-tight sm:text-6xl">
              Trusted local pros, in seconds.
            </h1>
            <p className="mt-3 max-w-lg text-sm text-slate-100/85 sm:text-base">
              Sign in to manage bookings, chat with providers and track every visit in one elegant place.
            </p>

            <div className="mt-8 space-y-3">
              <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white shadow-lg shadow-slate-900/20">
                  <span className="text-base">✓</span>
                </div>
                <div>
                  <p className="text-base font-semibold">500+ verified professionals</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white shadow-lg shadow-slate-900/20">
                  <span className="text-base">★</span>
                </div>
                <div>
                  <p className="text-base font-semibold">4.9 average customer rating</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white shadow-lg shadow-slate-900/20">
                  <span className="text-base">🔒</span>
                </div>
                <div>
                  <p className="text-base font-semibold">Secure, encrypted contact</p>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/10 p-4 text-center">
                <p className="text-2xl font-semibold">10k+</p>
                <p className="mt-1 text-sm text-slate-100/80">Customers</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 text-center">
                <p className="text-2xl font-semibold">120+</p>
                <p className="mt-1 text-sm text-slate-100/80">Cities</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 text-center">
                <p className="text-2xl font-semibold">24/7</p>
                <p className="mt-1 text-sm text-slate-100/80">Support</p>
              </div>
            </div>
          </div>

          <div className="h-full rounded-[2.5rem] bg-white p-10 shadow-2xl shadow-slate-900/10">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-slate-950">Log in to ServiceHub</h2>
                <p className="mt-2 text-sm text-slate-500">
                  New here?{' '}
                  <Link href="/register" className="font-semibold text-sky-600 hover:text-sky-700">
                    Create an account
                  </Link>
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-800">
                  Email
                </label>
                <div className="mt-3">
                  <div className="relative">
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
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pl-12 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-slate-800">
                  Password
                </label>
                <div className="mt-3">
                  <div className="relative">
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
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pl-12 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-slate-500">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
                  Remember me
                </label>
                <Link href="/forgot-password" className="font-semibold text-sky-600 hover:text-sky-700">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-accent px-5 py-3 text-base font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-[#e85d0c] flex items-center justify-center gap-3"
              >
                <span>Log in</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 5l7 7-7 7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
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
