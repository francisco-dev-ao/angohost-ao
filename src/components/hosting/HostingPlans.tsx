
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PricingCard from '@/components/PricingCard';

export const HostingPlans = () => {
  return (
    <section id="plans" className="py-16 px-4 bg-gray-50">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Planos de Hospedagem</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Escolha o plano ideal para o seu projeto ou negócio
          </p>
        </div>

        <Tabs defaultValue="shared" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="shared">cPanel</TabsTrigger>
            <TabsTrigger value="wordpress">WordPress</TabsTrigger>
            <TabsTrigger value="reseller">Revenda</TabsTrigger>
          </TabsList>
          
          <TabsContent value="shared">
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
          </TabsContent>
          
          <TabsContent value="wordpress">
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
          </TabsContent>
          
          <TabsContent value="reseller">
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
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
