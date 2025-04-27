
import React from 'react';
import PricingCard from '@/components/PricingCard';

export const WordPressHostingPlans = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <PricingCard
        id="wp-basic"
        type="hosting"
        title="WordPress Básico"
        price={3500}
        features={[
          "10GB de Espaço SSD",
          "1 Website WordPress",
          "15 Contas de Email",
          "Banco de Dados MySQL",
          "WordPress Pré-instalado",
          "Certificado SSL Gratuito",
          "Painel cPanel",
          "Suporte 24/7"
        ]}
      />
      
      <PricingCard
        id="wp-pro"
        type="hosting"
        title="WordPress Pro"
        price={5500}
        features={[
          "25GB de Espaço SSD",
          "3 Websites WordPress",
          "30 Contas de Email",
          "Bancos de Dados MySQL Ilimitados",
          "WordPress Pré-instalado",
          "Certificado SSL Gratuito",
          "Painel cPanel",
          "Backup Diário",
          "Suporte 24/7 Prioritário"
        ]}
        isPopular
      />
      
      <PricingCard
        id="wp-agency"
        type="hosting"
        title="WordPress Agency"
        price={9500}
        features={[
          "50GB de Espaço SSD",
          "10 Websites WordPress",
          "Email Ilimitado",
          "Bancos de Dados MySQL Ilimitados",
          "WordPress Pré-instalado",
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
