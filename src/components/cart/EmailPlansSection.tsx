
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Plus, X } from "lucide-react";
import { toast } from 'sonner';
import { CartItem } from '@/types/cart';

interface EmailPlan {
  id: string;
  title: string;
  storage: string;
  price: number;
  features: string[];
}

interface EmailPlansSectionProps {
  onAddPlan: (item: CartItem) => void;
  hasDomain: boolean;
  hasEmailPlan: boolean;
  getDomainNames: () => string[];
}

const emailPlans: EmailPlan[] = [
  {
    id: 'email-start',
    title: 'Email Start',
    storage: '5GB',
    price: 15000,
    features: ['Proteção anti-spam básica', 'Acesso web e mobile', 'Suporte por email']
  },
  {
    id: 'email-business',
    title: 'Email Business',
    storage: '25GB',
    price: 24000,
    features: ['Proteção anti-spam avançada', 'Acesso web e mobile', 'Suporte prioritário', 'Calendário compartilhado']
  },
  {
    id: 'email-premium',
    title: 'Email Premium',
    storage: '50GB',
    price: 36000,
    features: ['Proteção anti-spam premium', 'Acesso web e mobile', 'Suporte VIP 24/7', 'Calendário e contatos compartilhados', 'Colaboração em tempo real']
  }
];

export const EmailPlansSection: React.FC<EmailPlansSectionProps> = ({
  onAddPlan,
  hasDomain,
  hasEmailPlan,
  getDomainNames
}) => {
  const [selectedEmailPlan, setSelectedEmailPlan] = useState<string | null>(null);
  const [emailAccounts, setEmailAccounts] = useState(5);
  const [selectedPeriod, setSelectedPeriod] = useState("1");

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
    
    const plan = emailPlans.find(p => p.id === selectedEmailPlan);
    if (!plan) return;
    
    const years = parseInt(selectedPeriod);
    const domainName = getDomainNames()[0] || '';
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
        domainName: domainName,
        contractYears: years,
        renewalPrice: plan.price * emailAccounts
      }
    });
    
    toast.success(`Plano de email ${plan.title} adicionado ao carrinho!`);
    setSelectedEmailPlan(null);
  };

  if (!hasDomain || hasEmailPlan) return null;

  return (
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
  );
};
