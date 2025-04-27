
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Loader2, RefreshCw } from 'lucide-react';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { ContactProfileProvider } from '@/context/ContactProfileContext';
import { useClientPanel } from '@/hooks/useClientPanel';
import { PanelHeader } from '@/components/client-panel/PanelHeader';
import { StatsOverview } from '@/components/client-panel/StatsOverview';
import { DomainSearchPanel } from '@/components/client-panel/DomainSearchPanel';
import { PanelNavigation } from '@/components/client-panel/PanelNavigation';
import { ContactProfileDialogs } from '@/components/client-panel/ContactProfileDialogs';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Import the individual panel components
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

const ClientPanel = () => {
  const { loading, userData, handleSignOut, accountBalance, services, domains, invoices, refreshData } = useClientPanel();
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Extract the active tab from the URL
  const activeTab = currentPath.split('/').pop() || 'visao-geral';
  
  useEffect(() => {
    if (location.pathname === '/painel-cliente') {
      navigate('/painel-cliente/visao-geral');
    }
  }, [location, navigate]);

  // Handle manual refresh of data
  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshData();
    setRefreshing(false);
    toast.success('Dados atualizados com sucesso!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span>Carregando painel do cliente...</span>
      </div>
    );
  }

  const renderCurrentPanel = () => {
    // Use the Outlet component to render the nested route components
    return <Outlet context={{ userData, services, domains, invoices }} />;
  };

  return (
    <RequireAuth>
      <ContactProfileProvider>
        <div className="min-h-screen bg-gray-50 pb-12">
          <PanelHeader
            userData={userData}
            notificationsCount={3}
            handleSignOut={handleSignOut}
            setActiveTab={(tab) => navigate(`/painel-cliente/${tab}`)}
          />

          <StatsOverview accountBalance={accountBalance} />
          <DomainSearchPanel />

          <div className="container max-w-7xl mx-auto px-4">
            <div className="bg-white border rounded-lg shadow-sm mb-6">
              <div className="flex justify-between items-center pr-4">
                <PanelNavigation
                  activeTab={activeTab}
                  onTabChange={(tab) => navigate(`/painel-cliente/${tab}`)}
                  loading={refreshing}
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleRefresh} 
                  disabled={refreshing}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <RefreshCw className={`h-4 w-4 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
                  {refreshing ? 'Atualizando...' : 'Atualizar'}
                </Button>
              </div>
            </div>

            {renderCurrentPanel()}
          </div>

          <ContactProfileDialogs />
        </div>
      </ContactProfileProvider>
    </RequireAuth>
  );
};

export default ClientPanel;
