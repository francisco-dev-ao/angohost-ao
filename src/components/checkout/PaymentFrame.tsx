
import React from 'react';
import { Button } from "@/components/ui/button";
import EmisPaymentFrame from '@/components/EmisPaymentFrame';
import PaymentInstructions from '@/components/payment/frame/PaymentInstructions';
import PaymentSummary from '@/components/payment/frame/PaymentSummary';

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
      
      <div className="mb-6">
        <PaymentInstructions />
      </div>
      
      <div className="mb-6">
        <PaymentSummary 
          totalPrice={getTotalPrice()} 
          orderReference={orderReference} 
        />
      </div>
      
      <EmisPaymentFrame 
        amount={getTotalPrice()}
        reference={orderReference}
        onSuccess={onSuccess}
        onError={onError}
      />
      
      <Button
        type="button"
        variant="outline"
        onClick={onBack}
        className="mt-4 w-full"
      >
        Voltar aos dados de pagamento
      </Button>
    </div>
  );
};
