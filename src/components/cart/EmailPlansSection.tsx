
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { toast } from 'sonner';
import { CartItem } from '@/types/cart';
import { EmailPlanCard } from './EmailPlanCard';
import { EmailPlanConfig } from './EmailPlanConfig';
import { emailPlans } from '@/data/emailPlans';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EmailPlansSectionProps {
  onAddPlan: (item: CartItem) => void;
  hasDomain: boolean;
  hasEmailPlan: boolean;
  getDomainNames: () => string[];
}

export const EmailPlansSection: React.FC<EmailPlansSectionProps> = ({
  onAddPlan,
  hasDomain,
  hasEmailPlan,
  getDomainNames
}) => {
  const [selectedEmailPlan, setSelectedEmailPlan] = useState<string | null>(null);
  const [emailAccounts, setEmailAccounts] = useState(5);
  const [selectedPeriod, setSelectedPeriod] = useState("1");
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  
  const domainNames = getDomainNames();

  const getDiscountedPrice = (basePrice: number, years: number) => {
    let discount = 0;
    if (years === 2) discount = 0.10;
    if (years === 3) discount = 0.20;
    return basePrice * years * (1 - discount);
  };

  const handleAddEmailPlan = () => {
    if (!selectedEmailPlan) {
      toast.error('Por favor, selecione um plano de email');
      return;
    }
    
    if (!selectedDomain) {
      toast.error('Por favor, selecione um domínio para o plano de email');
      return;
    }
    
    const plan = emailPlans.find(p => p.id === selectedEmailPlan);
    if (!plan) return;
    
    const years = parseInt(selectedPeriod);
    const price = getDiscountedPrice(plan.price * emailAccounts, years);
    
    onAddPlan({
      id: `${plan.id}-${Date.now()}`,
      type: 'email',
      name: `${plan.title} (${emailAccounts} contas)`,
      price: price,
      period: 'yearly',
      details: {
        storage: plan.storage,
        antispam: plan.id === 'email-start' ? 'Básico' : (plan.id === 'email-business' ? 'Avançado' : 'Premium'),
        quantity: emailAccounts,
        domainName: selectedDomain,
        contractYears: years,
        renewalPrice: plan.price * emailAccounts
      }
    });
    
    toast.success(`Plano de email ${plan.title} adicionado ao carrinho para ${selectedDomain}!`);
    setSelectedEmailPlan(null);
    setSelectedDomain(null);
  };

  // Verifica se há domínios no carrinho
  if (!hasDomain) return null;

  // Filtra domínios que já têm plano de email
  const domainsWithoutEmail = domainNames.filter(domainName => {
    // Implementar lógica para verificar se este domínio específico já tem um plano de email
    return true; // Por enquanto, mostraremos planos para todos os domínios
  });

  // Se não houver domínios disponíveis para adicionar planos de email, não mostra nada
  if (domainsWithoutEmail.length === 0) return null;

  const selectedPlan = emailPlans.find(p => p.id === selectedEmailPlan) || null;

  return (
    <Card className="mt-8 border-2 border-orange-200">
      <CardHeader className="bg-orange-50">
        <CardTitle className="flex items-center">
          <Mail className="h-5 w-5 mr-2 text-orange-500" />
          Adicione E-mail Profissional aos seus Domínios
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue={domainNames[0]} className="mb-6">
          <TabsList className="mb-4">
            {domainNames.map((domain) => (
              <TabsTrigger 
                key={domain} 
                value={domain}
                onClick={() => setSelectedDomain(domain)}
              >
                {domain}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {domainNames.map((domain) => (
            <TabsContent key={domain} value={domain}>
              <p className="mb-4 text-gray-600">Selecione um plano de email para {domain}:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {emailPlans.map((plan) => (
                  <EmailPlanCard
                    key={plan.id}
                    plan={plan}
                    isSelected={selectedEmailPlan === plan.id && selectedDomain === domain}
                    onSelect={() => {
                      setSelectedEmailPlan(plan.id);
                      setSelectedDomain(domain);
                    }}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <EmailPlanConfig
          selectedPlan={selectedPlan}
          emailAccounts={emailAccounts}
          selectedPeriod={selectedPeriod}
          onAccountsChange={setEmailAccounts}
          onPeriodChange={setSelectedPeriod}
          onCancel={() => {
            setSelectedEmailPlan(null);
            setSelectedDomain(null);
          }}
          onAdd={handleAddEmailPlan}
          getDiscountedPrice={getDiscountedPrice}
          selectedDomain={selectedDomain}
        />
      </CardContent>
    </Card>
  );
};
