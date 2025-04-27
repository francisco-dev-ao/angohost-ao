import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PaymentMethodSelector } from '@/components/checkout/PaymentMethodSelector';
import { PaymentMethod } from '@/types/payment';
import { useCart } from '@/context/CartContext';

interface CheckoutFormProps {
  paymentMethod: PaymentMethod | null;
  isLoading: boolean;
  onSelectPaymentMethod: (method: PaymentMethod) => void;
  onProcessPayment: () => void;
  onCreateOrderWithoutPayment: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  paymentMethod,
  isLoading,
  onSelectPaymentMethod,
  onProcessPayment,
  onCreateOrderWithoutPayment
}) => {
  const { customer } = useCart();
  const accountBalance = customer?.account_balance || 0;
  const totalPrice = useCart().getTotalPrice();
  const showAccountBalanceOption = accountBalance > 0;
  const canUseAccountBalance = accountBalance >= totalPrice;

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
        
        {showAccountBalanceOption && !canUseAccountBalance && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Saldo insuficiente</AlertTitle>
            <AlertDescription>
              Seu saldo atual de {accountBalance.toLocaleString('pt-AO')} Kz não é suficiente para o pagamento de {totalPrice.toLocaleString('pt-AO')} Kz.
            </AlertDescription>
          </Alert>
        )}
        
        <PaymentMethodSelector
          selected={paymentMethod}
          onSelect={(method) => onSelectPaymentMethod(method as PaymentMethod)}
          showAccountBalance={showAccountBalanceOption}
          accountBalance={accountBalance}
        />
        
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button
            onClick={onProcessPayment}
            disabled={!paymentMethod || isLoading || (paymentMethod === 'account_balance' && !canUseAccountBalance)}
            className="flex-1"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : 'Processar Pagamento'}
          </Button>
          
          <Button
            variant="outline"
            onClick={onCreateOrderWithoutPayment}
            disabled={isLoading}
            className="flex-1"
          >
            Criar Pedido sem Pagamento
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
