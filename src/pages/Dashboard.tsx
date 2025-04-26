
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';
import { User } from '@supabase/supabase-js';
import { useCustomerServices } from '@/hooks/useCustomerServices';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, Server, Mail, AlertCircle, CheckCircle, Calendar, 
  RefreshCcw, ExternalLink, Clock, FileText, CreditCard
} from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { services, loading: loadingServices } = useCustomerServices();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      
      if (error || !data?.user) {
        navigate('/auth');
        return;
      }
      
      setUser(data.user);
      setLoading(false);
    };
    
    getUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          navigate('/auth');
        } else if (session?.user) {
          setUser(session.user);
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Logout realizado com sucesso');
      navigate('/auth');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao fazer logout');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return <Badge className="bg-green-500 ml-2">Ativo</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500 ml-2">Pendente</Badge>;
      case 'suspended':
        return <Badge className="bg-red-500 ml-2">Suspenso</Badge>;
      case 'expired':
        return <Badge className="bg-gray-500 ml-2">Expirado</Badge>;
      default:
        return <Badge className="bg-blue-500 ml-2">{status || 'N/A'}</Badge>;
    }
  };

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'domain':
        return <Globe className="h-5 w-5 text-blue-500" />;
      case 'hosting':
        return <Server className="h-5 w-5 text-purple-500" />;
      case 'email':
        return <Mail className="h-5 w-5 text-orange-500" />;
      default:
        return <Server className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-AO');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCcw className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2">Carregando painel do cliente...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Painel do Cliente</h1>
          <p className="text-gray-500">
            Bem-vindo, {user?.user_metadata?.full_name || user?.email}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          {user?.app_metadata?.is_admin && (
            <Button variant="outline" onClick={() => navigate('/admin')}>
              Painel Admin
            </Button>
          )}
          <Button variant="outline" onClick={handleSignOut}>
            Sair
          </Button>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <Tabs defaultValue="servicos" className="w-full">
        <TabsList className="mb-8 flex flex-wrap gap-2">
          <TabsTrigger value="servicos">Meus Serviços</TabsTrigger>
          <TabsTrigger value="faturas">Faturas</TabsTrigger>
          <TabsTrigger value="tickets">Tickets de Suporte</TabsTrigger>
          <TabsTrigger value="perfil">Meu Perfil</TabsTrigger>
        </TabsList>
        
        <TabsContent value="servicos">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2 h-5 w-5 text-blue-500" />
                  Domínios
                </CardTitle>
                <CardDescription>Gerencie seus domínios</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingServices ? (
                  <div className="py-8 flex justify-center">
                    <RefreshCcw className="animate-spin h-5 w-5" />
                  </div>
                ) : services.filter(s => s.type === 'domain').length > 0 ? (
                  <div className="space-y-4">
                    {services
                      .filter(service => service.type === 'domain')
                      .map(domain => (
                        <div 
                          key={domain.id} 
                          className="p-4 border rounded-md flex flex-col"
                        >
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{domain.name}</div>
                            {getStatusBadge(domain.status)}
                          </div>
                          <div className="mt-2 flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-1 h-3.5 w-3.5" />
                            <span>Expira em: {formatDate(domain.expiryDate)}</span>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Gerenciar
                            </Button>
                          </div>
                        </div>
                      ))
                    }
                    <div className="flex justify-end mt-2">
                      <Button variant="outline" size="sm" onClick={() => navigate('/dominios')}>
                        Ver todos
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">Nenhum domínio registrado.</p>
                    <Button onClick={() => navigate('/dominios/registrar')}>
                      Registrar Domínio
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Server className="mr-2 h-5 w-5 text-purple-500" />
                  Hospedagem
                </CardTitle>
                <CardDescription>Gerencie seus planos de hospedagem</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingServices ? (
                  <div className="py-8 flex justify-center">
                    <RefreshCcw className="animate-spin h-5 w-5" />
                  </div>
                ) : services.filter(s => s.type === 'hosting').length > 0 ? (
                  <div className="space-y-4">
                    {services
                      .filter(service => service.type === 'hosting')
                      .map(hosting => (
                        <div 
                          key={hosting.id} 
                          className="p-4 border rounded-md flex flex-col"
                        >
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{hosting.name}</div>
                            {getStatusBadge(hosting.status)}
                          </div>
                          <div className="mt-2 text-sm text-muted-foreground">
                            <div>
                              <span className="font-medium">Tipo: </span>
                              {hosting.details.planType || 'Padrão'}
                            </div>
                            <div className="mt-1">
                              <span className="font-medium">Espaço: </span>
                              {hosting.details.disk_space || 'N/A'} GB
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Acessar cPanel
                            </Button>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">Nenhum plano de hospedagem ativo.</p>
                    <Button onClick={() => navigate('/hospedagem-de-sites')}>
                      Contratar Hospedagem
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-orange-500" />
                  Email Profissional
                </CardTitle>
                <CardDescription>Gerencie suas contas de email</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingServices ? (
                  <div className="py-8 flex justify-center">
                    <RefreshCcw className="animate-spin h-5 w-5" />
                  </div>
                ) : services.filter(s => s.type === 'email').length > 0 ? (
                  <div className="space-y-4">
                    {services
                      .filter(service => service.type === 'email')
                      .map(email => (
                        <div 
                          key={email.id} 
                          className="p-4 border rounded-md flex flex-col"
                        >
                          <div className="flex items-center justify-between">
                            <div className="font-medium truncate">{email.name}</div>
                            {getStatusBadge(email.status)}
                          </div>
                          <div className="mt-2 text-sm text-muted-foreground">
                            <div>
                              <span className="font-medium">Quota: </span>
                              {email.details.quota ? `${email.details.quota} MB` : 'N/A'}
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Acessar Webmail
                            </Button>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">Nenhuma conta de email.</p>
                    <Button onClick={() => navigate('/email/profissional')}>
                      Adicionar Email
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="faturas">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Minhas Faturas</CardTitle>
                <CardDescription>Histórico de pagamentos</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <RefreshCcw className="h-4 w-4 mr-2" />
                Atualizar
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 p-4 font-medium border-b">
                  <div>Nº Fatura</div>
                  <div>Data</div>
                  <div>Valor</div>
                  <div>Status</div>
                  <div className="text-right">Ações</div>
                </div>
                <div className="p-8 text-center text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
                  <p>Nenhuma fatura encontrada</p>
                </div>
                {/* Quando houver faturas:
                <div className="grid grid-cols-5 p-4 items-center border-b">
                  <div>INV-001</div>
                  <div>21/04/2023</div>
                  <div>15.000 Kz</div>
                  <div>
                    <Badge className="bg-green-500">Pago</Badge>
                  </div>
                  <div className="text-right">
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                  </div>
                </div>
                */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tickets">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Tickets de Suporte</CardTitle>
                <CardDescription>Histórico de atendimentos</CardDescription>
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="sm">
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Atualizar
                </Button>
                <Button size="sm">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Abrir Ticket
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 p-4 font-medium border-b">
                  <div>Assunto</div>
                  <div>Data</div>
                  <div>Status</div>
                  <div>Prioridade</div>
                  <div className="text-right">Ações</div>
                </div>
                <div className="p-8 text-center text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
                  <p>Nenhum ticket de suporte aberto</p>
                </div>
                {/* Quando houver tickets:
                <div className="grid grid-cols-5 p-4 items-center border-b">
                  <div>Problema com email</div>
                  <div>21/04/2023</div>
                  <div>
                    <Badge>Aberto</Badge>
                  </div>
                  <div>
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-300">
                      Média
                    </Badge>
                  </div>
                  <div className="text-right">
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                  </div>
                </div>
                */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="perfil">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Meus Dados</CardTitle>
                <CardDescription>Gerencie suas informações pessoais</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">{user?.email}</p>
                  </div>
                  <div>
                    <p className="font-medium">Nome</p>
                    <p className="text-gray-600">{user?.user_metadata?.full_name || 'Não informado'}</p>
                  </div>
                  <div>
                    <p className="font-medium">Telefone</p>
                    <p className="text-gray-600">{user?.user_metadata?.phone || 'Não informado'}</p>
                  </div>
                </div>
                <Button className="mt-6 w-full">Atualizar Meus Dados</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-blue-500" />
                  Formas de Pagamento
                </CardTitle>
                <CardDescription>Gerencie suas formas de pagamento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-4 border rounded-md">
                    <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">Multicaixa Express</p>
                      <p className="text-sm text-gray-500">Pagamentos instantâneos</p>
                    </div>
                    <Badge className="ml-auto">Ativo</Badge>
                  </div>
                  <div className="flex items-center p-4 border rounded-md">
                    <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">Transferência Bancária</p>
                      <p className="text-sm text-gray-500">Processamento em até 24h</p>
                    </div>
                    <Badge variant="outline" className="ml-auto">Disponível</Badge>
                  </div>
                  <div className="flex items-center p-4 border rounded-md">
                    <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">Cartão de Crédito</p>
                      <p className="text-sm text-gray-500">Pagamentos internacionais</p>
                    </div>
                    <Badge variant="outline" className="ml-auto">Disponível</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
