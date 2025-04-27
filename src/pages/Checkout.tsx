
import React from 'react';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { PaymentFrame } from '@/components/checkout/PaymentFrame';
import { useCart } from '@/context/CartContext';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { usePaymentManager } from '@/hooks/usePaymentManager';

const Checkout = () => {
  const { items, getTotalPrice } = useCart();
  const {
    isLoading,
    showPaymentFrame,
    orderReference,
    paymentMethod,
    setPaymentMethod,
    handlePaymentSuccess,
    handlePaymentError,
    handleProcessPayment,
    setShowPaymentFrame
  } = usePaymentManager();

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
