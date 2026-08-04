import React from 'react';

const categoryItems = [
  { id: 'electrician', title: 'Electrician', icon: '⚡️' },
  { id: 'plumber', title: 'Plumber', icon: '🔧' },
  { id: 'painter', title: 'Painter', icon: '🎨' },
  { id: 'cleaner', title: 'Cleaner', icon: '🧹' },
  { id: 'mechanic', title: 'Mechanic', icon: '🔩' },
  { id: 'carpenter', title: 'Carpenter', icon: '🪚' },
  { id: 'home-tutor', title: 'Home Tutor', icon: '📘' },
  { id: 'ac-technician', title: 'AC Technician', icon: '❄️' },
];

const Categories: React.FC = () => {
  return (
    <section className="bg-white/30 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Every home service, one elegant place
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 sm:text-lg">
            Browse the categories our community books most — each backed by verified, reviewed professionals.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categoryItems.map((category) => (
            <a
              href="/services"
              key={category.id}
              className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-2 hover:border-sky-200 hover:shadow-[0_24px_70px_rgba(15,23,42,0.12)]"
            >
              <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-sky-500 text-2xl text-white shadow-lg shadow-blue-200/40">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{category.title}</h3>
              <p className="text-sm text-slate-500">Verified specialists</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
