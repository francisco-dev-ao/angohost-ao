
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Trash, ShoppingCart as CartIcon } from 'lucide-react';
import { useCart, CartItem, ContactProfile } from '@/context/CartContext';

const ShoppingCart = () => {
  const { items, removeItem, getTotalPrice, getContactProfiles } = useCart();
  const navigate = useNavigate();
  const contactProfiles = getContactProfiles();
  
  const getContactProfileById = (id: string): ContactProfile | undefined => {
    return contactProfiles.find(profile => profile.id === id);
  };
  
  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Seu carrinho está vazio!');
      return;
    }
    navigate('/checkout');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>
        
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
                              <p>Período: {item.details.contractYears} {item.details.contractYears === 1 ? 'ano' : 'anos'}</p>
                              <p className="mt-2 text-orange-600">Renovação: {item.details.renewalPrice?.toLocaleString('pt-AO')} Kz/ano</p>
                            </div>
                          )}
                          {item.type === 'email' && (
                            <div className="mt-2 text-sm text-gray-600">
                              <p>Armazenamento: {item.details.storage}</p>
                              <p>Proteção anti-spam: {item.details.antispam}</p>
                              {item.details.quantity && (
                                <p>Quantidade: {item.details.quantity} contas</p>
                              )}
                              <p>Período: {item.details.contractYears} {item.details.contractYears === 1 ? 'ano' : 'anos'}</p>
                              <p className="mt-2 text-orange-600">Renovação: {item.details.renewalPrice?.toLocaleString('pt-AO')} Kz/ano</p>
                            </div>
                          )}
                          {item.type === 'domain' && (
                            <div className="mt-2 text-sm text-gray-600">
                              <p>Período: {item.details.registrationPeriod}</p>
                              <p>Proteção de privacidade: Incluída</p>
                              {item.details.contactProfileId && (
                                <p>Perfil de contato: {getContactProfileById(item.details.contactProfileId as string)?.name || 'Perfil não encontrado'}</p>
                              )}
                              <p className="mt-2 text-orange-600">
                                Renovação: {item.details.renewalPrice?.toLocaleString('pt-AO') || Math.round(item.price / (item.details.contractYears || 1)).toLocaleString('pt-AO')} Kz/ano
                              </p>
                            </div>
                          )}
                          {item.type === 'office365' && (
                            <div className="mt-2 text-sm text-gray-600">
                              <p>Usuários: {item.details.users}</p>
                              <p>Período: {item.details.contractYears} {item.details.contractYears === 1 ? 'ano' : 'anos'}</p>
                              <p className="mt-2 text-orange-600">Renovação: {item.details.renewalPrice?.toLocaleString('pt-AO')} Kz/ano</p>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col md:items-end mt-4 md:mt-0">
                          <span className="font-semibold text-lg">
                            {item.price.toLocaleString('pt-AO')} Kz
                            {item.period === 'monthly' ? '/mês' : ' total'}
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
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
                
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-gray-600">{item.name}</span>
                      <span>
                        {item.price.toLocaleString('pt-AO')} Kz
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
                  className="w-full mt-6 bg-primary hover:bg-primary/90"
                  onClick={handleCheckout}
                >
                  Finalizar Compra
                </Button>
                
                <div className="mt-6 text-center">
                  <Link to="/" className="text-primary hover:text-primary/80 text-sm">
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
