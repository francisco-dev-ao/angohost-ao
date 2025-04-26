
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, Mail, Shield } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import PricingCard from '@/components/PricingCard';

const Office365Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-angohost-700 to-angohost-800 text-white">
        <div className="container max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Microsoft Office 365</h1>
            <p className="text-xl mb-8">
              Soluções completas de produtividade e colaboração para sua empresa
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
            <h2 className="text-3xl font-bold mb-4">Por Que Escolher o Office 365?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Aumente a produtividade da sua empresa com ferramentas integradas de colaboração
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Mail className="h-10 w-10 mb-4 text-angohost-600" />
              <h3 className="text-xl font-semibold mb-3">Email Empresarial</h3>
              <p className="text-gray-600">
                Exchange Online com caixas postais de 50GB e proteção avançada contra ameaças.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Shield className="h-10 w-10 mb-4 text-angohost-600" />
              <h3 className="text-xl font-semibold mb-3">Aplicativos Office</h3>
              <p className="text-gray-600">
                Acesso às versões completas do Word, Excel, PowerPoint e outros aplicativos Office.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Check className="h-10 w-10 mb-4 text-angohost-600" />
              <h3 className="text-xl font-semibold mb-3">Colaboração em Tempo Real</h3>
              <p className="text-gray-600">
                Teams, SharePoint e OneDrive para compartilhamento e trabalho em equipe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-16 px-4 bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Planos Office 365</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Escolha o plano ideal para o seu negócio
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              id="o365-basic"
              type="office365"
              title="Business Basic"
              price={2900}
              period="usuário/mês"
              features={[
                "Email com domínio personalizado",
                "50GB de armazenamento por caixa postal",
                "Versões web do Office",
                "1TB de armazenamento OneDrive",
                "Microsoft Teams",
                "Máximo de 300 usuários"
              ]}
            />
            
            <PricingCard
              id="o365-standard"
              type="office365"
              title="Business Standard"
              price={3900}
              period="usuário/mês"
              features={[
                "Todos os recursos do Basic",
                "Aplicativos desktop do Office",
                "Excel, Word, PowerPoint, Outlook",
                "Microsoft Access (apenas PC)",
                "Microsoft Publisher (apenas PC)",
                "Hospedagem de webinars",
                "Máximo de 300 usuários"
              ]}
              isPopular
            />
            
            <PricingCard
              id="o365-premium"
              type="office365"
              title="Business Premium"
              price={5900}
              period="usuário/mês"
              features={[
                "Todos os recursos do Standard",
                "Segurança avançada",
                "Proteção contra ameaças",
                "Gerenciamento de dispositivos",
                "Proteção de informações",
                "Arquivamento de emails",
                "Máximo de 300 usuários"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recursos Exclusivos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubra as principais vantagens do Office 365
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-700"><span className="font-semibold">Always Up-to-Date</span> - Atualizações automáticas para os aplicativos Office mais recentes</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-700"><span className="font-semibold">Microsoft Teams</span> - Chat, reuniões virtuais e colaboração em tempo real</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-700"><span className="font-semibold">OneDrive</span> - 1TB de armazenamento na nuvem para seus arquivos</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-700"><span className="font-semibold">Exchange Online</span> - Email corporativo profissional com calendário compartilhado</p>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-700"><span className="font-semibold">SharePoint Online</span> - Sites de equipe para compartilhamento de recursos</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-700"><span className="font-semibold">Acesso Multiplataforma</span> - Use em Windows, Mac, iOS e Android</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-700"><span className="font-semibold">Segurança Avançada</span> - Proteção contra malware e phishing</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-700"><span className="font-semibold">Suporte 24/7</span> - Suporte técnico especializado sempre disponível</p>
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
              Respostas para as perguntas mais comuns sobre o Office 365
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Qual a diferença entre Office 365 e Microsoft 365?</h3>
              <p className="text-gray-600">
                O Microsoft 365 é a evolução do Office 365, oferecendo os mesmos aplicativos e serviços, além de recursos adicionais de segurança e gerenciamento para empresas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Posso usar o Office 365 sem conexão com a internet?</h3>
              <p className="text-gray-600">
                Sim, os aplicativos desktop do Office 365 podem ser usados offline. Os arquivos são sincronizados automaticamente quando você se reconecta à internet.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Como é feita a migração para o Office 365?</h3>
              <p className="text-gray-600">
                Nossa equipe especializada realiza toda a migração, garantindo a transferência segura de emails, contatos e calendários de seu sistema atual para o Office 365.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Quantos dispositivos posso usar com uma licença?</h3>
              <p className="text-gray-600">
                Cada usuário pode instalar os aplicativos Office em até 5 PCs ou Macs, 5 tablets e 5 smartphones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-angohost-700 text-white">
        <div className="container max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Potencialize sua produtividade com o Office 365
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Comece hoje mesmo e transforme a maneira como sua empresa trabalha
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

export default Office365Page;
