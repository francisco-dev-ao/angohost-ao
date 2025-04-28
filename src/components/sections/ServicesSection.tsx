
import React from 'react';
import { motion } from 'framer-motion';
import PlanCategories from '@/components/PlanCategories';

const ServicesSection = () => {
  // Define the service categories that will be passed to the PlanCategories component
  const serviceCategories = [
    {
      title: "Hospedagem Web",
      description: "Soluções de hospedagem de alto desempenho com garantia de uptime",
      features: ["cPanel incluído", "Certificados SSL grátis", "Backup diário", "Suporte 24/7"],
      icon: "server"
    },
    {
      title: "Domínios",
      description: "Registre seu domínio com os melhores preços do mercado",
      features: ["Proteção de privacidade", "DNS gerenciável", "Renovação automática", "Transferência facilitada"],
      icon: "database"
    },
    {
      title: "Email Profissional",
      description: "Soluções de email seguras e confiáveis para sua empresa",
      features: ["Proteção anti-spam", "Armazenamento amplo", "Acesso em qualquer dispositivo", "Integração com Office 365"],
      icon: "rocket"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Serviços de Alta Qualidade</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos soluções completas em hospedagem e domínios para o mercado angolano
            </p>
          </motion.div>
        </div>
        <PlanCategories categories={serviceCategories} />
      </div>
    </section>
  );
};

export default ServicesSection;
