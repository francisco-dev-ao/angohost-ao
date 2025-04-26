
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
    <div className="min-h-[300px] bg-white p-8 rounded-lg">
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Falha ao conectar com o serviço de pagamento EMIS</AlertTitle>
        <AlertDescription>{errorMessage || 'Não foi possível estabelecer conexão com o serviço de pagamento.'}</AlertDescription>
      </Alert>
      
      <div className="flex flex-col items-center mt-6">
        <p className="text-gray-600 mb-4">
          Detectamos problemas de conexão com o serviço EMIS. Por favor, escolha uma das opções abaixo:
        </p>
        
        <div className="space-y-3 w-full">
          <Button onClick={onRetry} className="w-full">
            Tentar novamente com EMIS
          </Button>
          
          <Button onClick={onDirectPayment} variant="secondary" className="w-full">
            Pagamento Alternativo
          </Button>
          
          <Button variant="outline" onClick={onCancel} className="w-full">
            Voltar e escolher outro método
          </Button>
        </div>
        
        <div className="mt-6 text-sm text-gray-500">
          <p className="font-semibold mb-1">Instruções para pagamento alternativo:</p>
          <p>1. Envie o valor de {amount.toLocaleString('pt-AO')} Kz para a conta BFA: 1234567890</p>
          <p>2. Use a referência: {reference}</p>
          <p>3. Clique em "Pagamento Alternativo" após concluir a transferência</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentErrorState;
