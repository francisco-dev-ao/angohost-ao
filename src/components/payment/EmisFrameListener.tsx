
import React, { useEffect } from 'react';

interface EmisFrameListenerProps {
  isOpen: boolean;
  onSuccess: (transactionId: string) => void;
  frameUrl: string;
  responseId: string;
}

const EmisFrameListener: React.FC<EmisFrameListenerProps> = ({
  isOpen,
  onSuccess,
  frameUrl,
  responseId
}) => {
  useEffect(() => {
    if (!isOpen || !frameUrl) return;

    const handleMessage = (event: MessageEvent) => {
      const allowedOrigins = [
        'https://pagamentonline.emis.co.ao',
        window.location.origin
      ];
      
      const isAllowedOrigin = allowedOrigins.some(origin => 
        event.origin === origin || 
        event.origin.includes(origin.replace('https://', ''))
      );
      
      if (!isAllowedOrigin) {
        console.warn('Mensagem rejeitada de origem não confiável:', event.origin);
        return;
      }

      console.log('Mensagem recebida do iframe:', event.data);
      
      if (event.data?.status === "SUCCESS" || 
          event.data?.status === "success" || 
          event.data?.status === "COMPLETED") {
        onSuccess(event.data.transactionId || responseId || 'unknown');
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [isOpen, frameUrl, onSuccess, responseId]);

  return null;
};

export default EmisFrameListener;
