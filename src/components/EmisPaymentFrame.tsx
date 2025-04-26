
import React, { useEffect, useState } from 'react';
import { getEmisPaymentToken, setupEmisMessageListener } from '@/services/EmisPaymentService';
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
  const [iframeUrl, setIframeUrl] = useState('');

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
        setIframeUrl(`/payment-frame?token=${token}`);
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
        <Button 
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          onClick={() => window.location.reload()}
        >
          Tentar novamente
        </Button>
      </div>
    );
  }
  
  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200">
      <iframe 
        src={iframeUrl} 
        style={{border: 'none', width: '100%', height: '650px'}} 
        title="EMIS Payment"
      />
    </div>
  );
};

export default EmisPaymentFrame;
