
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { processPaymentCallback } from '@/services/PaymentService';
import { toast } from 'sonner';

const PaymentCallback = () => {
  const navigate = useNavigate();
  const { setPaymentInfo } = useCart();
  
  useEffect(() => {
    // Get parameters from URL
    const queryParams = new URLSearchParams(window.location.search);
    const status = queryParams.get('status');
    const transactionId = queryParams.get('transactionId');
    const reference = queryParams.get('reference');
    
    // Caso de urgência: Se não tivermos todos os parâmetros, mas temos pelo menos a referência
    // Assumimos que o pagamento foi bem-sucedido
    const hasEmergencyReference = !status && !transactionId && reference;
    
    if ((status && transactionId && reference) || hasEmergencyReference) {
      // Log callback data for debugging
      console.info('Payment callback received:', { 
        status: status || 'SUCCESS', 
        transactionId: transactionId || 'DIRECT-PAYMENT', 
        reference 
      });
      
      // Process the callback
      processPaymentCallback({
        status: status || 'SUCCESS',
        transactionId: transactionId || `DIRECT-${Date.now()}`,
        reference: reference || ''
      });
      
      // Em caso de emergência ou pagamento bem-sucedido
      if (hasEmergencyReference || status === 'SUCCESS') {
        // Update payment info in the context
        setPaymentInfo({
          method: 'emis',
          status: 'completed',
          transactionId: transactionId || `DIRECT-${Date.now()}`,
          reference: reference || ''
        });
        
        // Show success toast
        toast.success('Pagamento confirmado com sucesso!');
        
        // Redirect to the success page
        setTimeout(() => {
          navigate('/payment/success');
        }, 1500);
      } else {
        // Handle failed payment
        toast.error('O pagamento falhou ou foi cancelado.');
        navigate('/checkout?status=failed');
      }
    } else {
      // Invalid callback, redirect to home
      toast.error('Dados de pagamento inválidos.');
      navigate('/');
    }
  }, [navigate, setPaymentInfo]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center bg-white p-8 rounded-lg shadow-sm max-w-md w-full">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
        <h2 className="mt-4 text-xl font-semibold">Processando pagamento...</h2>
        <p className="mt-2 text-gray-600">Por favor, aguarde enquanto confirmamos seu pagamento.</p>
        <p className="mt-4 text-sm text-gray-500">Não feche esta página.</p>
      </div>
    </div>
  );
};

export default PaymentCallback;
