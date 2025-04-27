
import React from 'react';
import { Button } from "@/components/ui/button";
import { EmailPlan } from '@/types/email';
import { EmailPlanHeader } from './EmailPlanHeader';
import { EmailPlanPrice } from './EmailPlanPrice';
import { EmailPlanFeatures } from './EmailPlanFeatures';

interface EmailPlanCardProps {
  plan: EmailPlan;
  onSelect: (plan: EmailPlan) => void;
}

export const EmailPlanCard: React.FC<EmailPlanCardProps> = ({ plan, onSelect }) => {
  return (
    <div 
      className={`pricing-card relative rounded-xl border ${
        plan.isPopular ? 'border-primary shadow-lg' : 'border-gray-200'
      } bg-white p-6 transition-all hover:border-primary hover:shadow-md cursor-pointer`}
    >
      <EmailPlanHeader title={plan.title} isPopular={plan.isPopular || false} />
      <EmailPlanPrice price={plan.price} renewalPrice={plan.renewalPrice} />
      <EmailPlanFeatures features={plan.features} />
      
      <Button 
        className={`mt-8 w-full ${plan.isPopular ? 'bg-primary hover:bg-primary/90' : ''}`}
        onClick={() => onSelect(plan)}
      >
        Selecionar Plano
      </Button>
    </div>
  );
};
