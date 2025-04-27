
import React from 'react';
import { QuickActions } from './dashboard/QuickActions';
import { ServicesSummary } from './dashboard/ServicesSummary';
import { DomainsSummary } from './dashboard/DomainsSummary';
import { InvoicesSummary } from './dashboard/InvoicesSummary';
import { TicketsSummary } from './dashboard/TicketsSummary';
import { AnnouncementsSummary } from './dashboard/AnnouncementsSummary';
import { DashboardOverviewProps } from './dashboard/types';

export const DashboardOverview = ({ 
  userData,
  services = [],
  domains = [],
  invoices = []
}: DashboardOverviewProps) => {
  const unpaidInvoices = invoices.filter(inv => inv.status === 'unpaid').length;

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
