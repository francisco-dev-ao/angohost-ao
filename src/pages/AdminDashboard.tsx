
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdmin } from '@/hooks/useAdmin';
import { Loader2 } from 'lucide-react';
import { AdminUsers } from '@/components/admin/AdminUsers';
import { AdminDomains } from '@/components/admin/AdminDomains';
import { AdminHosting } from '@/components/admin/AdminHosting';
import { AdminEmails } from '@/components/admin/AdminEmails';
import { AdminInvoices } from '@/components/admin/AdminInvoices';
import { AdminOrders } from '@/components/admin/AdminOrders';
import { AdminTickets } from '@/components/admin/AdminTickets';
import { AdminOverview } from '@/components/admin/AdminOverview';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const { isAdmin, loading, user } = useAdmin();
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/auth');
      toast.success('Sessão encerrada com sucesso');
    } catch (error) {
      console.error('Erro ao sair:', error);
      toast.error('Erro ao encerrar sessão');
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span>Carregando painel administrativo...</span>
      </div>
    );
  }
  
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen flex-col">
        <p className="text-xl font-bold mb-4 text-red-600">Acesso negado. Esta página é restrita a administradores.</p>
        <Button onClick={() => navigate('/dashboard')}>Ir para Painel do Cliente</Button>
      </div>
    );
  }
  
  return (
    <RequireAuth adminOnly={true}>
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
            <p className="text-muted-foreground">Gerencie usuários, serviços e configurações do sistema</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Painel do Cliente
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
              Sair
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8 overflow-x-auto flex flex-nowrap gap-2">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="domains">Domínios</TabsTrigger>
            <TabsTrigger value="hosting">Hospedagem</TabsTrigger>
            <TabsTrigger value="emails">E-mails</TabsTrigger>
            <TabsTrigger value="invoices">Faturas</TabsTrigger>
            <TabsTrigger value="orders">Pedidos</TabsTrigger>
            <TabsTrigger value="tickets">Suporte</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <AdminOverview />
          </TabsContent>
          
          <TabsContent value="users">
            <AdminUsers />
          </TabsContent>
          
          <TabsContent value="domains">
            <AdminDomains />
          </TabsContent>
          
          <TabsContent value="hosting">
            <AdminHosting />
          </TabsContent>
          
          <TabsContent value="emails">
            <AdminEmails />
          </TabsContent>
          
          <TabsContent value="invoices">
            <AdminInvoices />
          </TabsContent>
          
          <TabsContent value="orders">
            <AdminOrders />
          </TabsContent>
          
          <TabsContent value="tickets">
            <AdminTickets />
          </TabsContent>
        </Tabs>
      </div>
    </RequireAuth>
  );
};

export default AdminDashboard;
