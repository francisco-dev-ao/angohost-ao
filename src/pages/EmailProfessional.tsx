
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Mail, Minus, Plus } from 'lucide-react';
import DomainSearchForm from '@/components/DomainSearchForm';
import PricingCard from '@/components/PricingCard';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface EmailPlan {
  id: string;
  title: string;
  price: number;
  storage: string;
  features: string[];
  isPopular?: boolean;
  minQuantity: number;
  maxQuantity: number;
}

const EmailProfessional = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const [selectedPlan, setSelectedPlan] = useState<EmailPlan | null>(null);
  const [quantity, setQuantity] = useState(1);
  
  const emailPlans: EmailPlan[] = [
    {
      id: "email-start",
      title: "Plano Start",
      price: 1500,
      storage: "5GB",
      minQuantity: 1,
      maxQuantity: 10,
      features: [
        "5GB por Caixa Postal",
        "Webmail Responsivo",
        "Proteção Anti-spam",
        "Suporte 24/7"
      ]
    },
    {
      id: "email-business",
      title: "Plano Business",
      price: 3000,
      storage: "15GB",
      minQuantity: 3,
      maxQuantity: 20,
      isPopular: true,
      features: [
        "15GB por Caixa Postal",
        "Webmail Responsivo",
        "Proteção Anti-spam e Antivírus",
        "Calendário Compartilhado",
        "Suporte Prioritário 24/7"
      ]
    },
    {
      id: "email-enterprise",
      title: "Plano Enterprise",
      price: 6000,
      storage: "50GB",
      minQuantity: 5,
      maxQuantity: 50,
      features: [
        "50GB por Caixa Postal",
        "Webmail Responsivo",
        "Proteção Anti-spam e Antivírus",
        "Calendário e Contatos Compartilhados",
        "Arquivamento de Email",
        "Suporte Prioritário 24/7"
      ]
    }
  ];

  const handleSelectPlan = (plan: EmailPlan) => {
    setSelectedPlan(plan);
    setQuantity(plan.minQuantity);
  };

  const handleQuantityChange = (newValue: number) => {
    if (!selectedPlan) return;
    
    if (newValue < selectedPlan.minQuantity) {
      setQuantity(selectedPlan.minQuantity);
    } else if (newValue > selectedPlan.maxQuantity) {
      setQuantity(selectedPlan.maxQuantity);
    } else {
      setQuantity(newValue);
    }
  };
  
  const handleAddToCart = () => {
    if (!selectedPlan) return;
    
    const newItem = {
      id: `${selectedPlan.id}-${Date.now()}`,
      type: 'email',
      name: `${selectedPlan.title} (${quantity} contas)`,
      price: selectedPlan.price * quantity,
      period: 'monthly',
      details: {
        storage: selectedPlan.storage,
        antispam: selectedPlan.id === 'email-start' ? 'Básico' : (selectedPlan.id === 'email-business' ? 'Avançado' : 'Premium'),
        quantity: quantity,
        renewalPrice: selectedPlan.price * quantity
      }
    };
    
    addItem(newItem as any);
    toast.success(`${newItem.name} adicionado ao carrinho!`);
    navigate('/carrinho');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Email Profissional</h1>
        <p className="text-gray-600 mb-8">
          Soluções completas de email corporativo para empresas angolanas.
        </p>
        
        <Tabs defaultValue="plans">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="plans">Planos</TabsTrigger>
            <TabsTrigger value="info">Informações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="plans" className="mt-6">
            {!selectedPlan ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {emailPlans.map(plan => (
                  <div 
                    key={plan.id} 
                    className={`pricing-card relative rounded-xl border ${plan.isPopular ? 'border-primary shadow-lg' : 'border-gray-200'} bg-white p-6 transition-all hover:border-primary hover:shadow-md cursor-pointer`}
                    onClick={() => handleSelectPlan(plan)}
                  >
                    {plan.isPopular && (
                      <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg font-medium">Popular</span>
                    )}

                    <h3 className="text-xl font-semibold text-gray-900">{plan.title}</h3>
                    
                    <div className="mt-4 flex items-baseline text-gray-900">
                      <span className="text-3xl font-extrabold tracking-tight">{plan.price.toLocaleString('pt-AO')} Kz</span>
                      <span className="ml-1 text-xl font-semibold">/conta/mês</span>
                    </div>
                    
                    <ul className="mt-6 space-y-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0">
                            <Check className="h-5 w-5 text-green-500" />
                          </div>
                          <p className="ml-3 text-sm text-gray-700">{feature}</p>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className={`mt-8 w-full ${plan.isPopular ? 'bg-primary hover:bg-primary/90' : ''}`}
                    >
                      Selecionar Plano
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedPlan(null)}
                  >
                    Voltar aos Planos
                  </Button>
                  <h2 className="text-xl font-semibold">{selectedPlan.title}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Características do Plano</h3>
                    <ul className="space-y-3">
                      {selectedPlan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0">
                            <Check className="h-5 w-5 text-green-500" />
                          </div>
                          <p className="ml-3 text-gray-700">{feature}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-6">Configurar seu Plano</h3>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantidade de Contas de Email
                      </label>
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleQuantityChange(quantity - 1)}
                          disabled={quantity <= selectedPlan.minQuantity}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="mx-6 text-xl font-medium">{quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleQuantityChange(quantity + 1)}
                          disabled={quantity >= selectedPlan.maxQuantity}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Min: {selectedPlan.minQuantity} / Max: {selectedPlan.maxQuantity} contas
                      </p>
                    </div>
                    
                    <div className="mb-6 border-t border-gray-200 pt-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Preço por conta:</span>
                        <span>{selectedPlan.price.toLocaleString('pt-AO')} Kz/mês</span>
                      </div>
                      <div className="flex justify-between font-medium text-lg">
                        <span>Total:</span>
                        <span>{(selectedPlan.price * quantity).toLocaleString('pt-AO')} Kz/mês</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={handleAddToCart}
                    >
                      Adicionar ao Carrinho
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            <Card className="mt-12">
              <CardHeader>
                <CardTitle>Já tem um domínio?</CardTitle>
                <CardDescription>
                  Use seu domínio existente ou registre um novo para seu email profissional.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Tenho um domínio</h3>
                    <p className="text-gray-600 mb-6">
                      Se você já possui um domínio, pode usá-lo com nosso email profissional. Você só precisará atualizar os registros DNS.
                    </p>
                    <Button asChild variant="outline">
                      <Link to="/email/configurar">
                        Configurar com Meu Domínio
                      </Link>
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Quero registrar um novo domínio</h3>
                    <p className="text-gray-600 mb-6">
                      Registre um novo domínio para usar com seu email profissional.
                    </p>
                    <DomainSearchForm variant="sidebar" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="info" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Sobre Nosso Email Profissional</CardTitle>
                <CardDescription>
                  Conheça os benefícios do email corporativo para sua empresa.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Por que escolher nosso email profissional?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Mail className="h-5 w-5 text-angohost-600 mr-2" />
                          <h4 className="font-medium">Credibilidade</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Emails com seu domínio (você@suaempresa.co.ao) transmitem profissionalismo.
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Mail className="h-5 w-5 text-angohost-600 mr-2" />
                          <h4 className="font-medium">Segurança</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Proteção avançada contra spam, vírus e phishing.
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Mail className="h-5 w-5 text-angohost-600 mr-2" />
                          <h4 className="font-medium">Confiabilidade</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Disponibilidade garantida de 99,9% com backup em servidores redundantes.
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Mail className="h-5 w-5 text-angohost-600 mr-2" />
                          <h4 className="font-medium">Produtividade</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Ferramentas de colaboração para aumentar a eficiência da sua equipe.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Recursos incluídos em todos os planos</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Interface webmail responsiva acessível em qualquer dispositivo</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Configuração para clientes de email como Outlook, Apple Mail e Thunderbird</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Sincronização em tempo real com dispositivos móveis</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Proteção contra spam e malware</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Suporte técnico especializado em português</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">FAQ - Perguntas Frequentes</h3>
                    
                    <div className="divide-y">
                      <div className="py-4">
                        <h4 className="font-medium mb-2">Como configuro meu email em meus dispositivos?</h4>
                        <p className="text-gray-600">
                          Oferecemos guias detalhados para configuração em diversos clientes de email, além de suporte técnico para auxiliar no processo.
                        </p>
                      </div>
                      <div className="py-4">
                        <h4 className="font-medium mb-2">É possível migrar meus emails atuais para o novo serviço?</h4>
                        <p className="text-gray-600">
                          Sim, oferecemos serviço de migração gratuito para transferir seus emails, contatos e calendários existentes para o novo sistema.
                        </p>
                      </div>
                      <div className="py-4">
                        <h4 className="font-medium mb-2">Posso aumentar o armazenamento das caixas de email?</h4>
                        <p className="text-gray-600">
                          Sim, é possível adicionar espaço extra conforme necessário, pagando apenas pela capacidade adicional.
                        </p>
                      </div>
                      <div className="py-4">
                        <h4 className="font-medium mb-2">O email funciona mesmo sem internet?</h4>
                        <p className="text-gray-600">
                          Ao configurar um cliente de email como Outlook, você pode acessar e redigir emails offline, que serão sincronizados quando reconectar à internet.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center mt-8">
                    <Button asChild className="bg-orange-500 hover:bg-orange-600">
                      <Link to="/email/profissional?tab=plans">
                        Ver Planos de Email
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmailProfessional;
