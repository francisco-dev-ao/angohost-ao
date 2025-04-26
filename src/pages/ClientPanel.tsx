
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Mail, Globe, Server, CreditCard, Settings, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const ClientPanel = () => {
  const { customer } = useCart();
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Painel do Cliente</h1>
        <p className="text-gray-600 mb-8">
          Gerencie seus domínios, emails e serviços de hospedagem.
        </p>
        
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="domains">Domínios</TabsTrigger>
            <TabsTrigger value="emails">Emails</TabsTrigger>
            <TabsTrigger value="hosting">Hospedagem</TabsTrigger>
            <TabsTrigger value="account">Minha Conta</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Informações da Conta
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {customer ? (
                    <div className="space-y-2">
                      <p><span className="font-medium">Nome:</span> {customer.name}</p>
                      <p><span className="font-medium">Email:</span> {customer.email}</p>
                      <p><span className="font-medium">Telefone:</span> {customer.phone}</p>
                      <p><span className="font-medium">NIF:</span> {customer.nif}</p>
                    </div>
                  ) : (
                    <p>Faça login para ver suas informações</p>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="mr-2 h-5 w-5" />
                    Ações Rápidas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button asChild className="w-full" variant="outline">
                      <Link to="/dominios/registrar">
                        <Globe className="mr-2 h-4 w-4" />
                        Registrar Novo Domínio
                      </Link>
                    </Button>
                    
                    <Button asChild className="w-full" variant="outline">
                      <Link to="/email/profissional">
                        <Mail className="mr-2 h-4 w-4" />
                        Adicionar Email Profissional
                      </Link>
                    </Button>
                    
                    <Button asChild className="w-full bg-primary hover:bg-primary/90">
                      <Link to="/carrinho">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Ir para Carrinho
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Serviços Ativos</CardTitle>
                  <CardDescription>
                    Visualize seus serviços ativos e datas de vencimento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center p-12">
                    <div className="text-center">
                      <Server className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Nenhum serviço ativo</h3>
                      <p className="text-gray-600 mt-2 mb-6">
                        Você ainda não tem serviços ativos na sua conta.
                      </p>
                      <Button asChild>
                        <Link to="/">Ver Produtos</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="domains" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Meus Domínios</CardTitle>
                <CardDescription>
                  Gerencie seus domínios registrados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-12">
                  <div className="text-center">
                    <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">Nenhum domínio registrado</h3>
                    <p className="text-gray-600 mt-2 mb-6">
                      Você ainda não tem domínios registrados na sua conta.
                    </p>
                    <Button asChild>
                      <Link to="/dominios/registrar">Registrar Domínio</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="emails" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Serviços de Email</CardTitle>
                <CardDescription>
                  Gerencie seus planos de email profissional
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-12">
                  <div className="text-center">
                    <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">Nenhum serviço de email</h3>
                    <p className="text-gray-600 mt-2 mb-6">
                      Você ainda não tem serviços de email ativos na sua conta.
                    </p>
                    <Button asChild>
                      <Link to="/email/profissional">Adquirir Email Profissional</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="hosting" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Hospedagem Web</CardTitle>
                <CardDescription>
                  Gerencie seus serviços de hospedagem
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-12">
                  <div className="text-center">
                    <Server className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">Nenhum serviço de hospedagem</h3>
                    <p className="text-gray-600 mt-2 mb-6">
                      Você ainda não tem serviços de hospedagem ativos na sua conta.
                    </p>
                    <Button asChild>
                      <Link to="/">Ver Planos de Hospedagem</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Minha Conta</CardTitle>
                <CardDescription>
                  Gerencie suas informações pessoais e configurações
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-12">
                  <div className="text-center">
                    <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">Funcionalidade em Desenvolvimento</h3>
                    <p className="text-gray-600 mt-2 mb-6">
                      Esta funcionalidade estará disponível em breve.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientPanel;
