
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
      
      // Verificar saldo disponível
      const { data: customerData } = await supabase
        .from('customers')
        .select('account_balance')
        .eq('user_id', user.id)
        .single();
      
      if (!customerData || customerData.account_balance < getTotalPrice()) {
        toast.error('Saldo insuficiente para completar a compra');
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
