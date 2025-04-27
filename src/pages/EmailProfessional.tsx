
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Mail, Minus, Plus, Loader2 } from 'lucide-react';
import DomainSearchForm from '@/components/DomainSearchForm';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface EmailPlan {
  id: string;
  title: string;
  price: number;
  renewalPrice: number;
  storage: string;
  features: string[];
  isPopular?: boolean;
  minQuantity: number;
  maxQuantity: number;
}

interface DomainOption {
  type: 'existing' | 'new';
  domainName?: string;
}

const EmailProfessional = () => {
  const navigate = useNavigate();
  const { addItem, hasDomainInCart, getDomainNames } = useCart();
  
  const [selectedPlan, setSelectedPlan] = useState<EmailPlan | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isQuantityDialogOpen, setIsQuantityDialogOpen] = useState(false);
  const [isDomainDialogOpen, setIsDomainDialogOpen] = useState(false);
  const [domainOption, setDomainOption] = useState<DomainOption>({ type: 'new' });
  const [existingDomain, setExistingDomain] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [domainsInCart, setDomainsInCart] = useState<string[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState("1");
  
  // Get domains from cart
  useEffect(() => {
    setDomainsInCart(getDomainNames());
  }, [getDomainNames]);
  
  const emailPlans: EmailPlan[] = [
    {
      id: "email-premium",
      title: "Email Premium",
      price: 12000,
      renewalPrice: 14500,
      storage: "5GB",
      minQuantity: 1,
      maxQuantity: 10,
      features: [
        "5GB por Usuário",
        "IMAP/POP",
        "Reputação do IP limpo",
        "Classificado pelo Google",
        "Suporte 24/7"
      ]
    },
    {
      id: "email-pro",
      title: "Avançado Pro",
      price: 40000,
      renewalPrice: 42000,
      storage: "50GB",
      minQuantity: 3,
      maxQuantity: 20,
      isPopular: true,
      features: [
        "50GB por Usuário",
        "Regras de Encaminhamento",
        "Aliases de email",
        "Verificação Antivírus",
        "Anti-spam avançado",
        "Infraestrutura baseada na cloud",
        "Suporte Prioritário 24/7"
      ]
    },
    {
      id: "email-business",
      title: "Business",
      price: 30000,
      renewalPrice: 32000,
      storage: "30GB",
      minQuantity: 5,
      maxQuantity: 50,
      features: [
        "30GB por Usuário",
        "IMAP/POP",
        "Reputação do IP limpo",
        "Classificado pelo Google",
        "Suporte VIP 24/7"
      ]
    }
  ];

  const getDiscountedPrice = (basePrice: number, years: number) => {
    let discount = 0;
    if (years === 2) discount = 0.10;
    if (years === 3) discount = 0.20;
    return Math.round(basePrice * years * (1 - discount));
  };

  const handleSelectPlan = (plan: EmailPlan) => {
    setSelectedPlan(plan);
    setQuantity(plan.minQuantity);
    setIsQuantityDialogOpen(true);
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
  
  const handleQuantityConfirm = () => {
    setIsQuantityDialogOpen(false);
    
    // Check if we need to ask about domain
    if (!hasDomainInCart() && domainsInCart.length === 0) {
      setIsDomainDialogOpen(true);
    } else if (domainsInCart.length > 0) {
      // If there are domains in the cart, pre-select the first one
      setDomainOption({ 
        type: 'existing', 
        domainName: domainsInCart[0] 
      });
      setExistingDomain(domainsInCart[0]);
      setIsDomainDialogOpen(true);
    } else {
      // If there's already a domain in the cart, proceed to add to cart
      handleAddToCart();
    }
  };
  
  const handleDomainOptionConfirm = () => {
    setIsDomainDialogOpen(false);
    
    if (domainOption.type === 'new') {
      // Navigate to domain registration
      if (selectedPlan) {
        // Store selected plan data in session storage
        sessionStorage.setItem('pendingEmailPlan', JSON.stringify({
          id: selectedPlan.id,
          title: selectedPlan.title,
          price: selectedPlan.price,
          storage: selectedPlan.storage,
          quantity: quantity
        }));
        
        navigate('/dominios/registrar');
      }
    } else {
      // Use existing domain
      handleAddToCart();
    }
  };
  
  const handleAddToCart = () => {
    if (!selectedPlan) return;
    
    setIsLoading(true);
    
    // Calculate price with discount based on period
    const years = parseInt(selectedPeriod);
    const totalPrice = getDiscountedPrice(selectedPlan.price * quantity, years);
    
    // Simulate some processing delay
    setTimeout(() => {
      const newItem = {
        id: `${selectedPlan.id}-${Date.now()}`,
        type: 'email',
        name: `${selectedPlan.title} (${quantity} contas)`,
        price: totalPrice,
        period: 'yearly',
        details: {
          storage: selectedPlan.storage,
          antispam: selectedPlan.id === 'email-premium' ? 'Básico' : (selectedPlan.id === 'email-pro' ? 'Avançado' : 'Básico'),
          quantity: quantity,
          domainName: domainOption.type === 'existing' ? existingDomain : undefined,
          contractYears: years,
          renewalPrice: selectedPlan.price * quantity
        }
      };
      
      addItem(newItem as any);
      toast.success(`${newItem.name} adicionado ao carrinho!`);
      setIsLoading(false);
      navigate('/carrinho');
    }, 800);
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
                    <span className="ml-1 text-xl font-semibold">/ano por conta</span>
                  </div>
                  
                  {plan.renewalPrice !== plan.price && (
                    <div className="mt-1 text-sm text-gray-500">
                      Renovação: {plan.renewalPrice.toLocaleString('pt-AO')} Kz/ano por conta
                    </div>
                  )}
                  
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
      
      {/* Quantity Selection Dialog */}
      <Dialog open={isQuantityDialogOpen} onOpenChange={setIsQuantityDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Selecione a Quantidade</DialogTitle>
            <DialogDescription>
              {selectedPlan && `Configure o número de contas para o ${selectedPlan.title}`}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-center">
                <p className="mb-2 text-sm">Quantidade de contas de email:</p>
                <div className="flex items-center justify-center">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={!selectedPlan || quantity <= selectedPlan.minQuantity}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-6 text-xl font-medium">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={!selectedPlan || quantity >= selectedPlan.maxQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {selectedPlan && (
                  <p className="text-sm text-gray-500 mt-2">
                    Min: {selectedPlan.minQuantity} / Max: {selectedPlan.maxQuantity} contas
                  </p>
                )}
              </div>
              
              <div className="w-full border-t border-gray-200 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Período:</span>
                  <div className="space-x-2">
                    <Button 
                      variant={selectedPeriod === "1" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedPeriod("1")}
                    >
                      1 ano
                    </Button>
                    <Button 
                      variant={selectedPeriod === "2" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedPeriod("2")}
                    >
                      2 anos (10% desc.)
                    </Button>
                    <Button 
                      variant={selectedPeriod === "3" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedPeriod("3")}
                    >
                      3 anos (20% desc.)
                    </Button>
                  </div>
                </div>
              </div>
              
              {selectedPlan && (
                <div className="w-full border-t border-gray-200 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Preço por conta:</span>
                    <span>{selectedPlan.price.toLocaleString('pt-AO')} Kz/ano</span>
                  </div>
                  {parseInt(selectedPeriod) > 1 && (
                    <div className="flex justify-between text-green-600 mb-2">
                      <span>Desconto:</span>
                      <span>{selectedPeriod === "2" ? "10%" : "20%"}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total:</span>
                    <span>{getDiscountedPrice(selectedPlan.price * quantity, parseInt(selectedPeriod)).toLocaleString('pt-AO')} Kz</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setIsQuantityDialogOpen(false)}>
              Cancelar
            </Button>
            <Button type="button" onClick={handleQuantityConfirm}>
              Continuar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Domain Selection Dialog */}
      <Dialog open={isDomainDialogOpen} onOpenChange={setIsDomainDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Escolha um Domínio</DialogTitle>
            <DialogDescription>
              Seu email profissional precisa estar associado a um domínio.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <RadioGroup 
              defaultValue={domainOption.type} 
              className="space-y-4"
              onValueChange={(value) => setDomainOption({ type: value as 'existing' | 'new' })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="new" id="new-domain" />
                <Label htmlFor="new-domain">Quero registrar um novo domínio</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="existing" id="existing-domain" />
                <Label htmlFor="existing-domain">Já tenho um domínio</Label>
              </div>
            </RadioGroup>
            
            {domainOption.type === 'existing' && (
              <div className="mt-4">
                {domainsInCart.length > 0 ? (
                  <div className="space-y-3">
                    <Label>Selecione um domínio do seu carrinho:</Label>
                    <RadioGroup 
                      value={existingDomain}
                      onValueChange={setExistingDomain}
                      className="space-y-2"
                    >
                      {domainsInCart.map(domain => (
                        <div key={domain} className="flex items-center space-x-2">
                          <RadioGroupItem value={domain} id={domain} />
                          <Label htmlFor={domain}>{domain}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Label htmlFor="domain-name">Nome do domínio:</Label>
                    <Input 
                      id="domain-name" 
                      placeholder="exemplo.co.ao" 
                      value={existingDomain} 
                      onChange={(e) => setExistingDomain(e.target.value)} 
                    />
                    <p className="text-sm text-gray-500">
                      Você precisará configurar os registros DNS deste domínio para usar nosso serviço de email.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setIsDomainDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              type="button" 
              onClick={handleDomainOptionConfirm}
              disabled={domainOption.type === 'existing' && !existingDomain}
            >
              Continuar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-lg font-medium">Processando...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailProfessional;
