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
      
      <div className="mb-6 space-y-4">
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
        className="mt-4"
      >
        Voltar aos dados de pagamento
      </Button>
    </div>
  );
};
