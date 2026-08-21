"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, CheckCircle2, Briefcase, Search, CalendarDays, X } from "lucide-react";

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
  service_names: string; // comma-separated, e.g. "Electrician, Plumber"
}

interface Service {
  id: number;
  name: string;
  slug: string;
}

type BookingStatus = "Pending" | "Accepted" | "Rejected" | "Completed";

interface MyBooking {
  id: number;
  provider_id: number;
  service_id: number;
  booking_date: string;
  house_details: string | null;
  status: BookingStatus;
  created_at: string;
  provider_name: string;
  provider_picture: string | null;
  service_name: string;
  review_id: number | null;
  review_rating: number | null;
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

const statusStyles: Record<BookingStatus, string> = {
  Pending: "bg-amber-50 text-amber-700",
  Accepted: "bg-blue-50 text-blue-700",
  Completed: "bg-emerald-50 text-emerald-700",
  Rejected: "bg-red-50 text-red-700",
};

const CustomerDashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [providers, setProviders] = useState<ProviderApiRow[]>([]);
  const [bookings, setBookings] = useState<MyBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [tab, setTab] = useState<"browse" | "bookings">(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search).get("tab") === "bookings"
        ? "bookings"
        : "browse";
    }
    return "browse";
  });

  // Rating modal state
  const [ratingBooking, setRatingBooking] = useState<MyBooking | null>(null);
  const [ratingValue, setRatingValue] = useState(5);
  const [ratingComment, setRatingComment] = useState("");
  const [ratingSubmitting, setRatingSubmitting] = useState(false);
  const [ratingError, setRatingError] = useState<string | null>(null);

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

  const loadBookings = () => {
    return fetch("/api/bookings/mine")
      .then((r) => r.json())
      .then((data) => setBookings(data.data || []))
      .catch(console.error);
  };

  // Fetch services, providers, and bookings in parallel
  useEffect(() => {
    if (!user) return;
    Promise.all([
      fetch("/api/services").then((r) => r.json()),
      fetch("/api/providers").then((r) => r.json()),
      loadBookings(),
    ])
      .then(([svcData, provData]) => {
        setServices(svcData.data || []);
        setProviders(provData.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  // A provider can offer multiple services now (provider_services table),
  // so service_names is a comma-separated list — split it to check membership.
  const getServiceList = (p: ProviderApiRow) => p.service_names.split(", ");

  const filteredProviders = providers.filter((p) => {
    const matchesCategory =
      activeCategory === "All" || getServiceList(p).includes(activeCategory);
    const matchesSearch =
      search === "" ||
      p.full_name.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase()) ||
      p.service_names.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openRatingModal = (booking: MyBooking) => {
    setRatingBooking(booking);
    setRatingValue(5);
    setRatingComment("");
    setRatingError(null);
  };

  const submitRating = async () => {
    if (!ratingBooking) return;
    setRatingError(null);
    try {
      setRatingSubmitting(true);
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: ratingBooking.id,
          rating: ratingValue,
          comment: ratingComment,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setRatingError(data.message || "Couldn't submit your rating.");
        return;
      }
      setRatingBooking(null);
      await loadBookings();
    } catch {
      setRatingError("Something went wrong. Please try again.");
    } finally {
      setRatingSubmitting(false);
    }
  };

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
        {/* Tabs */}
        <div className="mb-8 inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
          <button
            onClick={() => setTab("browse")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              tab === "browse" ? "bg-[#0aa39a] text-white shadow-md" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            Browse Providers
          </button>
          <button
            onClick={() => setTab("bookings")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              tab === "bookings" ? "bg-[#0aa39a] text-white shadow-md" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            My Bookings
            {bookings.length > 0 && (
              <span className="ml-1.5 text-xs opacity-80">({bookings.length})</span>
            )}
          </button>
        </div>

        {tab === "browse" ? (
          <>
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
                        <Image
                          src={p.profile_picture}
                          alt={p.full_name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
                      {/* Category badges (a provider can offer more than one service) */}
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

                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/providers/${p.id}?book=1`}
                          className="rounded-full bg-[#0aa39a] py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#089283]"
                        >
                          Book Now
                        </Link>
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
          </>
        ) : (
          <>
            {/* My Bookings */}
            <h2 className="mb-5 text-2xl font-bold text-slate-900">My Bookings</h2>

            {bookings.length === 0 ? (
              <div className="flex flex-col items-center gap-3 rounded-[2rem] bg-white py-16 text-center shadow-sm">
                <div className="text-4xl">📅</div>
                <p className="text-lg font-semibold text-slate-700">No bookings yet</p>
                <p className="text-sm text-slate-500">
                  Browse providers and send your first booking request.
                </p>
                <button
                  onClick={() => setTab("browse")}
                  className="mt-2 rounded-full bg-[#0aa39a] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#089283]"
                >
                  Browse Providers
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-slate-100">
                        {b.provider_picture ? (
                          <Image
                            src={b.provider_picture}
                            alt={b.provider_name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xl font-bold text-slate-300">
                            {b.provider_name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <Link
                          href={`/providers/${b.provider_id}`}
                          className="font-bold text-slate-950 hover:text-[#0aa39a]"
                        >
                          {b.provider_name}
                        </Link>
                        <p className="text-sm text-slate-500">
                          {serviceIcons[b.service_name] ?? "🛠️"} {b.service_name}
                        </p>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                          <CalendarDays size={12} />
                          {new Date(b.booking_date).toLocaleDateString()}
                        </p>
                        {b.house_details && (
                          <p className="mt-1 max-w-sm text-xs text-slate-500">{b.house_details}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[b.status]}`}
                      >
                        {b.status}
                      </span>

                      {b.status === "Completed" && (
                        b.review_id ? (
                          <div className="flex items-center gap-0.5 text-amber-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                fill={i < (b.review_rating ?? 0) ? "currentColor" : "none"}
                              />
                            ))}
                          </div>
                        ) : (
                          <button
                            onClick={() => openRatingModal(b)}
                            className="rounded-full bg-[#0aa39a] px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-[#089283]"
                          >
                            Rate Provider
                          </button>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Rating modal */}
      {ratingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
          <div className="w-full max-w-sm rounded-[2rem] bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-950">Rate {ratingBooking.provider_name}</h3>
              <button
                onClick={() => setRatingBooking(null)}
                className="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex justify-center gap-1 py-2">
              {Array.from({ length: 5 }).map((_, i) => {
                const starValue = i + 1;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRatingValue(starValue)}
                    className="text-amber-500"
                  >
                    <Star size={32} fill={starValue <= ratingValue ? "currentColor" : "none"} />
                  </button>
                );
              })}
            </div>

            <textarea
              value={ratingComment}
              onChange={(e) => setRatingComment(e.target.value)}
              rows={3}
              placeholder="How did it go? (optional)"
              className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0aa39a] focus:outline-none focus:ring-2 focus:ring-[#0aa39a]/10"
            />

            {ratingError && (
              <div className="mt-3 rounded-2xl bg-red-50 px-4 py-2.5 text-sm text-red-600">
                {ratingError}
              </div>
            )}

            <button
              onClick={submitRating}
              disabled={ratingSubmitting}
              className="mt-4 w-full rounded-full bg-[#0aa39a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#089283] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {ratingSubmitting ? "Submitting…" : "Submit Rating"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;