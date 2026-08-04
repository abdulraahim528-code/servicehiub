import Link from 'next/link';
import { ArrowRight, BadgeCheck, Eye, Heart, Rocket, Target } from 'lucide-react';

const team = [
  {
    name: 'Amara Osei',
    role: 'Co-founder & CEO',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=720&q=85',
  },
  {
    name: 'Vikram Rao',
    role: 'Co-founder & CTO',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=720&q=85',
  },
  {
    name: 'Julia Meyer',
    role: 'Head of Trust & Safety',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=720&q=85',
  },
  {
    name: 'Tom Alvarez',
    role: 'Head of Provider Success',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=720&q=85',
  },
];

const stats = [
  ['10,000+', 'Happy Customers'],
  ['500+', 'Verified Providers'],
  ['120+', 'Cities Served'],
  ['99%', 'Satisfaction Rate'],
];

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#afe3dc] bg-white/70 px-3 py-1 text-xs font-semibold text-[#07877f]">
    {children}
  </span>
);

export default function AboutPage() {
  return (
    <div className="overflow-hidden bg-[#f7faf9] text-[#163b3a]">
      <section className="bg-[linear-gradient(100deg,#edf8f5_0%,#f7fbfa_52%,#fff4dc_100%)] px-5 pb-14 pt-20 sm:pb-20 sm:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <Pill><Heart size={12} strokeWidth={2.2} /> About Us</Pill>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold leading-[1.06] tracking-tight text-[#173a39] sm:text-5xl">
            We make trusted help feel one tap away
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#52716e] sm:text-base">
            ServiceHub was built for the moments when something breaks and you need someone genuinely good — fast, fairly priced and verified.
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:py-16">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          <article className="rounded-[22px] border border-[#d7ebe6] bg-white p-6 shadow-[0_10px_18px_rgba(7,135,127,0.10)] sm:p-7">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0aa39a] to-[#20b6aa] text-white shadow-md shadow-[#afe3dc]"><Target size={18} /></div>
            <h2 className="mt-4 text-xl font-bold text-[#0b5f5b]">Our Mission</h2>
            <p className="mt-2 max-w-md text-sm leading-5 text-[#52716e]">Give every household instant access to skilled, background-checked professionals — with pricing you can see before you commit.</p>
          </article>
          <article className="rounded-[22px] border border-[#d7ebe6] bg-white p-6 shadow-[0_10px_18px_rgba(7,135,127,0.10)] sm:p-7">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0aa39a] to-[#20b6aa] text-white shadow-md shadow-[#afe3dc]"><Eye size={18} /></div>
            <h2 className="mt-4 text-xl font-bold text-[#0b5f5b]">Our Vision</h2>
            <p className="mt-2 max-w-md text-sm leading-5 text-[#52716e]">A world where local expertise is discoverable, respected and fairly paid, in every neighbourhood we serve.</p>
          </article>
        </div>
      </section>

      <section className="border-y border-[#dceeea] bg-[#eff8f5] px-5 py-14 sm:py-16">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-9">
          <div className="relative min-h-[275px] overflow-hidden rounded-[20px] shadow-[0_10px_18px_rgba(7,135,127,0.13)] sm:min-h-[335px]">
            <img className="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1100&q=85" alt="The ServiceHub team at work" />
          </div>
          <div>
            <Pill><Rocket size={12} strokeWidth={2.2} /> Our Story</Pill>
            <h2 className="mt-4 max-w-md text-3xl font-extrabold leading-[1.08] tracking-tight text-[#0b5f5b] sm:text-4xl">From a broken boiler to 500+ pros</h2>
            <p className="mt-3 text-sm leading-5 text-[#52716e]">In 2021 our founders spent three days calling strangers to fix a boiler in winter. Every quote was different, no one showed credentials, and nobody arrived on time.</p>
            <p className="mt-3 text-sm leading-5 text-[#52716e]">ServiceHub started as a spreadsheet of pros we&apos;d actually recommend to a friend. Today it is a verified marketplace across 120+ cities — but the bar is still the same: would we send this person to our own home?</p>
            <Link href="/providers" className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-[#e85d0c]">
              Meet our providers <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl rounded-[22px] border border-[#d7ebe6] bg-white px-5 py-5 shadow-[0_14px_28px_rgba(7,135,127,0.10)] sm:px-8 sm:py-6">
          <div className="grid grid-cols-2 gap-y-6 md:grid-cols-4">
            {stats.map(([value, label]) => <div key={label} className="text-center"><p className="text-2xl font-extrabold text-[#07877f] sm:text-3xl">{value}</p><p className="mt-1 text-xs text-[#52716e]">{label}</p></div>)}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 pt-1 sm:pb-24">
        <div className="mx-auto max-w-6xl text-center">
          <Pill><BadgeCheck size={12} strokeWidth={2.2} /> Our Team</Pill>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0b5f5b] sm:text-4xl">The people behind ServiceHub</h2>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <article key={member.name} className="overflow-hidden rounded-[18px] border border-[#d7ebe6] bg-white shadow-[0_8px_16px_rgba(7,135,127,0.10)]">
                <img src={member.image} alt={member.name} className="h-44 w-full object-cover" />
                <div className="px-4 py-4"><h3 className="text-sm font-bold text-[#0b5f5b]">{member.name}</h3><p className="mt-1 text-xs text-[#52716e]">{member.role}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
