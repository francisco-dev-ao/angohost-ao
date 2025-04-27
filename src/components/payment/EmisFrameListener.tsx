
import { useEffect, useState } from 'react';

interface EmisFrameListenerProps {
  isOpen: boolean;
  frameUrl: string;
  responseId: string;
  onSuccess: (transactionId: string) => void;
}

const EmisFrameListener = ({
  isOpen,
  frameUrl,
  responseId,
  onSuccess
}: EmisFrameListenerProps) => {
  const [listenerId, setListenerId] = useState<number | null>(null);
  
  useEffect(() => {
    if (!isOpen || !frameUrl || !responseId) return;
    
    // Setup message listener for Emisystem callback
    const handleMessage = (event: MessageEvent) => {
      console.log('Payment message received:', event.data);
      
      try {
        // Check if the message is from our payment system
        if (typeof event.data === 'string' && event.data.includes('payment_status')) {
          const data = JSON.parse(event.data);
          
          if (data.payment_status === 'success' && data.transaction_id) {
            console.log('Payment successful:', data);
            onSuccess(data.transaction_id);
          }
        }
      } catch (error) {
        console.error('Error processing payment message:', error);
      }
    };
    
    // Add event listener
    window.addEventListener('message', handleMessage);
    
    // Also setup polling mechanism as fallback
    const pollerId = window.setInterval(() => {
      if (!isOpen) return;
      
      const checkStatus = async () => {
        try {
          const response = await fetch(`/api/payment/check-status?id=${responseId}`);
          const data = await response.json();
          
          if (data.status === 'completed' && data.transaction_id) {
            console.log('Payment completed via polling:', data);
            onSuccess(data.transaction_id);
          }
        } catch (error) {
          console.error('Error checking payment status:', error);
        }
      };
      
      checkStatus();
    }, 5000); // Check every 5 seconds
    
    setListenerId(pollerId);
    
    return () => {
      window.removeEventListener('message', handleMessage);
      if (pollerId) clearInterval(pollerId);
    };
  }, [isOpen, frameUrl, responseId, onSuccess]);
  
  return null; // This component doesn't render anything
};

export default EmisFrameListener;
