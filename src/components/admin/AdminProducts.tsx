
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle, Server, Globe, Mail, Package, Shield } from 'lucide-react';

export const AdminProducts = () => {
  const [activeTab, setActiveTab] = useState('hosting');
  
  // Sample product data
  const hostingPlans = [
    {
      id: 1,
      name: 'Hospedagem Básica',
      price: 5000,
      renewalPrice: 5000,
      features: {
        disk: '10 GB',
        bandwidth: '100 GB',
        emails: 10,
        databases: 5,
      },
      isActive: true
    },
    {
      id: 2,
      name: 'Hospedagem Profissional',
      price: 10000,
      renewalPrice: 10000,
      features: {
        disk: '25 GB',
        bandwidth: '250 GB',
        emails: 25,
        databases: 20,
      },
      isActive: true
    },
    {
      id: 3,
      name: 'Hospedagem Empresarial',
      price: 20000,
      renewalPrice: 20000,
      features: {
        disk: '50 GB',
        bandwidth: 'Ilimitado',
        emails: 100,
        databases: 'Ilimitados',
      },
      isActive: true
    },
  ];
  
  const domainProducts = [
    {
      id: 1,
      tld: '.ao',
      registerPrice: 15000,
      renewalPrice: 15000,
      transferPrice: 15000,
      isActive: true
    },
    {
      id: 2,
      tld: '.com',
      registerPrice: 8000,
      renewalPrice: 8000,
      transferPrice: 8000,
      isActive: true
    },
    {
      id: 3,
      tld: '.co.ao',
      registerPrice: 12000,
      renewalPrice: 12000,
      transferPrice: 12000,
      isActive: true
    },
  ];
  
  const emailProducts = [
    {
      id: 1,
      name: 'Email Básico',
      price: 4000,
      renewalPrice: 4000,
      features: {
        storage: '5 GB',
        accounts: 1,
      },
      isActive: true
    },
    {
      id: 2,
      name: 'Email Profissional',
      price: 8000,
      renewalPrice: 8000,
      features: {
        storage: '10 GB',
        accounts: 5,
      },
      isActive: true
    },
    {
      id: 3,
      name: 'Email Empresarial',
      price: 15000,
      renewalPrice: 15000,
      features: {
        storage: '25 GB',
        accounts: 10,
      },
      isActive: true
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">Gerenciamento de Produtos</h2>
          <p className="text-muted-foreground">Gerencie hospedagem, domínios, emails e outros serviços</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Buscar produto..." className="pl-8 w-[200px]" />
          </div>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Novo Produto
          </Button>
        </div>
      </div>
      
      {/* Tabs for different product types */}
      <Tabs defaultValue="hosting" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="hosting" className="px-4">
            <Server className="h-4 w-4 mr-2" />
            Hospedagem
          </TabsTrigger>
          <TabsTrigger value="domains" className="px-4">
            <Globe className="h-4 w-4 mr-2" />
            Domínios
          </TabsTrigger>
          <TabsTrigger value="email" className="px-4">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </TabsTrigger>
          <TabsTrigger value="addons" className="px-4">
            <Package className="h-4 w-4 mr-2" />
            Addons
          </TabsTrigger>
          <TabsTrigger value="security" className="px-4">
            <Shield className="h-4 w-4 mr-2" />
            Segurança
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="hosting">
          <Card>
            <CardHeader>
              <CardTitle>Planos de Hospedagem</CardTitle>
              <CardDescription>Gerencie os planos de hospedagem disponíveis</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Nome</th>
                      <th className="text-left py-3 px-4 font-medium">Preço</th>
                      <th className="text-left py-3 px-4 font-medium">Renovação</th>
                      <th className="text-left py-3 px-4 font-medium">Espaço</th>
                      <th className="text-left py-3 px-4 font-medium">Banda</th>
                      <th className="text-left py-3 px-4 font-medium">Emails</th>
                      <th className="text-left py-3 px-4 font-medium">Bancos de Dados</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-right py-3 px-4 font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hostingPlans.map((plan) => (
                      <tr key={plan.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900/10">
                        <td className="py-3 px-4 font-medium">{plan.name}</td>
                        <td className="py-3 px-4">
                          {new Intl.NumberFormat('pt-AO', {
                            style: 'currency',
                            currency: 'AOA',
                            maximumFractionDigits: 0,
                          }).format(plan.price)}
                        </td>
                        <td className="py-3 px-4">
                          {new Intl.NumberFormat('pt-AO', {
                            style: 'currency',
                            currency: 'AOA',
                            maximumFractionDigits: 0,
                          }).format(plan.renewalPrice)}
                        </td>
                        <td className="py-3 px-4">{plan.features.disk}</td>
                        <td className="py-3 px-4">{plan.features.bandwidth}</td>
                        <td className="py-3 px-4">{plan.features.emails}</td>
                        <td className="py-3 px-4">{plan.features.databases}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            plan.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {plan.isActive ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">Editar</Button>
                          <Button variant="ghost" size="sm" className="text-red-600">Desativar</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="domains">
          <Card>
            <CardHeader>
              <CardTitle>Domínios</CardTitle>
              <CardDescription>Gerencie os TLDs disponíveis para registro</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">TLD</th>
                      <th className="text-left py-3 px-4 font-medium">Preço de Registro</th>
                      <th className="text-left py-3 px-4 font-medium">Preço de Renovação</th>
                      <th className="text-left py-3 px-4 font-medium">Preço de Transferência</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-right py-3 px-4 font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {domainProducts.map((domain) => (
                      <tr key={domain.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900/10">
                        <td className="py-3 px-4 font-medium">{domain.tld}</td>
                        <td className="py-3 px-4">
                          {new Intl.NumberFormat('pt-AO', {
                            style: 'currency',
                            currency: 'AOA',
                            maximumFractionDigits: 0,
                          }).format(domain.registerPrice)}
                        </td>
                        <td className="py-3 px-4">
                          {new Intl.NumberFormat('pt-AO', {
                            style: 'currency',
                            currency: 'AOA',
                            maximumFractionDigits: 0,
                          }).format(domain.renewalPrice)}
                        </td>
                        <td className="py-3 px-4">
                          {new Intl.NumberFormat('pt-AO', {
                            style: 'currency',
                            currency: 'AOA',
                            maximumFractionDigits: 0,
                          }).format(domain.transferPrice)}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            domain.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {domain.isActive ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">Editar</Button>
                          <Button variant="ghost" size="sm" className="text-red-600">Desativar</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Planos de Email</CardTitle>
              <CardDescription>Gerencie os planos de email disponíveis</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Nome</th>
                      <th className="text-left py-3 px-4 font-medium">Preço</th>
                      <th className="text-left py-3 px-4 font-medium">Renovação</th>
                      <th className="text-left py-3 px-4 font-medium">Armazenamento</th>
                      <th className="text-left py-3 px-4 font-medium">Contas</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-right py-3 px-4 font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emailProducts.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900/10">
                        <td className="py-3 px-4 font-medium">{product.name}</td>
                        <td className="py-3 px-4">
                          {new Intl.NumberFormat('pt-AO', {
                            style: 'currency',
                            currency: 'AOA',
                            maximumFractionDigits: 0,
                          }).format(product.price)}
                        </td>
                        <td className="py-3 px-4">
                          {new Intl.NumberFormat('pt-AO', {
                            style: 'currency',
                            currency: 'AOA',
                            maximumFractionDigits: 0,
                          }).format(product.renewalPrice)}
                        </td>
                        <td className="py-3 px-4">{product.features.storage}</td>
                        <td className="py-3 px-4">{product.features.accounts}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {product.isActive ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">Editar</Button>
                          <Button variant="ghost" size="sm" className="text-red-600">Desativar</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="addons">
          <Card>
            <CardHeader>
              <CardTitle>Addons e Extras</CardTitle>
              <CardDescription>Gerencie addons e produtos complementares</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-12">
                Nenhum addon configurado. Clique no botão "Novo Produto" para adicionar.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Produtos de Segurança</CardTitle>
              <CardDescription>Gerencie produtos relacionados à segurança</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-12">
                Nenhum produto de segurança configurado. Clique no botão "Novo Produto" para adicionar.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
