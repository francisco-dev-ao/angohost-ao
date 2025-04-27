
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface PaymentErrorStateProps {
  errorMessage: string;
  onRetry: () => void;
  onDirectPayment: () => void;
  onCancel: () => void;
  amount: number;
  reference: string;
}

const PaymentErrorState = ({
  errorMessage,
  onRetry,
  onDirectPayment,
  onCancel,
  amount,
  reference
}: PaymentErrorStateProps) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-red-200 shadow-sm">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="bg-red-100 p-3 rounded-full">
          <AlertCircle className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="mt-4 text-lg font-medium">Erro na conexão com o serviço de pagamento</h3>
        <p className="mt-2 text-sm text-gray-500 max-w-md">{errorMessage}</p>
      </div>
      
      <Alert variant="default" className="mb-6 bg-amber-50 border-amber-200">
        <AlertTitle className="text-amber-800">Alternativa de pagamento</AlertTitle>
        <AlertDescription className="text-amber-700">
          <p>Você pode tentar novamente ou prosseguir com um pagamento manual usando a referência abaixo:</p>
          <div className="mt-2 p-3 bg-gray-50 rounded-md font-mono text-center">
            {reference}
          </div>
          <div className="mt-1 text-center font-medium">
            {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(amount)}
          </div>
        </AlertDescription>
      </Alert>
      
      <div className="space-y-3">
        <Button variant="default" className="w-full" onClick={onRetry}>
          Tentar novamente
        </Button>
        <Button variant="outline" className="w-full" onClick={onDirectPayment}>
          Confirmar pagamento manual
        </Button>
        <Button variant="ghost" className="w-full" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default PaymentErrorState;
