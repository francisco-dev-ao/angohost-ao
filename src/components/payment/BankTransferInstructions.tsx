
import React from 'react';
import { Info, Copy, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

interface BankTransferInstructionsProps {
  reference: string;
  amount: number;
}

const BankTransferInstructions = ({ reference, amount }: BankTransferInstructionsProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };
  
  const bankDetails = {
    bank: "Banco BIC",
    accountName: "AngoHost - Prestação de Serviços, Lda",
    accountNumber: "123456789012345",
    iban: "AO02000600000123456789012345",
  };

  return (
    <div className="space-y-4">
      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-blue-700">
          Por favor, complete o pagamento utilizando os dados bancários abaixo.
        </AlertDescription>
      </Alert>
      
      <div className="border rounded-md p-4 bg-gray-50">
        <div className="flex justify-between mb-1">
          <span className="text-gray-600">Valor a Pagar:</span>
          <span className="font-bold text-lg">{formatCurrency(amount)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Referência:</span>
          <div className="flex items-center">
            <span className="font-medium mr-2">{reference}</span>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-6 w-6" 
              onClick={() => copyToClipboard(reference, "Referência copiada!")}
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="border rounded-md p-4">
        <h3 className="font-medium mb-3">Dados Bancários</h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Banco:</span>
            <span className="font-medium">{bankDetails.bank}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Titular da Conta:</span>
            <span className="font-medium">{bankDetails.accountName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Número da Conta:</span>
            <div className="flex items-center">
              <span className="font-medium mr-2">{bankDetails.accountNumber}</span>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6" 
                onClick={() => copyToClipboard(bankDetails.accountNumber, "Número da conta copiado!")}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">IBAN:</span>
            <div className="flex items-center">
              <span className="font-medium mr-2">{bankDetails.iban}</span>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6" 
                onClick={() => copyToClipboard(bankDetails.iban, "IBAN copiado!")}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Alert variant="default" className="bg-amber-50 border-amber-200">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertTitle>Importante</AlertTitle>
        <AlertDescription>
          <p>Para que possamos processar seu pagamento rapidamente, inclua o código de referência <strong>{reference}</strong> no campo de descrição da transferência.</p>
          <ol className="list-decimal list-inside text-sm mt-2 space-y-1">
            <li>Realize a transferência para a conta indicada acima</li>
            <li>Inclua a referência na descrição da transferência</li>
            <li>Guarde o comprovante de transferência</li>
            <li>Seu serviço será ativado após a confirmação do pagamento</li>
          </ol>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default BankTransferInstructions;
