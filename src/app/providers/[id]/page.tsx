"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, Briefcase, CheckCircle2, ArrowLeft } from "lucide-react";

interface ProviderDetail {
  provider_id: number;
  user_id: number;
  full_name: string;
  email: string;
  phone: string | null;
  city: string;
  years_experience: number;
  rating: number;
  reviews_count: number;
  verified: number;
  profile_picture: string | null;
  services: { id: number; name: string }[];
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

const ProviderDetailPage = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [provider, setProvider] = useState<ProviderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    if (!params?.id) return;

    fetch(`/api/providers/${params.id}`)
      .then(async (res) => {
        const data = await res.json().catch(() => null);
        if (!res.ok || !data?.success) {
          setNotFoundState(true);
          return;
        }
        setProvider(data.data);
      })
      .catch(() => setNotFoundState(true))
      .finally(() => setLoading(false));
  }, [params?.id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8faf3]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0aa39a] border-t-transparent" />
      </div>
    );
  }

  if (notFoundState || !provider) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#f8faf3] px-4 text-center">
        <div className="text-5xl">🔍</div>
        <h1 className="text-2xl font-bold text-slate-900">Provider not found</h1>
        <p className="text-slate-500">This profile doesn&apos;t exist or may have been removed.</p>
        <Link
          href="/providers"
          className="mt-2 rounded-full bg-[#0aa39a] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#089283]"
        >
          Browse all providers
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf3]">
      {/* Hero banner */}
      <div className="bg-gradient-to-br from-[#0aa39a] to-[#0a6d9a] px-6 py-14 text-white">
        <div className="container mx-auto">
          <button
            onClick={() => router.back()}
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
          >
            <ArrowLeft size={16} /> Back
          </button>

          <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
            Provider Profile
          </p>
          <h1 className="mt-1 text-4xl font-bold">{provider.full_name}</h1>
          <p className="mt-1 flex items-center gap-1 text-white/80">
            <MapPin size={14} /> {provider.city}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left — Profile card (read-only) */}
          <div className="lg:col-span-1">
            <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.07)]">
              <div className="relative h-56 bg-slate-100">
                {provider.profile_picture ? (
                  <Image
                    src={provider.profile_picture}
                    alt={provider.full_name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-7xl font-bold text-slate-200">
                    {provider.full_name.charAt(0)}
                  </div>
                )}

                {provider.verified === 1 && (
                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm">
                    <CheckCircle2 size={12} className="text-[#0aa39a]" />
                    Verified Provider
                  </div>
                )}
              </div>

              <div className="space-y-4 p-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-950">{provider.full_name}</h2>
                  <p className="mt-0.5 text-sm text-slate-500">{provider.email}</p>
                  {provider.phone && <p className="text-sm text-slate-500">{provider.phone}</p>}
                </div>

                {/* Services offered */}
                <div className="rounded-[1.5rem] bg-[#eaf7f6] p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#0aa39a]">
                    Services Offered
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {provider.services.map((s) => (
                      <span
                        key={s.id}
                        className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-900 shadow-sm"
                      >
                        {serviceIcons[s.name] ?? "🛠️"} {s.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[1.5rem] bg-slate-50 p-4 text-center">
                    <div className="flex items-center justify-center gap-1 text-amber-500">
                      <Star size={16} fill="currentColor" />
                      <span className="text-xl font-bold text-slate-900">
                        {Number(provider.rating).toFixed(1)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">Rating</p>
                  </div>

                  <div className="rounded-[1.5rem] bg-slate-50 p-4 text-center">
                    <p className="text-xl font-bold text-slate-900">{provider.reviews_count}</p>
                    <p className="mt-1 text-xs text-slate-500">Reviews</p>
                  </div>

                  <div className="rounded-[1.5rem] bg-slate-50 p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Briefcase size={14} className="text-slate-400" />
                      <span className="text-xl font-bold text-slate-900">
                        {provider.years_experience}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">Years Exp.</p>
                  </div>

                  <div className="rounded-[1.5rem] bg-slate-50 p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <MapPin size={14} className="text-slate-400" />
                      <span className="truncate text-sm font-bold text-slate-900">
                        {provider.city}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">City</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — read-only overview (no edit controls, unlike the provider's own dashboard) */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.07)]">
              <h3 className="mb-5 text-xl font-bold text-slate-950">Profile Overview</h3>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Full Name", value: provider.full_name },
                  { label: "Email", value: provider.email },
                  { label: "Phone", value: provider.phone ?? "—" },
                  { label: "City", value: provider.city },
                  {
                    label: "Services Offered",
                    value: provider.services.map((s) => s.name).join(", "),
                  },
                  { label: "Years of Experience", value: `${provider.years_experience} years` },
                  { label: "Rating", value: `${Number(provider.rating).toFixed(1)} / 5.0` },
                  { label: "Total Reviews", value: String(provider.reviews_count) },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-[1.5rem] bg-slate-50 px-5 py-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetailPage;
