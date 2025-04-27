import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from 'sonner';
import { Loader2, CreditCard, Building, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PageHeader } from '@/components/common/PageHeader';

type PaymentMethod = 'emis' | 'bank-transfer';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('emis');
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [showPaymentFrame, setShowPaymentFrame] = useState(false);
  
  const paymentDetails = location.state;
  
  useEffect(() => {
    if (!paymentDetails) {
      toast.error('Informações de pagamento não encontradas');
      navigate('/');
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
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const handlePayment = async () => {
    setLoading(true);
    
    try {
      if (paymentMethod === 'emis') {
        setShowPaymentFrame(true);
        
        setTimeout(() => {
          handlePaymentSuccess();
        }, 2000);
      } else {
        await updatePaymentMethod('bank-transfer');
        navigate('/payment/instructions', { 
          state: { 
            amount, 
            reference,
            description,
            paymentMethod: 'bank-transfer' 
          } 
        });
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      toast.error('Erro ao processar pagamento');
      setLoading(false);
    }
  };
  
  const updatePaymentMethod = async (method: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return false;
      
      const { data: customerData } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', user.id)
        .single();
        
      if (!customerData) return false;
      
      const { data: orderData } = await supabase
        .from('orders')
        .select('id')
        .eq('payment_id', reference)
        .eq('customer_id', customerData.id)
        .single();
        
      if (orderData) {
        await supabase
          .from('orders')
          .update({
            payment_method: method
          })
          .eq('id', orderData.id);
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao atualizar método de pagamento:', error);
      return false;
    }
  };
  
  const handlePaymentSuccess = async () => {
    try {
      await updatePaymentMethod('emis');
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;
      
      const { data: customerData } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', user.id)
        .single();
        
      if (!customerData) return;
      
      const { data: orderData } = await supabase
        .from('orders')
        .select('id')
        .eq('payment_id', reference)
        .eq('customer_id', customerData.id)
        .single();
        
      if (orderData) {
        await supabase
          .from('orders')
          .update({
            status: 'completed'
          })
          .eq('id', orderData.id);
          
        await supabase
          .from('invoices')
          .update({
            status: 'pago',
            paid_date: new Date().toISOString()
          })
          .eq('order_id', orderData.id);
      }
      
      navigate('/payment/success', { state: { amount, reference, description } });
      
    } catch (error) {
      console.error('Erro ao processar sucesso do pagamento:', error);
      toast.error('Erro ao finalizar pagamento');
      setShowPaymentFrame(false);
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <PageHeader
        title="Finalizar Pagamento"
        description="Complete sua transação escolhendo o método de pagamento"
      />
    
      {showPaymentFrame ? (
        <div className="mt-8">
          <Card className="border-2 border-primary">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-center">Processando Pagamento EMIS</CardTitle>
              <CardDescription className="text-center">
                Aguarde enquanto processamos seu pagamento
              </CardDescription>
            </CardHeader>
            <CardContent className="py-8 text-center">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p>Conectando ao gateway de pagamento...</p>
                <p className="text-sm text-muted-foreground">Não feche esta janela</p>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Método de Pagamento</CardTitle>
                <CardDescription>Escolha como você deseja pagar</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                  <div className="flex items-center space-x-2 border rounded-md p-4 mb-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="emis" id="emis" />
                    <Label htmlFor="emis" className="flex items-center cursor-pointer flex-1">
                      <CreditCard className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <p className="font-medium">Multicaixa Express</p>
                        <p className="text-sm text-gray-500">Pagamento instantâneo via EMIS</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                    <Label htmlFor="bank-transfer" className="flex items-center cursor-pointer flex-1">
                      <Building className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <p className="font-medium">Transferência Bancária</p>
                        <p className="text-sm text-gray-500">Pagamento manual por transferência bancária</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
            
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
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Descrição:</span>
                    <span className="font-medium">{description}</span>
                  </div>
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
              <CardFooter>
                <Button 
                  className="w-full" 
                  size="lg" 
                  disabled={loading || !isAuth}
                  onClick={handlePayment}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Processando...
                    </>
                  ) : (
                    `Pagar ${formatCurrency(amount)}`
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
