
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { PaymentFrame } from '@/components/checkout/PaymentFrame';
import { supabase } from '@/integrations/supabase/client';
import { PaymentMethod } from '@/types/payment';

const Checkout = () => {
  const { 
    items, 
    paymentInfo, 
    getTotalPrice, 
    setPaymentInfo, 
    generateOrderReference,
    selectedContactProfileId
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

  const handlePaymentSuccess = (transactionId: string) => {
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
  
  const handleProcessPayment = () => {
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
  );
};

export default Checkout;
