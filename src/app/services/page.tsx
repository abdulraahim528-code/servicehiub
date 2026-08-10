"use client";

import Image from 'next/image';
import React, { useState } from 'react';

interface Service {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
  rating: number;
  location: string;
}

const services: Service[] = [
  {
    id: 1,
    title: 'Electrician',
    description: 'Wiring, panel upgrades, lighting design and 24/7 emergency solutions.',
    price: 'From ₨2,800/hr',
    image: 'https://www.auto.edu/wp-content/uploads/2025/06/ati_blog_electrical-technician_hero-768x512.jpg',
    category: 'Electrician',
    rating: 4.9,
    location: 'Lahore',
  },
  {
    id: 2,
    title: 'Plumber',
    description: 'Leak repairs, drain clearing, water heaters and full bathroom installs.',
    price: 'From ₨2,900/hr',
    image: 'https://sc-cms-prod103-cdn-dsb5cvath4adbgd0.z01.azurefd.net/-/media/images/aerotek/business-insights/plumbing_career_social-jpg.jpg?h=627&iar=0&w=1200&rev=d535c3705c67442fb68fe4404fae26d1&hash=F08087B1995CDF5F18566FE16998FFB6',
    category: 'Plumber',
    rating: 4.8,
    location: 'Karachi',
  },
  {
    id: 3,
    title: 'Painter',
    description: 'Fresh interior and exterior painting with precise, clean finish work.',
    price: 'From ₨2,000/hr',
    image: 'https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/A724RBEN2AI6PHCTNILJX2YJKM.jpg',
    category: 'Painter',
    rating: 4.7,
    location: 'Islamabad',
  },
  {
    id: 4,
    title: 'Cleaner',
    description: 'Deep cleans, move-in/out resets and recurring home housekeeping.',
    price: 'From ₨1,200/hr',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=80',
    category: 'Cleaner',
    rating: 4.8,
    location: 'Peshawar',
  },
  {
    id: 5,
    title: 'Mechanic',
    description: 'Mobile diagnostics, brakes, servicing and pre-purchase inspections.',
    price: 'From ₨2,800/hr',
    image: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=700&q=80',
    category: 'Mechanic',
    rating: 4.6,
    location: 'Hyderabad',
  },
  {
    id: 6,
    title: 'Carpenter',
    description: 'Bespoke furniture, wardrobes, modular kitchens and repairs.',
    price: 'From ₨2,400/hr',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=700&q=80',
    category: 'Carpenter',
    rating: 4.7,
    location: 'Quetta',
  },
  {
    id: 7,
    title: 'Home Tutor',
    description: 'Maths, science and language coaching at home or online.',
    price: 'From ₨1,500/hr',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=80',
    category: 'Tutor',
    rating: 4.5,
    location: 'Faisalabad',
  },
  {
    id: 8,
    title: 'AC Technician',
    description: 'Installation, gas refills, duct cleaning and same-day repairs.',
    price: 'From ₨3,000/hr',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=700&q=80',
    category: 'AC Technician',
    rating: 4.8,
    location: 'Sialkot',
  },
];

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [houseDetails, setHouseDetails] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const openBookingModal = (service: Service) => {
    setSelectedService(service);
    setMessage('');
  };

  const closeBookingModal = () => {
    setSelectedService(null);
    setHouseDetails('');
    setVisitDate('');
    setVisitTime('');
    setMessage('');
  };

  const submitBooking = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedService) return;

    if (!houseDetails.trim() || !visitDate || !visitTime) {
      setMessage('Please provide house details, visit date and visit time.');
      return;
    }

    setSubmitting(true);
    setMessage('');

    try {
      const booking_date = `${visitDate}T${visitTime}:00`;
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_id: 1,
          service_id: selectedService.id,
          booking_date,
          status: 'Pending',
          house_details: houseDetails,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Unable to submit booking');

      setMessage('Booking requested successfully. You will receive confirmation soon.');
      setHouseDetails('');
      setVisitDate('');
      setVisitTime('');
    } catch (error: unknown) {
      setMessage(error instanceof Error ? error.message : 'Booking request failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Premium home services, on your schedule</h1>
          <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">Every category is staffed by verified specialists with predictable rates, real reviews and same-week availability.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article key={service.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_22px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="relative">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={700}
                  height={420}
                  className="h-36 w-full object-cover"
                  unoptimized
                />
                <span className="absolute left-3 top-3 rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-blue-600">Verified</span>
                <span className="absolute right-3 top-3 rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-slate-700">{service.price}</span>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-600">{service.category}</span>
                  <span className="text-sm font-semibold text-slate-700">{service.rating.toFixed(1)} ★</span>
                </div>
                <h2 className="mt-4 text-lg font-bold text-slate-900">{service.title}</h2>
                <p className="mt-2 min-h-10 text-xs leading-5 text-slate-500">{service.description}</p>
                <div className="mt-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Location</p>
                    <p className="text-sm font-semibold text-slate-900">{service.location}</p>
                  </div>
                  <button onClick={() => openBookingModal(service)} className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900">
                    Book Now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedService ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-3xl rounded-[2rem] bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Book {selectedService.title}</h2>
                <p className="mt-2 text-sm text-slate-600">Provide your house details and preferred visit time.</p>
              </div>
              <button type="button" onClick={closeBookingModal} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200">
                Close
              </button>
            </div>

            <form onSubmit={submitBooking} className="mt-8 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700">House details</label>
                <textarea
                  value={houseDetails}
                  onChange={(e) => setHouseDetails(e.target.value)}
                  placeholder="House number, street name, block, landmark..."
                  className="mt-3 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  rows={4}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-700">Visit date</label>
                  <input
                    type="date"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="mt-3 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700">Visit time</label>
                  <input
                    type="time"
                    value={visitTime}
                    onChange={(e) => setVisitTime(e.target.value)}
                    className="mt-3 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  />
                </div>
              </div>

              {message ? <p className="text-sm text-slate-700">{message}</p> : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button type="button" onClick={closeBookingModal} className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? 'Booking...' : 'Submit booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ServicesPage;
