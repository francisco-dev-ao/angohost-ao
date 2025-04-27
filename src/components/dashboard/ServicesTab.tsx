
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from '@/integrations/supabase/client';
import { OrdersContent } from './services/OrdersContent';
import { HostingContent } from './services/HostingContent';
import { DomainsContent } from './services/DomainsContent';
import { EmailContent } from './services/EmailContent';
import type { Order } from './types';

export const ServicesTab = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: session } = await supabase.auth.getSession();
      
      if (!session?.session?.user) {
        setError("Você precisa estar logado para ver seus pedidos");
        setLoading(false);
        return;
      }
      
      const { data: customerData } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', session.session.user.id)
        .single();
      
      if (!customerData) {
        setError("Não foi possível encontrar seus dados de cliente");
        setLoading(false);
        return;
      }
      
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_id', customerData.id)
        .order('created_at', { ascending: false });
      
      if (ordersError) throw ordersError;
      
      const ordersWithItems = await Promise.all((ordersData || []).map(async (order) => {
        const { data: itemsData } = await supabase
          .from('order_items')
          .select('*')
          .eq('order_id', order.id);
        
        return {
          ...order,
          items: itemsData || []
        };
      }));
      
      setOrders(ordersWithItems);
    } catch (err: any) {
      console.error('Erro ao buscar pedidos:', err);
      setError('Não foi possível carregar seus pedidos. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Meus Pedidos</TabsTrigger>
        <TabsTrigger value="hosting">Hospedagem</TabsTrigger>
        <TabsTrigger value="domains">Domínios</TabsTrigger>
        <TabsTrigger value="email">Email</TabsTrigger>
      </TabsList>
      
      <TabsContent value="orders" className="space-y-4">
        <OrdersContent
          orders={orders}
          loading={loading}
          error={error}
          fetchOrders={fetchOrders}
        />
      </TabsContent>
      
      <TabsContent value="hosting">
        <HostingContent />
      </TabsContent>
      
      <TabsContent value="domains">
        <DomainsContent />
      </TabsContent>
      
      <TabsContent value="email">
        <EmailContent />
      </TabsContent>
    </Tabs>
  );
};
