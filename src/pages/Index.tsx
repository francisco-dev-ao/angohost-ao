
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Check, Globe, Server, Shield, Mail, Star, Users, Award, Zap, Search, ArrowRight } from 'lucide-react';
import Phone from '@/components/ui/phone-icon'; // Import Phone icon from our custom component
import { motion } from 'framer-motion';
import DomainSearchForm from '@/components/DomainSearchForm';
import FeatureCard from '@/components/FeatureCard';
import TestimonialsSection from '@/components/TestimonialsSection';
import ClientLogosSection from '@/components/ClientLogosSection';
import PlanCategories from '@/components/PlanCategories';
import PlanPricingTabs from '@/components/PlanPricingTabs';

const imageRevealVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8 }
  }
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.2 }
  }
};

const Index = () => {
  return <div className="flex flex-col min-h-screen">
      {/* Hero Section - Complete redesign with more focus on image */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 z-10"></div>
        
        {/* Background image container - placeholder for a professional team/office photo */}
        <div className="absolute inset-0 w-full h-full">
          <motion.div 
            className="w-full h-full"
            variants={imageRevealVariants}
            initial="hidden"
            animate="visible"
          >
            <img 
              src="/lovable-uploads/198cbc98-86c6-4598-8d0a-bed3b41b6d9f.png" 
              alt="Equipe ANGOHOST" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
        
        <div className="container max-w-7xl mx-auto px-4 relative z-20">
          <div className="flex flex-col items-center text-center text-white">
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Sua Presença Online Começa Aqui</h1>
              <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
                Hospedagem confiável, domínios .AO e soluções completas para o mercado angolano
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                  <Link to="/hospedagem/cpanel">Ver Planos de Hospedagem</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                  <Link to="/dominios/registrar">Registrar Domínio</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent z-20"></div>
      </section>

      {/* Domain Search Section - Now separate from hero */}
      <section className="py-16 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Encontre o Domínio Perfeito</h2>
            <p className="text-lg text-gray-600">
              Registre seu domínio .AO e estabeleça sua presença online hoje mesmo
            </p>
          </div>
          
          <DomainSearchForm variant="default" />
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="bg-gray-100 py-2 px-4 rounded-full text-sm">
              .co.ao - 35.000 Kz/ano
            </div>
            <div className="bg-gray-100 py-2 px-4 rounded-full text-sm">
              .ao - 25.000 Kz/ano
            </div>
            <div className="bg-gray-100 py-2 px-4 rounded-full text-sm">
              .com - 15.000 Kz/ano
            </div>
            <div className="bg-gray-100 py-2 px-4 rounded-full text-sm">
              .net - 15.000 Kz/ano
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - With enhanced Plan Categories */}
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
          
          {/* Plan Categories Section - Enhanced with animations */}
          <PlanCategories />
        </div>
      </section>

      {/* Pricing Section - Now with tabs for easy navigation */}
      <section className="py-20 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Planos e Preços</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Compare nossos planos e escolha a solução ideal para seu negócio
              </p>
            </motion.div>
          </div>
          
          <PlanPricingTabs />
        </div>
      </section>

      {/* Features with Image Section - Professional appearance */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-lg overflow-hidden h-[500px] shadow-xl">
                {/* Placeholder for company image */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white">
                  <div className="text-center">
                    <p className="text-lg font-semibold">Espaço para foto de equipe/escritório</p>
                    <p className="text-sm mt-2">Uma imagem de equipe aumenta a confiança dos visitantes</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Por Que Escolher a ANGOHOST?</h2>
              <p className="text-gray-700 mb-8">
                A ANGOHOST oferece tudo que você precisa para criar uma presença online profissional e de alta performance. Nossos serviços são projetados para empresas e empreendedores angolanos que buscam qualidade e suporte local.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Performance Garantida</h3>
                    <p className="text-gray-600">Servidores otimizados para máxima velocidade e desempenho</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Segurança Total</h3>
                    <p className="text-gray-600">Proteção contra ameaças e backups diários automáticos</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Suporte Local</h3>
                    <p className="text-gray-600">Atendimento em português por especialistas em Angola</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Qualidade Certificada</h3>
                    <p className="text-gray-600">Empresa reconhecida e líder no mercado angolano</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link to="/sobre-nos">
                    Conheça Nossa Empresa
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Enhanced with photos */}
      <TestimonialsSection />

      {/* Client Logos Section */}
      <ClientLogosSection />
      
      {/* Human Element Section - Professional credibility */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="flex items-center mb-6">
                <Star className="text-yellow-400 h-6 w-6 mr-1" fill="currentColor" />
                <Star className="text-yellow-400 h-6 w-6 mr-1" fill="currentColor" />
                <Star className="text-yellow-400 h-6 w-6 mr-1" fill="currentColor" />
                <Star className="text-yellow-400 h-6 w-6 mr-1" fill="currentColor" />
                <Star className="text-yellow-400 h-6 w-6" fill="currentColor" />
              </div>
              
              <h2 className="text-3xl font-bold mb-6">Suporte Técnico Especializado</h2>
              <blockquote className="text-xl text-gray-600 mb-8 italic border-l-4 border-primary pl-6">
                "Nossa missão é garantir que sua presença online funcione perfeitamente. Nossa equipe técnica está disponível 24/7 para resolver qualquer problema com rapidez e eficiência."
              </blockquote>
              
              <div className="mb-8">
                <h3 className="font-bold text-xl">Miguel Santos</h3>
                <p className="text-gray-600">Diretor Técnico, ANGOHOST</p>
              </div>
              
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/contato">
                  Fale com Nossa Equipe
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="relative rounded-lg overflow-hidden h-[500px] shadow-xl">
                {/* Placeholder for technical specialist photo */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 flex items-center justify-center text-white">
                  <div className="text-center">
                    <p className="text-lg font-semibold">Espaço para foto de especialista/técnico</p>
                    <p className="text-sm mt-2">Uma foto profissional aumenta a credibilidade</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Support Feature - With contact information */}
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
                      <p className="text-primary">suporte@angohost.ao</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="bg-primary/10 p-2 rounded-full mr-4">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Telefone</h3>
                      <p className="text-primary">+244 923 456 789</p>
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
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white">
                  <p className="text-sm font-semibold">Foto de atendente</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="relative rounded-lg overflow-hidden h-[200px] shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-white">
                  <p className="text-sm font-semibold">Foto de equipe</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="relative rounded-lg overflow-hidden h-[200px] shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-white">
                  <p className="text-sm font-semibold">Foto de suporte</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="relative rounded-lg overflow-hidden h-[200px] shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white">
                  <p className="text-sm font-semibold">Foto de escritório</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Redesigned */}
      <section className="py-16 px-4 relative bg-primary">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 z-0"></div>
        <img src="/lovable-uploads/198cbc98-86c6-4598-8d0a-bed3b41b6d9f.png" alt="Equipe AngoHost" className="absolute inset-0 w-full h-full object-cover opacity-20 -z-10" />
        <div className="container max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 text-white">
              Comece Hoje Mesmo
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Registre seu domínio, contrate hospedagem e crie sua presença online com a ANGOHOST
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link to="/dominios/registrar">Registrar Domínio</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                <Link to="/hospedagem/cpanel">Ver Planos de Hospedagem</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>;
};

export default Index;
