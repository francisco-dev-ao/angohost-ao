
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import PricingCard from '@/components/PricingCard';

const DedicatedServersPage = () => {
  const features = [
    'Hardware Dedicado',
    'Largura de Banda Ilimitada',
    'IPs Dedicados',
    'Suporte 24/7',
    'Painel de Controle',
    'Backup Diário'
  ];

  return (
    <div className="container py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">Servidores Dedicados</h1>
        <p className="text-lg text-gray-600 mb-8">
          Desempenho máximo e controle total com nossos servidores dedicados
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <PricingCard
          title="Servidor Básico"
          price={45000}
          period="/mês"
          features={[
            '4 Cores CPU',
            '8GB RAM',
            '1TB HDD',
            'Tráfego Ilimitado',
            'IP Dedicado',
            '24/7 Suporte'
          ]}
          type="hosting"
          id="dedicated-basic"
        />
        <PricingCard
          title="Servidor Pro"
          price={75000}
          period="/mês"
          features={[
            '8 Cores CPU',
            '16GB RAM',
            '2TB HDD',
            'Tráfego Ilimitado',
            '2 IPs Dedicados',
            '24/7 Suporte Premium'
          ]}
          type="hosting"
          id="dedicated-pro"
          isPopular={true}
        />
        <PricingCard
          title="Servidor Enterprise"
          price={120000}
          period="/mês"
          features={[
            '16 Cores CPU',
            '32GB RAM',
            '4TB HDD',
            'Tráfego Ilimitado',
            '4 IPs Dedicados',
            'Suporte Prioritário'
          ]}
          type="hosting"
          id="dedicated-enterprise"
        />
      </div>
    </div>
  );
};

export default DedicatedServersPage;
