
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { PaymentFrame } from '@/components/checkout/PaymentFrame';
import { supabase } from '@/integrations/supabase/client';
import { PaymentMethod } from '@/types/payment';
import { RequireAuth } from '@/components/auth/RequireAuth';

const Checkout = () => {
  const { 
    items, 
    paymentInfo, 
    getTotalPrice, 
    setPaymentInfo, 
    generateOrderReference,
    selectedContactProfileId,
    customer
  } = useCart();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentFrame, setShowPaymentFrame] = useState(false);
  const [orderReference, setOrderReference] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [user, setUser] = useState<any>(null);

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
      // Cadastrar pedido
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
      
      // Cadastrar itens do pedido
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
      
      // Cadastrar fatura
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

    const hasDomain = items.some(item => item.type === 'domain');
    const hasOnlyHostingWithoutDomain = items.length === 1 && items[0].type === 'hosting' && items[0].details.existingDomain === true;
    
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

  return (
    <RequireAuth redirectTo="/auth" toastMessage="É necessário fazer login para finalizar a compra">
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {!showPaymentFrame ? (
                <CheckoutForm 
                  paymentMethod={paymentMethod}
                  isLoading={isLoading}
                  onSelectPaymentMethod={setPaymentMethod}
                  onProcessPayment={handleProcessPayment}
                />
              ) : (
                <PaymentFrame
                  orderReference={orderReference}
                  getTotalPrice={getTotalPrice}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                  onBack={() => setShowPaymentFrame(false)}
                />
              )}
            </div>
            
            <div className="lg:col-span-1">
              <OrderSummary 
                items={items}
                getTotalPrice={getTotalPrice}
              />
            </div>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
};

export default Checkout;
