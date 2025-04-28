
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, FileText, Globe, Server, 
  LifeBuoy, Bell, Settings, LogOut, CreditCard  
} from 'lucide-react';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { ClientDashboard } from '@/components/client/ClientDashboard';
import { ClientInvoices } from '@/components/client/ClientInvoices';
import { ClientDomains } from '@/components/client/ClientDomains';
import { ClientHosting } from '@/components/client/ClientHosting';
import { ClientSupport } from '@/components/client/ClientSupport';
import { ClientSettings } from '@/components/client/ClientSettings';
import { ClientNotifications } from '@/components/client/ClientNotifications';
import { toast } from 'sonner';
import { useNotifications } from '@/hooks/useNotifications';

const ClientPanel = () => {
  const navigate = useNavigate();
  const { user, loading } = useUser();
  const [activeTab, setActiveTab] = useState('dashboard');
  const { notifications } = useNotifications(user?.id);
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success('Sessão encerrada com sucesso');
    navigate('/');
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const unreadNotifications = notifications?.filter(n => !n.is_read).length || 0;
  
  return (
    <RequireAuth>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="lg:w-64 bg-white shadow-md p-4 lg:p-6 space-y-6">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-blue-700">Painel do Cliente</h2>
            <p className="text-gray-500 text-sm mt-1">Olá, {user?.email}</p>
          </div>
          
          <nav className="space-y-1">
            <Button 
              variant={activeTab === 'dashboard' ? 'default' : 'ghost'} 
              className="w-full justify-start" 
              onClick={() => setActiveTab('dashboard')}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            
            <Button 
              variant={activeTab === 'invoices' ? 'default' : 'ghost'} 
              className="w-full justify-start" 
              onClick={() => setActiveTab('invoices')}
            >
              <FileText className="mr-2 h-4 w-4" />
              Faturas
            </Button>
            
            <Button 
              variant={activeTab === 'domains' ? 'default' : 'ghost'} 
              className="w-full justify-start" 
              onClick={() => setActiveTab('domains')}
            >
              <Globe className="mr-2 h-4 w-4" />
              Meus Domínios
            </Button>
            
            <Button 
              variant={activeTab === 'hosting' ? 'default' : 'ghost'} 
              className="w-full justify-start" 
              onClick={() => setActiveTab('hosting')}
            >
              <Server className="mr-2 h-4 w-4" />
              Meus Serviços
            </Button>
            
            <Button 
              variant={activeTab === 'support' ? 'default' : 'ghost'} 
              className="w-full justify-start" 
              onClick={() => setActiveTab('support')}
            >
              <LifeBuoy className="mr-2 h-4 w-4" />
              Suporte
            </Button>
            
            <Button 
              variant={activeTab === 'notifications' ? 'default' : 'ghost'} 
              className="w-full justify-start" 
              onClick={() => setActiveTab('notifications')}
            >
              <Bell className="mr-2 h-4 w-4" />
              Notificações
              {unreadNotifications > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {unreadNotifications}
                </span>
              )}
            </Button>
            
            <Button 
              variant={activeTab === 'settings' ? 'default' : 'ghost'} 
              className="w-full justify-start" 
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="mr-2 h-4 w-4" />
              Meu Perfil
            </Button>
          </nav>
          
          <div className="pt-6">
            <Button variant="outline" className="w-full justify-start text-red-500" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          {activeTab === 'dashboard' && <ClientDashboard />}
          {activeTab === 'invoices' && <ClientInvoices />}
          {activeTab === 'domains' && <ClientDomains />}
          {activeTab === 'hosting' && <ClientHosting />}
          {activeTab === 'support' && <ClientSupport />}
          {activeTab === 'notifications' && <ClientNotifications />}
          {activeTab === 'settings' && <ClientSettings user={user} />}
        </main>
      </div>
    </RequireAuth>
  );
};

export default ClientPanel;
