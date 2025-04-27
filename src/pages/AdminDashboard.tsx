
import React, { useState, useEffect } from 'react';
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
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { createInitialAdminUser } from '@/utils/createAdminUser';

const AdminDashboard = () => {
  const { isAdmin, loading } = useAdmin();
  const [activeTab, setActiveTab] = useState('overview');
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);
  
  const handleCreateAdminUser = async () => {
    try {
      setIsCreatingAdmin(true);
      await createInitialAdminUser();
      toast.success('Usuário administrador criado ou atualizado com sucesso');
    } catch (error) {
      console.error('Erro ao criar usuário admin:', error);
      toast.error('Erro ao criar usuário administrador');
    } finally {
      setIsCreatingAdmin(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Carregando painel administrativo...</span>
      </div>
    );
  }
  
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>Acesso negado. Esta página é restrita a administradores.</p>
        <Button 
          onClick={handleCreateAdminUser} 
          className="mt-4"
          disabled={isCreatingAdmin}
        >
          {isCreatingAdmin ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Criando...
            </>
          ) : (
            'Criar usuário administrador (support@angohost.ao)'
          )}
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
      <p className="text-muted-foreground mb-8">Gerencie usuários, serviços e configurações do sistema</p>
      
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
  );
};

export default AdminDashboard;
