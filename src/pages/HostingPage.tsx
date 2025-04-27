
import React from 'react';
import { HostingHero } from '@/components/hosting/HostingHero';
import { HostingPlans } from '@/components/hosting/HostingPlans';
import { HostingFeatures } from '@/components/hosting/HostingFeatures';
import { HostingFAQ } from '@/components/hosting/HostingFAQ';
import { HostingCTA } from '@/components/hosting/HostingCTA';

const HostingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HostingHero />
      <HostingPlans />
      <HostingFeatures />
      <HostingFAQ />
      <HostingCTA />
    </div>
  );
};

export default HostingPage;
