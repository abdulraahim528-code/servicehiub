import { notFound } from 'next/navigation';
import { providersData, Provider } from '@/data/providers';

interface ProviderDetailsPageProps {
  params: Promise<{ id: string }>;
}

const ProviderDetailsPage = async ({ params }: ProviderDetailsPageProps) => {
  const { id } = await params;
  const provider = providersData.find((item) => item.id === id);

  if (!provider) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <img
            src={provider.profileImage}
            alt={provider.name}
            className="h-96 w-full rounded-[1.5rem] object-cover"
          />
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
                {provider.profession}
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-950">
                {provider.name}
              </h1>
              <p className="text-sm text-slate-500">{provider.location}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.75rem] bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <div className="font-semibold text-slate-900">Experience</div>
                <div>{provider.experience}</div>
              </div>
              <div className="rounded-[1.75rem] bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <div className="font-semibold text-slate-900">Reviews</div>
                <div>{provider.reviews} reviews</div>
              </div>
            </div>

            <div className="rounded-[1.75rem] bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <div className="font-semibold text-slate-900">Hourly Rate</div>
              <div>${provider.price} / hour</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <h2 className="text-2xl font-semibold text-slate-950">About</h2>
            <p className="mt-4 text-slate-600 leading-7">{provider.about}</p>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <h2 className="text-2xl font-semibold text-slate-950">Work Experience</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 rounded-[1.75rem] bg-slate-50 px-4 py-4 text-sm text-slate-700">
                <div className="font-semibold text-slate-900">Years on platform</div>
                <div>{provider.experience}</div>
              </div>
              <div className="space-y-2 rounded-[1.75rem] bg-slate-50 px-4 py-4 text-sm text-slate-700">
                <div className="font-semibold text-slate-900">Rating</div>
                <div>{provider.rating.toFixed(1)} / 5</div>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <h2 className="text-2xl font-semibold text-slate-950">Skills</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {provider.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <h2 className="text-2xl font-semibold text-slate-950">Contact</h2>
            <div className="mt-4 space-y-3 text-slate-600">
              <p>
                <span className="font-semibold text-slate-900">Email:</span> {provider.email}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Phone:</span> {provider.phone}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Category:</span> {provider.category}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Nationality:</span> {provider.nationality}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetailsPage;