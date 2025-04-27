
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { usePaymentProcessing } from './checkout/usePaymentProcessing';
import { usePaymentHandlers } from './checkout/usePaymentHandlers';
import { useCheckoutValidation } from './checkout/useCheckoutValidation';

export const useCheckout = () => {
  const navigate = useNavigate();
  const { items, paymentInfo } = useCart();
  const { hasDomain, hasOnlyHostingWithoutDomain } = useCheckoutValidation();
  
  const {
    isLoading,
    showPaymentFrame,
    orderReference,
    paymentMethod,
    setPaymentMethod,
    setShowPaymentFrame
  } = usePaymentProcessing();
  
  const {
    handlePaymentSuccess,
    handlePaymentError,
    handleProcessPayment,
    handleCreateOrderWithoutPayment
  } = usePaymentHandlers();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      
      if (!session) {
        toast.error('É necessário fazer login para finalizar a compra');
        navigate('/carrinho');
        return;
      }
    };
    
    checkAuth();
    
    if (items.length === 0) {
      navigate('/carrinho');
      toast.error('Seu carrinho está vazio!');
    }
    
    if (paymentInfo?.status === 'completed') {
      navigate('/payment/success');
    }
  }, [items, navigate, paymentInfo]);

  return {
    isLoading,
    showPaymentFrame,
    orderReference,
    paymentMethod,
    setPaymentMethod,
    handlePaymentSuccess,
    handlePaymentError,
    handleProcessPayment,
    handleCreateOrderWithoutPayment,
    setShowPaymentFrame
  };
};
