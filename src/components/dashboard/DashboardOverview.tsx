
import React from 'react';
import { useCustomerStatistics } from '@/hooks/useCustomerStatistics';
import { StatisticsCards } from './statistics/StatisticsCards';
import { SpendingChart } from './statistics/SpendingChart';

export const DashboardOverview = () => {
  const { loading, serviceCounts, unpaidInvoices, spendingData } = useCustomerStatistics();
  
  const totalServices = serviceCounts.hosting + serviceCounts.domains + serviceCounts.email;

  return (
    <div className="grid gap-4">
      <StatisticsCards
        loading={loading}
        serviceCounts={serviceCounts}
        totalServices={totalServices}
        unpaidInvoices={unpaidInvoices}
      />
      <SpendingChart
        loading={loading}
        spendingData={spendingData}
      />
    </div>
  );
};
