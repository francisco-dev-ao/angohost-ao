
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useBalancePaymentHandler = () => {
  const navigate = useNavigate();
  const { setPaymentInfo, hasDomain } = useCart();

  const handleBalancePayment = async (orderId: string, orderReference: string) => {
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    
    if (!user) {
      toast.error('É necessário fazer login para finalizar a compra');
      navigate('/auth');
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
  };

  return {
    handleBalancePayment
  };
};
