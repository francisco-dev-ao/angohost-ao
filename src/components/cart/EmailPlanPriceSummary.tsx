
import React from 'react';

interface EmailPlanPriceSummaryProps {
  planName: string;
  basePrice: number;
  quantity: number;
  years: number;
  getDiscountedPrice: (basePrice: number, years: number) => number;
  showDomainDiscount?: boolean;
}

export const EmailPlanPriceSummary: React.FC<EmailPlanPriceSummaryProps> = ({
  planName,
  basePrice,
  quantity,
  years,
  getDiscountedPrice,
  showDomainDiscount
}) => {
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="font-medium">Plano selecionado:</span>
          <span>{planName}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Contas:</span>
          <span>{quantity}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Período:</span>
          <span>{years} {years === 1 ? 'ano' : 'anos'}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Preço por ano:</span>
          <span>{basePrice.toLocaleString('pt-AO')} Kz</span>
        </div>
        
        {years > 1 && (
          <div className="flex justify-between text-green-600">
            <span className="font-medium">Desconto:</span>
            <span>{years === 2 ? '10%' : '20%'}</span>
          </div>
        )}

        {showDomainDiscount && (
          <div className="flex justify-between text-green-600">
            <span className="font-medium">Domínio Grátis:</span>
            <span>-15.000 Kz</span>
          </div>
        )}
        
        <div className="flex justify-between pt-2 border-t mt-2">
          <span className="font-medium">Total:</span>
          <span className="font-bold text-lg">
            {getDiscountedPrice(
              basePrice * quantity,
              years
            ).toLocaleString('pt-AO')} Kz
          </span>
        </div>
      </div>
    </div>
  );
};

