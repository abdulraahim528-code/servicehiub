"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Star,
  MapPin,
  Briefcase,
  CheckCircle2,
  Edit3,
  Camera,
  X,
  Save,
  Loader2,
  Bell,
  CalendarDays,
  Check,
  XCircle,
} from "lucide-react";

interface ProviderData {
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

type BookingStatus = "Pending" | "Accepted" | "Rejected" | "Completed";

interface ProviderBooking {
  id: number;
  customer_id: number;
  service_id: number;
  booking_date: string;
  house_details: string | null;
  status: BookingStatus;
  created_at: string;
  customer_name: string;
  customer_phone: string | null;
  service_name: string;
}

const bookingStatusStyles: Record<BookingStatus, string> = {
  Pending: "bg-amber-50 text-amber-700",
  Accepted: "bg-blue-50 text-blue-700",
  Completed: "bg-emerald-50 text-emerald-700",
  Rejected: "bg-red-50 text-red-700",
};

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

const ProviderDashboard = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [provider, setProvider] = useState<ProviderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);

  // Services state
  const [allServices, setAllServices] = useState<
    { id: number; name: string }[]
  >([]);
  const [addServiceId, setAddServiceId] = useState("");
  const [serviceBusy, setServiceBusy] = useState(false);
  const [serviceError, setServiceError] = useState("");

  // Edit form state
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editYears, setEditYears] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editPreview, setEditPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [saveError, setSaveError] = useState("");

  // Booking requests state
  const [bookings, setBookings] = useState<ProviderBooking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingActionId, setBookingActionId] = useState<number | null>(null);
  const [bookingActionError, setBookingActionError] = useState("");

  // Auth guard
  useEffect(() => {
    fetch("/api/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data?.success) {
          router.push("/login");
          return;
        }

        if (data.user.role !== "provider") {
          router.push("/customer/dashboard");
          return;
        }
      })
      .catch(() => router.push("/login"));
  }, [router]);

  const loadProvider = () => {
    fetch("/api/providers/dashboard")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success) {
          setProvider(data.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProvider();
  }, []);

  // Load this provider's incoming booking requests — shown so they can
  // accept or reject them right when they log in.
  const loadBookings = () => {
    return fetch("/api/bookings/provider")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setBookings(data?.data || []))
      .catch(console.error)
      .finally(() => setBookingsLoading(false));
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleBookingAction = async (bookingId: number, status: "Accepted" | "Rejected" | "Completed") => {
    setBookingActionId(bookingId);
    setBookingActionError("");
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setBookingActionError(data.message || "Couldn't update this booking.");
        return;
      }
      await loadBookings();
    } catch {
      setBookingActionError("Something went wrong. Please try again.");
    } finally {
      setBookingActionId(null);
    }
  };

  const pendingBookings = bookings.filter((b) => b.status === "Pending");
  const otherBookings = bookings.filter((b) => b.status !== "Pending");

  // Load all available services
  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => setAllServices(data.data || []))
      .catch(console.error);
  }, []);

  const openEdit = () => {
    if (!provider) return;

    setEditName(provider.full_name);
    setEditPhone(provider.phone ?? "");
    setEditCity(provider.city);
    setEditYears(String(provider.years_experience));
    setEditFile(null);
    setEditPreview(null);
    setSaveMsg("");
    setSaveError("");
    setEditOpen(true);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const f = e.target.files?.[0];

    if (!f) return;

    setEditFile(f);
    setEditPreview(URL.createObjectURL(f));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveMsg("");
    setSaveError("");

    try {
      const formData = new FormData();

      formData.append("name", editName);
      formData.append("phone", editPhone);
      formData.append("city", editCity);
      formData.append("years_experience", editYears);

      if (editFile) {
        formData.append("file", editFile);
      }

      const res = await fetch("/api/providers/dashboard", {
        method: "PATCH",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setSaveError(data.message || "Failed to save.");
      } else {
        setSaveMsg("Profile updated successfully!");
        loadProvider();

        setTimeout(() => {
          setEditOpen(false);
        }, 1200);
      }
    } catch {
      setSaveError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleAddService = async () => {
    if (!addServiceId) return;

    setServiceBusy(true);
    setServiceError("");

    try {
      const res = await fetch("/api/providers/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId: Number(addServiceId),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServiceError(data.message || "Failed to add service.");
      } else {
        setAddServiceId("");
        loadProvider();
      }
    } catch {
      setServiceError("Something went wrong. Please try again.");
    } finally {
      setServiceBusy(false);
    }
  };

  const handleRemoveService = async (serviceId: number) => {
    setServiceBusy(true);
    setServiceError("");

    try {
      const res = await fetch(
        `/api/providers/services/${serviceId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setServiceError(data.message || "Failed to remove service.");
      } else {
        loadProvider();
      }
    } catch {
      setServiceError("Something went wrong. Please try again.");
    } finally {
      setServiceBusy(false);
    }
  };

  if (loading || !provider) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8faf3]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0aa39a] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf3]">
      {/* Hero banner */}
      <div className="bg-gradient-to-br from-[#0aa39a] to-[#0a6d9a] px-6 py-14 text-white">
        <div className="container mx-auto flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
              Provider Dashboard
            </p>

            <h1 className="mt-1 text-4xl font-bold">
              {provider.full_name}
            </h1>

            <p className="mt-1 text-white/80">
              {provider.email}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {pendingBookings.length > 0 && (
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 text-sm font-semibold text-white">
                <Bell size={16} />
                {pendingBookings.length} new booking{pendingBookings.length !== 1 ? "s" : ""}
              </div>
            )}
            <button
              onClick={openEdit}
              className="inline-flex items-center gap-2 rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/25"
            >
              <Edit3 size={16} />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* ── Booking Requests — the "accept or reject when login" panel ── */}
        <div className="mb-8 rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.07)]">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-950">Booking Requests</h3>
            {pendingBookings.length > 0 && (
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                {pendingBookings.length} pending
              </span>
            )}
          </div>

          {bookingActionError && (
            <div className="mb-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {bookingActionError}
            </div>
          )}

          {bookingsLoading ? (
            <div className="flex justify-center py-10">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0aa39a] border-t-transparent" />
            </div>
          ) : bookings.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-[1.5rem] bg-slate-50 py-10 text-center">
              <div className="text-3xl">📭</div>
              <p className="text-sm font-semibold text-slate-600">No booking requests yet</p>
              <p className="text-xs text-slate-400">
                Requests from customers will show up here for you to accept or reject.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {[...pendingBookings, ...otherBookings].map((b) => (
                <div
                  key={b.id}
                  className="flex flex-col gap-4 rounded-[1.5rem] border border-slate-100 bg-slate-50/60 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-bold text-slate-950">{b.customer_name}</p>
                    <p className="text-sm text-slate-500">
                      {serviceIcons[b.service_name] ?? "🛠️"} {b.service_name}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                      <CalendarDays size={12} />
                      {new Date(b.booking_date).toLocaleDateString()}
                      {b.customer_phone ? ` · ${b.customer_phone}` : ""}
                    </p>
                    {b.house_details && (
                      <p className="mt-1 max-w-md text-xs text-slate-500">{b.house_details}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {b.status === "Pending" ? (
                      <>
                        <button
                          onClick={() => handleBookingAction(b.id, "Rejected")}
                          disabled={bookingActionId === b.id}
                          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white disabled:opacity-60"
                        >
                          <XCircle size={14} /> Reject
                        </button>
                        <button
                          onClick={() => handleBookingAction(b.id, "Accepted")}
                          disabled={bookingActionId === b.id}
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#0aa39a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#089283] disabled:opacity-60"
                        >
                          <Check size={14} /> Accept
                        </button>
                      </>
                    ) : b.status === "Accepted" ? (
                      <>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${bookingStatusStyles[b.status]}`}>
                          {b.status}
                        </span>
                        <button
                          onClick={() => handleBookingAction(b.id, "Completed")}
                          disabled={bookingActionId === b.id}
                          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-60"
                        >
                          Mark Completed
                        </button>
                      </>
                    ) : (
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${bookingStatusStyles[b.status]}`}>
                        {b.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left — Profile card */}
          <div className="lg:col-span-1">
            <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.07)]">
              {/* Profile picture */}
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
                    <CheckCircle2
                      size={12}
                      className="text-[#0aa39a]"
                    />
                    Verified Provider
                  </div>
                )}
              </div>

              <div className="space-y-4 p-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-950">
                    {provider.full_name}
                  </h2>

                  <p className="mt-0.5 text-sm text-slate-500">
                    {provider.email}
                  </p>

                  {provider.phone && (
                    <p className="text-sm text-slate-500">
                      {provider.phone}
                    </p>
                  )}
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

                    <p className="mt-1 text-xs text-slate-500">
                      Rating
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] bg-slate-50 p-4 text-center">
                    <p className="text-xl font-bold text-slate-900">
                      {provider.reviews_count}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Reviews
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] bg-slate-50 p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Briefcase
                        size={14}
                        className="text-slate-400"
                      />

                      <span className="text-xl font-bold text-slate-900">
                        {provider.years_experience}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-slate-500">
                      Years Exp.
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] bg-slate-50 p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <MapPin
                        size={14}
                        className="text-slate-400"
                      />

                      <span className="truncate text-sm font-bold text-slate-900">
                        {provider.city}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-slate-500">
                      City
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Info panels */}
          <div className="space-y-6 lg:col-span-2">
            {/* Your Profile Overview */}
            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.07)]">
              <h3 className="mb-5 text-xl font-bold text-slate-950">
                Your Profile Overview
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    label: "Full Name",
                    value: provider.full_name,
                  },
                  {
                    label: "Email",
                    value: provider.email,
                  },
                  {
                    label: "Phone",
                    value: provider.phone ?? "—",
                  },
                  {
                    label: "City",
                    value: provider.city,
                  },
                  {
                    label: "Services Offered",
                    value: provider.services
                      .map((s) => s.name)
                      .join(", "),
                  },
                  {
                    label: "Years of Experience",
                    value: `${provider.years_experience} years`,
                  },
                  {
                    label: "Rating",
                    value: `${Number(provider.rating).toFixed(1)} / 5.0`,
                  },
                  {
                    label: "Total Reviews",
                    value: String(provider.reviews_count),
                  },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-[1.5rem] bg-slate-50 px-5 py-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {label}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Manage Services */}
            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.07)]">
              <h3 className="mb-5 text-xl font-bold text-slate-950">
                Manage Your Services
              </h3>

              <div className="mb-5 flex flex-wrap gap-2">
                {provider.services.map((s) => (
                  <span
                    key={s.id}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800"
                  >
                    {serviceIcons[s.name] ?? "🛠️"} {s.name}

                    <button
                      onClick={() => handleRemoveService(s.id)}
                      disabled={
                        serviceBusy ||
                        provider.services.length <= 1
                      }
                      title={
                        provider.services.length <= 1
                          ? "You must keep at least one service"
                          : "Remove"
                      }
                      className="text-slate-400 transition hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <select
                  value={addServiceId}
                  onChange={(e) =>
                    setAddServiceId(e.target.value)
                  }
                  className="flex-1 rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-[#0aa39a] focus:outline-none focus:ring-2 focus:ring-[#0aa39a]/10"
                >
                  <option value="">
                    Add a service...
                  </option>

                  {allServices
                    .filter(
                      (s) =>
                        !provider.services.some(
                          (ps) => ps.id === s.id
                        )
                    )
                    .map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                </select>

                <button
                  onClick={handleAddService}
                  disabled={!addServiceId || serviceBusy}
                  className="rounded-full bg-[#0aa39a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#089283] disabled:opacity-60"
                >
                  {serviceBusy ? "Please wait..." : "Add"}
                </button>
              </div>

              {serviceError && (
                <div className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {serviceError}
                </div>
              )}
            </div>

            {/* Tips card */}
            <div className="rounded-[2.5rem] border border-[#0aa39a]/20 bg-[#eaf7f6] p-8">
              <h3 className="mb-3 text-lg font-bold text-[#0a6d5a]">
                💡 Tips to get more customers
              </h3>

              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  ✅ Keep your profile picture professional and up to date.
                </li>
                <li>
                  ✅ Make sure your city is accurate so nearby customers find you.
                </li>
                <li>
                  ✅ Providers with more years of experience listed get more clicks.
                </li>
                <li>
                  ✅ Ask satisfied customers to leave a review on your profile.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Edit Profile Modal ── */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-[2.5rem] bg-white shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-8 py-5">
              <h2 className="text-xl font-bold text-slate-950">
                Edit Profile
              </h2>

              <button
                onClick={() => setEditOpen(false)}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[70vh] space-y-5 overflow-y-auto px-8 py-6">
              {/* Profile picture upload */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-[#0aa39a]/20 bg-slate-100">
                  {editPreview || provider.profile_picture ? (
                    <Image
                      src={
                        editPreview ??
                        provider.profile_picture!
                      }
                      alt="Preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-slate-300">
                      {provider.full_name.charAt(0)}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <Camera size={14} />
                  Change Photo
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Fields */}
              {[
                {
                  label: "Full Name",
                  value: editName,
                  setter: setEditName,
                  type: "text",
                },
                {
                  label: "Phone",
                  value: editPhone,
                  setter: setEditPhone,
                  type: "tel",
                },
                {
                  label: "City",
                  value: editCity,
                  setter: setEditCity,
                  type: "text",
                },
                {
                  label: "Years of Experience",
                  value: editYears,
                  setter: setEditYears,
                  type: "number",
                },
              ].map(({ label, value, setter, type }) => (
                <div key={label}>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-800">
                    {label}
                  </label>

                  <input
                    type={type}
                    value={value}
                    onChange={(e) =>
                      setter(e.target.value)
                    }
                    className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-[#0aa39a] focus:outline-none focus:ring-2 focus:ring-[#0aa39a]/10"
                  />
                </div>
              ))}

              {saveMsg && (
                <div className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                  {saveMsg}
                </div>
              )}

              {saveError && (
                <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {saveError}
                </div>
              )}
            </div>

            {/* Modal footer */}
            <div className="flex gap-3 border-t border-slate-100 px-8 py-5">
              <button
                onClick={() => setEditOpen(false)}
                className="flex-1 rounded-full border border-slate-200 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#0aa39a] py-3 text-sm font-semibold text-white transition hover:bg-[#089283] disabled:opacity-60"
              >
                {saving ? (
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                ) : (
                  <Save size={16} />
                )}

                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderDashboard;