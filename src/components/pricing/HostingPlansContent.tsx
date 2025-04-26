
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { HostingPlansHeader } from './hosting/HostingPlansHeader';
import { HostingPricingCards } from './hosting/HostingPricingCards';
import { HostingPlansComparison } from './hosting/HostingPlansComparison';

const HostingPlansContent = () => {
  return (
    <TabsContent value="hosting" className="w-full">
      <HostingPlansHeader />
      <HostingPricingCards />
      <HostingPlansComparison />
    </TabsContent>
  );
};

export default HostingPlansContent;
