
import React from 'react';
import { Loader2 } from 'lucide-react';

interface PaymentLoadingStateProps {
  message?: string;
}

const PaymentLoadingState = ({ message = "Carregando informações de pagamento..." }: PaymentLoadingStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white border rounded-lg shadow-sm">
      <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
      <p className="text-center text-gray-600">{message}</p>
      <p className="text-center text-sm text-gray-500 mt-2">Por favor, aguarde...</p>
    </div>
  );
};

export default PaymentLoadingState;
