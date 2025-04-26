
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import PricingCard from '@/components/PricingCard';
import PlanComparisonTable from './PlanComparisonTable';
import { PlanComparison } from '@/types/pricing';

const emailComparisons: PlanComparison[] = [
  { feature: "Espaço", basic: "5GB", professional: "15GB", enterprise: "50GB" },
  { feature: "Anti-spam", basic: "Básico", professional: "Avançado", enterprise: "Premium" },
  { feature: "Antivírus", basic: false, professional: true, enterprise: true },
  { feature: "Arquivamento", basic: false, professional: false, enterprise: true }
];

const EmailPlansContent = () => {
  return (
    <TabsContent value="email" className="w-full">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-center mb-2">Planos de Email Corporativo</h3>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          Soluções profissionais de email para sua empresa com proteção avançada
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PricingCard 
          id="email-start" 
          type="email" 
          title="Plano Start" 
          price={1500} 
          features={[
            "5GB por Caixa Postal",
            "Webmail Responsivo",
            "Proteção Anti-spam",
            "Suporte 24/7"
          ]} 
        />
        <PricingCard 
          id="email-business" 
          type="email" 
          title="Plano Business" 
          price={3000} 
          features={[
            "15GB por Caixa Postal",
            "Webmail Responsivo",
            "Proteção Anti-spam e Antivírus",
            "Calendário Compartilhado",
            "Suporte Prioritário 24/7"
          ]} 
          isPopular 
        />
        <PricingCard 
          id="email-enterprise" 
          type="email" 
          title="Plano Enterprise" 
          price={6000} 
          features={[
            "50GB por Caixa Postal",
            "Webmail Responsivo",
            "Proteção Anti-spam e Antivírus",
            "Calendário e Contatos Compartilhados",
            "Arquivamento de Email",
            "Suporte Prioritário 24/7"
          ]} 
        />
      </div>
      
      <div className="mt-12 overflow-x-auto">
        <h4 className="text-xl font-semibold mb-4 text-center">Comparativo de Planos</h4>
        <PlanComparisonTable comparisons={emailComparisons} />
      </div>
    </TabsContent>
  );
};

export default EmailPlansContent;
