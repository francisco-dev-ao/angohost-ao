
import React, { useEffect, useState } from 'react';
import { getEmisPaymentToken, setupEmisMessageListener, simulatePaymentSuccess } from '@/services/EmisPaymentService';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmisPaymentFrameProps {
  amount: number;
  reference: string;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
}

const EmisPaymentFrame: React.FC<EmisPaymentFrameProps> = ({
  amount,
  reference,
  onSuccess,
  onError
}) => {
  const [paymentToken, setPaymentToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(true);

  useEffect(() => {
    // Setup the message listener for payment responses
    const removeListener = setupEmisMessageListener((transactionId) => {
      onSuccess(transactionId);
    });

    // Generate the payment token
    const fetchToken = async () => {
      setIsLoading(true);
      const callbackUrl = `${window.location.origin}/payment/callback`;
      
      const token = await getEmisPaymentToken({
        reference,
        amount,
        callbackUrl,
      });
      
      if (token) {
        setPaymentToken(token);
      } else {
        onError("Falha ao gerar token de pagamento");
      }
      
      setIsLoading(false);
    };
    
    fetchToken();
    
    // Cleanup listener when component unmounts
    return () => {
      removeListener();
    };
  }, [amount, reference, onSuccess, onError]);
  
  // Handle demo payment completion
  const handleDemoPayment = () => {
    simulatePaymentSuccess(onSuccess);
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg">Preparando o sistema de pagamento...</p>
      </div>
    );
  }
  
  if (!paymentToken) {
    return (
      <div className="text-center p-8 border border-red-200 rounded-lg bg-red-50">
        <h3 className="text-xl font-medium text-red-800 mb-2">
          Erro ao iniciar o pagamento
        </h3>
        <p className="text-gray-600 mb-4">
          Não foi possível conectar ao sistema de pagamento. Por favor, tente novamente mais tarde.
        </p>
        <button 
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          onClick={() => window.location.reload()}
        >
          Tentar novamente
        </button>
      </div>
    );
  }
  
  if (isDemo) {
    return (
      <div className="w-full border border-gray-200 rounded-lg p-8 bg-blue-50">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-primary mb-2">Modo de Demonstração</h3>
          <p className="text-gray-600 mb-6">
            Em ambiente de produção, aqui seria exibido o iframe de pagamento da EMIS. 
            Para fins de demonstração, você pode simular um pagamento bem-sucedido.
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Referência:</span>
              <span>{reference}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">Valor:</span>
              <span>{(amount/100).toFixed(2)} Kz</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Token:</span>
              <span className="text-gray-500">{paymentToken.substring(0, 16)}...</span>
            </div>
          </div>
          
          <Button 
            onClick={handleDemoPayment}
            className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
          >
            Simular Pagamento Bem-Sucedido
          </Button>
          
          <p className="text-sm text-gray-500 mt-4">
            Nota: Este é apenas um modo de demonstração. Em produção, 
            a integração real com a EMIS exige um backend para processar 
            as requisições de forma segura.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200">
      <iframe 
        src={`https://gpo.emis.co.ao/gpoportal/frame?token=${paymentToken}`} 
        style={{border: 'none', width: '100%', height: '650px'}} 
        title="EMIS Payment"
      />
    </div>
  );
};

export default EmisPaymentFrame;
