
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PageHeader } from '@/components/common/PageHeader';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { PaymentFrame } from '@/components/checkout/PaymentFrame';
import { usePaymentManager } from '@/hooks/usePaymentManager';
import { AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/utils/format';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  
  // Get payment details from location state
  const paymentDetails = location.state;
  
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
  
  useEffect(() => {
    if (!paymentDetails) {
      toast.error('Informações de pagamento não encontradas');
      navigate('/carrinho');
      return;
    }
    
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        toast.error('Por favor, faça login para continuar');
        navigate('/auth', { state: { returnTo: location.pathname } });
        return;
      }
      setIsAuth(true);
    };
    
    checkAuth();
  }, [location, navigate, paymentDetails]);
  
  if (!paymentDetails) {
    return null;
  }
  
  const { amount, description, reference } = paymentDetails;
  
  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <PageHeader
        title="Finalizar Pagamento"
        description="Complete sua transação escolhendo o método de pagamento"
      />
    
      {showPaymentFrame ? (
        <PaymentFrame
          orderReference={orderReference}
          getTotalPrice={() => amount}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
          onBack={() => setShowPaymentFrame(false)}
          paymentMethod={paymentMethod || undefined}
        />
      ) : (
        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-3 space-y-6">
            <CheckoutForm
              paymentMethod={paymentMethod}
              isLoading={isLoading}
              onSelectPaymentMethod={setPaymentMethod}
              onProcessPayment={handleProcessPayment}
              totalAmount={amount}
            />
            
            {paymentMethod === 'bank-transfer' && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Atenção</AlertTitle>
                <AlertDescription>
                  Pagamentos por transferência bancária podem levar até 24 horas para serem processados após a confirmação do pagamento.
                </AlertDescription>
              </Alert>
            )}
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Referência:</span>
                    <span className="font-medium">{reference}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valor Total:</span>
                    <span className="font-bold text-lg">{formatCurrency(amount)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
