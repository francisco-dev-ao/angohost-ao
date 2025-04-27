
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useEmisPaymentHandler = () => {
  const navigate = useNavigate();
  const { setPaymentInfo, hasDomain } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleEmisPayment = async (orderId: string, orderReference: string) => {
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    
    if (!user) {
      toast.error('É necessário fazer login para finalizar a compra');
      navigate('/auth');
      return;
    }

    setPaymentInfo({
      method: 'emis',
      status: 'pending',
      reference: orderReference,
      hasDomain: hasDomain
    });
  };

  return {
    handleEmisPayment,
    isLoading
  };
};
