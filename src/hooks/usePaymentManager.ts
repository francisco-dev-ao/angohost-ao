
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/context/CartContext';
import { PaymentMethod } from '@/types/payment';

export const usePaymentManager = () => {
  const navigate = useNavigate();
  const { 
    items, 
    getTotalPrice, 
    setPaymentInfo, 
    generateOrderReference,
    selectedContactProfileId,
  } = useCart();
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentFrame, setShowPaymentFrame] = useState(false);
  const [orderReference, setOrderReference] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  
  const saveOrderToDatabase = async (orderId: string, userId: string) => {
    try {
      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          id: orderId,
          customer_id: userId,
          total_amount: getTotalPrice(),
          status: paymentMethod === 'emis' ? 'processing' : 'pending',
          payment_method: paymentMethod || 'unknown',
          payment_id: orderReference
        });
      
      if (orderError) {
        console.error('Erro ao cadastrar pedido:', orderError);
        return;
      }
      
      const orderItems = items.map(item => ({
        order_id: orderId,
        product_name: item.name,
        product_type: item.type,
        product_id: item.id,
        price: item.price,
        period: item.period,
        details: item.details
      }));
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
      
      if (itemsError) {
        console.error('Erro ao cadastrar itens do pedido:', itemsError);
      }
      
      const invoiceNumber = `INV-${orderReference}`;
      const { error: invoiceError } = await supabase
        .from('invoices')
        .insert({
          order_id: orderId,
          customer_id: userId,
          invoice_number: invoiceNumber,
          amount: getTotalPrice(),
          status: 'unpaid',
          due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        });
      
      if (invoiceError) {
        console.error('Erro ao gerar fatura:', invoiceError);
      }
      
    } catch (error) {
      console.error('Erro ao salvar pedido:', error);
    }
  };

  const handlePaymentSuccess = async (transactionId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
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

    const { data: { user } } = await supabase.auth.getUser();
    const hasDomain = items.some(item => item.type === 'domain');
    const hasOnlyHostingWithoutDomain = items.length === 1 && 
      items[0].type === 'hosting' && 
      items[0].details.existingDomain === true;
    
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

  return {
    isLoading,
    showPaymentFrame,
    orderReference,
    paymentMethod,
    setPaymentMethod,
    handlePaymentSuccess,
    handlePaymentError,
    handleProcessPayment,
    setShowPaymentFrame
  };
};
