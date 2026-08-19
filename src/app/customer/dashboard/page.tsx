"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Star, MapPin, CheckCircle2, Briefcase, Search } from "lucide-react";

interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: "customer" | "provider";
}

interface ProviderApiRow {
  id: number;
  full_name: string;
  city: string;
  years_experience: number;
  rating: number;
  reviews_count: number;
  verified: number;
  profile_picture: string | null;
  service_name: string;
}

interface Service {
  id: number;
  name: string;
  slug: string;
}

// Icons for each service category
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

const CustomerDashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [providers, setProviders] = useState<ProviderApiRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Auth guard — redirect if not logged in as customer
  useEffect(() => {
    fetch("/api/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data?.success) { router.push("/login"); return; }
        if (data.user.role === "provider") { router.push("/providers/dashboard"); return; }
        setUser(data.user);
      })
      .catch(() => router.push("/login"));
  }, [router]);

  // Fetch services and providers in parallel
  useEffect(() => {
    if (!user) return;
    Promise.all([
      fetch("/api/services").then((r) => r.json()),
      fetch("/api/providers").then((r) => r.json()),
    ])
      .then(([svcData, provData]) => {
        setServices(svcData.data || []);
        setProviders(provData.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const filteredProviders = providers.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.service_name === activeCategory;
    const matchesSearch =
      search === "" ||
      p.full_name.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase()) ||
      p.service_name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8faf3]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0aa39a] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf3]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0aa39a] to-[#0a6d9a] px-6 py-12 text-white">
        <div className="container mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70">Welcome back</p>
          <h1 className="mt-1 text-4xl font-bold">{user.name} 👋</h1>
          <p className="mt-2 text-white/80">Find a trusted professional for any job today.</p>

          {/* Search bar */}
          <div className="mt-6 flex max-w-xl items-center gap-3 rounded-[2rem] bg-white px-5 py-3 shadow-lg">
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
          <button
            onClick={() => setActiveCategory("All")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              activeCategory === "All"
                ? "bg-[#0aa39a] text-white shadow-md"
                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            All
          </button>
          {services.map((svc) => (
            <button
              key={svc.id}
              onClick={() => setActiveCategory(svc.name)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                activeCategory === svc.name
                  ? "bg-[#0aa39a] text-white shadow-md"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {serviceIcons[svc.name] ?? "🛠️"} {svc.name}
            </button>
          ))}
        </div>

        

        {/* Providers grid */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold text-slate-900">
            {activeCategory === "All" ? "All Providers" : activeCategory + " Providers"}
            <span className="ml-2 text-base font-normal text-slate-500">({filteredProviders.length})</span>
          </h2>
        </div>

        {filteredProviders.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-[2rem] bg-white py-16 text-center shadow-sm">
            <div className="text-4xl">🔍</div>
            <p className="text-lg font-semibold text-slate-700">No providers found</p>
            <p className="text-sm text-slate-500">Try a different category or search term.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProviders.map((p) => (
              <div
                key={p.id}
                className="group relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.07)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.11)]"
              >
                {/* Profile picture */}
                <div className="relative h-48 overflow-hidden rounded-t-[2rem] bg-slate-100">
                  {p.profile_picture ? (
                    <img
                      src={p.profile_picture}
                      alt={p.full_name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-5xl font-bold text-slate-300">
                      {p.full_name.charAt(0)}
                    </div>
                  )}
                  {p.verified === 1 && (
                    <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm">
                      <CheckCircle2 size={12} className="text-[#0aa39a]" /> Verified
                    </div>
                  )}
                  <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm">
                    <Star size={12} className="text-amber-400" />
                    {Number(p.rating).toFixed(1)}
                  </div>
                </div>

                <div className="space-y-3 p-5">
                  {/* Category badge */}
                  <span className="inline-block rounded-full bg-[#eaf7f6] px-3 py-1 text-xs font-semibold text-[#0aa39a]">
                    {serviceIcons[p.service_name] ?? "🛠️"} {p.service_name}
                  </span>

                  <div>
                    <h3 className="text-lg font-bold text-slate-950">{p.full_name}</h3>
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
                      <div className="font-semibold text-slate-900">Reviews</div>
                      <div>{p.reviews_count}</div>
                    </div>
                  </div>

                  <Link
                    href={`/providers/${p.id}`}
                    className="block w-full rounded-full bg-[#0aa39a] py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#089283]"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
