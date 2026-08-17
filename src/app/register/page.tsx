"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setMessage("");

    // Basic validation
    if (
      !fullName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email,
          phone,
          password,
          role: "customer",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      setMessage("Account created successfully!");

      // Go to login after successful registration
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_7%_5%,_rgba(51,154,143,0.24),_transparent_36%),radial-gradient(circle_at_89%_11%,_rgba(255,190,78,0.24),_transparent_35%),linear-gradient(112deg,_#c4e2dc_0%,_#e7f1ee_39%,_#fff0cf_77%,_#f9fbfa_100%)] py-16">

      <div className="max-w-7xl mx-auto px-8 grid gap-12 items-stretch lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="h-full rounded-[2.5rem] bg-gradient-to-br from-[#0aa39a] via-[#109a8c] to-[#0a6d9a] p-10 text-white shadow-[0_45px_120px_rgba(10,163,154,0.16)]">

          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
              ★
            </span>

            Join ServiceHub
          </div>

          <h1 className="mt-10 text-5xl font-bold leading-tight sm:text-6xl">
            One account.
            <br />
            Every trusted
            <br />
            pro in your city.
          </h1>

          <p className="mt-4 max-w-lg text-base text-slate-100/90 sm:text-lg">
            Find trusted professionals and book local services easily
            through ServiceHub.
          </p>

          <div className="mt-8 space-y-4">

            <div className="flex items-center gap-3 rounded-3xl bg-white/10 p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-white/15">
                ✓
              </div>

              <p className="text-sm font-semibold text-slate-100">
                Verified professionals
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-3xl bg-white/10 p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-white/15">
                🔒
              </div>

              <p className="text-sm font-semibold text-slate-100">
                Secure account and data protection
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-3xl bg-white/10 p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-white/15">
                ★
              </div>

              <p className="text-sm font-semibold text-slate-100">
                Find trusted local services
              </p>
            </div>

          </div>

          <div className="mt-10">
            <div className="rounded-3xl bg-white/10 p-4">
              <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center text-2xl">
                👤
              </div>

              <p className="mt-4 text-sm text-slate-100/80">
                Create your account and start booking trusted professionals.
              </p>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="h-full rounded-[2.5rem] bg-white p-10 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">

          <div className="mb-6">

            <div className="inline-flex items-center rounded-full bg-[#eaf7ee] px-4 py-2 text-sm font-semibold text-[#0aa39a]">
              Register
            </div>

            <h2 className="mt-6 text-3xl font-bold text-slate-950">
              Create your account
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Already have one?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#0aa39a] hover:text-[#0a8a7b]"
              >
                Log in
              </Link>
            </p>

          </div>

          {/* REGISTRATION FORM */}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">

            {/* FULL NAME */}
            <div>
              <label className="block text-sm font-semibold text-slate-800">
                Full name
              </label>

              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Doe"
                type="text"
                className="w-full mt-3 rounded-[1.75rem] border border-slate-200 bg-slate-50 px-4 py-3 focus:border-[#0aa39a] focus:ring-2 focus:ring-[#0aa39a]/10"
              />
            </div>

            {/* EMAIL + PHONE */}
            <div className="grid gap-4 lg:grid-cols-2">

              <div>
                <label className="block text-sm font-semibold text-slate-800">
                  Email
                </label>

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  type="email"
                  className="w-full mt-3 rounded-[1.75rem] border border-slate-200 bg-slate-50 px-4 py-3 focus:border-[#0aa39a] focus:ring-2 focus:ring-[#0aa39a]/10"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800">
                  Phone number
                </label>

                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+92 300 0000000"
                  type="tel"
                  className="w-full mt-3 rounded-[1.75rem] border border-slate-200 bg-slate-50 px-4 py-3 focus:border-[#0aa39a] focus:ring-2 focus:ring-[#0aa39a]/10"
                />
              </div>

            </div>

            {/* PASSWORD + CONFIRM PASSWORD */}
            <div className="grid gap-4 lg:grid-cols-2">

              <div>
                <label className="block text-sm font-semibold text-slate-800">
                  Password
                </label>

                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  className="w-full mt-3 rounded-[1.75rem] border border-slate-200 bg-slate-50 px-4 py-3 focus:border-[#0aa39a] focus:ring-2 focus:ring-[#0aa39a]/10"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800">
                  Confirm password
                </label>

                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  className="w-full mt-3 rounded-[1.75rem] border border-slate-200 bg-slate-50 px-4 py-3 focus:border-[#0aa39a] focus:ring-2 focus:ring-[#0aa39a]/10"
                />
              </div>

            </div>

            {/* ERROR */}
            {error && (
              <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* SUCCESS */}
            {message && (
              <div className="rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-600">
                {message}
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-[1.75rem] bg-[#0aa39a] px-6 py-3 text-base font-semibold text-white shadow-[0_18px_40px_rgba(10,163,154,0.25)] transition hover:bg-[#0a8a7b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account →"}
            </button>

            <p className="mt-2 text-center text-sm text-slate-500">
              By creating an account you agree to our{" "}
              <Link
                href="/terms"
                className="font-semibold text-slate-900"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="font-semibold text-slate-900"
              >
                Privacy Policy
              </Link>
              .
            </p>

          </form>

        </div>

      </div>
    </div>
  );
};

export default RegisterPage;