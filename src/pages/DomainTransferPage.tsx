
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const DomainTransferPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-angohost-700 to-angohost-800 text-white">
        <div className="container max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Transferência de Domínios</h1>
            <p className="text-xl mb-8">
              Transfira seu domínio para a ANGOHOST e aproveite nossos serviços de qualidade
            </p>
          </div>
        </div>
      </section>

      {/* Transfer Form Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Transfira Seu Domínio</h2>
              <p className="text-gray-700 mb-6">
                Transferir seu domínio para a ANGOHOST é simples e rápido. Basta preencher o formulário ao lado com as informações do seu domínio.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-700">Processo de transferência simplificado</p>
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
                  <p className="ml-3 text-gray-700">Renovação por 1 ano incluída na transferência</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-700">Gerenciamento DNS completo</p>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold mb-6">Formulário de Transferência</h3>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="domain">Nome do Domínio</Label>
                  <Input 
                    id="domain" 
                    placeholder="exemplo.com" 
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="auth-code">Código de Autorização (EPP)</Label>
                  <Input 
                    id="auth-code" 
                    placeholder="Código fornecido pelo registrador atual" 
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-email">E-mail de Contato</Label>
                  <Input 
                    id="contact-email" 
                    type="email"
                    placeholder="seu@email.com" 
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Telefone de Contato</Label>
                  <Input 
                    id="contact-phone" 
                    placeholder="+244 XXX XXX XXX" 
                    className="w-full"
                  />
                </div>
                
                <Button className="w-full bg-angohost-600 hover:bg-angohost-700">
                  Iniciar Transferência
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Como Funciona</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transferir seu domínio para a ANGOHOST é um processo simples
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-angohost-600 text-white flex items-center justify-center font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 mt-2">Solicitação</h3>
              <p className="text-gray-600">
                Preencha o formulário de transferência com as informações do seu domínio e código de autorização (EPP).
              </p>
              <ArrowRight className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 text-angohost-600" />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-angohost-600 text-white flex items-center justify-center font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 mt-2">Confirmação</h3>
              <p className="text-gray-600">
                Após a solicitação, você receberá um e-mail de confirmação para autorizar a transferência.
              </p>
              <ArrowRight className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 text-angohost-600" />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-angohost-600 text-white flex items-center justify-center font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 mt-2">Conclusão</h3>
              <p className="text-gray-600">
                Após a confirmação, a transferência é processada e concluída em até 7 dias úteis.
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
              Dúvidas comuns sobre transferência de domínios
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Quanto tempo leva para transferir um domínio?</h3>
              <p className="text-gray-600">
                O tempo de transferência varia conforme a extensão do domínio. Normalmente, domínios internacionais (.com, .net, .org) levam de 5 a 7 dias, enquanto domínios .AO podem levar até 14 dias.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Preciso pagar para transferir meu domínio?</h3>
              <p className="text-gray-600">
                Sim, a transferência de domínio inclui a renovação por mais 1 ano. O valor é o mesmo da renovação anual para a extensão do seu domínio.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">O que é o código de autorização (EPP)?</h3>
              <p className="text-gray-600">
                O código EPP é uma senha fornecida pelo seu registrador atual que autoriza a transferência do domínio. Você deve solicitar esse código ao suporte do seu registrador atual.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Meu site ficará fora do ar durante a transferência?</h3>
              <p className="text-gray-600">
                Não, seu site e emails continuarão funcionando normalmente durante todo o processo de transferência.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-angohost-700 text-white">
        <div className="container max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para transferir seu domínio?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Transfira agora e ganhe 1 ano de renovação grátis
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
              <Link to="#transfer-form">Transferir Domínio</Link>
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

export default DomainTransferPage;
