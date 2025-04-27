
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useBankTransferHandler = () => {
  const navigate = useNavigate();
  const { setPaymentInfo, hasDomain, getTotalPrice } = useCart();

  const handleBankTransfer = async (orderId: string, orderReference: string) => {
    try {
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
          status: 'pending',
          payment_method: 'bank-transfer',
          payment_id: orderReference,
          reference: orderReference
        });
      
      if (orderError) {
        console.error('Error creating order:', orderError);
        toast.error('Erro ao criar pedido: ' + orderError.message);
        return;
      }
      
      setPaymentInfo({
        method: 'bank-transfer',
        status: 'pending',
        reference: orderReference,
        hasDomain: hasDomain()
      });
      
      toast.success('Instruções de transferência bancária serão enviadas por email');
      navigate('/payment/success');
    } catch (error) {
      console.error('Erro ao processar transferência:', error);
      toast.error('Erro ao registrar transferência. Por favor, tente novamente.');
    }
  };

  return {
    handleBankTransfer
  };
};
