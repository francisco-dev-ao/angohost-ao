
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';
import EmisPaymentFrame from '@/components/EmisPaymentFrame';
import { PaymentMethodSelector } from '@/components/checkout/PaymentMethodSelector';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CreditCard, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Checkout = () => {
  const { 
    items, 
    customer, 
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
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Verificar autenticação
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
  
  const handleProcessPayment = () => {
    if (!paymentMethod) {
      toast.error('Por favor, selecione um método de pagamento');
      return;
    }

    const hasDomain = items.some(item => item.type === 'domain');
    const hasOnlyHostingWithoutDomain = items.length === 1 && items[0].type === 'hosting' && items[0].details.existingDomain === true;
    
    // Verificar se o usuário está logado e se um perfil de contato foi selecionado para domínios
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
    
    // Gerar referência do pedido
    const ref = generateOrderReference();
    setOrderReference(ref);
    
    // Se EMIS pagamento selecionado, mostrar frame de pagamento
    if (paymentMethod === 'emis') {
      setShowPaymentFrame(true);
    } else {
      // Para outros métodos de pagamento, mostrar mensagem de sucesso
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
              <Card className="overflow-hidden">
                <CardHeader className="bg-white">
                  <CardTitle className="text-xl flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Selecione o Método de Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <Alert variant="default" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Detalhes de faturação</AlertTitle>
                    <AlertDescription>
                      Os dados de faturação serão obtidos do perfil da sua conta.
                    </AlertDescription>
                  </Alert>
                  
                  <PaymentMethodSelector
                    selected={paymentMethod}
                    onSelect={setPaymentMethod}
                  />
                  
                  <div className="mt-8 flex justify-end">
                    <Button
                      onClick={handleProcessPayment}
                      disabled={!paymentMethod || isLoading}
                      className="w-full md:w-auto"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processando...
                        </>
                      ) : 'Processar Pagamento'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
