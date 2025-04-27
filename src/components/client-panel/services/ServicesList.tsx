
import React from 'react';
import { ServiceListHeader } from './list/ServiceListHeader';
import { ServiceListItem } from './list/ServiceListItem';
import { EmptyServicesList } from './list/EmptyServicesList';

interface Service {
  id: string;
  name: string;
  plan: string;
  status: string;
  domain?: string;
  expiryDate?: string;
}

interface ServicesListProps {
  services: Service[];
}

export const ServicesList = ({ services }: ServicesListProps) => {
  if (services.length === 0) {
    return <EmptyServicesList />;
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <ServiceListHeader />
      {services.map(service => (
        <ServiceListItem key={service.id} service={service} />
      ))}
    </div>
  );
};
