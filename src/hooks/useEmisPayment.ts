
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { generateOrderReference, checkPhpAvailability, createEmisPayment, getEmisFrameUrl } from '@/services/EmisPaymentService';

interface UseEmisPaymentProps {
  amount: number;
  reference: string;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
}

export function useEmisPayment({ amount, reference, onSuccess, onError }: UseEmisPaymentProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [frameUrl, setFrameUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [useDirectPayment, setUseDirectPayment] = useState(false);

  const initializePayment = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      const phpAvailable = await checkPhpAvailability();
      console.log('PHP disponível:', phpAvailable);
      
      if (!phpAvailable) {
        toast.error("Serviço de pagamento indisponível. Tente mais tarde.");
        setErrorMessage("Serviço PHP necessário para processamento de pagamento não está disponível.");
        setIsLoading(false);
        return;
      }
      
      const orderRef = generateOrderReference(reference);
      console.log('Iniciando pagamento com referência:', orderRef);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const response = await createEmisPayment({
        reference: orderRef,
        amount,
        items: []
      });
      
      if (response.id) {
        const url = getEmisFrameUrl(response.id);
        console.log('URL do frame EMIS:', url);
        setFrameUrl(url);
        return url;
      } else {
        throw new Error(response.error || 'Falha ao gerar token de pagamento');
      }
    } catch (error) {
      console.error('Erro ao inicializar pagamento:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Erro ao iniciar pagamento');
      
      if (retryCount < 1) {
        toast.info('Tentando novamente conectar ao serviço de pagamento...');
        setRetryCount(prev => prev + 1);
        setTimeout(() => initializePayment(), 2000);
        return null;
      }
      
      setUseDirectPayment(true);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPayment = () => {
    setRetryCount(0);
    setUseDirectPayment(false);
    setErrorMessage(null);
  };

  return {
    isLoading,
    frameUrl,
    errorMessage,
    useDirectPayment,
    initializePayment,
    resetPayment
  };
}
