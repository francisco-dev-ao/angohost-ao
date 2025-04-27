
import React from 'react';
import PricingCard from '@/components/PricingCard';

export const ResellerHostingPlans = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <PricingCard
        id="reseller-start"
        type="hosting"
        title="Revenda Start"
        price={15000}
        features={[
          "50GB de Espaço SSD",
          "10 Contas cPanel",
          "WHMCS Starter",
          "Certificados SSL Gratuitos",
          "Painel WHM",
          "Marca Branca",
          "Suporte 24/7"
        ]}
      />
      
      <PricingCard
        id="reseller-plus"
        type="hosting"
        title="Revenda Plus"
        price={25000}
        features={[
          "100GB de Espaço SSD",
          "25 Contas cPanel",
          "WHMCS Plus",
          "Certificados SSL Gratuitos",
          "Painel WHM",
          "Marca Branca",
          "IP Dedicado",
          "Suporte 24/7 Prioritário"
        ]}
        isPopular
      />
      
      <PricingCard
        id="reseller-pro"
        type="hosting"
        title="Revenda Pro"
        price={40000}
        features={[
          "200GB de Espaço SSD",
          "50 Contas cPanel",
          "WHMCS Pro",
          "Certificados SSL Gratuitos",
          "Painel WHM",
          "Marca Branca",
          "2 IPs Dedicados",
          "Nameservers Personalizados",
          "Suporte 24/7 VIP"
        ]}
      />
    </div>
  );
};
