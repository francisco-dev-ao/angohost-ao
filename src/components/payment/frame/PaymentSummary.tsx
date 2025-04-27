
import React from 'react';

interface PaymentSummaryProps {
  totalPrice: number;
  orderReference: string;
}

const PaymentSummary = ({ totalPrice, orderReference }: PaymentSummaryProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-600">Valor total:</span>
        <span className="font-bold text-lg">{totalPrice.toLocaleString('pt-AO')} Kz</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Referência:</span>
        <span className="font-mono">{orderReference}</span>
      </div>
    </div>
  );
};

export default PaymentSummary;
