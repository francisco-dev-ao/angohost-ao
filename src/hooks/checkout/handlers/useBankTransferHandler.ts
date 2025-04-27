
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useBankTransferHandler = () => {
  const navigate = useNavigate();
  const { setPaymentInfo, hasDomain } = useCart();

  const handleBankTransfer = async (orderId: string, orderReference: string) => {
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    
    if (!user) {
      toast.error('É necessário fazer login para finalizar a compra');
      navigate('/auth');
      return;
    }
    
    setPaymentInfo({
      method: 'bank-transfer',
      status: 'pending',
      reference: orderReference,
      hasDomain: hasDomain()
    });
    
    toast.success('Pedido registrado com sucesso! Aguardando confirmação de pagamento.');
    navigate('/payment/success');
  };

  return {
    handleBankTransfer
  };
};
