
import React from 'react';
import PricingCard from '@/components/PricingCard';

export const HostingPricingCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <PricingCard 
        id="iniciante" 
        type="hosting" 
        title="Iniciante" 
        price={20000} 
        features={[
          "1GB de Espaço em SSD",
          "5 Contas de Email",
          "2 Banco de Dados MySQL",
          "Certificado SSL Grátis",
          "Painel cPanel",
          "1 Site",
          "Suporte 24/7"
        ]} 
      />
      <PricingCard 
        id="especialista" 
        type="hosting" 
        title="Especialista" 
        price={50000} 
        features={[
          "5GB de Espaço em SSD",
          "20 Contas de Email",
          "10 Bancos de Dados MySQL",
          "Certificado SSL Grátis",
          "Painel cPanel",
          "5 Sites",
          "Suporte 24/7",
          "Domínio Grátis (plano anual)",
          "Backup Diário"
        ]} 
        isPopular 
      />
      <PricingCard 
        id="entusiasta" 
        type="hosting" 
        title="Entusiasta" 
        price={100000} 
        features={[
          "10GB de Espaço em SSD",
          "Email Ilimitado",
          "Bancos de Dados MySQL Ilimitados",
          "Certificado SSL Grátis",
          "Painel cPanel",
          "Sites Ilimitados",
          "Suporte 24/7 Prioritário",
          "Domínio Grátis (plano anual)",
          "Backup Diário",
          "CDN Premium"
        ]}
      />
    </div>
  );
};
