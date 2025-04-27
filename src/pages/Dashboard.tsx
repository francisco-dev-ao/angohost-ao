
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ServicesTab } from '@/components/dashboard/ServicesTab';
import { ProfileTab } from '@/components/dashboard/ProfileTab';
import { InvoicesTab } from '@/components/dashboard/InvoicesTab';
import { TicketsTab } from '@/components/dashboard/TicketsTab';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { WalletTab } from '@/components/dashboard/WalletTab';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Painel do Cliente</h1>
        <p className="text-gray-600 mb-8">
          Gerencie seus serviços e controle suas finanças
        </p>
        
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="services">Serviços</TabsTrigger>
            <TabsTrigger value="invoices">Faturas</TabsTrigger>
            <TabsTrigger value="wallet">Carteira</TabsTrigger>
            <TabsTrigger value="tickets">Suporte</TabsTrigger>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <DashboardOverview />
          </TabsContent>
          
          <TabsContent value="services" className="mt-6">
            <ServicesTab />
          </TabsContent>
          
          <TabsContent value="invoices" className="mt-6">
            <InvoicesTab />
          </TabsContent>
          
          <TabsContent value="wallet" className="mt-6">
            <WalletTab />
          </TabsContent>
          
          <TabsContent value="tickets" className="mt-6">
            <TicketsTab />
          </TabsContent>
          
          <TabsContent value="profile" className="mt-6">
            <ProfileTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
