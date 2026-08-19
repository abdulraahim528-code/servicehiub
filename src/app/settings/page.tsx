"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Phone, Lock, Save, Loader2, CheckCircle2 } from "lucide-react";

interface AuthUser {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: "customer" | "provider";
}

const SettingsPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Profile fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState("");
  const [profileError, setProfileError] = useState("");

  // Password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState("");
  const [pwError, setPwError] = useState("");

  // Auth guard
  useEffect(() => {
    fetch("/api/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data?.success) { router.push("/login"); return; }
        setUser(data.user);
        setName(data.user.name);
        setPhone(data.user.phone ?? "");
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleProfileSave = async () => {
    setProfileMsg("");
    setProfileError("");
    setProfileSaving(true);
    try {
      const res = await fetch("/api/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });
      const data = await res.json();
      if (!res.ok) setProfileError(data.message || "Failed to update.");
      else {
        setProfileMsg("Profile updated successfully!");
        setUser((u) => (u ? { ...u, name, phone } : u));
      }
    } catch {
      setProfileError("Something went wrong.");
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordSave = async () => {
    setPwMsg("");
    setPwError("");
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPwError("All password fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setPwError("New password must be at least 6 characters.");
      return;
    }
    setPwSaving(true);
    try {
      const res = await fetch("/api/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) setPwError(data.message || "Failed to change password.");
      else {
        setPwMsg("Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch {
      setPwError("Something went wrong.");
    } finally {
      setPwSaving(false);
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
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70">Account</p>
          <h1 className="mt-1 text-4xl font-bold">Settings</h1>
          <p className="mt-1 text-white/80">Manage your account information and security.</p>
        </div>
      </div>

      <div className="container mx-auto max-w-2xl px-4 py-10 space-y-8">
        {/* Account badge */}
        <div className="flex items-center gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0aa39a] text-xl font-bold text-white shadow-md">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-bold text-slate-950">{user.name}</p>
            <p className="text-sm text-slate-500">{user.email}</p>
            <span className="mt-1 inline-block rounded-full bg-[#eaf7f6] px-3 py-0.5 text-xs font-semibold capitalize text-[#0aa39a]">
              {user.role}
            </span>
          </div>
        </div>

        {/* ── Profile info section ── */}
        <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.07)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eaf7f6]">
              <User size={18} className="text-[#0aa39a]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-950">Personal Information</h2>
              <p className="text-xs text-slate-500">Update your name and phone number.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-[#0aa39a] focus:outline-none focus:ring-2 focus:ring-[#0aa39a]/10"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full rounded-[1.5rem] border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-400 cursor-not-allowed"
              />
              <p className="mt-1 text-xs text-slate-400 pl-1">Email cannot be changed.</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                <Phone size={13} className="inline mr-1" /> Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+92 300 0000000"
                className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-[#0aa39a] focus:outline-none focus:ring-2 focus:ring-[#0aa39a]/10"
              />
            </div>

            {profileMsg && (
              <div className="flex items-center gap-2 rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                <CheckCircle2 size={16} /> {profileMsg}
              </div>
            )}
            {profileError && (
              <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{profileError}</div>
            )}

            <button
              onClick={handleProfileSave}
              disabled={profileSaving}
              className="inline-flex items-center gap-2 rounded-full bg-[#0aa39a] px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#089283] disabled:opacity-60"
            >
              {profileSaving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              {profileSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* ── Password section ── */}
        <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.07)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50">
              <Lock size={18} className="text-amber-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-950">Change Password</h2>
              <p className="text-xs text-slate-500">Make sure to use a strong password.</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { label: "Current Password", value: currentPassword, setter: setCurrentPassword },
              { label: "New Password", value: newPassword, setter: setNewPassword },
              { label: "Confirm New Password", value: confirmPassword, setter: setConfirmPassword },
            ].map(({ label, value, setter }) => (
              <div key={label}>
                <label className="block text-sm font-semibold text-slate-800 mb-1.5">{label}</label>
                <input
                  type="password"
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-[#0aa39a] focus:outline-none focus:ring-2 focus:ring-[#0aa39a]/10"
                />
              </div>
            ))}

            {pwMsg && (
              <div className="flex items-center gap-2 rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                <CheckCircle2 size={16} /> {pwMsg}
              </div>
            )}
            {pwError && (
              <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{pwError}</div>
            )}

            <button
              onClick={handlePasswordSave}
              disabled={pwSaving}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-slate-700 disabled:opacity-60"
            >
              {pwSaving ? <Loader2 size={15} className="animate-spin" /> : <Lock size={15} />}
              {pwSaving ? "Changing..." : "Change Password"}
            </button>
          </div>
        </div>

        {/* Danger zone note */}
        <div className="rounded-[2rem] border border-slate-100 bg-white p-6 text-center text-sm text-slate-400">
          Need more help?{" "}
          <a href="/contact" className="font-semibold text-[#0aa39a] hover:text-[#089283]">
            Contact support →
          </a>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
