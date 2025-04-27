import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Server, Shield } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import PricingCard from '@/components/PricingCard';

const HostingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-angohost-700 to-angohost-800 text-white">
        <div className="container max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Alojamento web Rápido</h1>
            <p className="text-xl mb-8">
              Planos de hospedagem web confiáveis e de alto desempenho para o seu site ou aplicação.
            </p>
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
              <Link to="#plans">Ver Planos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Plans Section */}
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

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recursos Incluídos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Todos os nossos planos de hospedagem incluem estes recursos essenciais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Server className="h-10 w-10 mb-4 text-angohost-600" />
              <h3 className="text-xl font-semibold mb-3">cPanel Incluído</h3>
              <p className="text-gray-600">
                Gerencie seu site facilmente com o painel de controle cPanel, o mais utilizado no mundo.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Shield className="h-10 w-10 mb-4 text-angohost-600" />
              <h3 className="text-xl font-semibold mb-3">Certificado SSL Grátis</h3>
              <p className="text-gray-600">
                Proteja seu site e melhore o SEO com certificado SSL Let's Encrypt grátis.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Server className="h-10 w-10 mb-4 text-angohost-600" />
              <h3 className="text-xl font-semibold mb-3">Backup Diário</h3>
              <p className="text-gray-600">
                Seus dados estão seguros com nossos backups automáticos diários.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Perguntas Frequentes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Respostas para as perguntas mais comuns sobre nossa hospedagem
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">O que é hospedagem cPanel?</h3>
              <p className="text-gray-600">
                Hospedagem cPanel é um serviço que permite alojar seu site na internet utilizando o painel de controle cPanel, que facilita o gerenciamento do seu site, emails, bancos de dados e outros recursos.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Posso migrar meu site atual para a ANGOHOST?</h3>
              <p className="text-gray-600">
                Sim! Oferecemos migração gratuita do seu site atual para nossa plataforma, garantindo que não haja tempo de inatividade durante o processo.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Quanto tempo leva para ativar minha hospedagem?</h3>
              <p className="text-gray-600">
                A ativação da sua hospedagem é instantânea após a confirmação do pagamento. Você receberá os dados de acesso por email em poucos minutos.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Vocês oferecem garantia de satisfação?</h3>
              <p className="text-gray-600">
                Sim, oferecemos garantia de satisfação de 30 dias. Se não estiver satisfeito com nossos serviços, devolvemos o seu dinheiro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-angohost-700 text-white">
        <div className="container max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para hospedar seu site?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Comece agora com nossos planos acessíveis e de alta qualidade
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
              <Link to="#plans">Ver Planos</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              <Link to="/contato">Fale Conosco</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HostingPage;
