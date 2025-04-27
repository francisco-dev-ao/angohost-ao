import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ServicesTab } from '@/components/dashboard/ServicesTab';
import { ProfileTab } from '@/components/dashboard/ProfileTab';
import { InvoicesTab } from '@/components/dashboard/InvoicesTab';
import { TicketsTab } from '@/components/dashboard/TicketsTab';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { WalletTab } from '@/components/dashboard/WalletTab';
import { useUser } from '@/hooks/useUser';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user } = useUser();
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const { data: customer } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      if (customer) {
        const { data } = await supabase
          .from('notifications')
          .select('*')
          .eq('customer_id', customer.id)
          .eq('status', 'pending')
          .order('scheduled_for', { ascending: true });

        if (data) {
          setNotifications(data);
          data.forEach(notification => {
            toast.info(notification.message, {
              description: notification.title,
              duration: 5000,
            });
          });

          // Marcar notificações como lidas
          const notificationIds = data.map(n => n.id);
          await supabase
            .from('notifications')
            .update({ status: 'read' })
            .in('id', notificationIds);
        }
      }
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Painel do Cliente</h1>
        <p className="text-gray-600 mb-8">
          Gerencie seus serviços e controle suas finanças
        </p>
        
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="services">Serviços</TabsTrigger>
            <TabsTrigger value="invoices">Faturas</TabsTrigger>
            <TabsTrigger value="wallet">Carteira</TabsTrigger>
            <TabsTrigger value="tickets">Suporte</TabsTrigger>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <DashboardOverview />
          </TabsContent>
          
          <TabsContent value="services" className="mt-6">
            <ServicesTab />
          </TabsContent>
          
          <TabsContent value="invoices" className="mt-6">
            <InvoicesTab />
          </TabsContent>
          
          <TabsContent value="wallet" className="mt-6">
            <WalletTab />
          </TabsContent>
          
          <TabsContent value="tickets" className="mt-6">
            <TicketsTab />
          </TabsContent>
          
          <TabsContent value="profile" className="mt-6">
            <ProfileTab user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
