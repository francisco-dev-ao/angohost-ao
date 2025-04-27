
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useEmisPaymentHandler = () => {
  const navigate = useNavigate();
  const { setPaymentInfo, hasDomain, getTotalPrice } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleEmisPayment = async (orderId: string, orderReference: string) => {
    try {
      setIsLoading(true);
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      
      if (!user) {
        toast.error('É necessário fazer login para finalizar a compra');
        navigate('/auth');
        return;
      }
      
      // Get the customer ID
      const { data: customerData } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (!customerData) {
        toast.error('Perfil de cliente não encontrado');
        return;
      }
      
      // Create the order
      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          id: orderId,
          customer_id: customerData.id,
          total_amount: getTotalPrice(),
          status: 'processing',
          payment_method: 'emis',
          payment_id: orderReference,
          reference: orderReference
        });
      
      if (orderError) {
        console.error('Error creating order:', orderError);
        toast.error('Erro ao criar pedido: ' + orderError.message);
        return;
      }

      setPaymentInfo({
        method: 'emis',
        status: 'pending',
        reference: orderReference,
        hasDomain: hasDomain()
      });

      toast.success('Redirecionando para o pagamento via EMIS...');
      navigate('/payment/success');
    } catch (error) {
      console.error('Erro ao processar pagamento EMIS:', error);
      toast.error('Erro ao processar pagamento. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleEmisPayment,
    isLoading
  };
};
