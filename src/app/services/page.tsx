import React from 'react';

const services = [
    ['Electrician', 'Wiring, panel upgrades, lighting design and 24/7 emergency solutions.', 'From ₨2,800/hr', 'https://images.unsplash.com/photo-1519741499931-7c8e904ab4c6?auto=format&fit=crop&w=700&q=80'],
    ['Plumber', 'Leak repairs, drain clearing, water heaters and full bathroom installs.', 'From ₨2,900/hr', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=80'],
    ['Painter', 'Fresh interior and exterior painting with precise, clean finish work.', 'From ₨2,000/hr', 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80'],
    ['Cleaner', 'Deep cleans, move-in/out resets and recurring home housekeeping.', 'From ₨1,200/hr', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=80'],
    ['Mechanic', 'Mobile diagnostics, brakes, servicing and pre-purchase inspections.', 'From ₨2,800/hr', 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=700&q=80'],
    ['Carpenter', 'Bespoke furniture, wardrobes, modular kitchens and repairs.', 'From ₨2,400/hr', 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=700&q=80'],
    ['Home Tutor', 'Maths, science and language coaching at home or online.', 'From ₨1,500/hr', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=80'],
    ['AC Technician', 'Installation, gas refills, duct cleaning and same-day repairs.', 'From ₨3,000/hr', 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=700&q=80'],
];

const ServicesPage = () => {
    return (
        <div className="min-h-screen py-12 sm:py-16">
            <div className="container mx-auto px-4">
                <div className="mx-auto mb-10 max-w-2xl text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Premium home services, on your schedule</h1>
                    <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">Every category is staffed by verified specialists with predictable rates, real reviews and same-week availability.</p>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map(([title, description, price, image]) => (
                        <article key={title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_22px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                            <div className="relative"><img src={image} alt={title} className="h-36 w-full object-cover" /><span className="absolute left-3 top-3 rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-blue-600">Verified</span><span className="absolute right-3 top-3 rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-slate-700">{price}</span></div>
                            <div className="p-4"><h2 className="text-lg font-bold text-slate-900">{title}</h2><p className="mt-1 min-h-10 text-xs leading-5 text-slate-500">{description}</p><div className="mt-3 flex justify-end"><button className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-white">Find a pro →</button></div></div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;
