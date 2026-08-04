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
    <div className="min-h-screen bg-[radial-gradient(circle_at_7%_5%,_rgba(51,154,143,0.24),_transparent_36%),radial-gradient(circle_at_89%_11%,_rgba(255,190,78,0.24),_transparent_35%),linear-gradient(112deg,_#c4e2dc_0%,_#e7f1ee_39%,_#fff0cf_77%,_#f9fbfa_100%)] py-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="inline-block rounded-full bg-sky-50 px-3 py-1 text-sm text-sky-600">For Professionals</p>
          <h1 className="mt-6 text-4xl font-extrabold text-slate-900 sm:text-5xl">Grow your local service business</h1>
          <p className="mt-4 max-w-2xl mx-auto text-slate-500">Get discovered by thousands of nearby customers. Set your rates. Keep your calendar full.</p>
        </div>

        <div className="mt-10 grid place-items-center">
          <div className="w-full max-w-3xl rounded-2xl bg-white p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col gap-6 sm:flex-row">
                <div className="w-48 flex flex-col items-start">
                  <div className="h-28 w-28 rounded-full overflow-hidden bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white">
                    {file ? (
                      <img src={URL.createObjectURL(file)} alt="avatar" className="h-28 w-28 object-cover" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M12 3v12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8 7l4-4 4 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M21 21H3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <div className="mt-3 text-sm text-slate-700">Profile picture
                    <div className="text-xs text-slate-400 mt-1">PNG or JPG, up to 5MB.</div>
                  </div>
                  <label className="mt-3 inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm cursor-pointer">
                    Choose file
                    <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
                  </label>
                </div>

                <div className="flex-1">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm text-slate-700">Full name</label>
                      <input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Alex Johnson" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-700">Phone number</label>
                      <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 555 000 0000" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" />
                    </div>

                    <div>
                      <label className="block text-sm text-slate-700">WhatsApp number</label>
                      <input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="+1 555 000 0000" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-700">Service category</label>
                      <select value={category} onChange={e=>setCategory(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3">
                        <option value="">Select...</option>
                        <option>Electrician</option>
                        <option>Plumber</option>
                        <option>Cleaner</option>
                        <option>Carpenter</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-slate-700">City</label>
                      <select value={city} onChange={e=>setCity(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3">
                        <option value="">Select...</option>
                        <option>San Francisco</option>
                        <option>New York</option>
                        <option>London</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-700">Years of experience</label>
                      <input value={years} onChange={e => setYears(e.target.value)} placeholder="5" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-700">Short description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Tell customers about your specialties, tools, and what makes your service great." className="mt-2 w-full min-h-[120px] rounded-xl border border-slate-200 px-4 py-3 resize-none" />
              </div>

              <div>
                <button type="submit" className="w-full rounded-3xl bg-accent px-6 py-3 text-white font-semibold shadow-lg shadow-orange-200">Submit application →</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeProviderPage;
