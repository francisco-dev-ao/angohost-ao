
import React from 'react';
import { Loader2 } from 'lucide-react';

const PaymentLoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] bg-white p-8 rounded-lg">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="text-lg">Preparando o sistema de pagamento...</p>
      <p className="text-sm text-gray-500 mt-2">Por favor, aguarde enquanto conectamos ao serviço.</p>
    </div>
  );
};

export default PaymentLoadingState;
