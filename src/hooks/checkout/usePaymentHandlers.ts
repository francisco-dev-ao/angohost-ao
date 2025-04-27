import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { usePaymentProcessing } from './usePaymentProcessing';
import { useEmisPaymentHandler } from './handlers/useEmisPaymentHandler';
import { useBalancePaymentHandler } from './handlers/useBalancePaymentHandler';
import { useBankTransferHandler } from './handlers/useBankTransferHandler';
import { supabase } from '@/integrations/supabase/client';

export const usePaymentHandlers = () => {
  const navigate = useNavigate();
  const { setPaymentInfo, hasDomain } = useCart();
  const { paymentMethod, orderReference, saveOrderToDatabase } = usePaymentProcessing();
  
  const { handleEmisPayment } = useEmisPaymentHandler();
  const { handleBalancePayment } = useBalancePaymentHandler();
  const { handleBankTransfer } = useBankTransferHandler();

  const handlePaymentSuccess = async (transactionId: string) => {
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    if (!user) return;
    
    try {
      const orderId = crypto.randomUUID();
      await saveOrderToDatabase(orderId, user.id);
      
      setPaymentInfo({
        method: 'emis',
        status: 'completed',
        transactionId,
        reference: orderReference,
        hasDomain: hasDomain
      });
      
      toast.success('Pagamento processado com sucesso!');
      navigate('/payment/success');
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Erro ao processar pagamento. Por favor, tente novamente.');
    }
  };
  
  const handlePaymentError = (error: string) => {
    toast.error(`Erro no pagamento: ${error}`);
    setPaymentInfo({
      method: 'emis',
      status: 'failed',
      reference: orderReference
    });
  };
  
  const handleProcessPayment = async () => {
    if (!paymentMethod) {
      toast.error('Por favor, selecione um método de pagamento');
      return;
    }

    const { data } = await supabase.auth.getUser();
    const user = data.user;
    
    if (!user) {
      toast.error('É necessário fazer login para finalizar a compra');
      navigate('/auth');
      return;
    }
    
    const orderId = crypto.randomUUID();
    
    switch (paymentMethod) {
      case 'emis':
        await handleEmisPayment(orderId, orderReference);
        break;
      case 'account_balance':
        await handleBalancePayment(orderId, orderReference);
        break;
      case 'bank-transfer':
        await handleBankTransfer(orderId, orderReference);
        break;
      default:
        await handleBankTransfer(orderId, orderReference);
    }
  };

  const handleCreateOrderWithoutPayment = async () => {
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    
    if (!user) {
      toast.error('É necessário fazer login para finalizar a compra');
      navigate('/auth');
      return;
    }

    const orderId = crypto.randomUUID();
    const ref = orderReference;
    
    try {
      await saveOrderToDatabase(orderId, user.id);
      
      setPaymentInfo({
        method: 'emis',
        status: 'pending',
        reference: ref,
        hasDomain: hasDomain
      });
      
      toast.success('Pedido registrado com sucesso! Aguardando confirmação de pagamento.');
      navigate('/payment/success');
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      toast.error('Erro ao criar pedido. Por favor, tente novamente.');
    }
  };

  return {
    handlePaymentSuccess,
    handlePaymentError,
    handleProcessPayment,
    handleCreateOrderWithoutPayment
  };
};
