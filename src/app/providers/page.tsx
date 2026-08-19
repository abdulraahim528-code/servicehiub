"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Star, MapPin, CheckCircle2, Briefcase, Search } from "lucide-react";
import Image from 'next/image'

interface ProviderApiRow {
  id: number;
  full_name: string;
  city: string;
  years_experience: number;
  rating: number;
  reviews_count: number;
  verified: number;
  profile_picture: string | null;
  service_ids: string;
  service_names: string;
}

const serviceIcons: Record<string, string> = {
  Electrician: "⚡",
  Plumber: "🔧",
  Painter: "🎨",
  Cleaner: "🧹",
  Mechanic: "🔩",
  Carpenter: "🪚",
  "Home Tutor": "📚",
  "AC Technician": "❄️",
};

const ProvidersPage = () => {
  const [providers, setProviders] = useState<ProviderApiRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("/api/providers")
      .then((res) => res.json())
      .then((data) => setProviders(data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Unique categories from real data
  const getServiceList = (p: ProviderApiRow) => p.service_names.split(", ");

  // Unique categories from real data
  const categories = [
    "All",
    ...Array.from(new Set(providers.flatMap(getServiceList))),
  ];

  const filtered = providers.filter((p) => {
    const serviceList = getServiceList(p);
    const matchCat =
      activeCategory === "All" || serviceList.includes(activeCategory);
    const matchSearch =
      search === "" ||
      p.full_name.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase()) ||
      p.service_names.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8faf3]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0aa39a] to-[#0a6d9a] px-6 py-14 text-white">
        <div className="container mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
            Our Professionals
          </p>
          <h1 className="mt-2 text-5xl font-bold">Find the Right Expert</h1>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Browse verified service providers across all categories. Filter by
            specialty to find exactly who you need.
          </p>

          {/* Search */}
          <div className="mx-auto mt-7 flex max-w-lg items-center gap-3 rounded-[2rem] bg-white px-5 py-3 shadow-lg">
            <Search size={18} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, city, or service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Category chips */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                activeCategory === cat
                  ? "bg-[#0aa39a] text-white shadow-md"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {cat !== "All" ? `${serviceIcons[cat] ?? "🛠️"} ` : ""}
              {cat}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="mb-5 text-sm text-slate-500 font-medium">
          Showing{" "}
          <span className="font-bold text-slate-900">{filtered.length}</span>{" "}
          provider{filtered.length !== 1 ? "s" : ""}
          {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
        </p>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0aa39a] border-t-transparent" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-[2rem] bg-white py-20 text-center shadow-sm">
            <div className="text-5xl">🔍</div>
            <p className="text-xl font-bold text-slate-700">
              No providers found
            </p>
            <p className="text-sm text-slate-500">
              Try a different category or search term.
            </p>
            <Link
              href="/providers/become"
              className="mt-2 rounded-full bg-[#0aa39a] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#089283]"
            >
              Become the first →
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="group relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.07)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.11)]"
              >
                {/* Picture */}
                <div className="relative h-52 overflow-hidden rounded-t-[2rem] bg-slate-100">
                  {p.profile_picture ? (
                    <Image
                      src={p.profile_picture}
                      alt={p.full_name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-6xl font-bold text-slate-200">
                      {p.full_name.charAt(0)}
                    </div>
                  )}
                  {p.verified === 1 && (
                    <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm">
                      <CheckCircle2 size={12} className="text-[#0aa39a]" />{" "}
                      Verified
                    </div>
                  )}
                  <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm">
                    <Star size={12} className="text-amber-400" />
                    {Number(p.rating).toFixed(1)}
                  </div>
                </div>

                <div className="space-y-3 p-5">
                  <div className="flex flex-wrap gap-1.5">
                    {getServiceList(p).map((name) => (
                      <span
                        key={name}
                        className="inline-block rounded-full bg-[#eaf7f6] px-3 py-1 text-xs font-semibold text-[#0aa39a]"
                      >
                        {serviceIcons[name] ?? "🛠️"} {name}
                      </span>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-950">
                      {p.full_name}
                    </h3>
                    <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                      <MapPin size={12} /> {p.city}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-[1.25rem] bg-slate-50 px-3 py-2 text-xs text-slate-600">
                      <div className="flex items-center gap-1 font-semibold text-slate-900">
                        <Briefcase size={11} /> Experience
                      </div>
                      <div>{p.years_experience} yrs</div>
                    </div>
                    <div className="rounded-[1.25rem] bg-slate-50 px-3 py-2 text-xs text-slate-600">
                      <div className="font-semibold text-slate-900">
                        Reviews
                      </div>
                      <div>{p.reviews_count}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button className="rounded-full bg-[#0aa39a] py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#089283]">
                      Book Now
                    </button>
                    <Link
                      href={`/providers/${p.id}`}
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProvidersPage;
