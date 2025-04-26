
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Trash, ShoppingCart } from 'lucide-react';
import { useCart, CartItem } from '@/context/CartContext';

const ShoppingCart = () => {
  const { items, removeItem, getTotalPrice, clearCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  
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
  
  const handleCheckout = () => {
    // In a real app, this would navigate to a checkout page
    toast.success('Redirecionando para o checkout...');
    setTimeout(() => {
      clearCart();
      navigate('/');
      toast.success('Compra finalizada com sucesso!');
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>
        
        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingCart className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Seu carrinho está vazio</h2>
            <p className="text-gray-600 mb-8">
              Adicione produtos ao seu carrinho para continuar.
            </p>
            <Button asChild>
              <Link to="/">Continuar Comprando</Link>
            </Button>
          </div>
        ) : (
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
                            </div>
                          )}
                          {item.type === 'email' && (
                            <div className="mt-2 text-sm text-gray-600">
                              <p>Armazenamento: {item.details.storage}</p>
                              <p>Proteção anti-spam: {item.details.antispam}</p>
                            </div>
                          )}
                          {item.type === 'domain' && (
                            <div className="mt-2 text-sm text-gray-600">
                              <p>Período: 1 ano</p>
                              <p>Proteção de privacidade: Incluída</p>
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
                
                <Button 
                  className="w-full mt-6 bg-orange-500 hover:bg-orange-600"
                  onClick={handleCheckout}
                >
                  Finalizar Compra
                </Button>
                
                <div className="mt-6 text-center">
                  <Link to="/" className="text-angohost-600 hover:text-angohost-800 text-sm">
                    Continuar Comprando
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
