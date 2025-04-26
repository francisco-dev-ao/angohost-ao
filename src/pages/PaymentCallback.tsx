
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { processPaymentCallback } from '@/services/PaymentService';

const PaymentCallback = () => {
  const navigate = useNavigate();
  const { setPaymentInfo } = useCart();
  
  useEffect(() => {
    // Get parameters from URL
    const queryParams = new URLSearchParams(window.location.search);
    const status = queryParams.get('status');
    const transactionId = queryParams.get('transactionId');
    const reference = queryParams.get('reference');
    
    if (status && transactionId && reference) {
      // Process the callback
      processPaymentCallback({
        status,
        transactionId,
        reference
      });
      
      if (status === 'SUCCESS') {
        // Update payment info in the context
        setPaymentInfo({
          method: 'emis',
          status: 'completed',
          transactionId,
          reference
        });
        
        // Redirect to the success page
        setTimeout(() => {
          navigate('/payment/success');
        }, 1500);
      } else {
        // Handle failed payment
        navigate('/checkout?status=failed');
      }
    } else {
      // Invalid callback, redirect to home
      navigate('/');
    }
  }, [navigate, setPaymentInfo]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
        <h2 className="mt-4 text-xl font-semibold">Processando pagamento...</h2>
        <p className="mt-2 text-gray-600">Por favor, aguarde enquanto confirmamos seu pagamento.</p>
      </div>
    </div>
  );
};

export default PaymentCallback;
