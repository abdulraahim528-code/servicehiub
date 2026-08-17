"use client";

import React, { useState, useEffect } from "react";
import { categories as localCategories } from "../../../data/services";
import { useRouter } from "next/navigation";

interface ServiceOption {
  id: number | string;
  name: string;
  slug?: string;
}

const BecomeProviderPage: React.FC = () => {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [category, setCategory] = useState(""); // holds service id as string
  const [city, setCity] = useState("");
  const [years, setYears] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [services, setServices] = useState<ServiceOption[]>(
    () =>
      (localCategories || []).map((c: any) => ({ id: c.id, name: c.title, slug: c.id }))
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadServices() {
      // Pre-populate from local categories so UI shows options immediately
      try {
        const modInit = await import("../../../data/services");
        const initCats = modInit.categories || [];
        const initMapped = initCats.map((c: any) => ({ id: c.id, name: c.title, slug: c.id }));
        setServices(initMapped);
      } catch (e) {
        // ignore
      }

      try {
        const res = await fetch("/api/services");
        const data = await res.json();

        let items = data?.data || [];

        // Normalize rows from the DB (some seeds use `title` instead of `name`)
        if (Array.isArray(items) && items.length > 0) {
          const mapped = items.map((s: any) => ({
            id: s.id ?? s._id ?? s.slug ?? s.title,
            name: s.name ?? s.title ?? String(s.slug ?? s.id),
            slug: s.slug ?? String(s.title ?? s.name ?? "").toLowerCase().replace(/\s+/g, "-"),
          }));

          setServices(mapped);
          return;
        }

        // Fallback to local categories if the API returns no rows
        const mod = await import("../../../data/services");
        const localCats = mod.categories || [];
        const mappedLocal = localCats.map((c: any) => ({
          id: c.id,
          name: c.title,
          slug: c.id,
        }));

        setServices(mappedLocal);
      } catch (err) {
        console.error("Failed to load services:", err);
        try {
          const mod = await import("../../../data/services");
          const localCats = mod.categories || [];
          const mappedLocal = localCats.map((c: any) => ({
            id: c.id,
            name: c.title,
            slug: c.id,
          }));
          setServices(mappedLocal);
        } catch (e) {
          setServices([]);
        }
      }
    }

    loadServices();
  }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      const allowedTypes = ["image/png", "image/jpeg"];

      if (!allowedTypes.includes(selectedFile.type)) {
        alert("Please select a PNG or JPG image.");
        return;
      }

      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB.");
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (
      !fullName ||
      !phone ||
      !email ||
      !category ||
      !city ||
      !years ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!file) {
      setError("Please select a profile picture.");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("serviceId", category);
    formData.append("city", city);
    formData.append("years", years);
    formData.append("password", password);
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await fetch("/api/register-provider", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      setMessage("Provider account created successfully!");

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_7%_5%,_rgba(10,163,154,0.14),_transparent_30%),radial-gradient(circle_at_90%_10%,_rgba(255,138,59,0.16),_transparent_28%),linear-gradient(112deg,_#eaf7ee_0%,_#f6f2e4_40%,_#fff8e5_85%,_#fdf9f2_100%)] py-20">

      <div className="container mx-auto px-4 lg:px-8">

        {/* =========================================
            PAGE HEADING
        ========================================== */}
        <div className="mx-auto max-w-3xl text-center">

          <p className="inline-flex rounded-full bg-[#eaf7ee] px-4 py-2 text-sm font-semibold text-[#0aa39a]">
            For Professionals
          </p>

          <h1 className="mt-6 text-4xl font-extrabold text-slate-950 sm:text-5xl">
            Grow your local service business
          </h1>

          <p className="mt-4 text-base text-slate-600">
            Get discovered by thousands of nearby customers. Set your rates.
            Keep your calendar full.
          </p>

        </div>


        {/* =========================================
            MAIN PROVIDER REGISTRATION CARD
        ========================================== */}
        <div className="mx-auto mt-14 max-w-4xl rounded-[2.5rem] bg-white p-10 shadow-[0_40px_120px_rgba(15,23,42,0.08)]">

          <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">


            {/* =====================================
                PROFILE PICTURE
            ====================================== */}
            <div className="rounded-[2.25rem] bg-[#f5fcfb] p-6 text-center shadow-sm">

              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#0aa39a] to-[#109a8c] text-white shadow-xl">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M12 3v12"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M8 7l4-4 4 4"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M21 21H3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

              </div>

              <p className="mt-5 text-sm font-semibold text-slate-900">
                Profile picture
              </p>

              <p className="mt-2 text-sm text-slate-500">
                PNG or JPG, up to 5MB.
              </p>

              <label className="mt-6 inline-flex cursor-pointer items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50">

                {file ? file.name : "Choose file"}

                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={handleFile}
                  className="hidden"
                />

              </label>

            </div>


            {/* =====================================
                PROVIDER FORM
            ====================================== */}
            <form onSubmit={handleSubmit} className="space-y-6">


              {/* =================================
                  FULL NAME + PHONE
              ================================== */}
              <div className="grid gap-4 sm:grid-cols-2">

                <div>

                  <label className="block text-sm font-semibold text-slate-700">
                    Full name
                  </label>

                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Alex Johnson"
                    required
                    className="mt-3 w-full rounded-[1.75rem] border border-slate-200 bg-slate-50 px-5 py-3 outline-none transition focus:border-[#0aa39a] focus:ring-2 focus:ring-[#0aa39a]/10"
                  />

                </div>


                <div>

                  <label className="block text-sm font-semibold text-slate-700">
                    Phone number
                  </label>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 300 0000000"
                    required
                    className="mt-3 w-full rounded-[1.75rem] border border-slate-200 bg-slate-50 px-5 py-3 outline-none transition focus:border-[#0aa39a] focus:ring-2 focus:ring-[#0aa39a]/10"
                  />

                </div>

              </div>


              {/* =================================
                  EMAIL
              ================================== */}
              <div>

                <label className="block text-sm font-semibold text-slate-700">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="mt-3 w-full rounded-[1.75rem] border border-slate-200 bg-slate-50 px-5 py-3 outline-none transition focus:border-[#0aa39a] focus:ring-2 focus:ring-[#0aa39a]/10"
                />

              </div>


              {/* =================================
                  SERVICE CATEGORY + CITY
              ================================== */}
              <div className="grid gap-4 sm:grid-cols-2">

                {/* Service Category — now loaded from the database */}
                <div>

                  <label className="block text-sm font-semibold text-slate-700">
                    Service category
                  </label>

                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="mt-3 w-full rounded-[1.75rem] border border-slate-200 bg-slate-50 px-5 py-3 outline-none transition focus:border-[#0aa39a] focus:ring-2 focus:ring-[#0aa39a]/10"
                  >

                    <option value="">
                      Select...
                    </option>

                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}

                  </select>

                    {/* categories are loaded from local data or API */}

                </div>


                {/* City */}
                <div>

                  <label className="block text-sm font-semibold text-slate-700">
                    City
                  </label>

                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="mt-3 w-full rounded-[1.75rem] border border-slate-200 bg-slate-50 px-5 py-3 outline-none transition focus:border-[#0aa39a] focus:ring-2 focus:ring-[#0aa39a]/10"
                  >

                    <option value="">
                      Select...
                    </option>

                    <option value="Islamabad">
                      Islamabad
                    </option>

                    <option value="Rawalpindi">
                      Rawalpindi
                    </option>

                    <option value="Lahore">
                      Lahore
                    </option>

                    <option value="Karachi">
                      Karachi
                    </option>

                    <option value="Peshawar">
                      Peshawar
                    </option>

                    <option value="Multan">
                      Multan
                    </option>

                  </select>

                </div>

              </div>


              {/* =================================
                  EXPERIENCE
              ================================== */}
              <div>

                <label className="block text-sm font-semibold text-slate-700">
                  Years of experience
                </label>

                <input
                  type="number"
                  min="0"
                  max="60"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  placeholder="5"
                  required
                  className="mt-3 w-full rounded-[1.75rem] border border-slate-200 bg-slate-50 px-5 py-3 outline-none transition focus:border-[#0aa39a] focus:ring-2 focus:ring-[#0aa39a]/10"
                />

              </div>


              {/* =================================
                  PASSWORD + CONFIRM PASSWORD
              ================================== */}
              <div className="grid gap-4 sm:grid-cols-2">

                <div>

                  <label className="block text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    minLength={6}
                    className="mt-3 w-full rounded-[1.75rem] border border-slate-200 bg-slate-50 px-5 py-3 outline-none transition focus:border-[#0aa39a] focus:ring-2 focus:ring-[#0aa39a]/10"
                  />

                </div>


                <div>

                  <label className="block text-sm font-semibold text-slate-700">
                    Confirm password
                  </label>

                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Confirm password"
                    required
                    minLength={6}
                    className="mt-3 w-full rounded-[1.75rem] border border-slate-200 bg-slate-50 px-5 py-3 outline-none transition focus:border-[#0aa39a] focus:ring-2 focus:ring-[#0aa39a]/10"
                  />

                </div>

              </div>


              {/* =================================
                  ERROR / SUCCESS MESSAGES
              ================================== */}
              {error && (
                <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {message && (
                <div className="rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-600">
                  {message}
                </div>
              )}


              {/* =================================
                  CREATE PROVIDER ACCOUNT BUTTON
              ================================== */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-[1.75rem] bg-[#0aa39a] px-6 py-4 text-base font-semibold text-white shadow-[0_18px_40px_rgba(10,163,154,0.25)] transition duration-200 hover:bg-[#078f87] hover:shadow-[0_20px_45px_rgba(10,163,154,0.35)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create provider account →"}
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
};

export default BecomeProviderPage;