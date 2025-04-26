
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Server, Wifi, Clock, Database, HardDrive, Loader2 } from 'lucide-react';
import PricingCard from '@/components/PricingCard';
import FeatureCard from '@/components/FeatureCard';
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tables } from '@/types/supabase';

type HostingPlan = Tables<'hosting_plans'>;

const DedicatedServersPage = () => {
  const [plans, setPlans] = useState<HostingPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('hosting_plans')
          .select('*')
          .eq('type', 'dedicated')
          .order('price', { ascending: true });
        
        if (error) {
          throw new Error(error.message);
        }
        
        setPlans(data || []);
      } catch (err) {
        console.error('Error fetching dedicated server plans:', err);
        setError('Não foi possível carregar os planos de servidores dedicados.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

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

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-lg">Carregando planos...</span>
        </div>
      ) : error ? (
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <p className="text-red-600">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">Tentar novamente</Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const features = [];
            const planFeatures = plan.features as Record<string, string> || {};
            
            if (planFeatures.cpu) features.push(planFeatures.cpu + ' CPU');
            if (planFeatures.ram) features.push(planFeatures.ram + ' RAM');
            if (planFeatures.storage) features.push(planFeatures.storage);
            if (planFeatures.bandwidth) features.push('Tráfego ' + planFeatures.bandwidth);
            if (planFeatures.ips) features.push(planFeatures.ips);
            features.push('24/7 Suporte');
            
            const isPopular = plan.name.includes('Pro');
            const planId = plan.id.replace(/-/g, '_');
            
            return (
              <PricingCard
                key={plan.id}
                title={plan.name}
                price={plan.price}
                period="/mês"
                features={features}
                type="hosting"
                id={`dedicated-${planId}`}
                isPopular={isPopular}
              />
            );
          })}
        </div>
      )}

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
      
      {plans.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Compare Nossos Servidores</h2>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[180px]">Especificação</TableHead>
                  {plans.map(plan => (
                    <TableHead key={plan.id} className="text-center">
                      {plan.name.replace('Servidor Dedicado ', '')}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Processador</TableCell>
                  {plans.map(plan => {
                    const features = plan.features as Record<string, string> || {};
                    return (
                      <TableCell key={plan.id} className="text-center">{features.cpu || '-'}</TableCell>
                    );
                  })}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Memória RAM</TableCell>
                  {plans.map(plan => {
                    const features = plan.features as Record<string, string> || {};
                    return (
                      <TableCell key={plan.id} className="text-center">{features.ram || '-'}</TableCell>
                    );
                  })}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Armazenamento</TableCell>
                  {plans.map(plan => {
                    const features = plan.features as Record<string, string> || {};
                    return (
                      <TableCell key={plan.id} className="text-center">{features.storage || '-'}</TableCell>
                    );
                  })}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Largura de Banda</TableCell>
                  {plans.map(plan => {
                    const features = plan.features as Record<string, string> || {};
                    return (
                      <TableCell key={plan.id} className="text-center">{features.bandwidth || 'Ilimitado'}</TableCell>
                    );
                  })}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Endereços IP</TableCell>
                  {plans.map(plan => {
                    const features = plan.features as Record<string, string> || {};
                    return (
                      <TableCell key={plan.id} className="text-center">{features.ips || '1 IP'}</TableCell>
                    );
                  })}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Preço Mensal</TableCell>
                  {plans.map(plan => (
                    <TableCell key={plan.id} className="text-center font-bold">{plan.price.toLocaleString('pt-AO')} Kz</TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      
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
