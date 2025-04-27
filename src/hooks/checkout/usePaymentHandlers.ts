
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { usePaymentProcessing } from './usePaymentProcessing';
import { useEmisPaymentHandler } from './handlers/useEmisPaymentHandler';
import { useBalancePaymentHandler } from './handlers/useBalancePaymentHandler';
import { useBankTransferHandler } from './handlers/useBankTransferHandler';
import { supabase } from '@/integrations/supabase/client';

// Update the PaymentInfo type to include 'none'
type PaymentMethod = 'emis' | 'bank-transfer' | 'credit-card' | 'account_balance' | 'none';

export const usePaymentHandlers = () => {
  const navigate = useNavigate();
  const { setPaymentInfo, hasDomain } = useCart();
  const { paymentMethod, orderReference, setOrderReference, generateOrderReference } = usePaymentProcessing();
  
  const { handleEmisPayment } = useEmisPaymentHandler();
  const { handleBalancePayment } = useBalancePaymentHandler();
  const { handleBankTransfer } = useBankTransferHandler();

  // Generate order reference if not already set
  if (!orderReference) {
    setOrderReference(generateOrderReference());
  }

  const handlePaymentSuccess = async (transactionId: string) => {
    try {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (!user) {
        toast.error('É necessário fazer login para finalizar a compra');
        navigate('/auth');
        return;
      }
      
      setPaymentInfo({
        method: (paymentMethod || 'emis') as PaymentMethod,
        status: 'completed',
        transactionId,
        reference: orderReference,
        hasDomain: hasDomain()
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
      method: (paymentMethod || 'emis') as PaymentMethod,
      status: 'failed',
      reference: orderReference,
      hasDomain: hasDomain()
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
    const ref = orderReference || generateOrderReference();
    
    try {
      switch (paymentMethod) {
        case 'emis':
          await handleEmisPayment(orderId, ref);
          break;
        case 'account_balance':
          await handleBalancePayment(orderId, ref);
          break;
        case 'bank-transfer':
          await handleBankTransfer(orderId, ref);
          break;
        case 'credit-card':
          toast.error('Pagamento com cartão de crédito em desenvolvimento');
          break;
        default:
          toast.error('Método de pagamento não suportado');
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      toast.error('Ocorreu um erro ao processar o pagamento. Por favor, tente novamente.');
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

    try {
      const orderId = crypto.randomUUID();
      const ref = orderReference || generateOrderReference();
      
      // Get the customer ID
      const { data: customerData } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (!customerData) {
        throw new Error('Customer not found');
      }
      
      // Create the order directly with the customer's ID
      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          id: orderId,
          customer_id: customerData.id,
          total_amount: 0, // We'll update this after adding items
          status: 'pending',
          payment_method: 'none', // Use 'none' as a valid payment method
          reference: ref
        });
      
      if (orderError) {
        console.error('Order creation error:', orderError);
        throw orderError;
      }
      
      setPaymentInfo({
        method: 'none' as PaymentMethod, // Cast to make TypeScript happy
        status: 'pending',
        reference: ref,
        hasDomain: hasDomain()
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
