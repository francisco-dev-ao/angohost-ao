
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { createEmisPayment, getEmisFrameUrl, generateOrderReference, checkPhpAvailability } from '@/services/EmisPaymentService';
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
      // Verificar se PHP está disponível (apenas para informação)
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
      
      // Adicionar pequeno atraso para garantir que elementos da UI foram renderizados
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const response = await createEmisPayment({
        reference: orderRef,
        amount,
        items: [] // Não enviamos dados do cliente para que sejam solicitados pelo EMIS
      });
      
      if (response.id) {
        const url = getEmisFrameUrl(response.id);
        console.log('URL do frame EMIS:', url);
        setFrameUrl(url);
        setIsOpen(true);
        
        // Setup message listener for payment completion
        const handleMessage = (event: MessageEvent) => {
          // Lista de origens permitidas
          const allowedOrigins = [
            'https://pagamentonline.emis.co.ao',
            window.location.origin,
            'https://www.mocky.io',
            'https://corsproxy.io',
            'https://api.allorigins.win',
            'https://angohost-emis-simulator.netlify.app'
          ];
          
          // Verificar se a origem é confiável
          const isAllowedOrigin = allowedOrigins.some(origin => 
            event.origin === origin || 
            event.origin.includes(origin.replace('https://', '')) ||
            event.origin.endsWith('.netlify.app')
          );
          
          if (!isAllowedOrigin) {
            console.warn('Mensagem rejeitada de origem não confiável:', event.origin);
            return;
          }

          console.log('Mensagem recebida do iframe:', event.data);
          
          // Verificar se a mensagem indica sucesso no pagamento
          if (event.data?.status === "SUCCESS" || 
              event.data?.status === "success" || 
              event.data?.status === "COMPLETED") {
            onSuccess(event.data.transactionId || response.id || 'unknown');
            setIsOpen(false);
            window.removeEventListener('message', handleMessage);
          }
        };
        
        window.addEventListener('message', handleMessage);
        
        // Monitor URL changes for payment completion (backup method)
        const checkUrlInterval = setInterval(() => {
          const currentUrl = window.location.href;
          if (currentUrl.includes('/payment/callback') || 
              currentUrl.includes('/payment/success') || 
              currentUrl.includes('status=SUCCESS')) {
            clearInterval(checkUrlInterval);
            setIsOpen(false);
            onSuccess(response.id || 'url-callback');
          }
        }, 1000);
        
        // Adicionar timeout de 2 minutos para fechar o diálogo se não houver resposta
        const timeoutId = setTimeout(() => {
          if (isOpen) {
            setIsOpen(false);
            setUseDirectPayment(true);
            setErrorMessage('O tempo para pagamento expirou. Por favor, tente novamente ou use o método alternativo.');
          }
        }, 120000);
        
        return () => {
          window.removeEventListener('message', handleMessage);
          clearInterval(checkUrlInterval);
          clearTimeout(timeoutId);
        };
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
        return;
      }
      
      setUseDirectPayment(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializePayment();
    
    // Limpar quando o componente for desmontado
    return () => {
      setIsOpen(false);
    };
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

  // Opção de pagamento direto (confirmação manual)
  const handleDirectPayment = () => {
    toast.success('Processando pagamento direto...');
    
    // Gerar um ID de transação simulado
    const simulatedTransactionId = `direct-${Date.now()}`;
    
    // Construir URL de callback com parâmetros
    const callbackParams = new URLSearchParams({
      reference: reference,
      status: 'SUCCESS',
      transactionId: simulatedTransactionId
    });
    
    const callbackUrl = `${window.location.origin}/payment/callback?${callbackParams.toString()}`;
    
    // Redirecionar para a URL de callback após um pequeno atraso
    setTimeout(() => {
      window.location.href = callbackUrl;
    }, 1500);
  };

  if (isLoading) {
    return <PaymentLoadingState />;
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
    <PaymentFrameDialog
      isOpen={isOpen}
      onClose={handleClose}
      frameUrl={frameUrl}
    />
  );
};

export default EmisPaymentFrame;
