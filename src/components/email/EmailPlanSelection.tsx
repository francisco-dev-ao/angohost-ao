
import React from 'react';
import { EmailPlan, PlanSelectionProps } from '@/types/email';
import { emailPlans } from '@/data/emailPlans';
import { EmailPlanCard } from './plans/EmailPlanCard';

export const EmailPlanSelection: React.FC<PlanSelectionProps> = ({
  selectedPlan,
  onPlanSelect
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {emailPlans.map(plan => (
        <EmailPlanCard 
          key={plan.id}
          plan={plan}
          onSelect={onPlanSelect}
        />
      ))}
    </div>
  );
};
