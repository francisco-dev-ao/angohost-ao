
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Trash, ShoppingCart as CartIcon, Mail, Plus, X } from 'lucide-react';
import { useCart, CartItem, ContactProfile } from '@/context/CartContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

// Email plan options
const emailPlans = [
  {
    id: 'email-start',
    title: 'Email Start',
    storage: '5GB',
    price: 15000, // Base price per year per account
    features: ['Proteção anti-spam básica', 'Acesso web e mobile', 'Suporte por email']
  },
  {
    id: 'email-business',
    title: 'Email Business',
    storage: '25GB',
    price: 24000, // Base price per year per account
    features: ['Proteção anti-spam avançada', 'Acesso web e mobile', 'Suporte prioritário', 'Calendário compartilhado']
  },
  {
    id: 'email-premium',
    title: 'Email Premium',
    storage: '50GB',
    price: 36000, // Base price per year per account
    features: ['Proteção anti-spam premium', 'Acesso web e mobile', 'Suporte VIP 24/7', 'Calendário e contatos compartilhados', 'Colaboração em tempo real']
  }
];

const ShoppingCart = () => {
  const { items, removeItem, getTotalPrice, getContactProfiles, addItem } = useCart();
  const navigate = useNavigate();
  const contactProfiles = getContactProfiles();
  const [selectedEmailPlan, setSelectedEmailPlan] = useState<string | null>(null);
  const [emailAccounts, setEmailAccounts] = useState<number>(5);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("1"); // Default to 1 year
  
  const hasDomain = items.some(item => item.type === 'domain');
  const hasEmailPlan = items.some(item => item.type === 'email');
  
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

  const getDomainNames = (): string[] => {
    return items
      .filter(item => item.type === 'domain')
      .map(item => item.details.domainName as string);
  };
  
  const handleAddEmailPlan = () => {
    if (!selectedEmailPlan) {
      toast.error('Por favor, selecione um plano de email');
      return;
    }
    
    const plan = emailPlans.find(p => p.id === selectedEmailPlan);
    if (!plan) return;
    
    const years = parseInt(selectedPeriod);
    let discount = 0;
    if (years === 2) discount = 0.10; // 10% discount for 2 years
    if (years === 3) discount = 0.20; // 20% discount for 3 years
    
    const domainName = getDomainNames()[0] || '';
    const price = plan.price * years * emailAccounts * (1 - discount);
    
    addItem({
      id: `${plan.id}-${Date.now()}`,
      type: 'email',
      name: `${plan.title} (${emailAccounts} contas)`,
      price: price,
      period: 'yearly',
      details: {
        storage: plan.storage,
        antispam: plan.id === 'email-start' ? 'Básico' : (plan.id === 'email-business' ? 'Avançado' : 'Premium'),
        quantity: emailAccounts,
        domainName: domainName,
        contractYears: years,
        renewalPrice: plan.price * emailAccounts
      }
    });
    
    toast.success(`Plano de email ${plan.title} adicionado ao carrinho!`);
    setSelectedEmailPlan(null);
  };

  const getDiscountedPrice = (basePrice: number, years: number) => {
    let discount = 0;
    if (years === 2) discount = 0.10; // 10% discount for 2 years
    if (years === 3) discount = 0.20; // 20% discount for 3 years
    
    return basePrice * years * (1 - discount);
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
              
              {/* Email Plans Recommendation */}
              {hasDomain && !hasEmailPlan && (
                <Card className="mt-8 border-2 border-orange-200">
                  <CardHeader className="bg-orange-50">
                    <CardTitle className="flex items-center">
                      <Mail className="h-5 w-5 mr-2 text-orange-500" />
                      Adicione E-mail Profissional ao seu Domínio
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {emailPlans.map((plan) => (
                        <div 
                          key={plan.id} 
                          className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${selectedEmailPlan === plan.id ? 'border-orange-500 bg-orange-50' : 'hover:border-orange-300'}`}
                          onClick={() => setSelectedEmailPlan(plan.id)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold">{plan.title}</h3>
                            {selectedEmailPlan === plan.id && (
                              <div className="bg-orange-500 text-white rounded-full p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mb-2">{plan.storage} de armazenamento</p>
                          <ul className="text-sm space-y-1 mb-3">
                            {plan.features.map((feature, i) => (
                              <li key={i} className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-1 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <p className="font-medium text-orange-600">A partir de {plan.price.toLocaleString('pt-AO')} Kz/ano por conta</p>
                        </div>
                      ))}
                    </div>
                    
                    {selectedEmailPlan && (
                      <div className="mt-6 border-t pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Quantidade de contas</label>
                            <Input 
                              type="number" 
                              min="1" 
                              value={emailAccounts} 
                              onChange={(e) => setEmailAccounts(parseInt(e.target.value) || 1)} 
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Período de contratação</label>
                            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                              <SelectTrigger id="period">
                                <SelectValue placeholder="Selecione o período" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1 ano</SelectItem>
                                <SelectItem value="2">2 anos (10% desconto)</SelectItem>
                                <SelectItem value="3">3 anos (20% desconto)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        {selectedEmailPlan && (
                          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-between">
                              <span className="font-medium">Plano selecionado:</span>
                              <span>{emailPlans.find(p => p.id === selectedEmailPlan)?.title}</span>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span className="font-medium">Contas:</span>
                              <span>{emailAccounts}</span>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span className="font-medium">Período:</span>
                              <span>{selectedPeriod} {parseInt(selectedPeriod) === 1 ? 'ano' : 'anos'}</span>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span className="font-medium">Preço por ano:</span>
                              <span>{(emailPlans.find(p => p.id === selectedEmailPlan)?.price || 0).toLocaleString('pt-AO')} Kz</span>
                            </div>
                            {parseInt(selectedPeriod) > 1 && (
                              <div className="flex justify-between mt-1 text-green-600">
                                <span className="font-medium">Desconto:</span>
                                <span>{parseInt(selectedPeriod) === 2 ? '10%' : '20%'}</span>
                              </div>
                            )}
                            <div className="flex justify-between mt-2 pt-2 border-t">
                              <span className="font-medium">Total:</span>
                              <span className="font-bold">
                                {getDiscountedPrice(
                                  (emailPlans.find(p => p.id === selectedEmailPlan)?.price || 0) * emailAccounts,
                                  parseInt(selectedPeriod)
                                ).toLocaleString('pt-AO')} Kz
                              </span>
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-6 flex justify-end">
                          <Button 
                            variant="outline" 
                            className="mr-2"
                            onClick={() => setSelectedEmailPlan(null)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cancelar
                          </Button>
                          <Button 
                            className="bg-orange-500 hover:bg-orange-600"
                            onClick={handleAddEmailPlan}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Adicionar ao Carrinho
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
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
