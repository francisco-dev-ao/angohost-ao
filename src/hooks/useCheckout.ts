
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { PaymentMethod } from '@/types/payment';
import { toast } from 'sonner';

export const useCheckout = () => {
  const navigate = useNavigate();
  const { 
    items, 
    paymentInfo, 
    getTotalPrice, 
    setPaymentInfo, 
    generateOrderReference,
    selectedContactProfileId,
    customer
  } = useCart();
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentFrame, setShowPaymentFrame] = useState(false);
  const [orderReference, setOrderReference] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [user, setUser] = useState<any>(null);

  const hasDomain = items.some(item => item.type === 'domain');
  const hasOnlyHostingWithoutDomain = items.length === 1 && 
    items[0].type === 'hosting' && 
    items[0].details.existingDomain === true;

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      
      if (!session) {
        toast.error('É necessário fazer login para finalizar a compra');
        navigate('/carrinho');
        return;
      }
      
      setUser(session.user);
    };
    
    checkAuth();
    
    if (items.length === 0) {
      navigate('/carrinho');
      toast.error('Seu carrinho está vazio!');
    }
    
    if (paymentInfo?.status === 'completed') {
      navigate('/payment/success');
    }
  }, [items, navigate, paymentInfo]);

  const saveOrderToDatabase = async (orderId: string, userId: string) => {
    try {
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          id: orderId,
          customer_id: userId,
          total_amount: getTotalPrice(),
          status: paymentMethod === 'emis' ? 'processing' : 'pending',
          payment_method: paymentMethod || 'unknown',
          payment_id: orderReference
        })
        .select()
        .single();
      
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
    isLoading,
    showPaymentFrame,
    orderReference,
    paymentMethod,
    setPaymentMethod,
    handlePaymentSuccess,
    handlePaymentError,
    handleProcessPayment,
    handleCreateOrderWithoutPayment,
    setShowPaymentFrame
  };
};
