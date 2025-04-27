
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useBalancePaymentHandler = () => {
  const navigate = useNavigate();
  const { setPaymentInfo, hasDomain, getTotalPrice } = useCart();

  const handleBalancePayment = async (orderId: string, orderReference: string) => {
    try {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      
      if (!user) {
        toast.error('É necessário fazer login para finalizar a compra');
        navigate('/auth');
        return;
      }
      
      // Get the customer ID and account balance
      const { data: customerData } = await supabase
        .from('customers')
        .select('id, account_balance')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (!customerData) {
        toast.error('Perfil de cliente não encontrado');
        return;
      }
      
      if (!customerData.account_balance || customerData.account_balance < getTotalPrice()) {
        toast.error('Saldo insuficiente para completar a compra');
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
          payment_method: 'account_balance',
          payment_id: orderReference,
          reference: orderReference
        });
      
      if (orderError) {
        console.error('Error creating order:', orderError);
        toast.error('Erro ao criar pedido: ' + orderError.message);
        return;
      }
      
      setPaymentInfo({
        method: 'account_balance',
        status: 'pending',
        reference: orderReference,
        hasDomain: hasDomain()
      });
      
      toast.success('Pedido registrado com sucesso! Processando pagamento com saldo da conta.');
      navigate('/payment/success');
    } catch (error) {
      console.error('Erro ao processar pagamento com saldo:', error);
      toast.error('Erro ao processar pagamento. Por favor, tente novamente.');
    }
  };

  return {
    handleBalancePayment
  };
};
