
import React, { createContext, useContext } from 'react';
import { useClientDashboard } from '@/hooks/useClientDashboard';

type ClientDashboardContextType = ReturnType<typeof useClientDashboard>;

const ClientDashboardContext = createContext<ClientDashboardContextType | null>(null);

export const ClientDashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const dashboard = useClientDashboard();
  
  return (
    <ClientDashboardContext.Provider value={dashboard}>
      {children}
    </ClientDashboardContext.Provider>
  );
};

export const useClientDashboardContext = () => {
  const context = useContext(ClientDashboardContext);
  if (!context) {
    throw new Error('useClientDashboardContext must be used within a ClientDashboardProvider');
  }
  return context;
};
