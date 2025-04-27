
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <RequireAuth redirectTo="/auth" requireAdmin={true}>
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
    </RequireAuth>
  );
};

export default AdminDashboard;
