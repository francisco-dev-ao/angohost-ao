
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
  const [phpCheckComplete, setPhpCheckComplete] = useState(false);
  const maxRetries = 3;

  // Verifica a disponibilidade do PHP e reseta o status se necessário
  useEffect(() => {
    const checkPhp = async () => {
      try {
        const phpAvailable = await checkPhpAvailability();
        console.log('PHP disponível:', phpAvailable);
        
        if (!phpAvailable && !phpCheckComplete) {
          setErrorMessage("Serviço PHP necessário para processamento de pagamento não está disponível.");
          setUseDirectPayment(true);
        }
      } catch (error) {
        console.error('Erro ao verificar disponibilidade do PHP:', error);
      } finally {
        setPhpCheckComplete(true);
      }
    };
    
    checkPhp();
  }, [phpCheckComplete]);

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
        setUseDirectPayment(true);
        return;
      }
      
      const orderRef = generateOrderReference(reference);
      console.log('Iniciando pagamento com referência:', orderRef);
      
      // Adicionando um pequeno delay para garantir que a interface seja atualizada
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mostrando toast para informar que está tentando conectar
      toast.info('Conectando ao serviço de pagamento EMIS...');
      
      try {
        const response = await createEmisPayment({
          reference: orderRef,
          amount,
          items: []
        });
        
        if (response.id) {
          const url = getEmisFrameUrl(response.id);
          console.log('URL do frame EMIS:', url);
          setFrameUrl(url);
          toast.info('Serviço de pagamento conectado com sucesso!');
          return url;
        } else {
          throw new Error(response.error || 'Falha ao gerar token de pagamento');
        }
      } catch (error: any) {
        // Verificar se é um erro específico de PHP
        const errorMsg = error instanceof Error ? error.message : 'Erro ao iniciar pagamento';
        const isPhpError = typeof errorMsg === 'string' && 
          (errorMsg.toLowerCase().includes('php') || errorMsg.toLowerCase().includes('400'));
        
        console.error(`Erro ao inicializar pagamento (Tentativa ${retryCount + 1}/${maxRetries}):`, error);
        setErrorMessage(errorMsg);
        
        if (retryCount < maxRetries - 1) {
          const retryDelay = (retryCount + 1) * 1500; // Aumentar o tempo entre tentativas
          toast.info(`Tentativa ${retryCount + 1}/${maxRetries}: Reconectando ao serviço de pagamento...`);
          setRetryCount(prev => prev + 1);
          
          // Aguardar antes de tentar novamente
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          return initializePayment();
        }
        
        if (isPhpError) {
          toast.error('Não foi possível conectar ao serviço de pagamento após várias tentativas.');
          console.error('Erro de conexão com PHP após todas as tentativas:', errorMsg);
        }
        
        setUseDirectPayment(true);
        return null;
      }
    } catch (error) {
      console.error('Erro fatal ao inicializar pagamento:', error);
      const errorMsg = error instanceof Error ? error.message : 'Erro desconhecido ao iniciar pagamento';
      setErrorMessage(errorMsg);
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
    setFrameUrl('');
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
