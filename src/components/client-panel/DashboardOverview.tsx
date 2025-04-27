
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { QuickActions } from './dashboard/QuickActions';
import { ServicesSummary } from './dashboard/ServicesSummary';
import { DomainsSummary } from './dashboard/DomainsSummary';
import { InvoicesSummary } from './dashboard/InvoicesSummary';
import { TicketsSummary } from './dashboard/TicketsSummary';
import { AnnouncementsSummary } from './dashboard/AnnouncementsSummary';
import { DashboardOverviewProps } from './dashboard/types';

type ClientPanelContext = {
  userData: any;
  services: any[];
  domains: any[];
  invoices: any[];
};

export const DashboardOverview = () => {
  const { userData, services, domains, invoices } = useOutletContext<ClientPanelContext>();
  const unpaidInvoices = invoices.filter(inv => inv.status === 'unpaid' || inv.status === 'não pago').length;

  return (
    <div className="grid gap-6">
      <QuickActions />
      <ServicesSummary services={services} />
      <DomainsSummary domains={domains} />
      <InvoicesSummary unpaidInvoices={unpaidInvoices} />
      <TicketsSummary />
      <AnnouncementsSummary />
    </div>
  );
};
