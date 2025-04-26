
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, X, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { createEmisPayment, getEmisFrameUrl, generateOrderReference } from '@/services/EmisPaymentService';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  
  const initializePayment = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      const orderRef = generateOrderReference(reference);
      console.log('Iniciando pagamento com referência:', orderRef);
      
      const response = await createEmisPayment({
        reference: orderRef,
        amount,
        items: []  // Add cart items if needed
      });
      
      if (response.id) {
        console.log('Token de pagamento gerado:', response.id);
        const url = getEmisFrameUrl(response.id);
        console.log('URL do iframe:', url);
        
        setFrameUrl(url);
        setIsOpen(true);
        
        // Setup message listener for payment completion
        const handleMessage = (event: MessageEvent) => {
          const allowedOrigins = [
            'https://pagamentonline.emis.co.ao',
            window.location.origin,
            'https://www.mocky.io'
          ];
          
          console.log('Mensagem recebida de origem:', event.origin);
          
          if (!allowedOrigins.includes(event.origin)) {
            console.warn('Rejected message from untrusted origin:', event.origin);
            return;
          }

          console.log('Dados da mensagem recebida:', event.data);
          
          if (event.data?.status === "SUCCESS" || event.data?.status === "success") {
            console.log('Pagamento concluído com sucesso:', event.data);
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
      
      // Se houver menos de 3 tentativas, tentar novamente
      if (retryCount < 2) {
        toast.info('Tentando novamente conectar ao serviço de pagamento...');
        setRetryCount(prev => prev + 1);
        setTimeout(() => initializePayment(), 3000);
        return;
      }
      
      onError(error instanceof Error ? error.message : 'Erro ao iniciar pagamento');
      toast.error('Falha ao iniciar o pagamento. Por favor, tente novamente ou escolha outro método de pagamento.');
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
    initializePayment();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] bg-white p-8 rounded-lg">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg">Preparando o sistema de pagamento...</p>
        <p className="text-sm text-gray-500 mt-2">Por favor, aguarde enquanto conectamos ao serviço.</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="min-h-[300px] bg-white p-8 rounded-lg">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Falha ao iniciar o pagamento</AlertTitle>
          <AlertDescription>
            {errorMessage}
          </AlertDescription>
        </Alert>
        
        <div className="flex flex-col items-center mt-6">
          <p className="text-gray-600 mb-4">
            Não foi possível conectar ao serviço de pagamento. Por favor, verifique sua conexão e tente novamente.
          </p>
          
          <Button onClick={handleRetry} className="mb-2">
            Tentar novamente
          </Button>
          
          <Button variant="outline" onClick={() => onError('Usuário cancelou após erro')}>
            Voltar e escolher outro método
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[900px] sm:max-h-[90vh] sm:h-[90vh]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Pagamento Multicaixa Express</DialogTitle>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden h-full">
          {frameUrl && (
            <iframe 
              src={frameUrl}
              className="w-full h-[calc(90vh-100px)]"
              style={{ border: 'none' }}
              title="EMIS Payment"
              allowFullScreen
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmisPaymentFrame;
