
import React from 'react';
import { Server, Shield } from 'lucide-react';

export const HostingFeatures = () => {
  return (
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
  );
};
