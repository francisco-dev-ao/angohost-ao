
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { useClientDashboard } from '@/hooks/useClientDashboard';
import { ClientDashboardProvider } from '@/context/ClientDashboardContext';
import { OverviewTab } from '@/components/client-panel/OverviewTab';
import { DomainsTab } from '@/components/client-panel/DomainsTab';
import { EmailsTab } from '@/components/client-panel/EmailsTab';
import { HostingTab } from '@/components/client-panel/HostingTab';
import { AccountTab } from '@/components/client-panel/AccountTab';

const ClientPanelContent = () => {
  const { loading } = useClientDashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Carregando seus dados...</span>
      </div>
    );
  }

  return (
    <Tabs defaultValue="overview">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview">Visão Geral</TabsTrigger>
        <TabsTrigger value="domains">Domínios</TabsTrigger>
        <TabsTrigger value="emails">Emails</TabsTrigger>
        <TabsTrigger value="hosting">Hospedagem</TabsTrigger>
        <TabsTrigger value="account">Minha Conta</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="mt-6">
        <OverviewTab />
      </TabsContent>
      
      <TabsContent value="domains" className="mt-6">
        <DomainsTab />
      </TabsContent>
      
      <TabsContent value="emails" className="mt-6">
        <EmailsTab />
      </TabsContent>
      
      <TabsContent value="hosting" className="mt-6">
        <HostingTab />
      </TabsContent>
      
      <TabsContent value="account" className="mt-6">
        <AccountTab />
      </TabsContent>
    </Tabs>
  );
};

const ClientPanel = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Painel do Cliente</h1>
        <p className="text-gray-600 mb-8">
          Gerencie seus domínios, emails e serviços de hospedagem.
        </p>
        
        <ClientDashboardProvider>
          <ClientPanelContent />
        </ClientDashboardProvider>
      </div>
    </div>
  );
};

export default ClientPanel;
