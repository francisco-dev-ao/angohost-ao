
import React from 'react';
import { Loader2 } from 'lucide-react';

const PaymentLoadingState = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
      <span className="ml-2">Iniciando pagamento...</span>
    </div>
  );
};

export default PaymentLoadingState;
