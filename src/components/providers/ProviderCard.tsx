import React from 'react';
import { CheckCircle2, Star, Clock3, MapPin, Phone, Mail } from 'lucide-react';

interface Provider {
  id: string;
  name: string;
  profession: string;
  category: string;
  age: number;
  reviews: number;
  experience: string;
  location: string;
  phone: string;
  email: string;
  rating: number;
  profileImage: string;
}

interface ProviderCardProps {
  provider: Provider;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  const {
    name,
    profession,
    category,
    age,
    reviews,
    experience,
    location,
    phone,
    email,
    rating,
    profileImage,
  } = provider;

  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_28px_100px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_32px_110px_rgba(15,23,42,0.12)]">
      <div className="relative overflow-hidden rounded-t-[2rem] bg-slate-100">
        <img src={profileImage} alt={name} className="h-64 w-full object-cover" />
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-sm font-semibold text-slate-700 shadow-md shadow-slate-200/60 backdrop-blur-sm">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          Verified
        </div>
        <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-sm font-semibold text-slate-700 shadow-md shadow-slate-200/60 backdrop-blur-sm">
          <Star className="h-4 w-4 text-amber-400" />
          {rating.toFixed(1)}
        </div>
      </div>
      <div className="space-y-5 p-6">
        <div>
          <h3 className="text-2xl font-semibold text-slate-900">{name}</h3>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{profession}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-sky-600 shadow-sm">
            {category}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 shadow-sm">
            Age {age}
          </span>
        </div>

        <div className="rounded-[1.5rem] bg-slate-50 p-4 text-sm text-slate-500 shadow-sm">
          {reviews} reviews
        </div>

        <div className="space-y-3 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-slate-400" />
            {experience}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-slate-400" />
            {location}
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-slate-400" />
            {phone}
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-slate-400" />
            {email}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <button className="rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
            Call
          </button>
          <button className="rounded-full border border-slate-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100">
            Chat
          </button>
          <button className="rounded-full border border-slate-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700 transition hover:bg-amber-100">
            Email
          </button>
        </div>

        <button className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50">
          View Profile →
        </button>
      </div>
    </div>
  );
};

export default ProviderCard;
