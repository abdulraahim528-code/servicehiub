"use client";

import React from 'react';

interface Service {
  id: number | string;
  image: string;
  category: string;
  title: string;
  description: string;
  price: string;
  rating: number;
  location: string;
}

interface ServiceCardProps {
  service: Service;
  onBook?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onBook,
}) => {
  const { image, category, title, description, price, rating, location } = service;
  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <img src={image} alt={title} className="h-64 w-full object-cover" />
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-600">{category}</span>
          <span className="text-sm font-semibold text-slate-700">{rating.toFixed(1)} ★</span>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>
          <p className="mt-3 text-slate-500">{description}</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-2xl font-bold text-slate-900">{price}</p>
            <p className="text-sm text-slate-500">per hour</p>
          </div>
          <span className="text-sm text-slate-500">{location}</span>
        </div>
        <button
          onClick={onBook ?? (() => {})}
          className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;