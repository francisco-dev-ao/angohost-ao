
import React from 'react';
import { Button } from "@/components/ui/button";
import EmisPaymentFrame from '@/components/EmisPaymentFrame';
import { Loader2 } from 'lucide-react';

interface PaymentFrameProps {
  orderReference: string;
  getTotalPrice: () => number;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
  onBack: () => void;
}

export const PaymentFrame: React.FC<PaymentFrameProps> = ({
  orderReference,
  getTotalPrice,
  onSuccess,
  onError,
  onBack,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Pagamento Multicaixa Express</h2>
      <p className="mb-6 text-gray-600">
        Por favor, siga as instruções para concluir o pagamento. Você receberá um alerta no seu telemóvel para confirmar a transação.
      </p>
      <EmisPaymentFrame 
        amount={getTotalPrice() * 100}
        reference={orderReference}
        onSuccess={onSuccess}
        onError={onError}
      />
      <Button
        type="button"
        variant="outline"
        onClick={onBack}
        className="mt-4"
      >
        Voltar aos dados de pagamento
      </Button>
    </div>
  );
};
