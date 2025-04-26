
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import PricingCard from '@/components/PricingCard';
import { CheckCircle, XCircle } from 'lucide-react';

const PlanPricingTabs = () => {
  const [activeTab, setActiveTab] = useState("hosting");
  
  return (
    <div className="w-full">
      <Tabs defaultValue="hosting" onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="hosting">Hospedagem</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="servers">Servidores</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="hosting" className="w-full">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-center mb-2">Planos de Hospedagem Web</h3>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              Escolha o plano ideal para o seu projeto ou negócio com recursos otimizados
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard 
              id="basic" 
              type="hosting" 
              title="Plano Básico" 
              price={2500} 
              features={["5GB de Espaço em Disco", "10 Contas de Email", "Banco de Dados MySQL", "Certificado SSL Gratuito", "Painel cPanel"]} 
            />
            <PricingCard 
              id="professional" 
              type="hosting" 
              title="Plano Profissional" 
              price={4500} 
              features={["20GB de Espaço em Disco", "30 Contas de Email", "Banco de Dados MySQL Ilimitados", "Certificado SSL Gratuito", "Painel cPanel", "Backup Diário"]} 
              isPopular 
            />
            <PricingCard 
              id="enterprise" 
              type="hosting" 
              title="Plano Empresarial" 
              price={8500} 
              features={["50GB de Espaço em Disco", "Email Ilimitado", "Banco de Dados MySQL Ilimitados", "Certificado SSL Gratuito", "Painel cPanel", "Backup Diário", "CDN Premium"]}
            />
          </div>
          
          <div className="mt-12 overflow-x-auto">
            <h4 className="text-xl font-semibold mb-4 text-center">Comparativo de Planos</h4>
            <div className="w-full overflow-x-auto">
              <Table className="min-w-full border border-gray-200">
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="border-r border-gray-200">Recurso</TableHead>
                    <TableHead className="text-center border-r border-gray-200">Plano Básico</TableHead>
                    <TableHead className="text-center border-r border-gray-200">Plano Profissional</TableHead>
                    <TableHead className="text-center">Plano Empresarial</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium border-r border-gray-200">Espaço em Disco</TableCell>
                    <TableCell className="text-center border-r border-gray-200">5GB</TableCell>
                    <TableCell className="text-center border-r border-gray-200">20GB</TableCell>
                    <TableCell className="text-center">50GB</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium border-r border-gray-200">Contas de Email</TableCell>
                    <TableCell className="text-center border-r border-gray-200">10</TableCell>
                    <TableCell className="text-center border-r border-gray-200">30</TableCell>
                    <TableCell className="text-center">Ilimitado</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium border-r border-gray-200">Certificado SSL</TableCell>
                    <TableCell className="text-center border-r border-gray-200"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></TableCell>
                    <TableCell className="text-center border-r border-gray-200"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></TableCell>
                    <TableCell className="text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium border-r border-gray-200">Backup Diário</TableCell>
                    <TableCell className="text-center border-r border-gray-200"><XCircle className="h-5 w-5 text-red-500 mx-auto" /></TableCell>
                    <TableCell className="text-center border-r border-gray-200"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></TableCell>
                    <TableCell className="text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium border-r border-gray-200">CDN Premium</TableCell>
                    <TableCell className="text-center border-r border-gray-200"><XCircle className="h-5 w-5 text-red-500 mx-auto" /></TableCell>
                    <TableCell className="text-center border-r border-gray-200"><XCircle className="h-5 w-5 text-red-500 mx-auto" /></TableCell>
                    <TableCell className="text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="email" className="w-full">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-center mb-2">Planos de Email Corporativo</h3>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              Soluções profissionais de email para sua empresa com proteção avançada
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard 
              id="email-start" 
              type="email" 
              title="Plano Start" 
              price={1500} 
              features={["5GB por Caixa Postal", "Webmail Responsivo", "Proteção Anti-spam", "Suporte 24/7"]} 
            />
            <PricingCard 
              id="email-business" 
              type="email" 
              title="Plano Business" 
              price={3000} 
              features={["15GB por Caixa Postal", "Webmail Responsivo", "Proteção Anti-spam e Antivírus", "Calendário Compartilhado", "Suporte Prioritário 24/7"]} 
              isPopular 
            />
            <PricingCard 
              id="email-enterprise" 
              type="email" 
              title="Plano Enterprise" 
              price={6000} 
              features={["50GB por Caixa Postal", "Webmail Responsivo", "Proteção Anti-spam e Antivírus", "Calendário e Contatos Compartilhados", "Arquivamento de Email", "Suporte Prioritário 24/7"]} 
            />
          </div>
          
          <div className="mt-12 overflow-x-auto">
            <h4 className="text-xl font-semibold mb-4 text-center">Comparativo de Planos</h4>
            <div className="w-full overflow-x-auto">
              <Table className="min-w-full border border-gray-200">
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="border-r border-gray-200">Recurso</TableHead>
                    <TableHead className="text-center border-r border-gray-200">Plano Start</TableHead>
                    <TableHead className="text-center border-r border-gray-200">Plano Business</TableHead>
                    <TableHead className="text-center">Plano Enterprise</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium border-r border-gray-200">Espaço</TableCell>
                    <TableCell className="text-center border-r border-gray-200">5GB</TableCell>
                    <TableCell className="text-center border-r border-gray-200">15GB</TableCell>
                    <TableCell className="text-center">50GB</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium border-r border-gray-200">Anti-spam</TableCell>
                    <TableCell className="text-center border-r border-gray-200">Básico</TableCell>
                    <TableCell className="text-center border-r border-gray-200">Avançado</TableCell>
                    <TableCell className="text-center">Premium</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium border-r border-gray-200">Antivírus</TableCell>
                    <TableCell className="text-center border-r border-gray-200"><XCircle className="h-5 w-5 text-red-500 mx-auto" /></TableCell>
                    <TableCell className="text-center border-r border-gray-200"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></TableCell>
                    <TableCell className="text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium border-r border-gray-200">Arquivamento</TableCell>
                    <TableCell className="text-center border-r border-gray-200"><XCircle className="h-5 w-5 text-red-500 mx-auto" /></TableCell>
                    <TableCell className="text-center border-r border-gray-200"><XCircle className="h-5 w-5 text-red-500 mx-auto" /></TableCell>
                    <TableCell className="text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="servers" className="w-full">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-center mb-2">Servidores Dedicados</h3>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              Servidores de alto desempenho para aplicações exigentes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard 
              id="dedicated-basic" 
              type="hosting" 
              title="Servidor Básico" 
              price={45000} 
              features={["4 Cores", "8GB RAM", "1TB HDD", "1 IP Dedicado", "Tráfego Ilimitado", "Gerenciamento Básico"]} 
            />
            <PricingCard 
              id="dedicated-pro" 
              type="hosting" 
              title="Servidor Pro" 
              price={75000} 
              features={["8 Cores", "16GB RAM", "2TB HDD", "2 IPs Dedicados", "Tráfego Ilimitado", "Gerenciamento Completo"]} 
              isPopular 
            />
            <PricingCard 
              id="dedicated-enterprise" 
              type="hosting" 
              title="Servidor Enterprise" 
              price={120000} 
              features={["16 Cores", "32GB RAM", "4TB HDD", "4 IPs Dedicados", "Tráfego Ilimitado", "Gerenciamento Premium"]} 
            />
          </div>
          
          <div className="mt-12 overflow-x-auto">
            <h4 className="text-xl font-semibold mb-4 text-center">Comparativo de Servidores</h4>
            <div className="w-full overflow-x-auto">
              <Table className="min-w-full border border-gray-200">
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="border-r border-gray-200">Especificações</TableHead>
                    <TableHead className="text-center border-r border-gray-200">Servidor Básico</TableHead>
                    <TableHead className="text-center border-r border-gray-200">Servidor Pro</TableHead>
                    <TableHead className="text-center">Servidor Enterprise</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium border-r border-gray-200">Processador</TableCell>
                    <TableCell className="text-center border-r border-gray-200">4 Cores</TableCell>
                    <TableCell className="text-center border-r border-gray-200">8 Cores</TableCell>
                    <TableCell className="text-center">16 Cores</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium border-r border-gray-200">Memória RAM</TableCell>
                    <TableCell className="text-center border-r border-gray-200">8GB</TableCell>
                    <TableCell className="text-center border-r border-gray-200">16GB</TableCell>
                    <TableCell className="text-center">32GB</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium border-r border-gray-200">Armazenamento</TableCell>
                    <TableCell className="text-center border-r border-gray-200">1TB HDD</TableCell>
                    <TableCell className="text-center border-r border-gray-200">2TB HDD</TableCell>
                    <TableCell className="text-center">4TB HDD</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium border-r border-gray-200">IPs Dedicados</TableCell>
                    <TableCell className="text-center border-r border-gray-200">1</TableCell>
                    <TableCell className="text-center border-r border-gray-200">2</TableCell>
                    <TableCell className="text-center">4</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlanPricingTabs;
