import { notFound } from 'next/navigation';
import { servicesData } from '../../../data/services';
import ServiceCard from '../../../components/services/ServiceCard';

interface ServiceDetailPageProps {
    params: Promise<{ id: string }>;
}

const ServiceDetailPage = async ({ params }: ServiceDetailPageProps) => {
    const { id } = await params;
    const service = servicesData.find((service) => service.id.toString() === id);

    if (!service) {
        notFound();
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
            <p className="text-lg mb-4">{service.description}</p>
            <ServiceCard service={service} />
        </div>
    );
};

export default ServiceDetailPage;