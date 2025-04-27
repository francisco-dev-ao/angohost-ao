
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { ProfileOverview } from '@/components/client-panel/ProfileOverview';
import { ContactProfilesList } from '@/components/client-panel/ContactProfilesList';
import { ContactProfileDialogs } from '@/components/client-panel/ContactProfileDialogs';
import { ServicesTab } from '@/components/dashboard/ServicesTab';
import { InvoicesTab } from '@/components/dashboard/InvoicesTab';
import { TicketsTab } from '@/components/dashboard/TicketsTab';
import { ContactProfileProvider } from '@/context/ContactProfileContext';
import { useClientPanel } from '@/hooks/useClientPanel';

const ClientPanel = () => {
  const { loading, userData, handleSignOut } = useClientPanel();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span>Carregando painel do cliente...</span>
      </div>
    );
  }

  return (
    <RequireAuth>
      <ContactProfileProvider>
        <div className="min-h-screen bg-gray-50 py-12 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Painel do Cliente</h1>
                <p className="text-gray-600">
                  Gerencie seus domínios, emails e serviços de hospedagem.
                </p>
              </div>
              <Button variant="outline" onClick={handleSignOut}>
                Sair
              </Button>
            </div>

            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="services">Serviços</TabsTrigger>
                <TabsTrigger value="invoices">Faturas</TabsTrigger>
                <TabsTrigger value="contacts">Perfis de Contato</TabsTrigger>
                <TabsTrigger value="tickets">Suporte</TabsTrigger>
                <TabsTrigger value="account">Minha Conta</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <ProfileOverview userData={userData} />
              </TabsContent>

              <TabsContent value="services" className="mt-6">
                <ServicesTab />
              </TabsContent>

              <TabsContent value="invoices" className="mt-6">
                <InvoicesTab />
              </TabsContent>

              <TabsContent value="contacts" className="mt-6">
                <ContactProfilesList />
                <ContactProfileDialogs />
              </TabsContent>

              <TabsContent value="tickets" className="mt-6">
                <TicketsTab />
              </TabsContent>

              <TabsContent value="account" className="mt-6">
                <ProfileOverview userData={userData} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </ContactProfileProvider>
    </RequireAuth>
  );
};

export default ClientPanel;
