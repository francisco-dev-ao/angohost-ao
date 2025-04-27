
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import PaymentLoadingState from './payment/PaymentLoadingState';
import PaymentErrorState from './payment/PaymentErrorState';
import PaymentFrameDialog from './payment/PaymentFrame';
import EmisFrameListener from './payment/EmisFrameListener';
import { useEmisPayment } from '@/hooks/useEmisPayment';

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
  const [isOpen, setIsOpen] = useState(false);
  
  const {
    isLoading,
    frameUrl,
    errorMessage,
    useDirectPayment,
    initializePayment,
    resetPayment
  } = useEmisPayment({
    amount,
    reference,
    onSuccess,
    onError
  });

  useEffect(() => {
    const startPayment = async () => {
      try {
        console.log('Inicializando pagamento...');
        await initializePayment();
      } catch (error) {
        console.error('Erro ao iniciar pagamento:', error);
      }
    };
    
    startPayment();
  }, []);

  useEffect(() => {
    // Abrir o modal de pagamento automaticamente quando o frameUrl estiver disponível
    if (frameUrl && !isOpen && !errorMessage) {
      setIsOpen(true);
    }
  }, [frameUrl]);

  const handleClose = () => {
    setIsOpen(false);
    onError('Pagamento cancelado pelo usuário');
  };

  const handleRetry = () => {
    toast.info('Tentando novamente conectar ao serviço de pagamento...');
    resetPayment();
    initializePayment();
  };

  const handleDirectPayment = () => {
    toast.success('Processando pagamento manual...');
    const simulatedTransactionId = `direct-${Date.now()}`;
    const callbackParams = new URLSearchParams({
      reference: reference,
      status: 'SUCCESS',
      transactionId: simulatedTransactionId
    });
    
    const callbackUrl = `${window.location.origin}/payment/callback?${callbackParams.toString()}`;
    setTimeout(() => {
      window.location.href = callbackUrl;
    }, 1500);
  };

  if (isLoading) {
    return <PaymentLoadingState message="Conectando ao serviço de pagamento..." />;
  }

  if (errorMessage || useDirectPayment) {
    return (
      <PaymentErrorState
        errorMessage={errorMessage || 'Não foi possível iniciar o pagamento EMIS automaticamente.'}
        onRetry={handleRetry}
        onDirectPayment={handleDirectPayment}
        onCancel={() => onError('Usuário cancelou após erro')}
        amount={amount}
        reference={reference}
      />
    );
  }

  return (
    <>
      <PaymentFrameDialog
        isOpen={isOpen}
        onClose={handleClose}
        frameUrl={frameUrl}
      />
      <EmisFrameListener
        isOpen={isOpen}
        onSuccess={onSuccess}
        frameUrl={frameUrl}
        responseId={frameUrl.split('token=')[1] || ''}
      />
    </>
  );
};

export default EmisPaymentFrame;
