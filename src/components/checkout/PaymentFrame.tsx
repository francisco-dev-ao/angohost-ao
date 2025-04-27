
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from 'lucide-react';
import { PaymentMethod } from '@/types/payment';

interface PaymentFrameProps {
  orderReference: string;
  getTotalPrice: () => number;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
  onBack: () => void;
  paymentMethod?: PaymentMethod;
}

export const PaymentFrame: React.FC<PaymentFrameProps> = ({
  orderReference,
  getTotalPrice,
  onSuccess,
  onError,
  onBack,
  paymentMethod
}) => {
  // In a real app, this would contain an iframe or form to process the payment through the payment gateway
  // For demonstration purposes, we'll just simulate a payment process
  
  const [loading, setLoading] = React.useState<boolean>(false);
  
  const handlePaymentSimulation = () => {
    setLoading(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setLoading(false);
      // Simulate successful payment - 90% success rate
      if (Math.random() < 0.9) {
        onSuccess(`trans-${Date.now()}`);
      } else {
        onError('Pagamento falhou por um erro simulado');
      }
    }, 2000);
  };
  
  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <Button variant="ghost" className="w-fit p-0 mb-2" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <CardTitle>Processamento de Pagamento</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-gray-50 border rounded-md p-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Referência:</span>
              <span>{orderReference}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Método:</span>
              <span>
                {paymentMethod === 'emis' ? 'EMIS (Multicaixa)' : 
                paymentMethod === 'bank-transfer' ? 'Transferência Bancária' :
                paymentMethod === 'credit-card' ? 'Cartão de Crédito' :
                'Desconhecido'}
              </span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-500">Valor:</span>
              <span className="font-bold">
                {new Intl.NumberFormat('pt-AO', {
                  style: 'currency',
                  currency: 'AOA',
                  minimumFractionDigits: 0
                }).format(getTotalPrice())}
              </span>
            </div>
          </div>
          
          <div className="rounded-md border p-6 text-center">
            <p className="mb-4">
              Este é um simulador de pagamento para fins de demonstração.
              Em um ambiente de produção, aqui seria exibido o formulário de pagamento real do EMIS ou outro provedor.
            </p>
            
            <Button 
              onClick={handlePaymentSimulation}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando...
                </>
              ) : (
                'Simular Pagamento'
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
