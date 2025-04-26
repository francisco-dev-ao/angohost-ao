
import React from 'react';
import PricingCard from '@/components/PricingCard';
import { emailPlans } from '@/data/emailPlans';

export const EmailPricingCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {emailPlans.map((plan, index) => (
        <PricingCard
          key={plan.id}
          id={plan.id}
          type="email"
          title={plan.title}
          price={plan.price}
          features={plan.features}
          isPopular={index === 1}
        />
      ))}
    </div>
  );
};
