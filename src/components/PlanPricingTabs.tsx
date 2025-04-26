
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HostingPlansContent from './pricing/HostingPlansContent';
import EmailPlansContent from './pricing/EmailPlansContent';
import ServersPlansContent from './pricing/ServersPlansContent';

const PlanPricingTabs = () => {
  const [activeTab, setActiveTab] = useState("hosting");
  
  return (
    <div className="w-full">
      <Tabs defaultValue="hosting" onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="hosting">Hospedagem</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="servers">Servidores</TabsTrigger>
          </TabsList>
        </div>
        
        <HostingPlansContent />
        <EmailPlansContent />
        <ServersPlansContent />
      </Tabs>
    </div>
  );
};

export default PlanPricingTabs;
