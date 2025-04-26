
import React from 'react';

interface PriceDisplayProps {
  price: number;
  period: string;
  renewalPrice?: number;
}

export const PriceDisplay = ({ price, period, renewalPrice }: PriceDisplayProps) => {
  return (
    <div>
      <div className="mt-4 flex items-baseline text-gray-900">
        <span className="text-3xl font-extrabold tracking-tight">
          {price.toLocaleString('pt-AO')} Kz
        </span>
        <span className="ml-1 text-xl font-semibold">{period}</span>
      </div>
      
      {renewalPrice && renewalPrice !== price && (
        <div className="mt-1 text-sm text-gray-500">
          Renovação: {renewalPrice.toLocaleString('pt-AO')} Kz/ano
        </div>
      )}
    </div>
  );
};
