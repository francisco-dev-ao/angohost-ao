
import React from 'react';

export const HostingFAQ = () => {
  return (
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
  );
};
