
import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { ContactProfileProvider } from '@/context/ContactProfileContext';
import { useClientPanel } from '@/hooks/useClientPanel';
import { PanelHeader } from '@/components/client-panel/PanelHeader';
import { StatsOverview } from '@/components/client-panel/StatsOverview';
import { DomainSearchPanel } from '@/components/client-panel/DomainSearchPanel';
import { PanelNavigation } from '@/components/client-panel/PanelNavigation';
import { ContactProfileDialogs } from '@/components/client-panel/ContactProfileDialogs';

const ClientPanel = () => {
  const { loading, userData, handleSignOut, accountBalance, services, domains, invoices } = useClientPanel();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (location.pathname === '/painel-cliente') {
      navigate('/painel-cliente/visao-geral');
    }
  }, [location, navigate]);

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
            notificationsCount={3}
            handleSignOut={handleSignOut}
            setActiveTab={(tab) => navigate(`/painel-cliente/${tab}`)}
          />

          <StatsOverview accountBalance={accountBalance} />
          <DomainSearchPanel />

          <div className="container max-w-7xl mx-auto px-4">
            <div className="bg-white border rounded-lg shadow-sm mb-6">
              <PanelNavigation
                activeTab={location.pathname.split('/').pop() || 'visao-geral'}
                onTabChange={(tab) => navigate(`/painel-cliente/${tab}`)}
              />
            </div>

            <Outlet context={{ userData, services, domains, invoices }} />
          </div>

          <ContactProfileDialogs />
        </div>
      </ContactProfileProvider>
    </RequireAuth>
  );
};

export default ClientPanel;
