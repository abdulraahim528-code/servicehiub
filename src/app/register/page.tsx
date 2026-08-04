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
                <div className="h-full rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-blue-600 to-sky-500 p-10 text-white shadow-2xl shadow-slate-900/15">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-slate-100 shadow-sm">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-slate-100">★</span>
                        Join ServiceHub
                    </div>

                    <h1 className="mt-10 text-5xl font-bold leading-tight sm:text-6xl">
                        One account. Every trusted pro in your city.
                    </h1>
                    <p className="mt-4 max-w-lg text-base text-slate-100/85 sm:text-lg">
                        Book verified professionals or grow your own service business with a profile that looks as good as your work.
                    </p>

                    <div className="mt-8 space-y-3">
                        <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white shadow-lg">
                                ✓
                            </div>
                            <p className="text-base font-semibold">Verified, background-checked pros</p>
                        </div>
                        <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white shadow-lg">
                                🔒
                            </div>
                            <p className="text-base font-semibold">Secure contact and data protection</p>
                        </div>
                        <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white shadow-lg">
                                ★
                            </div>
                            <p className="text-base font-semibold">4.9 average rating across 500k reviews</p>
                        </div>
                    </div>

                    <div className="mt-10">
                        <div className="rounded-2xl overflow-hidden">
                            <img src="/images/testimonials/priya.jpg" alt="avatar" className="h-16 w-16 rounded-full border-4 border-white" />
                        </div>
                    </div>
                </div>

                <div className="h-full rounded-[2.5rem] bg-white p-10 shadow-2xl shadow-slate-900/10">
                    <h2 className="text-3xl font-bold text-slate-950">Create your account</h2>
                    <p className="mt-2 text-sm text-slate-500">Already have one? <Link href="/login" className="font-semibold text-sky-600">Log in</Link></p>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <button type="button" onClick={() => setRole('customer')} className={`rounded-2xl border ${role === 'customer' ? 'border-sky-500 bg-sky-50' : 'border-slate-100 bg-slate-50'} p-4 text-left` }>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-sky-600">👤</div>
                                <div>
                                    <p className="font-semibold">Customer</p>
                                    <p className="text-sm text-slate-500">Book services</p>
                                </div>
                            </div>
                        </button>

                        <button type="button" onClick={() => setRole('provider')} className={`rounded-2xl border ${role === 'provider' ? 'border-sky-500 bg-sky-50' : 'border-slate-100 bg-slate-50'} p-4 text-left` }>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-slate-500">🏷️</div>
                                <div>
                                    <p className="font-semibold">Provider</p>
                                    <p className="text-sm text-slate-500">Offer services</p>
                                </div>
                            </div>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-800">Full name</label>
                            <input value={fullName} onChange={(e)=>setFullName(e.target.value)} placeholder="Jane Doe" className="w-full mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-800">Email</label>
                                <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@email.com" className="w-full mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-800">Phone number</label>
                                <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="+1 555 000 0000" className="w-full mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-800">Password</label>
                                <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="••••••••" className="w-full mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-800">Confirm password</label>
                                <input value={confirm} onChange={(e)=>setConfirm(e.target.value)} type="password" placeholder="••••••••" className="w-full mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" />
                            </div>
                        </div>

                        <button type="submit" className="w-full rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-white shadow-lg shadow-orange-200">Create account →</button>

                        <p className="mt-2 text-center text-sm text-slate-500">By creating an account you agree to our <Link href="/terms" className="font-semibold text-slate-900">Terms</Link> and <Link href="/privacy" className="font-semibold text-slate-900">Privacy Policy</Link>.</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
