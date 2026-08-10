"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
    const [role, setRole] = useState<'customer' | 'provider'>('customer');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: validate and send to API
        console.log({ role, fullName, email, phone, password, confirm });
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_7%_5%,_rgba(51,154,143,0.24),_transparent_36%),radial-gradient(circle_at_89%_11%,_rgba(255,190,78,0.24),_transparent_35%),linear-gradient(112deg,_#c4e2dc_0%,_#e7f1ee_39%,_#fff0cf_77%,_#f9fbfa_100%)] py-16">
            <div className="max-w-7xl mx-auto px-8 grid gap-12 items-stretch lg:grid-cols-2">
                <div className="h-full rounded-[2.5rem] bg-gradient-to-br from-[#0aa39a] via-[#109a8c] to-[#0a6d9a] p-10 text-white shadow-[0_45px_120px_rgba(10,163,154,0.16)]">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100 shadow-sm shadow-slate-950/10">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-slate-100">★</span>
                        Join ServiceHub
                    </div>

                    <h1 className="mt-10 text-5xl font-bold leading-tight sm:text-6xl">
                        One account. Every trusted pro in your city.
                    </h1>
                    <p className="mt-4 max-w-lg text-base text-slate-100/90 sm:text-lg">
                        Book verified professionals or grow your service business with a profile that looks as good as your work.
                    </p>

                    <div className="mt-8 space-y-4">
                        <div className="flex items-center gap-3 rounded-3xl bg-white/10 p-4 shadow-sm">
                            <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-white/15 text-white shadow-lg shadow-slate-950/20">
                                ✓
                            </div>
                            <p className="text-sm font-semibold text-slate-100">Verified, background-checked pros</p>
                        </div>
                        <div className="flex items-center gap-3 rounded-3xl bg-white/10 p-4 shadow-sm">
                            <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-white/15 text-white shadow-lg shadow-slate-950/20">
                                🔒
                            </div>
                            <p className="text-sm font-semibold text-slate-100">Secure contact and data protection</p>
                        </div>
                        <div className="flex items-center gap-3 rounded-3xl bg-white/10 p-4 shadow-sm">
                            <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-white/15 text-white shadow-lg shadow-slate-950/20">
                                ★
                            </div>
                            <p className="text-sm font-semibold text-slate-100">4.9 average rating across 500k reviews</p>
                        </div>
                    </div>

                    <div className="mt-10">
                        <div className="rounded-3xl bg-white/10 p-4 shadow-sm">
                            <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center text-2xl text-white">👤</div>
                            <p className="mt-4 text-sm text-slate-100/80">Create your profile and start getting more bookings.</p>
                        </div>
                    </div>
                </div>

                <div className="h-full rounded-[2.5rem] bg-white p-10 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
                    <div className="mb-6">
                        <div className="inline-flex items-center rounded-full bg-[#eaf7ee] px-4 py-2 text-sm font-semibold text-[#0aa39a]">
                            Register
                        </div>
                        <h2 className="mt-6 text-3xl font-bold text-slate-950">Create your account</h2>
                        <p className="mt-2 text-sm text-slate-500">Already have one? <Link href="/login" className="font-semibold text-[#0aa39a] hover:text-[#0a8a7b]">Log in</Link></p>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <button type="button" onClick={() => setRole('customer')} className={`rounded-[1.75rem] border px-4 py-4 text-left transition ${role === 'customer' ? 'border-[#0aa39a] bg-[#eaf7ee]' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}>
                            <div className="flex items-center gap-3">
                                <div className="h-11 w-11 rounded-3xl bg-white flex items-center justify-center text-[#0aa39a] shadow-sm">👤</div>
                                <div>
                                    <p className="font-semibold text-slate-950">Customer</p>
                                    <p className="text-sm text-slate-500">Book services</p>
                                </div>
                            </div>
                        </button>

                        <button type="button" onClick={() => setRole('provider')} className={`rounded-[1.75rem] border px-4 py-4 text-left transition ${role === 'provider' ? 'border-[#0aa39a] bg-[#eaf7ee]' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}>
                            <div className="flex items-center gap-3">
                                <div className="h-11 w-11 rounded-3xl bg-white flex items-center justify-center text-[#0aa39a] shadow-sm">🏷️</div>
                                <div>
                                    <p className="font-semibold text-slate-950">Provider</p>
                                    <p className="text-sm text-slate-500">Offer services</p>
                                </div>
                            </div>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-slate-800">Full name</label>
                            <input value={fullName} onChange={(e)=>setFullName(e.target.value)} placeholder="Jane Doe" className="w-full mt-3 rounded-[1.75rem] border border-slate-200 bg-slate-50 px-4 py-3 focus:border-[#0aa39a] focus:ring-2 focus:ring-[#0aa39a]/10" />
                        </div>

                        <div className="grid gap-4 lg:grid-cols-2">
                            <div>
                                <label className="block text-sm font-semibold text-slate-800">Email</label>
                                <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@email.com" className="w-full mt-3 rounded-[1.75rem] border border-slate-200 bg-slate-50 px-4 py-3 focus:border-[#0aa39a] focus:ring-2 focus:ring-[#0aa39a]/10" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-800">Phone number</label>
                                <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="+1 555 000 0000" className="w-full mt-3 rounded-[1.75rem] border border-slate-200 bg-slate-50 px-4 py-3 focus:border-[#0aa39a] focus:ring-2 focus:ring-[#0aa39a]/10" />
                            </div>
                        </div>

                        <div className="grid gap-4 lg:grid-cols-2">
                            <div>
                                <label className="block text-sm font-semibold text-slate-800">Password</label>
                                <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="••••••••" className="w-full mt-3 rounded-[1.75rem] border border-slate-200 bg-slate-50 px-4 py-3 focus:border-[#0aa39a] focus:ring-2 focus:ring-[#0aa39a]/10" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-800">Confirm password</label>
                                <input value={confirm} onChange={(e)=>setConfirm(e.target.value)} type="password" placeholder="••••••••" className="w-full mt-3 rounded-[1.75rem] border border-slate-200 bg-slate-50 px-4 py-3 focus:border-[#0aa39a] focus:ring-2 focus:ring-[#0aa39a]/10" />
                            </div>
                        </div>

                        <button type="submit" className="w-full rounded-[1.75rem] bg-[#0aa39a] px-6 py-3 text-base font-semibold text-white shadow-[0_18px_40px_rgba(10,163,154,0.25)] transition hover:bg-[#0a8a7b]">
                            Create account →
                        </button>

                        <p className="mt-2 text-center text-sm text-slate-500">By creating an account you agree to our <Link href="/terms" className="font-semibold text-slate-900">Terms</Link> and <Link href="/privacy" className="font-semibold text-slate-900">Privacy Policy</Link>.</p>
                    </form>
                </div>
            </div>        </div>
    );
};

export default RegisterPage;
