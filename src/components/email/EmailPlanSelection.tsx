
import React from 'react';
import { Card } from '@/components/ui/card';
import { emailPlans } from '@/data/emailPlans';
import { EmailPlan, PlanSelectionProps } from '@/types/email';

export const EmailPlanSelection: React.FC<PlanSelectionProps> = ({
  selectedPlan,
  onPlanSelect
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {emailPlans.map(plan => (
        <div 
          key={plan.id} 
          className={`pricing-card relative rounded-xl border ${plan.isPopular ? 'border-primary shadow-lg' : 'border-gray-200'} bg-white p-6 transition-all hover:border-primary hover:shadow-md cursor-pointer`}
          onClick={() => onPlanSelect(plan)}
        >
          {plan.isPopular && (
            <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg font-medium">
              Popular
            </span>
          )}

          <h3 className="text-xl font-semibold text-gray-900">{plan.title}</h3>
          
          <div className="mt-4 flex items-baseline text-gray-900">
            <span className="text-3xl font-extrabold tracking-tight">
              {plan.price.toLocaleString('pt-AO')} Kz
            </span>
            <span className="ml-1 text-xl font-semibold">/ano por conta</span>
          </div>
          
          {plan.renewalPrice !== plan.price && (
            <div className="mt-1 text-sm text-gray-500">
              Renovação: {plan.renewalPrice.toLocaleString('pt-AO')} Kz/ano por conta
            </div>
          )}
          
          <ul className="mt-6 space-y-4">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p className="ml-3 text-sm text-gray-700">{feature}</p>
              </li>
            ))}
          </ul>

          <Button className={`mt-8 w-full ${plan.isPopular ? 'bg-primary hover:bg-primary/90' : ''}`}>
            Selecionar Plano
          </Button>
        </div>
      ))}
    </div>
  );
};
