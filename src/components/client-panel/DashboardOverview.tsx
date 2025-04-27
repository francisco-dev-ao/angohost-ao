
import React from 'react';
import { QuickActions } from './dashboard/QuickActions';
import { ServicesSummary } from './dashboard/ServicesSummary';
import { DomainsSummary } from './dashboard/DomainsSummary';
import { InvoicesSummary } from './dashboard/InvoicesSummary';
import { TicketsSummary } from './dashboard/TicketsSummary';
import { AnnouncementsSummary } from './dashboard/AnnouncementsSummary';

interface DashboardOverviewProps {
  userData: any;
}

export const DashboardOverview = ({ userData }: DashboardOverviewProps) => {
  return (
    <div className="grid gap-6">
      <QuickActions />
      <ServicesSummary />
      <DomainsSummary />
      <InvoicesSummary unpaidInvoices={0} />
      <TicketsSummary />
      <AnnouncementsSummary />
    </div>
  );
};
