
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Check, Globe, Server, Shield, Mail, Star, Users, Award, Zap } from 'lucide-react';
import DomainSearchForm from '@/components/DomainSearchForm';
import FeatureCard from '@/components/FeatureCard';
import PricingCard from '@/components/PricingCard';
import TestimonialsSection from '@/components/TestimonialsSection';
import ClientLogosSection from '@/components/ClientLogosSection';
import PlanCategories from '@/components/PlanCategories';

const Index = () => {
  return <div className="flex flex-col min-h-screen">
      {/* Hero Section - Updated with more focus and better layout */}
      <section className="domain-search-container py-20 px-4 text-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40 z-0"></div>
        <img src="/lovable-uploads/198cbc98-86c6-4598-8d0a-bed3b41b6d9f.png" alt="Equipe AngoHost" className="absolute inset-0 w-full h-full object-cover -z-10" />
        <div className="container max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="text-left mb-10 md:mb-0 md:w-1/2">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Sua Presença Online <br/>Começa Aqui</h1>
              <p className="text-xl md:text-2xl mb-6">
                Hospedagem confiável, domínios .AO e soluções completas para o mercado angolano
              </p>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 mr-4">
                <Link to="/dominios/registrar">
                  Registrar Domínio
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                <Link to="/hospedagem/cpanel">Ver Planos</Link>
              </Button>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold">Encontre o Domínio Perfeito</h2>
                </div>
                <DomainSearchForm variant="hero" />
                
                <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
                  <div className="bg-white/20 backdrop-blur-sm py-2 px-4 rounded-full">
                    .co.ao - 35.000 Kz/ano
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm py-2 px-4 rounded-full">
                    .ao - 25.000 Kz/ano
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm py-2 px-4 rounded-full">
                    .com - 15.000 Kz/ano
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Redesigned */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Serviços de Alta Qualidade</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos soluções completas em hospedagem e domínios para o mercado angolano
            </p>
          </div>
          
          {/* Plan Categories Section */}
          <PlanCategories />
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard title="Hospedagem Web" description="Planos de hospedagem cPanel e WordPress otimizados para alto desempenho e segurança." icon={<Globe className="h-6 w-6" />} />
            <FeatureCard title="Servidores Dedicados" description="Servidores dedicados e VPS com recursos exclusivos para seu negócio." icon={<Server className="h-6 w-6" />} />
            <FeatureCard title="Email Corporativo" description="Soluções de e-mail profissional para empresas de todos os tamanhos." icon={<Mail className="h-6 w-6" />} />
          </div>
        </div>
      </section>

      {/* Features with Image Section - New Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative rounded-lg overflow-hidden h-[400px]">
                {/* Espaço para imagem - pode ser substituída posteriormente */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60 flex items-center justify-center text-white">
                  <p className="text-lg font-semibold">Espaço para foto de equipe/escritório</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Transforme Sua Ideia em Realidade</h2>
              <p className="text-gray-700 mb-8">
                A ANGOHOST oferece tudo que você precisa para criar uma presença online profissional e de alta performance. Nossos serviços são projetados para empresas e empreendedores angolanos que buscam qualidade e suporte local.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Performance Garantida</h3>
                    <p className="text-sm text-gray-600">Servidores otimizados para máxima velocidade</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Segurança Total</h3>
                    <p className="text-sm text-gray-600">Proteção contra ameaças e backups diários</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Suporte Local</h3>
                    <p className="text-sm text-gray-600">Atendimento em português por especialistas</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Qualidade Certificada</h3>
                    <p className="text-sm text-gray-600">Empresa reconhecida no mercado angolano</p>
                  </div>
                </div>
              </div>
              
              <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90">
                <Link to="/hospedagem/cpanel">
                  Conheça Nossos Serviços
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Domain Registration Section */}
      <section className="py-20 px-4 bg-gray-50">
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
            
            <div className="relative rounded-lg overflow-hidden h-[400px] shadow-xl">
              {/* Espaço para imagem - pode ser substituída posteriormente */}
              <div className="absolute inset-0 bg-gradient-to-r from-angohost-500 to-angohost-700 flex items-center justify-center text-white">
                <p className="text-lg font-semibold">Espaço para imagem sobre domínios</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Client Logos Section */}
      <ClientLogosSection />

      {/* Hosting Plans Section - Redesigned */}
      <section className="px-4 bg-gray-50 py-[75px] rounded-none">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Planos de Hospedagem</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Escolha o plano ideal para o seu projeto ou negócio
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard id="basic" type="hosting" title="Plano Básico" price={2500} features={["5GB de Espaço em Disco", "10 Contas de Email", "Banco de Dados MySQL", "Certificado SSL Gratuito", "Painel cPanel"]} />
            <PricingCard id="professional" type="hosting" title="Plano Profissional" price={4500} features={["20GB de Espaço em Disco", "30 Contas de Email", "Banco de Dados MySQL Ilimitados", "Certificado SSL Gratuito", "Painel cPanel", "Backup Diário"]} isPopular />
            <PricingCard id="enterprise" type="hosting" title="Plano Empresarial" price={8500} features={["50GB de Espaço em Disco", "Email Ilimitado", "Banco de Dados MySQL Ilimitados", "Certificado SSL Gratuito", "Painel cPanel", "Backup Diário", "CDN Premium"]} />
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
            <PricingCard id="email-start" type="email" title="Plano Start" price={1500} features={["5GB por Caixa Postal", "Webmail Responsivo", "Proteção Anti-spam", "Suporte 24/7"]} />
            <PricingCard id="email-business" type="email" title="Plano Business" price={3000} features={["15GB por Caixa Postal", "Webmail Responsivo", "Proteção Anti-spam e Antivírus", "Calendário Compartilhado", "Suporte Prioritário 24/7"]} isPopular />
            <PricingCard id="email-enterprise" type="email" title="Plano Enterprise" price={6000} features={["50GB por Caixa Postal", "Webmail Responsivo", "Proteção Anti-spam e Antivírus", "Calendário e Contatos Compartilhados", "Arquivamento de Email", "Suporte Prioritário 24/7"]} />
          </div>
        </div>
      </section>

      {/* Features Grid Section - New Section */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Migração de Sites sem Complicações</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Transferência gratuita e sem interrupção do seu site ou email
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
              <div className="rounded-full bg-white/20 w-12 h-12 flex items-center justify-center mb-6">
                <span className="font-bold text-2xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Solicite a Migração</h3>
              <p>Entre em contato com nossa equipe e solicite a transferência do seu site ou email.</p>
              <Button className="mt-6 bg-white text-primary hover:bg-gray-100">
                Saiba Mais
              </Button>
            </div>
            
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
              <div className="rounded-full bg-white/20 w-12 h-12 flex items-center justify-center mb-6">
                <span className="font-bold text-2xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Equipe Especializada</h3>
              <p>Nossa equipe de especialistas cuida de todo o processo de migração sem perda de dados.</p>
              <Button className="mt-6 bg-white text-primary hover:bg-gray-100">
                Saiba Mais
              </Button>
            </div>
            
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
              <div className="rounded-full bg-white/20 w-12 h-12 flex items-center justify-center mb-6">
                <span className="font-bold text-2xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Site no Ar</h3>
              <p>Após a migração, seu site estará online em nossa infraestrutura, mais rápido e seguro.</p>
              <Button className="mt-6 bg-white text-primary hover:bg-gray-100">
                Saiba Mais
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Human Element Section - New Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-lg overflow-hidden h-[500px] shadow-xl">
              {/* Espaço para imagem de um técnico/especialista */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white">
                <p className="text-lg font-semibold">Espaço para foto de especialista/técnico</p>
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-4">
                <Star className="text-yellow-400 h-6 w-6 mr-1" />
                <Star className="text-yellow-400 h-6 w-6 mr-1" />
                <Star className="text-yellow-400 h-6 w-6 mr-1" />
                <Star className="text-yellow-400 h-6 w-6 mr-1" />
                <Star className="text-yellow-400 h-6 w-6" />
              </div>
              
              <h2 className="text-3xl font-bold mb-6">Suporte Técnico Especializado</h2>
              <p className="text-xl text-gray-600 mb-6">
                "Nossa missão é garantir que sua presença online funcione perfeitamente. Nossa equipe técnica está disponível 24/7 para resolver qualquer problema."
              </p>
              
              <div className="mb-8">
                <h3 className="font-bold text-xl">Miguel Santos</h3>
                <p className="text-gray-600">Diretor Técnico, ANGOHOST</p>
              </div>
              
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/contato">
                  Fale com Nossa Equipe
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Redesigned */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Por Que Escolher a ANGOHOST?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Somos especialistas em hospedagem e domínios para o mercado angolano
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard title="Serviço Angolano" description="Empresa 100% angolana, focada nas necessidades do mercado local." icon={<Globe className="h-6 w-6" />} />
            <FeatureCard title="Suporte Local" description="Atendimento em português por especialistas localizados em Angola." icon={<Mail className="h-6 w-6" />} />
            <FeatureCard title="Segurança Garantida" description="Proteção avançada contra ameaças e backup diário dos seus dados." icon={<Shield className="h-6 w-6" />} />
          </div>
        </div>
      </section>

      {/* CTA Section - Redesigned */}
      <section className="py-16 px-4 domain-search-container relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40 z-0"></div>
        <img src="/lovable-uploads/198cbc98-86c6-4598-8d0a-bed3b41b6d9f.png" alt="Equipe AngoHost" className="absolute inset-0 w-full h-full object-cover -z-10 opacity-80" />
        <div className="container max-w-6xl mx-auto text-center relative z-10">
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

      {/* New Section - Support Feature */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Suporte em Português, 24/7</h2>
              <p className="text-gray-700 mb-6">
                Nossa equipe de especialistas está sempre pronta para ajudar você com qualquer questão técnica ou dúvida sobre nossos serviços.
              </p>
              
              <div className="bg-gray-100 p-6 rounded-lg mb-8">
                <div className="flex items-start mb-4">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email de Suporte</h3>
                    <p className="text-primary">suporte@angohost.ao</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <Server className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Centro de Ajuda</h3>
                    <p className="text-primary">ajuda.angohost.ao</p>
                  </div>
                </div>
              </div>
              
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/suporte">
                  Entrar em Contato
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-lg overflow-hidden h-[200px] shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-angohost-400 to-angohost-600 flex items-center justify-center text-white">
                  <p className="text-sm font-semibold">Foto de atendente</p>
                </div>
              </div>
              
              <div className="relative rounded-lg overflow-hidden h-[200px] shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-white">
                  <p className="text-sm font-semibold">Foto de equipe</p>
                </div>
              </div>
              
              <div className="relative rounded-lg overflow-hidden h-[200px] shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-white">
                  <p className="text-sm font-semibold">Foto de suporte</p>
                </div>
              </div>
              
              <div className="relative rounded-lg overflow-hidden h-[200px] shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-angohost-400 to-angohost-600 flex items-center justify-center text-white">
                  <p className="text-sm font-semibold">Foto de escritório</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};

export default Index;
