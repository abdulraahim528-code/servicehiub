import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Star } from 'lucide-react';

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
  price: string;
  about: string;
  skills: string[];
  profileImage: string;
}

interface ProviderCardProps {
  provider: Provider;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  const { name, profession, reviews, experience, location, rating, profileImage, id } = provider;

  return (
    <div className="group relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
      <div className="relative overflow-hidden rounded-t-[2rem]">
        <img src={profileImage} alt={name} className="h-72 w-full object-cover"/>
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm">
          <CheckCircle2 className="h-4 w-4 text-[#0aa39a]" />
          Verified
        </div>
        <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm">
          <Star className="h-4 w-4 text-amber-400" />
          {rating.toFixed(1)}
        </div>
      </div>

      <div className="space-y-5 p-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{profession}</p>
          <h3 className="text-2xl font-semibold text-slate-950">{name}</h3>
          <p className="text-sm text-slate-500">{location}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.75rem] bg-slate-50 px-4 py-3 text-sm text-slate-600">
            <div className="font-semibold text-slate-900">Experience</div>
            <div>{experience}</div>
          </div>
          <div className="rounded-[1.75rem] bg-slate-50 px-4 py-3 text-sm text-slate-600">
            <div className="font-semibold text-slate-900">Reviews</div>
            <div>{reviews} reviews</div>
          </div>
        </div>

        <Link
          href={`/providers/${id}`}
          className="inline-flex w-full items-center justify-center rounded-full bg-[#0aa39a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#089283]"
        >
          View profile
        </Link>
      </div>
    </div>
  );
};

export default ProviderCard;
