
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, Globe, Shield } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import DomainSearchForm from '@/components/DomainSearchForm';

const DomainsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-angohost-700 to-angohost-800 text-white">
        <div className="container max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Registre Seu Domínio</h1>
            <p className="text-xl mb-8">
              Garanta sua presença online com um domínio profissional e memorável
            </p>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <DomainSearchForm variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* Domain Extensions */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Extensões de Domínio Disponíveis</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Escolha entre uma ampla variedade de extensões para seu domínio
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <h3 className="text-2xl font-bold mb-2 text-angohost-700">.ao</h3>
              <p className="text-gray-700 mb-2">25.000 Kz/ano</p>
              <p className="text-sm text-gray-500">Domínio de Angola</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <h3 className="text-2xl font-bold mb-2 text-angohost-700">.co.ao</h3>
              <p className="text-gray-700 mb-2">35.000 Kz/ano</p>
              <p className="text-sm text-gray-500">Empresas em Angola</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <h3 className="text-2xl font-bold mb-2 text-angohost-700">.com</h3>
              <p className="text-gray-700 mb-2">15.000 Kz/ano</p>
              <p className="text-sm text-gray-500">Comercial Internacional</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <h3 className="text-2xl font-bold mb-2 text-angohost-700">.org</h3>
              <p className="text-gray-700 mb-2">20.000 Kz/ano</p>
              <p className="text-sm text-gray-500">Organizações</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <h3 className="text-2xl font-bold mb-2 text-angohost-700">.net</h3>
              <p className="text-gray-700 mb-2">20.000 Kz/ano</p>
              <p className="text-sm text-gray-500">Redes e Tecnologia</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <h3 className="text-2xl font-bold mb-2 text-angohost-700">.it.ao</h3>
              <p className="text-gray-700 mb-2">35.000 Kz/ano</p>
              <p className="text-sm text-gray-500">Tecnologia em Angola</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <h3 className="text-2xl font-bold mb-2 text-angohost-700">.edu.ao</h3>
              <p className="text-gray-700 mb-2">35.000 Kz/ano</p>
              <p className="text-sm text-gray-500">Educação em Angola</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <h3 className="text-2xl font-bold mb-2 text-angohost-700">.info</h3>
              <p className="text-gray-700 mb-2">15.000 Kz/ano</p>
              <p className="text-sm text-gray-500">Informativo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Por Que Registrar Com a ANGOHOST?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos o melhor serviço de registro de domínios em Angola
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Globe className="h-10 w-10 mb-4 text-angohost-600" />
              <h3 className="text-xl font-semibold mb-3">Processo Simplificado</h3>
              <p className="text-gray-600">
                Registre seu domínio em poucos minutos com nosso processo simplificado e intuitivo.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Check className="h-10 w-10 mb-4 text-angohost-600" />
              <h3 className="text-xl font-semibold mb-3">Gerenciamento DNS</h3>
              <p className="text-gray-600">
                Painel completo para gerenciar seus registros DNS de forma simples e rápida.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Shield className="h-10 w-10 mb-4 text-angohost-600" />
              <h3 className="text-xl font-semibold mb-3">Proteção de Privacidade</h3>
              <p className="text-gray-600">
                Mantenha seus dados pessoais protegidos com nossa proteção de privacidade WHOIS.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Box Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Verifique a disponibilidade do seu domínio</h2>
              <p className="text-gray-600">
                Digite o nome desejado e veja se está disponível para registro
              </p>
            </div>
            <DomainSearchForm variant="default" />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Perguntas Frequentes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Respostas para as dúvidas mais comuns sobre domínios
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Como funciona o registro de domínio .AO?</h3>
              <p className="text-gray-600">
                O registro de domínios .AO é feito através da ANGOHOST como agente registador autorizado. Após o registro, a ativação pode levar até 24 horas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Posso transferir meu domínio para a ANGOHOST?</h3>
              <p className="text-gray-600">
                Sim, oferecemos serviço de transferência de domínios. Entre em contato conosco para iniciar o processo.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">O que acontece quando meu domínio expira?</h3>
              <p className="text-gray-600">
                Enviamos lembretes antes da expiração. Após expirar, o domínio entra em período de carência e depois pode ser liberado para registro público.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Quais documentos preciso para registrar um domínio .AO?</h3>
              <p className="text-gray-600">
                Para registrar domínios .AO é necessário fornecer documentação da empresa (NIF) ou pessoal (BI) dependendo do tipo de domínio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-angohost-700 text-white">
        <div className="container max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Garanta seu domínio hoje mesmo
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Registre seu domínio e comece a construir sua presença online
          </p>
          <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
            <Link to="/dominios/registrar">Registrar Domínio</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default DomainsPage;
