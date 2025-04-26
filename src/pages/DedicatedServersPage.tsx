
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Server, Wifi, Clock, Database, HardDrive } from 'lucide-react';
import PricingCard from '@/components/PricingCard';
import FeatureCard from '@/components/FeatureCard';

const DedicatedServersPage = () => {
  const features = [
    {
      title: 'Hardware Dedicado',
      description: 'Acesso exclusivo a recursos de hardware de alta performance para as suas aplicações mais exigentes.',
      icon: <Server className="w-6 h-6" />
    },
    {
      title: 'Largura de Banda Ilimitada',
      description: 'Tráfego ilimitado para garantir que o seu site ou aplicação esteja sempre disponível para os seus utilizadores.',
      icon: <Wifi className="w-6 h-6" />
    },
    {
      title: 'Suporte 24/7',
      description: 'Equipa técnica disponível 24 horas por dia, 7 dias por semana para assistência imediata.',
      icon: <Clock className="w-6 h-6" />
    },
    {
      title: 'Backup Diário',
      description: 'Cópias de segurança automáticas diárias para proteger os seus dados contra perdas acidentais.',
      icon: <Database className="w-6 h-6" />
    },
    {
      title: 'Painel de Controle',
      description: 'Interface intuitiva para gestão completa do seu servidor, com todas as ferramentas necessárias.',
      icon: <HardDrive className="w-6 h-6" />
    },
    {
      title: 'Segurança Avançada',
      description: 'Proteção robusta contra ameaças cibernéticas, incluindo firewall dedicado e monitorização contínua.',
      icon: <Shield className="w-6 h-6" />
    }
  ];

  return (
    <div className="container py-12">
      <div className="text-center max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">Servidores Dedicados</h1>
        <p className="text-lg text-gray-600 mb-8">
          Desempenho máximo e controle total com nossos servidores dedicados. Ideal para aplicações de alto tráfego, 
          sites corporativos e projetos que exigem recursos exclusivos.
        </p>
        
        <div className="flex justify-center mb-8">
          <img 
            src="/public/lovable-uploads/b8702021-42ee-4d88-af7a-590e5dae0e08.png" 
            alt="ANGOHOST" 
            className="h-16 w-auto"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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

      <div className="bg-gray-50 rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Características dos Nossos Servidores Dedicados</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
      
      <div className="bg-primary/5 rounded-xl p-8 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Precisa de uma Solução Personalizada?</h2>
          <p className="text-gray-600 mb-6">
            Nossa equipe técnica está disponível para criar uma configuração de servidor que atenda 
            exatamente às necessidades do seu negócio, com hardware personalizado e configurações específicas.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Contacte-nos Agora
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DedicatedServersPage;
