
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { createEmisPayment, getEmisFrameUrl, generateOrderReference } from '@/services/EmisPaymentService';
import PaymentLoadingState from './payment/PaymentLoadingState';
import PaymentErrorState from './payment/PaymentErrorState';
import PaymentFrameDialog from './payment/PaymentFrame';

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
  const [isLoading, setIsLoading] = useState(true);
  const [frameUrl, setFrameUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [useDirectPayment, setUseDirectPayment] = useState(false);
  
  const initializePayment = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      const orderRef = generateOrderReference(reference);
      console.log('Iniciando pagamento com referência:', orderRef);
      
      const response = await createEmisPayment({
        reference: orderRef,
        amount,
        items: []
      });
      
      if (response.id) {
        const url = getEmisFrameUrl(response.id);
        setFrameUrl(url);
        setIsOpen(true);
        
        // Setup message listener for payment completion
        const handleMessage = (event: MessageEvent) => {
          const allowedOrigins = [
            'https://pagamentonline.emis.co.ao',
            window.location.origin,
            'https://www.mocky.io',
            'https://corsproxy.io',
            'https://api.allorigins.win'
          ];
          
          if (!allowedOrigins.includes(event.origin) && 
              !allowedOrigins.some(origin => event.origin.includes(origin.replace('https://', '')))) {
            console.warn('Rejected message from untrusted origin:', event.origin);
            return;
          }

          if (event.data?.status === "SUCCESS" || event.data?.status === "success") {
            onSuccess(event.data.transactionId || 'unknown');
            setIsOpen(false);
          }
        };
        
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
      } else {
        throw new Error(response.error || 'Falha ao gerar token de pagamento');
      }
    } catch (error) {
      console.error('Erro ao inicializar pagamento:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Erro ao iniciar pagamento');
      
      if (retryCount < 2) {
        toast.info('Tentando novamente conectar ao serviço de pagamento...');
        setRetryCount(prev => prev + 1);
        setTimeout(() => initializePayment(), 3000);
        return;
      }
      
      setUseDirectPayment(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializePayment();
  }, [amount, reference]);

  const handleClose = () => {
    setIsOpen(false);
    onError('Pagamento cancelado pelo usuário');
  };

  const handleRetry = () => {
    setRetryCount(0);
    setUseDirectPayment(false);
    initializePayment();
  };

  const handleDirectPayment = () => {
    toast.success('Simulando pagamento direto...');
    const callbackUrl = `${window.location.origin}/payment/callback?reference=${reference}`;
    setTimeout(() => {
      window.location.href = callbackUrl;
    }, 2000);
  };

  if (isLoading) {
    return <PaymentLoadingState />;
  }

  if (errorMessage || useDirectPayment) {
    return (
      <PaymentErrorState
        errorMessage={errorMessage || ''}
        onRetry={handleRetry}
        onDirectPayment={handleDirectPayment}
        onCancel={() => onError('Usuário cancelou após erro')}
        amount={amount}
        reference={reference}
      />
    );
  }

  return (
    <PaymentFrameDialog
      isOpen={isOpen}
      onClose={handleClose}
      frameUrl={frameUrl}
    />
  );
};

export default EmisPaymentFrame;
