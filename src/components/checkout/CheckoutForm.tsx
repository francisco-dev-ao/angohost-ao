
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PaymentMethodSelector } from '@/components/checkout/PaymentMethodSelector';
import { PaymentMethod } from '@/types/payment';

interface CheckoutFormProps {
  paymentMethod: PaymentMethod | null;
  isLoading: boolean;
  onSelectPaymentMethod: (method: PaymentMethod) => void;
  onProcessPayment: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  paymentMethod,
  isLoading,
  onSelectPaymentMethod,
  onProcessPayment,
}) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-white">
        <CardTitle className="text-xl flex items-center">
          <CreditCard className="mr-2 h-5 w-5" />
          Selecione o Método de Pagamento
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Alert variant="default" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Detalhes de faturação</AlertTitle>
          <AlertDescription>
            Os dados de faturação serão obtidos do perfil da sua conta.
          </AlertDescription>
        </Alert>
        
        <PaymentMethodSelector
          selected={paymentMethod}
          onSelect={(method) => onSelectPaymentMethod(method as PaymentMethod)}
        />
        
        <div className="mt-8 flex justify-end">
          <Button
            onClick={onProcessPayment}
            disabled={!paymentMethod || isLoading}
            className="w-full md:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : 'Processar Pagamento'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
