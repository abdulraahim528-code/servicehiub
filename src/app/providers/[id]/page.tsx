import { notFound } from 'next/navigation';
import ProviderCard from '../../../components/providers/ProviderCard';
import { providersData } from '@/data/providers';

interface ProviderDetailsPageProps {
  params: { id: string };
}

const ProviderDetailsPage = ({ params }: ProviderDetailsPageProps) => {
  const provider = providersData.find((item) => item.id === params.id);

  if (!provider) {
    notFound();
  }

  return (
    <div className="p-4">
      <ProviderCard provider={provider} />
    </div>
  );
};

export default ProviderDetailsPage;