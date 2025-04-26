
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Trash, ShoppingCart as CartIcon, CreditCard, User, Mail, Phone } from 'lucide-react';
import { useCart, CartItem } from '@/context/CartContext';

// Interfaces para checkout
interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  nif: string;
  billingAddress: string;
  city: string;
  paymentMethod: 'credit-card' | 'bank-transfer';
}

const ShoppingCart = () => {
  const { items, removeItem, getTotalPrice, clearCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Estado para checkout
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    email: '',
    phone: '',
    nif: '',
    billingAddress: '',
    city: '',
    paymentMethod: 'credit-card'
  });
  const [isLoading, setIsLoading] = useState(false);
  
  // Handle URL parameters to add items to cart
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get('type');
    const plan = searchParams.get('plan');
    
    if (type && plan) {
      // Here, you would typically fetch the plan details from an API
      // For now, we'll use dummy data based on the plan ID
      
      let newItem: CartItem | null = null;
      
      if (type === 'hosting') {
        if (plan === 'basic') {
          newItem = {
            id: `hosting-${plan}-${Date.now()}`,
            type: 'hosting',
            name: 'Plano Básico de Hospedagem',
            price: 2500,
            period: 'monthly',
            details: {
              diskSpace: '5GB',
              emailAccounts: '10',
              databases: 'Ilimitado'
            }
          };
        } else if (plan === 'professional') {
          newItem = {
            id: `hosting-${plan}-${Date.now()}`,
            type: 'hosting',
            name: 'Plano Profissional de Hospedagem',
            price: 4500,
            period: 'monthly',
            details: {
              diskSpace: '20GB',
              emailAccounts: '30',
              databases: 'Ilimitado'
            }
          };
        } else if (plan === 'enterprise') {
          newItem = {
            id: `hosting-${plan}-${Date.now()}`,
            type: 'hosting',
            name: 'Plano Empresarial de Hospedagem',
            price: 8500,
            period: 'monthly',
            details: {
              diskSpace: '50GB',
              emailAccounts: 'Ilimitado',
              databases: 'Ilimitado'
            }
          };
        }
      } else if (type === 'email') {
        if (plan === 'email-start') {
          newItem = {
            id: `email-${plan}-${Date.now()}`,
            type: 'email',
            name: 'Plano Start de Email',
            price: 1500,
            period: 'monthly',
            details: {
              storage: '5GB por caixa',
              antispam: 'Básico'
            }
          };
        } else if (plan === 'email-business') {
          newItem = {
            id: `email-${plan}-${Date.now()}`,
            type: 'email',
            name: 'Plano Business de Email',
            price: 3000,
            period: 'monthly',
            details: {
              storage: '15GB por caixa',
              antispam: 'Avançado'
            }
          };
        } else if (plan === 'email-enterprise') {
          newItem = {
            id: `email-${plan}-${Date.now()}`,
            type: 'email',
            name: 'Plano Enterprise de Email',
            price: 6000,
            period: 'monthly',
            details: {
              storage: '50GB por caixa',
              antispam: 'Premium'
            }
          };
        }
      }
      
      // Clean up the URL parameters
      navigate('/carrinho', { replace: true });
      
      // If we found a matching plan, add it to the cart
      if (newItem) {
        // In a real app, you'd add to cart here
        // For now we'll just display a toast
        toast.success(`${newItem.name} adicionado ao carrinho!`);
      }
    }
  }, [location, navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Check for NIF and fetch customer data if available
    if (name === 'nif' && value.length === 9) {
      fetchNifData(value);
    }
  };
  
  const fetchNifData = async (nif: string) => {
    setIsLoading(true);
    try {
      // Simulating API call - in a real app, this would call the actual API
      toast.info("Consultando dados do NIF...");
      
      // Fake API response for demonstration
      setTimeout(() => {
        setFormData({
          ...formData,
          name: 'António Silva',
          city: 'Luanda',
          billingAddress: 'Rua dos Engenheiros, 123'
        });
        setIsLoading(false);
        toast.success("Dados do contribuinte carregados com sucesso!");
      }, 1500);
      
      // In a real app, we would use fetch or axios:
      // const response = await fetch(`http://consulta.edgarsingui.ao/public/consultar-por-nif/${nif}`);
      // const data = await response.json();
      // setFormData({
      //   ...formData,
      //   name: data.nome,
      //   city: data.provincia,
      //   billingAddress: data.endereco
      // });
    } catch (error) {
      toast.error("Erro ao consultar o NIF. Tente novamente.");
      console.error("Error fetching NIF data:", error);
      setIsLoading(false);
    }
  };
  
  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Seu carrinho está vazio!');
      return;
    }
    
    setShowCheckout(true);
  };
  
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos
    if (!formData.name || !formData.email || !formData.phone || !formData.nif) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    setIsLoading(true);
    
    // Simular processamento do pedido
    toast.success('Processando seu pedido...');
    
    setTimeout(() => {
      clearCart();
      setIsLoading(false);
      navigate('/');
      toast.success('Compra finalizada com sucesso! Você receberá a fatura por email em breve.');
    }, 2000);
  };
  
  const handleBackToCart = () => {
    setShowCheckout(false);
  };
  
  // Componente para o resumo da compra
  const OrderSummary = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
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
      
      {!showCheckout && (
        <Button 
          className="w-full mt-6 bg-orange-500 hover:bg-orange-600"
          onClick={handleCheckout}
        >
          Finalizar Compra
        </Button>
      )}
      
      {!showCheckout && (
        <div className="mt-6 text-center">
          <Link to="/" className="text-angohost-600 hover:text-angohost-800 text-sm">
            Continuar Comprando
          </Link>
        </div>
      )}
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          {showCheckout ? 'Finalizar Compra' : 'Carrinho de Compras'}
        </h1>
        
        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <CartIcon className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Seu carrinho está vazio</h2>
            <p className="text-gray-600 mb-8">
              Adicione produtos ao seu carrinho para continuar.
            </p>
            <Button asChild>
              <Link to="/">Continuar Comprando</Link>
            </Button>
          </div>
        ) : showCheckout ? (
          // Checkout Form
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Dados de Faturação</h2>
                
                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nif">NIF (Número de Contribuinte) *</Label>
                      <Input
                        id="nif"
                        name="nif"
                        value={formData.nif}
                        onChange={handleInputChange}
                        placeholder="Insira seu NIF"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Seu nome completo"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="seu.email@exemplo.com"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Seu número de telefone"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Cidade"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="billingAddress">Endereço *</Label>
                      <Input
                        id="billingAddress"
                        name="billingAddress"
                        value={formData.billingAddress}
                        onChange={handleInputChange}
                        placeholder="Seu endereço completo"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">Método de Pagamento</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center p-4 border rounded-lg cursor-pointer bg-white">
                        <input
                          type="radio"
                          name="paymentMethod"
                          id="credit-card"
                          value="credit-card"
                          checked={formData.paymentMethod === 'credit-card'}
                          onChange={() => setFormData({...formData, paymentMethod: 'credit-card'})}
                          className="mr-3"
                        />
                        <div className="flex items-center">
                          <CreditCard className="h-6 w-6 mr-2 text-gray-500" />
                          <label htmlFor="credit-card">Cartão de Crédito</label>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-4 border rounded-lg cursor-pointer bg-white">
                        <input
                          type="radio"
                          name="paymentMethod"
                          id="bank-transfer"
                          value="bank-transfer"
                          checked={formData.paymentMethod === 'bank-transfer'}
                          onChange={() => setFormData({...formData, paymentMethod: 'bank-transfer'})}
                          className="mr-3"
                        />
                        <div className="flex items-center">
                          <CreditCard className="h-6 w-6 mr-2 text-gray-500" />
                          <label htmlFor="bank-transfer">Transferência Bancária</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 pt-6">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleBackToCart}
                      className="flex-1"
                    >
                      Voltar
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isLoading} 
                      className="flex-1 bg-orange-500 hover:bg-orange-600"
                    >
                      {isLoading ? 'Processando...' : 'Confirmar Pedido'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <OrderSummary />
            </div>
          </div>
        ) : (
          // Regular cart view
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Itens do Carrinho</h2>
                </div>
                
                <div className="border-t">
                  {items.map((item) => (
                    <div key={item.id} className="p-6 border-b">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div>
                          <h3 className="font-medium text-lg">{item.name}</h3>
                          {item.type === 'hosting' && (
                            <div className="mt-2 text-sm text-gray-600">
                              <p>Espaço em disco: {item.details.diskSpace}</p>
                              <p>Contas de email: {item.details.emailAccounts}</p>
                              <p>Bancos de dados: {item.details.databases}</p>
                              <p className="mt-2 text-orange-600">Renovação: {item.price.toLocaleString('pt-AO')} Kz/mês</p>
                            </div>
                          )}
                          {item.type === 'email' && (
                            <div className="mt-2 text-sm text-gray-600">
                              <p>Armazenamento: {item.details.storage}</p>
                              <p>Proteção anti-spam: {item.details.antispam}</p>
                              <p className="mt-2 text-orange-600">Renovação: {item.price.toLocaleString('pt-AO')} Kz/mês</p>
                            </div>
                          )}
                          {item.type === 'domain' && (
                            <div className="mt-2 text-sm text-gray-600">
                              <p>Período: 1 ano</p>
                              <p>Proteção de privacidade: Incluída</p>
                              <p className="mt-2 text-orange-600">
                                Renovação: {item.price.toLocaleString('pt-AO')} Kz/ano
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col md:items-end mt-4 md:mt-0">
                          <span className="font-semibold text-lg">
                            {item.price.toLocaleString('pt-AO')} Kz
                            {item.period === 'monthly' ? '/mês' : '/ano'}
                          </span>
                          <Button 
                            variant="ghost" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-0 h-8 mt-2"
                            onClick={() => {
                              removeItem(item.id);
                              toast.success('Item removido do carrinho!');
                            }}
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Remover
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <OrderSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
