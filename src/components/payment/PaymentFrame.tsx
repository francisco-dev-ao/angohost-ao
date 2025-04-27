
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, AlertCircle } from 'lucide-react';

interface PaymentFrameDialogProps {
  isOpen: boolean;
  onClose: () => void;
  frameUrl: string;
}

const PaymentFrameDialog = ({ isOpen, onClose, frameUrl }: PaymentFrameDialogProps) => {
  const [iframeError, setIframeError] = useState(false);
  
  // Função para lidar com erros do iframe
  const handleIframeError = () => {
    console.error('Erro ao carregar o iframe de pagamento');
    setIframeError(true);
  };
  
  // Função para tentar recarregar o iframe
  const handleRetryIframe = () => {
    setIframeError(false);
  };
  
  // Logging para debug
  React.useEffect(() => {
    if (isOpen && frameUrl) {
      console.log('Abrindo iframe de pagamento:', frameUrl);
    }
  }, [isOpen, frameUrl]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] h-[600px] max-h-[90vh]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Pagamento Multicaixa Express</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="overflow-hidden h-full">
          {iframeError ? (
            <div className="flex flex-col items-center justify-center h-full p-4 space-y-4">
              <AlertCircle className="h-12 w-12 text-red-500" />
              <p className="text-center text-lg">Não foi possível carregar o sistema de pagamento.</p>
              <Button onClick={handleRetryIframe}>Tentar novamente</Button>
              <Button variant="outline" onClick={onClose}>Voltar</Button>
            </div>
          ) : (
            frameUrl && (
              <iframe 
                src={frameUrl}
                className="w-full h-full"
                style={{ border: 'none', overflow: 'hidden' }}
                title="EMIS Payment"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                onError={handleIframeError}
                sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-top-navigation"
              />
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentFrameDialog;
