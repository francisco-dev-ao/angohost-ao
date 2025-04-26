
import React from 'react';
import { Tabs } from '@/components/ui/tabs';
import { TabsHeader } from './TabsHeader';
import HostingPlansContent from './HostingPlansContent';
import EmailPlansContent from './EmailPlansContent';
import ServersPlansContent from './ServersPlansContent';

const PlanPricingContainer = () => {
  return (
    <div className="w-full">
      <Tabs defaultValue="hosting" className="w-full">
        <TabsHeader />
        <HostingPlansContent />
        <EmailPlansContent />
        <ServersPlansContent />
      </Tabs>
    </div>
  );
};

export default PlanPricingContainer;
