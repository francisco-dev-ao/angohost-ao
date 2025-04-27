
import React, { useState } from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Loader2 } from 'lucide-react';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { ContactProfileProvider } from '@/context/ContactProfileContext';
import { useClientPanel } from '@/hooks/useClientPanel';

// Import panel components
import { PanelHeader } from '@/components/client-panel/PanelHeader';
import { StatsOverview } from '@/components/client-panel/StatsOverview';
import { DomainSearchPanel } from '@/components/client-panel/DomainSearchPanel';
import { PanelNavigation } from '@/components/client-panel/PanelNavigation';
import { DashboardOverview } from '@/components/client-panel/DashboardOverview';
import { ServicesPanel } from '@/components/client-panel/ServicesPanel';
import { DomainsPanel } from '@/components/client-panel/DomainsPanel';
import { InvoicesPanel } from '@/components/client-panel/InvoicesPanel';
import { TicketsPanel } from '@/components/client-panel/TicketsPanel';
import { ProfilePanel } from '@/components/client-panel/ProfilePanel';
import { DownloadsPanel } from '@/components/client-panel/DownloadsPanel';
import { KnowledgeBasePanel } from '@/components/client-panel/KnowledgeBasePanel';
import { NotificationsPanel } from '@/components/client-panel/NotificationsPanel';
import { AffiliatePanel } from '@/components/client-panel/AffiliatePanel';
import { ContactProfileDialogs } from '@/components/client-panel/ContactProfileDialogs';

const ClientPanel = () => {
  const { loading, userData, handleSignOut, accountBalance, services, domains, invoices } = useClientPanel();
  const [activeTab, setActiveTab] = useState('overview');
  const [notificationsCount] = useState(3);

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
        <div className="min-h-screen bg-gray-50 pb-12">
          <PanelHeader
            userData={userData}
            notificationsCount={notificationsCount}
            handleSignOut={handleSignOut}
            setActiveTab={setActiveTab}
          />

          <StatsOverview accountBalance={accountBalance} />
          <DomainSearchPanel />

          <div className="container max-w-7xl mx-auto px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="bg-white border rounded-lg shadow-sm mb-6">
                <PanelNavigation />
              </div>

              <TabsContent value="overview">
                <DashboardOverview userData={userData} />
              </TabsContent>
              
              <TabsContent value="services">
                <ServicesPanel services={services} />
              </TabsContent>
              
              <TabsContent value="domains">
                <DomainsPanel domains={domains} />
              </TabsContent>
              
              <TabsContent value="invoices">
                <InvoicesPanel invoices={invoices} />
              </TabsContent>
              
              <TabsContent value="tickets">
                <TicketsPanel />
              </TabsContent>
              
              <TabsContent value="profile">
                <ProfilePanel userData={userData} />
              </TabsContent>
              
              <TabsContent value="downloads">
                <DownloadsPanel />
              </TabsContent>
              
              <TabsContent value="knowledge">
                <KnowledgeBasePanel />
              </TabsContent>
              
              <TabsContent value="notifications">
                <NotificationsPanel />
              </TabsContent>
              
              <TabsContent value="affiliate">
                <AffiliatePanel userData={userData} />
              </TabsContent>
            </Tabs>
          </div>

          <ContactProfileDialogs />
        </div>
      </ContactProfileProvider>
    </RequireAuth>
  );
};

export default ClientPanel;
