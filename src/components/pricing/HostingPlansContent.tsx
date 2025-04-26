
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import PricingCard from '@/components/PricingCard';
import PlanComparisonTable from './PlanComparisonTable';
import { PlanComparison } from '@/types/pricing';

const hostingComparisons: PlanComparison[] = [
  { feature: "Espaço em Disco", basic: "5GB", professional: "20GB", enterprise: "50GB" },
  { feature: "Contas de Email", basic: "10", professional: "30", enterprise: "Ilimitado" },
  { feature: "Certificado SSL", basic: true, professional: true, enterprise: true },
  { feature: "Backup Diário", basic: false, professional: true, enterprise: true },
  { feature: "CDN Premium", basic: false, professional: false, enterprise: true }
];

const HostingPlansContent = () => {
  return (
    <TabsContent value="hosting" className="w-full">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-center mb-2">Planos de Hospedagem Web</h3>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          Escolha o plano ideal para o seu projeto ou negócio com recursos otimizados
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PricingCard 
          id="basic" 
          type="hosting" 
          title="Plano Básico" 
          price={2500} 
          features={[
            "5GB de Espaço em Disco",
            "10 Contas de Email",
            "Banco de Dados MySQL",
            "Certificado SSL Gratuito",
            "Painel cPanel"
          ]} 
        />
        <PricingCard 
          id="professional" 
          type="hosting" 
          title="Plano Profissional" 
          price={4500} 
          features={[
            "20GB de Espaço em Disco",
            "30 Contas de Email",
            "Banco de Dados MySQL Ilimitados",
            "Certificado SSL Gratuito",
            "Painel cPanel",
            "Backup Diário"
          ]} 
          isPopular 
        />
        <PricingCard 
          id="enterprise" 
          type="hosting" 
          title="Plano Empresarial" 
          price={8500} 
          features={[
            "50GB de Espaço em Disco",
            "Email Ilimitado",
            "Banco de Dados MySQL Ilimitados",
            "Certificado SSL Gratuito",
            "Painel cPanel",
            "Backup Diário",
            "CDN Premium"
          ]}
        />
      </div>
      
      <div className="mt-12 overflow-x-auto">
        <h4 className="text-xl font-semibold mb-4 text-center">Comparativo de Planos</h4>
        <PlanComparisonTable comparisons={hostingComparisons} />
      </div>
    </TabsContent>
  );
};

export default HostingPlansContent;
