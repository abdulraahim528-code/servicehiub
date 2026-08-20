"use client";

import { useEffect, useState } from "react";

type User = { id: number; full_name: string; email: string; phone?: string | null };
type Booking = {
  id: number;
  service_title?: string;
  booking_date: string;
  status: string;
};

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [uRes, bRes] = await Promise.all([
          fetch("/api/users/me"),
          fetch("/api/users/me/bookings"),
        ]);

        if (uRes.ok) {
          const { user } = await uRes.json();
          setUser(user);
          setName(user.full_name || "");
          setPhone(user.phone || "");
        }

        if (bRes.ok) {
          const { bookings } = await bRes.json();
          setBookings(bookings || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/users/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: name, phone }),
      });
      if (res.ok) {
        const { user: updated } = await res.json();
        setUser(updated);
      } else {
        console.error("Failed to save profile");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Your Dashboard</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Profile</h2>
        {user ? (
          <form onSubmit={handleSave} className="space-y-3 max-w-md">
            <div>
              <label className="block text-sm font-medium text-slate-700">Full name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded border px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input value={user.email} disabled className="mt-1 w-full rounded border bg-slate-50 px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Phone</label>
              <input value={phone || ""} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded border px-3 py-2" />
            </div>
            <div>
              <button type="submit" disabled={saving} className="rounded bg-[#0aa39a] px-4 py-2 text-white">
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        ) : (
          <div>User not found.</div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Your Bookings ({bookings.length})</h2>
        {bookings.length === 0 ? (
          <div className="text-sm text-slate-500">You have no bookings yet.</div>
        ) : (
          <ul className="space-y-3">
            {bookings.map((b) => (
              <li key={b.id} className="rounded border p-3">
                <div className="font-semibold">{b.service_title || "Service"}</div>
                <div className="text-sm text-slate-600">{new Date(b.booking_date).toLocaleString()}</div>
                <div className="text-sm mt-1">Status: {b.status}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
