
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface PaymentFrameDialogProps {
  isOpen: boolean;
  onClose: () => void;
  frameUrl: string;
}

const PaymentFrameDialog = ({ isOpen, onClose, frameUrl }: PaymentFrameDialogProps) => {
  // Função para lidar com erros do iframe
  const handleIframeError = () => {
    console.error('Erro ao carregar o iframe de pagamento');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] h-[600px]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Pagamento Multicaixa Express</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="overflow-hidden h-full">
          {frameUrl && (
            <iframe 
              src={frameUrl}
              className="w-full h-full"
              style={{ border: 'none', overflow: 'hidden' }}
              title="EMIS Payment"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              onError={handleIframeError}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentFrameDialog;
