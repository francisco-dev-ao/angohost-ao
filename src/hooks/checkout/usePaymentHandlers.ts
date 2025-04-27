
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { usePaymentProcessing } from './usePaymentProcessing';
import { useCheckoutValidation } from './useCheckoutValidation';

export const usePaymentHandlers = () => {
  const navigate = useNavigate();
  const { 
    items,
    setPaymentInfo, 
    generateOrderReference,
    selectedContactProfileId,
  } = useCart();
  
  const {
    isLoading,
    setIsLoading,
    showPaymentFrame,
    setShowPaymentFrame,
    orderReference,
    setOrderReference,
    paymentMethod,
    saveOrderToDatabase
  } = usePaymentProcessing();
  
  const { hasDomain, hasOnlyHostingWithoutDomain } = useCheckoutValidation();

  const handlePaymentSuccess = async (transactionId: string) => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;
    
    const orderId = crypto.randomUUID();
    await saveOrderToDatabase(orderId, user.id);
    
    setPaymentInfo({
      method: 'emis',
      status: 'completed',
      transactionId,
      reference: orderReference
    });
    
    toast.success('Pagamento processado com sucesso!');
    navigate('/payment/success');
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
    
    if (hasDomain && !hasOnlyHostingWithoutDomain && !selectedContactProfileId) {
      toast.error('É necessário selecionar um perfil de contato para seus domínios');
      navigate('/carrinho');
      return;
    }
    
    setIsLoading(true);
    
    const ref = generateOrderReference();
    setOrderReference(ref);
    
    if (paymentMethod === 'emis') {
      setShowPaymentFrame(true);
    } else if (paymentMethod === 'account_balance') {
      const orderId = crypto.randomUUID();
      await saveOrderToDatabase(orderId, user.id);
      
      setPaymentInfo({
        method: paymentMethod,
        status: 'pending',
        reference: ref,
        hasDomain: hasDomain
      });
      
      toast.success('Pedido registrado com sucesso! Processando pagamento com saldo da conta.');
      navigate('/payment/success');
    } else {
      const orderId = crypto.randomUUID();
      await saveOrderToDatabase(orderId, user.id);
      
      setPaymentInfo({
        method: paymentMethod,
        status: 'pending',
        reference: ref,
        hasDomain: hasDomain
      });
      
      toast.success('Pedido registrado com sucesso! Aguardando confirmação de pagamento.');
      navigate('/payment/success');
    }
    
    setIsLoading(false);
  };

  const handleCreateOrderWithoutPayment = async () => {
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    
    if (!user) {
      toast.error('É necessário fazer login para finalizar a compra');
      navigate('/auth');
      return;
    }
    
    if (hasDomain && !hasOnlyHostingWithoutDomain && !selectedContactProfileId) {
      toast.error('É necessário selecionar um perfil de contato para seus domínios');
      return;
    }

    setIsLoading(true);
    const orderId = crypto.randomUUID();
    const ref = generateOrderReference();
    
    try {
      await saveOrderToDatabase(orderId, user.id);
      
      setPaymentInfo({
        method: 'emis',
        status: 'pending',
        reference: ref
      });
      
      toast.success('Pedido registrado com sucesso! Aguardando confirmação de pagamento.');
      navigate('/payment/success');
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      toast.error('Erro ao criar pedido. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handlePaymentSuccess,
    handlePaymentError,
    handleProcessPayment,
    handleCreateOrderWithoutPayment
  };
};
