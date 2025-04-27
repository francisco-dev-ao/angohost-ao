
import React from 'react';
import { Button } from "@/components/ui/button";
import EmisPaymentFrame from '@/components/EmisPaymentFrame';
import { Loader2, Info } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

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
      
      <div className="mb-6 space-y-4">
        <Alert className="bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-700">
            O pagamento será processado através do Multicaixa Express. Siga as instruções abaixo.
          </AlertDescription>
        </Alert>
        
        <p className="text-gray-600">
          Para proceder ao pagamento com Multicaixa Express, siga estas instruções:
        </p>
        
        <ol className="list-decimal pl-5 space-y-2 text-gray-600">
          <li>Após iniciar o pagamento, escolha a opção Multicaixa Express</li>
          <li>Certifique-se que tenha o aplicativo Multicaixa Express instalado</li>
          <li>Insira o seu contacto associado ao Multicaixa Express</li>
          <li>Verifique o valor a ser cobrado e confirme a compra</li>
        </ol>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Valor total:</span>
          <span className="font-bold text-lg">{getTotalPrice().toLocaleString('pt-AO')} Kz</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Referência:</span>
          <span className="font-mono">{orderReference}</span>
        </div>
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
