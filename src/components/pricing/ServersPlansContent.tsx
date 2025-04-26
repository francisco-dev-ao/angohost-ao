
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import PricingCard from '@/components/PricingCard';
import PlanComparisonTable from './PlanComparisonTable';
import { PlanComparison } from '@/types/pricing';

const serverComparisons: PlanComparison[] = [
  { feature: "Processador", basic: "4 Cores", professional: "8 Cores", enterprise: "16 Cores" },
  { feature: "Memória RAM", basic: "8GB", professional: "16GB", enterprise: "32GB" },
  { feature: "Armazenamento", basic: "1TB HDD", professional: "2TB HDD", enterprise: "4TB HDD" },
  { feature: "IPs Dedicados", basic: "1", professional: "2", enterprise: "4" }
];

const ServersPlansContent = () => {
  return (
    <TabsContent value="servers" className="w-full">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-center mb-2">Servidores Dedicados</h3>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          Servidores de alto desempenho para aplicações exigentes
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PricingCard 
          id="dedicated-basic" 
          type="hosting" 
          title="Servidor Básico" 
          price={45000} 
          features={[
            "4 Cores",
            "8GB RAM",
            "1TB HDD",
            "1 IP Dedicado",
            "Tráfego Ilimitado",
            "Gerenciamento Básico"
          ]} 
        />
        <PricingCard 
          id="dedicated-pro" 
          type="hosting" 
          title="Servidor Pro" 
          price={75000} 
          features={[
            "8 Cores",
            "16GB RAM",
            "2TB HDD",
            "2 IPs Dedicados",
            "Tráfego Ilimitado",
            "Gerenciamento Completo"
          ]} 
          isPopular 
        />
        <PricingCard 
          id="dedicated-enterprise" 
          type="hosting" 
          title="Servidor Enterprise" 
          price={120000} 
          features={[
            "16 Cores",
            "32GB RAM",
            "4TB HDD",
            "4 IPs Dedicados",
            "Tráfego Ilimitado",
            "Gerenciamento Premium"
          ]} 
        />
      </div>
      
      <div className="mt-12 overflow-x-auto">
        <h4 className="text-xl font-semibold mb-4 text-center">Comparativo de Servidores</h4>
        <PlanComparisonTable comparisons={serverComparisons} />
      </div>
    </TabsContent>
  );
};

export default ServersPlansContent;
