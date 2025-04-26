
import React from 'react';
import { EmailPlan } from '@/data/emailPlans';

interface EmailPlanPriceSummaryProps {
  selectedPlan: EmailPlan;
  emailAccounts: number;
  selectedPeriod: string;
  getDiscountedPrice: (basePrice: number, years: number) => number;
}

export const EmailPlanPriceSummary: React.FC<EmailPlanPriceSummaryProps> = ({
  selectedPlan,
  emailAccounts,
  selectedPeriod,
  getDiscountedPrice,
}) => {
  const years = parseInt(selectedPeriod);
  
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-between">
        <span className="font-medium">Plano selecionado:</span>
        <span>{selectedPlan.title}</span>
      </div>
      <div className="flex justify-between mt-1">
        <span className="font-medium">Contas:</span>
        <span>{emailAccounts}</span>
      </div>
      <div className="flex justify-between mt-1">
        <span className="font-medium">Período:</span>
        <span>{selectedPeriod} {years === 1 ? 'ano' : 'anos'}</span>
      </div>
      <div className="flex justify-between mt-1">
        <span className="font-medium">Preço por ano:</span>
        <span>{selectedPlan.price.toLocaleString('pt-AO')} Kz</span>
      </div>
      {years > 1 && (
        <div className="flex justify-between mt-1 text-green-600">
          <span className="font-medium">Desconto:</span>
          <span>{years === 2 ? '10%' : '20%'}</span>
        </div>
      )}
      <div className="flex justify-between mt-2 pt-2 border-t">
        <span className="font-medium">Total:</span>
        <span className="font-bold">
          {getDiscountedPrice(
            selectedPlan.price * emailAccounts,
            years
          ).toLocaleString('pt-AO')} Kz
        </span>
      </div>
    </div>
  );
};
