
import React from 'react';
import { Outlet } from 'react-router-dom';
import { PanelNavigation } from '@/components/client-panel/PanelNavigation';
import { PanelHeader } from '@/components/client-panel/PanelHeader';

const ClientPanelLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <PanelHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <PanelNavigation />
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
