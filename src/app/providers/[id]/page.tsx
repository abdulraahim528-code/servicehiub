"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, Briefcase, CheckCircle2, ArrowLeft, CalendarDays, Lock } from "lucide-react";

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

interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: "customer" | "provider";
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

const ProviderDetailContent = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [provider, setProvider] = useState<ProviderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  // Auth state — determines whether booking is even possible here
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Booking form state
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [houseDetails, setHouseDetails] = useState("");
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

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
        if (data.data.services?.length > 0) {
          setSelectedServiceId(String(data.data.services[0].id));
        }
      })
      .catch(() => setNotFoundState(true))
      .finally(() => setLoading(false));
  }, [params?.id]);

  useEffect(() => {
    fetch("/api/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data?.success ? data.user : null))
      .catch(() => setUser(null))
      .finally(() => setAuthChecked(true));
  }, []);

  // Auto-open the booking form when arriving via a "Book Now" link (?book=1),
  // but only once we know the visitor is actually a logged-in customer.
  useEffect(() => {
    if (authChecked && user?.role === "customer" && searchParams.get("book") === "1") {
      const t = setTimeout(() => setShowBookingForm(true), 0);
      return () => clearTimeout(t);
    }
  }, [authChecked, user, searchParams]);

  const submitBooking = async () => {
    if (!provider) return;
    setBookingError("");

    if (!selectedServiceId || !bookingDate) {
      setBookingError("Please choose a service and a date.");
      return;
    }

    try {
      setBookingSubmitting(true);
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider_id: provider.provider_id,
          service_id: Number(selectedServiceId),
          booking_date: bookingDate,
          house_details: houseDetails,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setBookingError(data.message || "Couldn't send your booking request.");
        return;
      }
      setBookingSuccess(true);
    } catch {
      setBookingError("Something went wrong. Please try again.");
    } finally {
      setBookingSubmitting(false);
    }
  };

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

  const minDate = new Date().toISOString().split("T")[0];

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
        <div className="grid items-stretch gap-8 lg:grid-cols-3">
          {/* Left — Profile card (read-only) */}
          <div className="lg:col-span-1">
            <div className="h-full overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.07)]">
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

          {/* Right — overview + booking */}
          <div className="flex h-full flex-col gap-6 lg:col-span-2">
            {/* Booking panel — content depends on auth state */}
            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.07)]">
              {!authChecked ? (
                <div className="h-24 animate-pulse rounded-[1.5rem] bg-slate-50" />
              ) : bookingSuccess ? (
                <div className="flex flex-col items-center gap-3 py-4 text-center">
                  <div className="text-4xl">✅</div>
                  <h3 className="text-xl font-bold text-slate-950">Booking request sent!</h3>
                  <p className="max-w-sm text-sm text-slate-500">
                    {provider.full_name} will accept or decline it from their dashboard — you&apos;ll see
                    the status update in your bookings.
                  </p>
                  <Link
                    href="/customer/dashboard?tab=bookings"
                    className="mt-2 rounded-full bg-[#0aa39a] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#089283]"
                  >
                    View My Bookings
                  </Link>
                </div>
              ) : user?.role === "customer" ? (
                <>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-950">Book This Provider</h3>
                    {!showBookingForm && (
                      <button
                        onClick={() => setShowBookingForm(true)}
                        className="rounded-full bg-[#0aa39a] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#089283]"
                      >
                        Book Now
                      </button>
                    )}
                  </div>

                  {showBookingForm && (
                    <div className="mt-5 space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-800">
                          Service
                        </label>
                        <select
                          value={selectedServiceId}
                          onChange={(e) => setSelectedServiceId(e.target.value)}
                          className="mt-2 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-[#0aa39a] focus:outline-none focus:ring-2 focus:ring-[#0aa39a]/10"
                        >
                          {provider.services.map((s) => (
                            <option key={s.id} value={s.id}>
                              {serviceIcons[s.name] ?? "🛠️"} {s.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-800">
                          Preferred date
                        </label>
                        <div className="mt-2 relative">
                          <CalendarDays
                            size={16}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                          />
                          <input
                            type="date"
                            min={minDate}
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 pl-11 text-sm text-slate-900 focus:border-[#0aa39a] focus:outline-none focus:ring-2 focus:ring-[#0aa39a]/10"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-800">
                          Address / job details
                        </label>
                        <textarea
                          value={houseDetails}
                          onChange={(e) => setHouseDetails(e.target.value)}
                          rows={3}
                          placeholder="House/flat number, area, and a short note about the job..."
                          className="mt-2 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0aa39a] focus:outline-none focus:ring-2 focus:ring-[#0aa39a]/10"
                        />
                      </div>

                      {bookingError && (
                        <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
                          {bookingError}
                        </div>
                      )}

                      <div className="flex gap-3">
                        <button
                          onClick={() => setShowBookingForm(false)}
                          className="flex-1 rounded-full border border-slate-200 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={submitBooking}
                          disabled={bookingSubmitting}
                          className="flex-1 rounded-full bg-[#0aa39a] py-3 text-sm font-semibold text-white transition hover:bg-[#089283] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {bookingSubmitting ? "Sending..." : "Send Booking Request"}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : user?.role === "provider" ? (
                <div className="flex items-center gap-3 rounded-[1.5rem] bg-slate-50 p-5 text-sm text-slate-600">
                  <Lock size={18} className="shrink-0 text-slate-400" />
                  Provider accounts can&apos;t book other providers. Log in as a customer to book.
                </div>
              ) : (
                <div className="flex flex-col items-start gap-3 rounded-[1.5rem] bg-[#eaf7f6] p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <Lock size={18} className="shrink-0 text-[#0aa39a]" />
                    <p className="text-sm font-semibold text-slate-800">
                      Log in as a customer to book {provider.full_name}.
                    </p>
                  </div>
                  <Link
                    href={`/login?redirect=${encodeURIComponent(`/providers/${provider.provider_id}?book=1`)}`}
                    className="shrink-0 rounded-full bg-[#0aa39a] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#089283]"
                  >
                    Login to Book
                  </Link>
                </div>
              )}
            </div>

            {/* Profile overview */}
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

const ProviderDetailPage = () => (
  <Suspense fallback={null}>
    <ProviderDetailContent />
  </Suspense>
);

export default ProviderDetailPage;