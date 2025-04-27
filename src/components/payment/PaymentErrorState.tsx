
import React from 'react';
import { AlertCircle, CreditCard, Inbox, PhoneIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

interface PaymentErrorStateProps {
  errorMessage: string;
  onRetry: () => void;
  onDirectPayment: () => void;
  onCancel: () => void;
  amount: number;
  reference: string;
}

const PaymentErrorState = ({
  errorMessage,
  onRetry,
  onDirectPayment,
  onCancel,
  amount,
  reference
}: PaymentErrorStateProps) => {
  // Determinar se é um erro de PHP específico
  const isPhpError = errorMessage.toLowerCase().includes('php') || 
                     errorMessage.toLowerCase().includes('400');
  
  // Formatar a mensagem de erro para ser mais amigável ao usuário
  const friendlyErrorMessage = isPhpError 
    ? 'O serviço de pagamento está temporariamente indisponível.' 
    : errorMessage;
    
  return (
    <div className="min-h-[300px] bg-white p-8 rounded-lg shadow-sm">
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Falha na conexão com o serviço Multicaixa Express</AlertTitle>
        <AlertDescription>
          {friendlyErrorMessage}
        </AlertDescription>
      </Alert>
      
      <div className="flex flex-col items-center mt-6">
        <p className="text-gray-600 mb-4">
          {isPhpError 
            ? 'Estamos com dificuldades técnicas para conectar ao serviço de pagamentos. Por favor, escolha uma das opções abaixo:' 
            : 'Detectamos dificuldades na comunicação com o serviço de pagamentos. Escolha uma das opções abaixo:'}
        </p>
        
        <div className="space-y-3 w-full">
          <Button 
            onClick={onRetry} 
            className="w-full flex items-center"
            variant="default"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Tentar novamente com Multicaixa Express
          </Button>
          
          <Button 
            onClick={onDirectPayment} 
            variant="secondary" 
            className="w-full"
          >
            Confirmar pagamento realizado
          </Button>
          
          <Button 
            variant="outline" 
            onClick={onCancel} 
            className="w-full"
          >
            Voltar e escolher outro método
          </Button>
        </div>
        
        <Separator className="my-6" />
        
        <div className="mt-2 text-sm space-y-4 bg-gray-50 p-4 rounded-lg w-full">
          <div className="flex items-start gap-2">
            <Inbox className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Alternativa de pagamento:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Envie o valor de {amount.toLocaleString('pt-AO')} Kz para o número 923456789</li>
                <li>Use a referência: <span className="font-mono bg-gray-100 px-1">{reference}</span></li>
                <li>Após transferir, clique em "Confirmar pagamento realizado"</li>
                <li>Aguarde a validação manual (até 24h em dias úteis)</li>
              </ol>
            </div>
          </div>
          
          {isPhpError && (
            <div className="flex items-start gap-2 mt-4">
              <PhoneIcon className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Precisa de ajuda?</p>
                <p>Entre em contato com nosso suporte pelo WhatsApp: <a href="https://wa.me/244923456789" className="text-blue-600 hover:underline">+244 923 456 789</a></p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentErrorState;
