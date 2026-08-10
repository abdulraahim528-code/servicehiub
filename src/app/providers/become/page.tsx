"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const BecomeProviderPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [years, setYears] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0];
    if (f) setFile(f);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: submit to API
    console.log({ file, fullName, phone, whatsapp, category, city, years, description });
    router.push('/providers');
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_7%_5%,_rgba(10,163,154,0.14),_transparent_30%),radial-gradient(circle_at_90%_10%,_rgba(255,138,59,0.16),_transparent_28%),linear-gradient(112deg,_#eaf7ee_0%,_#f6f2e4_40%,_#fff8e5_85%,_#fdf9f2_100%)] py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="inline-flex rounded-full bg-[#eaf7ee] px-4 py-2 text-sm font-semibold text-[#0aa39a]">For Professionals</p>
          <h1 className="mt-6 text-4xl font-extrabold text-slate-950 sm:text-5xl">Grow your local service business</h1>
          <p className="mt-4 text-base text-slate-600">Get discovered by thousands of nearby customers. Set your rates. Keep your calendar full.</p>
        </div>

        <div className="mt-14 mx-auto max-w-4xl rounded-[2.5rem] bg-white p-10 shadow-[0_40px_120px_rgba(15,23,42,0.08)]">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] items-start">
            <div className="rounded-[2.25rem] bg-[#f5fcfb] p-6 text-center shadow-sm">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#0aa39a] to-[#109a8c] text-white shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 3v12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 7l4-4 4 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 21H3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="mt-5 text-sm font-semibold text-slate-900">Profile picture</p>
              <p className="mt-2 text-sm text-slate-500">PNG or JPG, up to 5MB.</p>
              <label className="mt-6 inline-flex cursor-pointer items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50">
                Choose file
                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
              </label>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-700">Full name</label>
                  <input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Alex Johnson" className="mt-3 w-full rounded-[1.75rem] border border-slate-200 bg-slate-50 px-5 py-3 focus:border-[#0aa39a] focus:ring-2 focus:ring-[#0aa39a]/10" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700">Phone number</label>
                  <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 555 000 0000" className="mt-3 w-full rounded-[1.75rem] border border-slate-200 bg-slate-50 px-5 py-3 focus:border-[#0aa39a] focus:ring-2 focus:ring-[#0aa39a]/10" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-700">WhatsApp number</label>
                  <input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="+1 555 000 0000" className="mt-3 w-full rounded-[1.75rem] border border-slate-200 bg-slate-50 px-5 py-3 focus:border-[#0aa39a] focus:ring-2 focus:ring-[#0aa39a]/10" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700">Service category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} className="mt-3 w-full rounded-[1.75rem] border border-slate-200 bg-slate-50 px-5 py-3 focus:border-[#0aa39a] focus:ring-2 focus:ring-[#0aa39a]/10">
                    <option value="">Select...</option>
                    <option>Electrician</option>
                    <option>Plumber</option>
                    <option>Cleaner</option>
                    <option>Carpenter</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-700">City</label>
                  <select value={city} onChange={e => setCity(e.target.value)} className="mt-3 w-full rounded-[1.75rem] border border-slate-200 bg-slate-50 px-5 py-3 focus:border-[#0aa39a] focus:ring-2 focus:ring-[#0aa39a]/10">
                    <option value="">Select...</option>
                    <option>San Francisco</option>
                    <option>New York</option>
                    <option>London</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700">Years of experience</label>
                  <input value={years} onChange={e => setYears(e.target.value)} placeholder="5" className="mt-3 w-full rounded-[1.75rem] border border-slate-200 bg-slate-50 px-5 py-3 focus:border-[#0aa39a] focus:ring-2 focus:ring-[#0aa39a]/10" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700">Short description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Tell customers about your specialties, tools, and what makes your service great." className="mt-3 w-full min-h-[140px] rounded-[1.75rem] border border-slate-200 bg-slate-50 px-5 py-4 resize-none focus:border-[#0aa39a] focus:ring-2 focus:ring-[#0aa39a]/10" />
              </div>

              <button type="submit" className="w-full rounded-[1.75rem] bg-accent px-6 py-4 text-base font-semibold text-white shadow-[0_18px_40px_rgba(255,156,86,0.24)] transition hover:bg-[#ff883c]">
                Submit application →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeProviderPage;
