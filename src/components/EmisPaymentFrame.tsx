
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, X } from 'lucide-react';
import { toast } from 'sonner';
import { createEmisPayment, getEmisFrameUrl, generateOrderReference } from '@/services/EmisPaymentService';

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
  
  useEffect(() => {
    const initializePayment = async () => {
      setIsLoading(true);
      try {
        const orderRef = generateOrderReference(reference);
        const response = await createEmisPayment({
          reference: orderRef,
          amount,
          items: []  // Add cart items if needed
        });
        
        if (response.id) {
          setFrameUrl(getEmisFrameUrl(response.id));
          setIsOpen(true);
          
          // Setup message listener for payment completion
          const handleMessage = (event: MessageEvent) => {
            const allowedOrigins = [
              'https://pagamentonline.emis.co.ao',
              window.location.origin
            ];
            
            if (!allowedOrigins.includes(event.origin)) {
              console.warn('Rejected message from untrusted origin:', event.origin);
              return;
            }
            
            if (event.data?.status === "SUCCESS") {
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
        onError(error instanceof Error ? error.message : 'Erro ao iniciar pagamento');
        toast.error('Falha ao iniciar o pagamento. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };
    
    initializePayment();
  }, [amount, reference, onSuccess, onError]);

  const handleClose = () => {
    setIsOpen(false);
    onError('Pagamento cancelado pelo usuário');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg">Preparando o sistema de pagamento...</p>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[900px] sm:h-[90vh]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Pagamento Multicaixa Express</DialogTitle>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          {frameUrl && (
            <iframe 
              src={frameUrl}
              className="w-full h-[calc(90vh-100px)]"
              style={{ border: 'none' }}
              title="EMIS Payment"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmisPaymentFrame;
