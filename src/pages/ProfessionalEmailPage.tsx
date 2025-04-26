
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, Mail, Shield } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import PricingCard from '@/components/PricingCard';

const ProfessionalEmailPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-angohost-700 to-angohost-800 text-white">
        <div className="container max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Email Profissional</h1>
            <p className="text-xl mb-8">
              Comunique-se com seus clientes usando um email profissional com o nome da sua empresa
            </p>
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
              <Link to="#plans">Ver Planos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Por Que Usar Email Profissional?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tenha uma imagem profissional e confiável para sua marca
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Mail className="h-10 w-10 mb-4 text-angohost-600" />
              <h3 className="text-xl font-semibold mb-3">Sua Marca em Destaque</h3>
              <p className="text-gray-600">
                Use um endereço de email com o nome da sua empresa (nome@suaempresa.com) para fortalecer sua marca.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Shield className="h-10 w-10 mb-4 text-angohost-600" />
              <h3 className="text-xl font-semibold mb-3">Segurança Avançada</h3>
              <p className="text-gray-600">
                Proteção anti-spam e antivírus para manter suas comunicações seguras e livres de ameaças.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Check className="h-10 w-10 mb-4 text-angohost-600" />
              <h3 className="text-xl font-semibold mb-3">Confiabilidade</h3>
              <p className="text-gray-600">
                Entrega garantida de suas mensagens com servidores de alta disponibilidade e desempenho.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-16 px-4 bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nossos Planos de Email</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Escolha o plano ideal para o seu negócio
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
                "Até 5 Endereços de Email",
                "Webmail Responsivo",
                "Acesso POP3/IMAP/SMTP",
                "Proteção Anti-spam",
                "Configuração no Celular",
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
                "Até 10 Endereços de Email",
                "Webmail Responsivo",
                "Acesso POP3/IMAP/SMTP",
                "Proteção Anti-spam e Antivírus",
                "Calendário Compartilhado",
                "Configuração no Celular",
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
                "Até 20 Endereços de Email",
                "Webmail Responsivo",
                "Acesso POP3/IMAP/SMTP",
                "Proteção Anti-spam e Antivírus",
                "Calendário e Contatos Compartilhados",
                "Arquivamento de Email",
                "Configuração no Celular",
                "Suporte VIP 24/7"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recursos Incluídos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Todos os nossos planos de email incluem estes recursos essenciais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-700"><span className="font-semibold">Webmail Responsivo</span> - Acesse seus emails de qualquer dispositivo com interface amigável</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-700"><span className="font-semibold">Proteção Anti-spam</span> - Filtros avançados que reduzem significativamente o spam</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-700"><span className="font-semibold">Acesso Multi-dispositivo</span> - Sincronize seus emails, contatos e calendário em todos os dispositivos</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-700"><span className="font-semibold">POP3/IMAP/SMTP</span> - Compatível com os principais clientes de email</p>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-700"><span className="font-semibold">Backup Diário</span> - Seus emails são protegidos com backups automáticos</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-700"><span className="font-semibold">Suporte Técnico</span> - Equipe especializada disponível 24/7</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-700"><span className="font-semibold">Migração Gratuita</span> - Transferimos seus emails atuais sem custos adicionais</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-700"><span className="font-semibold">Painel de Controle</span> - Gerencie facilmente suas contas de email</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Perguntas Frequentes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Respostas para as perguntas mais comuns sobre email profissional
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Preciso ter um domínio próprio para usar o email profissional?</h3>
              <p className="text-gray-600">
                Sim, é necessário ter um domínio registrado. Se você ainda não possui um, podemos ajudá-lo a registrar um domínio junto com seu serviço de email.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Como faço para configurar meu email em dispositivos móveis?</h3>
              <p className="text-gray-600">
                Fornecemos guias passo a passo para configuração em dispositivos iOS e Android. Além disso, nossa equipe de suporte está disponível para ajudar com a configuração.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">É possível migrar meus emails atuais para o novo serviço?</h3>
              <p className="text-gray-600">
                Sim, oferecemos migração gratuita dos seus emails existentes para nosso serviço, garantindo que você não perca nenhuma informação importante.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Posso aumentar o número de contas de email posteriormente?</h3>
              <p className="text-gray-600">
                Sim, é possível aumentar o número de contas de email a qualquer momento, conforme o crescimento da sua empresa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-angohost-700 text-white">
        <div className="container max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para profissionalizar sua comunicação?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Comece agora com nossos planos de email profissional
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

export default ProfessionalEmailPage;
