
import React from 'react';

interface PricingInfo {
  basePrice: number;
  discount: number;
  saving: number;
  annualPrice: number;
  totalPrice: number;
  selectedPeriod: string;
}

export const DomainPricingDisplay: React.FC<{ pricing: PricingInfo }> = ({ pricing }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg mt-4">
      <div className="flex justify-between items-center mb-2">
        <span>Preço base:</span>
        <span>{pricing.basePrice.toLocaleString('pt-AO')} Kz/ano</span>
      </div>
      {pricing.discount > 0 && (
        <>
          <div className="flex justify-between items-center mb-2">
            <span>Desconto:</span>
            <span className="text-green-600">-{(pricing.discount * 100).toFixed(0)}%</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span>Economia:</span>
            <span className="text-green-600">{pricing.saving.toLocaleString('pt-AO')} Kz</span>
          </div>
        </>
      )}
      <div className="flex justify-between items-center mb-2">
        <span>Preço médio anual:</span>
        <span>{Math.round(pricing.annualPrice).toLocaleString('pt-AO')} Kz/ano</span>
      </div>
      <div className="flex justify-between items-center border-t pt-2 mt-2">
        <span className="font-medium">
          Preço total para {pricing.selectedPeriod} {parseInt(pricing.selectedPeriod) === 1 ? 'ano' : 'anos'}:
        </span>
        <span className="font-bold text-lg">{Math.round(pricing.totalPrice).toLocaleString('pt-AO')} Kz</span>
      </div>
    </div>
  );
};
