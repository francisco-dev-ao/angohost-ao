
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import EmisPaymentFrame from '@/components/EmisPaymentFrame';
import PaymentInstructions from '@/components/payment/frame/PaymentInstructions';
import PaymentSummary from '@/components/payment/frame/PaymentSummary';
import { toast } from 'sonner';

interface PaymentFrameProps {
  orderReference: string;
  getTotalPrice: () => number;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
  onBack: () => void;
  paymentMethod?: string;
}

export const PaymentFrame: React.FC<PaymentFrameProps> = ({
  orderReference,
  getTotalPrice,
  onSuccess,
  onError,
  onBack,
  paymentMethod = 'emis'
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleManualPaymentSuccess = () => {
    setIsProcessing(true);
    toast.success('Registrando seu pagamento...');
    
    setTimeout(() => {
      const simulatedTransactionId = `manual-${Date.now()}`;
      onSuccess(simulatedTransactionId);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="mr-2 h-5 w-5" />
          {paymentMethod === 'emis' 
            ? 'Pagamento Multicaixa Express' 
            : 'Transferência Bancária'}
        </CardTitle>
        <CardDescription>
          {paymentMethod === 'emis'
            ? 'Complete seu pagamento de forma segura'
            : 'Siga as instruções para realizar a transferência'}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="mb-6">
          <PaymentInstructions 
            reference={orderReference}
            amount={getTotalPrice()}
            paymentMethod={paymentMethod}
          />
        </div>
        
        <div className="mb-6">
          <PaymentSummary 
            totalPrice={getTotalPrice()} 
            orderReference={orderReference} 
          />
        </div>
        
        {paymentMethod === 'emis' ? (
          <EmisPaymentFrame 
            amount={getTotalPrice()}
            reference={orderReference}
            onSuccess={onSuccess}
            onError={onError}
          />
        ) : (
          <div className="space-y-4">
            <Button
              type="button"
              variant="default"
              className="w-full"
              onClick={handleManualPaymentSuccess}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processando...
                </>
              ) : (
                'Já realizei o pagamento'
              )}
            </Button>
            
            <p className="text-sm text-center text-muted-foreground">
              Clique apenas após realizar a transferência conforme as instruções acima.
            </p>
          </div>
        )}
        
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="mt-4 w-full"
          disabled={isProcessing}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar aos dados de pagamento
        </Button>
      </CardContent>
    </Card>
  );
};
