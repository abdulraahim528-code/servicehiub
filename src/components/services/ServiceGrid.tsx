import React from 'react';
import ServiceCard from './ServiceCard';

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

interface ServiceGridProps {
  services: Service[];
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ services }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default ServiceGrid;