
import React from 'react';
import PricingCard from '@/components/PricingCard';

export const SharedHostingPlans = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <PricingCard
        id="starter"
        type="hosting"
        title="Plano Starter"
        price={2500}
        features={[
          "5GB de Espaço SSD",
          "1 Website",
          "10 Contas de Email",
          "Banco de Dados MySQL",
          "Certificado SSL Gratuito",
          "Painel cPanel",
          "Suporte 24/7"
        ]}
      />
      
      <PricingCard
        id="business"
        type="hosting"
        title="Plano Business"
        price={4500}
        features={[
          "20GB de Espaço SSD",
          "5 Websites",
          "30 Contas de Email",
          "Bancos de Dados MySQL Ilimitados",
          "Certificado SSL Gratuito",
          "Painel cPanel",
          "Backup Diário",
          "Suporte 24/7 Prioritário"
        ]}
        isPopular
      />
      
      <PricingCard
        id="enterprise"
        type="hosting"
        title="Plano Enterprise"
        price={8500}
        features={[
          "50GB de Espaço SSD",
          "Websites Ilimitados",
          "Email Ilimitado",
          "Bancos de Dados MySQL Ilimitados",
          "Certificado SSL Gratuito",
          "Painel cPanel",
          "Backup Diário",
          "CDN Premium",
          "Suporte 24/7 VIP"
        ]}
      />
    </div>
  );
};
