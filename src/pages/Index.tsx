
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Check, Globe, Server, Shield, Mail } from 'lucide-react';
import DomainSearchForm from '@/components/DomainSearchForm';
import FeatureCard from '@/components/FeatureCard';
import PricingCard from '@/components/PricingCard';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="domain-search-container py-20 px-4 text-white">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Registre Seu Domínio .AO</h1>
            <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto">
              Encontre o domínio perfeito para o seu negócio ou projeto em Angola
            </p>
          </div>
          
          <DomainSearchForm variant="hero" />
          
          <div className="flex flex-wrap justify-center gap-4 mt-10 text-sm">
            <div className="bg-white/20 backdrop-blur-sm py-2 px-4 rounded-full">
              .co.ao - 35.000 Kz/ano
            </div>
            <div className="bg-white/20 backdrop-blur-sm py-2 px-4 rounded-full">
              .ao - 25.000 Kz/ano
            </div>
            <div className="bg-white/20 backdrop-blur-sm py-2 px-4 rounded-full">
              .it.ao - 35.000 Kz/ano
            </div>
            <div className="bg-white/20 backdrop-blur-sm py-2 px-4 rounded-full">
              .edu.ao - 35.000 Kz/ano
            </div>
            <div className="bg-white/20 backdrop-blur-sm py-2 px-4 rounded-full">
              .com - 15.000 Kz/ano
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Serviços de Alta Qualidade</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos soluções completas em hospedagem e domínios para o mercado angolano
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Hospedagem Web"
              description="Planos de hospedagem cPanel e WordPress otimizados para alto desempenho e segurança."
              icon={<Globe className="h-6 w-6" />}
            />
            <FeatureCard
              title="Servidores Dedicados"
              description="Servidores dedicados e VPS com recursos exclusivos para seu negócio."
              icon={<Server className="h-6 w-6" />}
            />
            <FeatureCard
              title="Email Corporativo"
              description="Soluções de e-mail profissional para empresas de todos os tamanhos."
              icon={<Mail className="h-6 w-6" />}
            />
          </div>
        </div>
      </section>

      {/* Domain Registration Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Registre Seu Domínio .AO Hoje</h2>
              <p className="text-gray-700 mb-6">
                O domínio .AO é a extensão oficial de Angola, ideal para estabelecer uma presença online forte no mercado angolano. Registre agora e garanta sua identidade digital.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-700">Processo de registro rápido e simplificado</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-700">Proteção de privacidade gratuita</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-700">Suporte técnico especializado</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-700">Gerenciamento DNS completo</p>
                </li>
              </ul>
              
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
                <Link to="/dominios/registrar">
                  Registrar Domínio
                </Link>
              </Button>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-6">Verifique a disponibilidade do seu domínio</h3>
              <DomainSearchForm variant="default" />
            </div>
          </div>
        </div>
      </section>

      {/* Hosting Plans Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Planos de Hospedagem</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Escolha o plano ideal para o seu projeto ou negócio
            </p>
          </div>
          
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
        </div>
      </section>

      {/* Email Plans Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Email Corporativo</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Soluções profissionais de email para sua empresa
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              id="email-start"
              type="email"
              title="Plano Start"
              price={1500}
              features={[
                "5GB por Caixa Postal",
                "Webmail Responsivo",
                "Proteção Anti-spam",
                "Suporte 24/7"
              ]}
            />
            <PricingCard
              id="email-business"
              type="email"
              title="Plano Business"
              price={3000}
              features={[
                "15GB por Caixa Postal",
                "Webmail Responsivo",
                "Proteção Anti-spam e Antivírus",
                "Calendário Compartilhado",
                "Suporte Prioritário 24/7"
              ]}
              isPopular
            />
            <PricingCard
              id="email-enterprise"
              type="email"
              title="Plano Enterprise"
              price={6000}
              features={[
                "50GB por Caixa Postal",
                "Webmail Responsivo",
                "Proteção Anti-spam e Antivírus",
                "Calendário e Contatos Compartilhados",
                "Arquivamento de Email",
                "Suporte Prioritário 24/7"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Por Que Escolher a ANGOHOST?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Somos especialistas em hospedagem e domínios para o mercado angolano
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Serviço Angolano"
              description="Empresa 100% angolana, focada nas necessidades do mercado local."
              icon={<Globe className="h-6 w-6" />}
            />
            <FeatureCard
              title="Suporte Local"
              description="Atendimento em português por especialistas localizados em Angola."
              icon={<Mail className="h-6 w-6" />}
            />
            <FeatureCard
              title="Segurança Garantida"
              description="Proteção avançada contra ameaças e backup diário dos seus dados."
              icon={<Shield className="h-6 w-6" />}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 domain-search-container">
        <div className="container max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Comece Hoje Mesmo
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Registre seu domínio, contrate hospedagem e crie sua presença online com a ANGOHOST
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-angohost-700 hover:bg-gray-100">
              <Link to="/dominios/registrar">Registrar Domínio</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
              <Link to="/hospedagem/cpanel">Ver Planos de Hospedagem</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
