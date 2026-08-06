import React from 'react';
const ServicesPage = async () => {

const res = await fetch("http://localhost:3000/api/services", {
  cache: "no-store",
});

const result = await res.json();
const services = result.data;

    return (
        <div className="min-h-screen py-12 sm:py-16">
            <div className="container mx-auto px-4">
                <div className="mx-auto mb-10 max-w-2xl text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Premium home services, on your schedule</h1>
                    <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">Every category is staffed by verified specialists with predictable rates, real reviews and same-week availability.</p>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((service: any) => (
                        <article key={service.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_22px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                            <div className="relative"><img src="https://via.placeholder.com/400" alt={service.title} className="h-36 w-full object-cover" /><span className="absolute left-3 top-3 rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-blue-600">Verified</span><span className="absolute right-3 top-3 rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-slate-700">{service.price}</span></div>
                            <div className="p-4"><h2 className="text-lg font-bold text-slate-900">{service.title}</h2><p className="mt-1 min-h-10 text-xs leading-5 text-slate-500">{service.description}</p><div className="mt-3 flex justify-end"><button className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-white">Find a pro →</button></div></div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;
