
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';
import { User } from '@supabase/supabase-js';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
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
        <Button variant="outline" onClick={handleSignOut} className="mt-4 md:mt-0">
          Sair
        </Button>
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Domínios</CardTitle>
                <CardDescription>Gerencie seus domínios</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-gray-500">Nenhum domínio registrado.</p>
                <Button className="w-full">Registrar Domínio</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Hospedagem</CardTitle>
                <CardDescription>Gerencie seus planos de hospedagem</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-gray-500">Nenhum plano de hospedagem ativo.</p>
                <Button className="w-full">Contratar Hospedagem</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Email Profissional</CardTitle>
                <CardDescription>Gerencie suas contas de email</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-gray-500">Nenhuma conta de email.</p>
                <Button className="w-full">Adicionar Email</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="faturas">
          <Card>
            <CardHeader>
              <CardTitle>Minhas Faturas</CardTitle>
              <CardDescription>Histórico de pagamentos</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-12 text-gray-500">Nenhuma fatura encontrada.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tickets">
          <Card>
            <CardHeader>
              <CardTitle>Tickets de Suporte</CardTitle>
              <CardDescription>Histórico de atendimentos</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-12 text-gray-500">Nenhum ticket de suporte.</p>
              <Button className="w-full">Abrir Novo Ticket</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="perfil">
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
              </div>
              <Button className="mt-6 w-full">Atualizar Meus Dados</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
