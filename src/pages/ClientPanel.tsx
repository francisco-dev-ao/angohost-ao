
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Bell } from 'lucide-react';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ContactProfileProvider } from '@/context/ContactProfileContext';
import { useClientPanel } from '@/hooks/useClientPanel';

// Import dashboard components
import { DashboardOverview } from '@/components/client-panel/DashboardOverview';
import { ServicesPanel } from '@/components/client-panel/ServicesPanel';
import { DomainsPanel } from '@/components/client-panel/DomainsPanel';
import { InvoicesPanel } from '@/components/client-panel/InvoicesPanel';
import { TicketsPanel } from '@/components/client-panel/TicketsPanel';
import { ProfilePanel } from '@/components/client-panel/ProfilePanel';
import { KnowledgeBasePanel } from '@/components/client-panel/KnowledgeBasePanel';
import { DownloadsPanel } from '@/components/client-panel/DownloadsPanel';
import { AffiliatePanel } from '@/components/client-panel/AffiliatePanel';
import { NotificationsPanel } from '@/components/client-panel/NotificationsPanel';
import { ContactProfileDialogs } from '@/components/client-panel/ContactProfileDialogs';

const ClientPanel = () => {
  const { loading, userData, handleSignOut, accountBalance } = useClientPanel();
  const [activeTab, setActiveTab] = useState('overview');
  const [notificationsCount, setNotificationsCount] = useState(0);

  useEffect(() => {
    // Fetch notifications count
    const fetchNotificationsCount = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        
        if (!session?.session?.user) return;
        
        const { data } = await supabase
          .from('notifications')
          .select('count', { count: 'exact', head: true })
          .eq('user_id', session.session.user.id)
          .eq('read', false);
          
        setNotificationsCount(data || 0);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    
    fetchNotificationsCount();
    
    // Setup notification listener
    const channel = supabase
      .channel('notifications-channel')
      .on('postgres_changes', 
        {
          event: 'INSERT', 
          schema: 'public', 
          table: 'notifications',
          filter: `user_id=eq.${userData?.id}`
        },
        () => {
          setNotificationsCount(prev => prev + 1);
          fetchNotificationsCount();
        })
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userData]);

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
          {/* Header Bar */}
          <div className="bg-white border-b shadow-sm">
            <div className="container max-w-7xl mx-auto py-3 px-4">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-lg font-medium">
                    Olá <span className="font-bold">{userData?.user_metadata?.full_name || userData?.email}</span>, Bem-vindo!
                  </h1>
                </div>
                <div className="flex items-center gap-4">
                  <Button size="sm" variant="outline" onClick={() => setActiveTab('notifications')} className="relative">
                    <Bell className="h-4 w-4 mr-1" />
                    <span>Notificações</span>
                    {notificationsCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {notificationsCount}
                      </span>
                    )}
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleSignOut}>
                    Sair
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="bg-gradient-to-r from-green-500 to-teal-600 shadow-md">
            <div className="container max-w-7xl mx-auto py-6 px-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center text-white">
                  <h3 className="text-3xl font-bold">2</h3>
                  <p className="text-sm text-center">Produto e serviço</p>
                  <a href="#" className="text-xs underline mt-1 hover:text-white/80">Todos os produtos e serviços</a>
                </div>
                
                <div className="bg-blue-500/90 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center text-white">
                  <h3 className="text-3xl font-bold">0</h3>
                  <p className="text-sm text-center">Domain Names</p>
                  <a href="#" className="text-xs underline mt-1 hover:text-white/80">Todos os domínios</a>
                </div>
                
                <div className="bg-red-500/90 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center text-white">
                  <h3 className="text-3xl font-bold">0</h3>
                  <p className="text-sm text-center">Faturas não pagas</p>
                  <a href="#" className="text-xs underline mt-1 hover:text-white/80">Todas as faturas</a>
                </div>
                
                <div className="bg-gray-600/90 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center text-white">
                  <h3 className="text-3xl font-bold">0</h3>
                  <p className="text-sm text-center">Active Support Tickets</p>
                  <a href="#" className="text-xs underline mt-1 hover:text-white/80">Open Support Ticket</a>
                </div>
                
                <div className="bg-teal-500/90 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center text-white">
                  <h3 className="text-3xl font-bold">{accountBalance ? `${accountBalance}kz` : "0kz"}</h3>
                  <p className="text-sm text-center">Saldo de conta</p>
                  <a href="#" className="text-xs underline mt-1 hover:text-white/80">Add Funds</a>
                </div>
              </div>
            </div>
          </div>

          {/* Domain Search (similar to the image) */}
          <div className="container max-w-7xl mx-auto my-8 px-4">
            <div className="bg-white border rounded-lg shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h2 className="text-xl md:text-2xl text-gray-700">
                  Registre o seu nome de domínio e desfrute de suporte contínuo 24/7
                </h2>
                <span className="text-2xl font-semibold text-gray-700">25.000kz</span>
              </div>
              
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="seudominio.ao"
                    className="w-full h-12 rounded-lg border border-gray-300 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <Button className="h-12 bg-green-500 hover:bg-green-600 px-8 text-white">
                  Verificar
                </Button>
              </div>
            </div>
          </div>

          <div className="container max-w-7xl mx-auto px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="bg-white border rounded-lg shadow-sm mb-6">
                <TabsList className="flex flex-wrap border-b overflow-x-auto">
                  <TabsTrigger value="overview" className="py-3 px-4">Visão Geral</TabsTrigger>
                  <TabsTrigger value="services" className="py-3 px-4">Meus Serviços</TabsTrigger>
                  <TabsTrigger value="domains" className="py-3 px-4">Domínios</TabsTrigger>
                  <TabsTrigger value="invoices" className="py-3 px-4">Faturas</TabsTrigger>
                  <TabsTrigger value="tickets" className="py-3 px-4">Tickets de Suporte</TabsTrigger>
                  <TabsTrigger value="profile" className="py-3 px-4">Meu Perfil</TabsTrigger>
                  <TabsTrigger value="downloads" className="py-3 px-4">Downloads</TabsTrigger>
                  <TabsTrigger value="knowledge" className="py-3 px-4">Base de Conhecimento</TabsTrigger>
                  <TabsTrigger value="notifications" className="py-3 px-4">Notificações</TabsTrigger>
                  <TabsTrigger value="affiliate" className="py-3 px-4">Programa de Afiliados</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview">
                <DashboardOverview userData={userData} />
              </TabsContent>

              <TabsContent value="services">
                <ServicesPanel />
              </TabsContent>

              <TabsContent value="domains">
                <DomainsPanel />
              </TabsContent>

              <TabsContent value="invoices">
                <InvoicesPanel />
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

          {/* Dialogs */}
          <ContactProfileDialogs />
        </div>
      </ContactProfileProvider>
    </RequireAuth>
  );
};

export default ClientPanel;
