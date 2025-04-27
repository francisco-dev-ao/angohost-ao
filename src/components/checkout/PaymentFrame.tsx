
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, AlertCircle } from 'lucide-react';
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="mr-2 h-5 w-5" />
          Pagamento Multicaixa Express
        </CardTitle>
        <CardDescription>
          Complete seu pagamento de forma segura
        </CardDescription>
      </CardHeader>
      
      <CardContent>
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
      </CardContent>
    </Card>
  );
};
