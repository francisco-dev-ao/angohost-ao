
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
import { AdminFinancial } from '@/components/admin/AdminFinancial';
import { AdminSettings } from '@/components/admin/AdminSettings';
import { AdminProducts } from '@/components/admin/AdminProducts';
import { AdminKnowledgeBase } from '@/components/admin/AdminKnowledgeBase';
import { AdminReports } from '@/components/admin/AdminReports';
import { AdminAutomation } from '@/components/admin/AdminAutomation';
import { AdminSecurity } from '@/components/admin/AdminSecurity';
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
    navigate('/painel-cliente');
    return null;
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
            <Button variant="outline" onClick={() => navigate('/painel-cliente')}>
              Painel do Cliente
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
              Sair
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8 overflow-x-auto flex flex-nowrap gap-2 w-full">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="users">Clientes</TabsTrigger>
            <TabsTrigger value="financial">Financeiro</TabsTrigger>
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="domains">Domínios</TabsTrigger>
            <TabsTrigger value="hosting">Hospedagem</TabsTrigger>
            <TabsTrigger value="emails">E-mails</TabsTrigger>
            <TabsTrigger value="invoices">Faturas</TabsTrigger>
            <TabsTrigger value="orders">Pedidos</TabsTrigger>
            <TabsTrigger value="tickets">Suporte</TabsTrigger>
            <TabsTrigger value="knowledge">Base de Conhecimento</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
            <TabsTrigger value="automation">Automação</TabsTrigger>
            <TabsTrigger value="security">Segurança</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <AdminOverview />
          </TabsContent>
          
          <TabsContent value="users">
            <AdminUsers />
          </TabsContent>
          
          <TabsContent value="financial">
            <AdminFinancial />
          </TabsContent>
          
          <TabsContent value="products">
            <AdminProducts />
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
          
          <TabsContent value="knowledge">
            <AdminKnowledgeBase />
          </TabsContent>
          
          <TabsContent value="reports">
            <AdminReports />
          </TabsContent>
          
          <TabsContent value="automation">
            <AdminAutomation />
          </TabsContent>
          
          <TabsContent value="security">
            <AdminSecurity />
          </TabsContent>
          
          <TabsContent value="settings">
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </div>
    </RequireAuth>
  );
};

export default AdminDashboard;
