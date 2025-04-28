
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PricingCard } from '@/components/PricingCard';
import { PlanCategories } from '@/components/PlanCategories';
import { FeatureCard } from '@/components/FeatureCard';
import { CallToActionSection } from '@/components/sections/CallToActionSection';
import { useShoppingCart } from '@/hooks/useShoppingCart';

// Definição dos planos de servidores dedicados
const dedicatedPlans = [
  {
    id: 'dedicated-starter',
    name: 'Starter',
    price: 99900,
    period: 'monthly',
    popular: false,
    description: 'Servidor dedicado básico para projetos menores',
    features: [
      'Intel Xeon E3-1230v6',
      '16GB RAM DDR4',
      '2 x SSD 480GB',
      'Tráfego ilimitado',
      'Proteção anti-DDoS',
      'IP Dedicado',
      'Suporte 24/7'
    ]
  },
  {
    id: 'dedicated-business',
    name: 'Business',
    price: 149900,
    period: 'monthly',
    popular: true,
    description: 'Servidor dedicado ideal para aplicações empresariais',
    features: [
      'Intel Xeon E5-2660v4',
      '32GB RAM DDR4',
      '2 x SSD NVMe 1TB',
      'Tráfego ilimitado',
      'Proteção anti-DDoS avançada',
      '2 IPs Dedicados',
      'Suporte 24/7 prioritário',
      'Backups diários'
    ]
  },
  {
    id: 'dedicated-premium',
    name: 'Premium',
    price: 249900,
    period: 'monthly',
    popular: false,
    description: 'Servidor dedicado de alta performance para grandes projetos',
    features: [
      'Intel Xeon Gold 6248R',
      '64GB RAM DDR4 ECC',
      '4 x SSD NVMe 1TB em RAID',
      'Tráfego ilimitado',
      'Proteção anti-DDoS máxima',
      '4 IPs Dedicados',
      'Suporte 24/7 VIP',
      'Backups diários',
      'Monitoramento avançado',
      'Garantia de hardware 4 horas'
    ]
  }
];

// Características dos servidores dedicados
const serverFeatures = [
  {
    title: 'Hardware Exclusivo',
    description: 'Recursos de hardware exclusivos sem compartilhamento com outros clientes',
    icon: 'server'
  },
  {
    title: 'Performance Máxima',
    description: 'Desempenho consistente sem flutuações causadas por outros usuários',
    icon: 'settings'
  },
  {
    title: 'Segurança Reforçada',
    description: 'Isolamento físico completo para seus dados e aplicações',
    icon: 'shield'
  },
  {
    title: 'Estabilidade Garantida',
    description: 'SLA de uptime de 99.9% com garantia de disponibilidade',
    icon: 'info-circle'
  },
  {
    title: 'Suporte Dedicado',
    description: 'Equipe de suporte técnico especializada disponível 24/7',
    icon: 'headset'
  },
  {
    title: 'Personalização Total',
    description: 'Liberdade para configurar e personalizar seu servidor conforme necessidade',
    icon: 'gear'
  }
];

const DedicatedServersPage = () => {
  const { addItem } = useShoppingCart();

  const handleAddToCart = (plan: any) => {
    addItem({
      id: plan.id,
      type: 'vps',
      name: `Servidor Dedicado ${plan.name}`,
      price: plan.price,
      period: plan.period,
      details: {
        plan: plan.name,
        resources: plan.features.slice(0, 4).join(', '),
        renewalPrice: plan.price
      }
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-700 py-16 px-4 text-white">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Servidores Dedicados
              </h1>
              <p className="text-xl mb-6">
                Hardware exclusivo e de alto desempenho para suas aplicações críticas. 
                Performance máxima, segurança reforçada e controle total.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                  Ver Planos
                </Button>
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                  Falar com Consultor
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/ChatGPT Image 26_04_2025, 06_25_35.png" 
                alt="Servidores Dedicados Ilustração" 
                className="rounded-lg shadow-2xl max-w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Planos Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nossos Planos de Servidores Dedicados</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Escolha o plano perfeito para suas necessidades. Do básico ao avançado, 
              todos os nossos servidores oferecem performance, segurança e suporte de primeira classe.
            </p>
          </div>

          <Tabs defaultValue="monthly" className="w-full">
            <TabsList className="grid w-full max-w-xs mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="monthly">Mensal</TabsTrigger>
              <TabsTrigger value="yearly">Anual (20% desc.)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="monthly" className="w-full">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dedicatedPlans.map(plan => (
                  <PricingCard 
                    key={plan.id}
                    title={plan.name}
                    description={plan.description}
                    price={plan.price}
                    period="mensal"
                    features={plan.features}
                    popular={plan.popular}
                    onSubscribe={() => handleAddToCart(plan)}
                    buttonText="Adicionar ao Carrinho"
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="yearly" className="w-full">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dedicatedPlans.map(plan => {
                  const yearlyPrice = Math.floor(plan.price * 12 * 0.8);
                  return (
                    <PricingCard 
                      key={`${plan.id}-yearly`}
                      title={plan.name}
                      description={plan.description}
                      price={yearlyPrice}
                      period="anual"
                      features={plan.features}
                      popular={plan.popular}
                      onSubscribe={() => handleAddToCart({...plan, price: yearlyPrice, period: 'yearly'})}
                      buttonText="Adicionar ao Carrinho"
                      savings={`Economize ${Math.floor(plan.price * 12 * 0.2 / 100).toLocaleString('pt-AO')} AOA`}
                    />
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Características Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Por que Escolher Servidores Dedicados</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Servidores dedicados fornecem o máximo em performance, segurança e confiabilidade 
              para suas aplicações críticas de negócio.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serverFeatures.map((feature, index) => (
              <FeatureCard 
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categorias Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Escolha o Servidor Ideal para Seu Projeto</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Servidores dedicados otimizados para diferentes tipos de aplicações e necessidades.
            </p>
          </div>
          
          <PlanCategories 
            categories={[
              {
                title: 'Alta Performance',
                description: 'Para aplicações que exigem o máximo de desempenho',
                features: ['Processadores de alta frequência', 'Discos NVMe ultra-rápidos', 'Rede de baixa latência'],
                icon: 'rocket'
              },
              {
                title: 'Grandes Volumes',
                description: 'Para aplicações com grandes volumes de dados',
                features: ['Armazenamento em RAID', 'Backups automatizados', 'Alta capacidade de memória'],
                icon: 'database'
              },
              {
                title: 'Missão Crítica',
                description: 'Para aplicações que não podem parar',
                features: ['Hardware redundante', 'SLA avançado', 'Monitoramento 24/7'],
                icon: 'shield'
              }
            ]}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Perguntas Frequentes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dúvidas comuns sobre nossos serviços de servidores dedicados
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>O que é um servidor dedicado?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Um servidor dedicado é um computador físico em um data center que é exclusivamente 
                   dedicado para uso de um único cliente. Diferentemente da hospedagem compartilhada ou 
                   VPS, todos os recursos do servidor são dedicados exclusivamente às suas aplicações.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Como escolher entre VPS ou Servidor Dedicado?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Escolha um VPS se você precisa de mais recursos do que hospedagem compartilhada oferece, 
                  mas com custo menor. Opte por um servidor dedicado quando precisar do máximo em performance, 
                  segurança, personalização e recursos para aplicações críticas.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Posso personalizar a configuração do meu servidor?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Sim! Oferecemos personalização completa dos nossos servidores dedicados. Se precisar 
                  de configurações específicas de hardware ou software, fale com nossa equipe para criar 
                  uma solução sob medida para sua necessidade.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>O suporte técnico está incluído em todos os planos?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Sim, todos os planos de servidores dedicados incluem suporte técnico 24/7. Os planos 
                  superiores contam com suporte prioritário e tempos de resposta ainda mais rápidos para 
                  suas solicitações.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <CallToActionSection
        title="Pronto para obter o máximo em performance?"
        description="Entre em contato com nossos consultores para uma recomendação personalizada sobre o servidor dedicado ideal para o seu negócio."
        buttonText="Falar com um Especialista"
        buttonLink="/contato"
      />
    </div>
  );
};

export default DedicatedServersPage;
