
import React from 'react';
import { Info } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import BankTransferInstructions from '../BankTransferInstructions';

interface PaymentInstructionsProps {
  reference?: string;
  amount?: number;
  paymentMethod?: string;
}

const PaymentInstructions = ({ reference = "REF12345", amount = 25000, paymentMethod = "emis" }: PaymentInstructionsProps) => {
  if (paymentMethod === 'bank-transfer') {
    return <BankTransferInstructions reference={reference} amount={amount} />;
  }
  
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
      
      {reference && amount && (
        <div className="mt-4 p-4 border rounded-md bg-gray-50">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Referência:</span>
            <span className="font-medium">{reference}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Valor:</span>
            <span className="font-bold">
              {new Intl.NumberFormat('pt-AO', { 
                style: 'currency', 
                currency: 'AOA',
                minimumFractionDigits: 0 
              }).format(amount)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentInstructions;
