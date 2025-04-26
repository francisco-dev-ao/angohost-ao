
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { User, Mail, Phone, CreditCard, Building } from 'lucide-react';
import { useCart, Customer, PaymentInfo } from '@/context/CartContext';
import EmisPaymentFrame from '@/components/EmisPaymentFrame';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(9, 'Telefone deve ter pelo menos 9 dígitos'),
  nif: z.string().min(9, 'NIF deve ter 9 dígitos'),
  billingAddress: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),
  city: z.string().min(2, 'Cidade é obrigatória'),
  paymentMethod: z.enum(['credit-card', 'bank-transfer', 'emis'])
});

type FormData = z.infer<typeof formSchema>;

const Checkout = () => {
  const { items, customer, paymentInfo, getTotalPrice, setCustomer, setPaymentInfo, generateOrderReference } = useCart();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentFrame, setShowPaymentFrame] = useState(false);
  const [orderReference, setOrderReference] = useState('');
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: customer?.name || '',
      email: customer?.email || '',
      phone: customer?.phone || '',
      nif: customer?.nif || '',
      billingAddress: customer?.billingAddress || '',
      city: customer?.city || '',
      paymentMethod: 'emis'
    }
  });

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
  
  const fetchNifData = async (nif: string) => {
    if (nif.length !== 9) return;
    
    setIsLoading(true);
    try {
      toast.info("Consultando dados do NIF...");
      
      try {
        const response = await fetch(`http://consulta.edgarsingui.ao/public/consultar-por-nif/${nif}`);
        if (response.ok) {
          const data = await response.json();
          
          if (data && data.nome) {
            form.setValue('name', data.nome);
            form.setValue('city', data.provincia || '');
            form.setValue('billingAddress', data.endereco || '');
            
            toast.success("Dados do contribuinte carregados com sucesso!");
          } else {
            toast.warning("NIF encontrado, mas sem dados adicionais");
          }
        } else {
          toast.error("NIF não encontrado");
        }
      } catch (error) {
        console.error("NIF API error:", error);
        // Fallback for demo purposes
        setTimeout(() => {
          if (nif === '123456789') {
            form.setValue('name', 'António Silva');
            form.setValue('city', 'Luanda');
            form.setValue('billingAddress', 'Rua dos Engenheiros, 123');
            toast.success("Dados do contribuinte carregados com sucesso!");
          } else {
            toast.warning("NIF não encontrado na base de dados");
          }
        }, 1000);
      }
    } catch (error) {
      toast.error("Erro ao consultar o NIF. Tente novamente.");
      console.error("Error fetching NIF data:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
  
  const onSubmit = (data: FormData) => {
    // Save customer data
    const customerData: Customer = {
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
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="nif"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>NIF (Número de Contribuinte) *</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input 
                                  {...field}
                                  placeholder="Insira seu NIF" 
                                  className="pl-10 bg-white"
                                  onChange={(e) => {
                                    field.onChange(e);
                                    if (e.target.value.length === 9) {
                                      fetchNifData(e.target.value);
                                    }
                                  }}
                                />
                              </FormControl>
                              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome Completo *</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="Seu nome completo" 
                                  className="pl-10 bg-white"
                                />
                              </FormControl>
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input 
                                  {...field} 
                                  type="email" 
                                  placeholder="seu.email@exemplo.com" 
                                  className="pl-10 bg-white"
                                />
                              </FormControl>
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone *</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="Seu número de telefone" 
                                  className="pl-10 bg-white"
                                />
                              </FormControl>
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cidade *</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="Cidade" 
                                className="bg-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="billingAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Endereço *</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="Seu endereço completo" 
                                className="bg-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="text-lg font-medium mb-4">Método de Pagamento</h3>
                      
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div 
                                className={`flex items-center p-4 border rounded-lg cursor-pointer ${field.value === 'emis' ? 'border-primary bg-blue-50' : 'bg-white'}`}
                                onClick={() => form.setValue('paymentMethod', 'emis')}
                              >
                                <FormControl>
                                  <input
                                    type="radio"
                                    checked={field.value === 'emis'}
                                    onChange={() => {}}
                                    className="mr-3"
                                  />
                                </FormControl>
                                <div className="flex items-center">
                                  <CreditCard className="h-6 w-6 mr-2 text-gray-500" />
                                  <label>Multicaixa Express</label>
                                </div>
                              </div>
                              
                              <div 
                                className={`flex items-center p-4 border rounded-lg cursor-pointer ${field.value === 'credit-card' ? 'border-primary bg-blue-50' : 'bg-white'}`}
                                onClick={() => form.setValue('paymentMethod', 'credit-card')}
                              >
                                <FormControl>
                                  <input
                                    type="radio"
                                    checked={field.value === 'credit-card'}
                                    onChange={() => {}}
                                    className="mr-3"
                                  />
                                </FormControl>
                                <div className="flex items-center">
                                  <CreditCard className="h-6 w-6 mr-2 text-gray-500" />
                                  <label>Cartão de Crédito</label>
                                </div>
                              </div>
                              
                              <div 
                                className={`flex items-center p-4 border rounded-lg cursor-pointer ${field.value === 'bank-transfer' ? 'border-primary bg-blue-50' : 'bg-white'}`}
                                onClick={() => form.setValue('paymentMethod', 'bank-transfer')}
                              >
                                <FormControl>
                                  <input
                                    type="radio"
                                    checked={field.value === 'bank-transfer'}
                                    onChange={() => {}}
                                    className="mr-3"
                                  />
                                </FormControl>
                                <div className="flex items-center">
                                  <CreditCard className="h-6 w-6 mr-2 text-gray-500" />
                                  <label>Transferência Bancária</label>
                                </div>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex space-x-4 pt-6">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => navigate('/carrinho')}
                        className="flex-1"
                      >
                        Voltar ao Carrinho
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={isLoading} 
                        className="flex-1 bg-primary hover:bg-primary/90"
                      >
                        {isLoading ? 'Processando...' : 'Prosseguir com Pagamento'}
                      </Button>
                    </div>
                  </form>
                </Form>
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
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
              
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-gray-600">{item.name}</span>
                    <span>
                      {item.price.toLocaleString('pt-AO')} Kz
                      {item.period === 'monthly' ? '/mês' : '/ano'}
                    </span>
                  </div>
                ))}
              </div>
              
              <Separator className="my-6" />
              
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{getTotalPrice().toLocaleString('pt-AO')} Kz</span>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  * Renovações anuais: {items.reduce((total, item) => {
                    const renewalPrice = item.details.renewalPrice || item.price;
                    return total + renewalPrice;
                  }, 0).toLocaleString('pt-AO')} Kz/ano
                </p>
              </div>
              
              <div className="mt-6 bg-blue-50 p-4 rounded-md border border-blue-100">
                <h3 className="font-medium text-primary mb-2">Informações Importantes</h3>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Sua compra será processada imediatamente após a confirmação do pagamento</li>
                  <li>A fatura será enviada para o email fornecido</li>
                  <li>Suporte técnico disponível 24/7</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
