
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
    <div className="space-y-4">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{errorMessage}</AlertDescription>
      </Alert>

      <div className="space-y-2">
        <Button onClick={onRetry} className="w-full">
          Tentar novamente
        </Button>
        <Button 
          onClick={onDirectPayment} 
          variant="outline" 
          className="w-full"
        >
          Continuar com pagamento manual
        </Button>
        <Button 
          onClick={onCancel} 
          variant="ghost" 
          className="w-full text-destructive hover:text-destructive"
        >
          Cancelar pagamento
        </Button>
      </div>
    </div>
  );
};

export default PaymentErrorState;
