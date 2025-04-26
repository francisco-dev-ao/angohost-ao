import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Server } from 'lucide-react';
import { motion } from 'framer-motion';

const SupportSection = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Suporte em Português, 24/7</h2>
              <p className="text-gray-700 mb-6">
                Nossa equipe de especialistas está sempre pronta para ajudar você com qualquer questão técnica ou dúvida sobre nossos serviços.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email de Suporte</h3>
                    <p className="text-primary">support@angohost.ao</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Telefone</h3>
                    <p className="text-primary">+244 942 090 108</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-100">
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
            </motion.div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              className="relative rounded-lg overflow-hidden h-[200px] shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src="/atendente.png"
                alt="Foto de atendente"
                className="object-cover w-full h-full"
              />
            </motion.div>
            
            <motion.div 
              className="relative rounded-lg overflow-hidden h-[200px] shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <img
                src="/equipe.png"
                alt="Foto da equipe de suporte"
                className="object-cover w-full h-full"
              />
            </motion.div>
            
            <motion.div 
              className="relative rounded-lg overflow-hidden h-[200px] shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <img
                src="/suporte.png"
                alt="Foto de suporte"
                className="object-cover w-full h-full"
              />
            </motion.div>
            
            <motion.div 
              className="relative rounded-lg overflow-hidden h-[200px] shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <img
                src="/sup.png"
                alt="Foto de escritório com computador"
                className="object-cover w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
