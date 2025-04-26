
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { EmailPlansHeader } from './email/EmailPlansHeader';
import { EmailPricingCards } from './email/EmailPricingCards';
import { EmailPlansComparison } from './email/EmailPlansComparison';

const EmailPlansContent = () => {
  return (
    <TabsContent value="email" className="w-full">
      <EmailPlansHeader />
      <EmailPricingCards />
      <EmailPlansComparison />
    </TabsContent>
  );
};

export default EmailPlansContent;
