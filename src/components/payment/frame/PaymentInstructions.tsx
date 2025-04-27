
import React from 'react';
import { Info } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

const PaymentInstructions = () => {
  return (
    <div className="space-y-4">
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
  );
};

export default PaymentInstructions;
