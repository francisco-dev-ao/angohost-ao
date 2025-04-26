
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';
import EmisPaymentFrame from '@/components/EmisPaymentFrame';
import { CheckoutFormData } from '@/schemas/formSchema';
import { BillingForm } from '@/components/checkout/BillingForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { Button } from '@/components/ui/button';

const Checkout = () => {
  const { items, customer, paymentInfo, getTotalPrice, setCustomer, setPaymentInfo, generateOrderReference } = useCart();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentFrame, setShowPaymentFrame] = useState(false);
  const [orderReference, setOrderReference] = useState('');

  useEffect(() => {
    // Redirect to cart if it's empty
    if (items.length === 0) {
      navigate('/carrinho');
      toast.error('Seu carrinho está vazio!');
    }
    
    // If payment completed, redirect to success page
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
  
  const onSubmit = (data: CheckoutFormData) => {
    // Save customer data
    const customerData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      nif: data.nif,
      billingAddress: data.billingAddress,
      city: data.city
    };
    
    setCustomer(customerData);
    
    // Generate order reference if not already set
    if (!orderReference) {
      const ref = generateOrderReference();
      setOrderReference(ref);
    }
    
    // If EMIS payment selected, show payment frame
    if (data.paymentMethod === 'emis') {
      setShowPaymentFrame(true);
    } else {
      // For other payment methods, show a success message
      setPaymentInfo({
        method: data.paymentMethod,
        status: 'pending',
        reference: orderReference || generateOrderReference()
      });
      
      toast.success('Pedido registrado com sucesso! Aguardando confirmação de pagamento.');
      navigate('/payment/success');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {!showPaymentFrame ? (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Dados de Faturação</h2>
                <BillingForm
                  onSubmit={onSubmit}
                  defaultValues={customer || undefined}
                  isLoading={isLoading}
                />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Pagamento Multicaixa Express</h2>
                <p className="mb-6 text-gray-600">
                  Por favor, siga as instruções para concluir o pagamento. Você receberá um alerta no seu telemóvel para confirmar a transação.
                </p>
                <EmisPaymentFrame 
                  amount={getTotalPrice() * 100} // Convert to cents
                  reference={orderReference}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPaymentFrame(false)}
                  className="mt-4"
                >
                  Voltar aos dados de pagamento
                </Button>
              </div>
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
