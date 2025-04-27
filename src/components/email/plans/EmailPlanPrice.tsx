
import React from 'react';

interface EmailPlanPriceProps {
  price: number;
  renewalPrice: number;
}

export const EmailPlanPrice: React.FC<EmailPlanPriceProps> = ({ price, renewalPrice }) => {
  return (
    <div>
      <div className="mt-4 flex items-baseline text-gray-900">
        <span className="text-3xl font-extrabold tracking-tight">
          {price.toLocaleString('pt-AO')} Kz
        </span>
        <span className="ml-1 text-xl font-semibold">/ano por conta</span>
      </div>
      
      {renewalPrice !== price && (
        <div className="mt-1 text-sm text-gray-500">
          Renovação: {renewalPrice.toLocaleString('pt-AO')} Kz/ano por conta
        </div>
      )}
    </div>
  );
};
