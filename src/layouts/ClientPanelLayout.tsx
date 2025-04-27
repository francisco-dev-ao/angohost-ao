
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { PanelNavigation } from '@/components/client-panel/PanelNavigation';
import { PanelHeader } from '@/components/client-panel/PanelHeader';

const ClientPanelLayout = () => {
  const [activeTab, setActiveTab] = useState('visao-geral');
  const navigate = useNavigate();

  // Mock data for props
  const userData = { email: 'user@example.com', user_metadata: { full_name: 'Usuário' } };
  const notificationsCount = 0;
  
  const handleSignOut = () => {
    // Will be implemented later with actual auth
    console.log('Sign out clicked');
  };
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/painel-cliente/${tab}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PanelHeader 
        userData={userData} 
        notificationsCount={notificationsCount} 
        handleSignOut={handleSignOut} 
        setActiveTab={setActiveTab} 
      />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <PanelNavigation 
              activeTab={activeTab} 
              onTabChange={handleTabChange} 
            />
          </div>
          <div className="lg:col-span-9">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPanelLayout;
