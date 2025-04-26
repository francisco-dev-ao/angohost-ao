
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { EmailPlan } from '@/data/emailPlans';

interface EmailPlanCardProps {
  plan: EmailPlan;
  isSelected: boolean;
  onSelect: () => void;
}

export const EmailPlanCard: React.FC<EmailPlanCardProps> = ({ 
  plan, 
  isSelected, 
  onSelect 
}) => {
  return (
    <div 
      className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
        isSelected ? 'border-orange-500 bg-orange-50' : 'hover:border-orange-300'
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold">{plan.title}</h3>
        {isSelected && (
          <div className="bg-orange-500 text-white rounded-full p-1">
            <CheckCircle className="h-4 w-4" />
          </div>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-2">{plan.storage} de armazenamento</p>
      <ul className="text-sm space-y-1 mb-3">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start">
            <CheckCircle className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
            {feature}
          </li>
        ))}
      </ul>
      <p className="font-medium text-orange-600">
        A partir de {plan.price.toLocaleString('pt-AO')} Kz/ano por conta
      </p>
    </div>
  );
};
