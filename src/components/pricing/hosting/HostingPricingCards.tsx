
import React from 'react';
import PricingCard from '@/components/PricingCard';

export const HostingPricingCards = () => {
  return (
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
  );
};
