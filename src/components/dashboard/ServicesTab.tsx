
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from '@/integrations/supabase/client';
import { OrdersContent } from './services/OrdersContent';
import { HostingContent } from './services/HostingContent';
import { DomainsContent } from './services/DomainsContent';
import { EmailContent } from './services/EmailContent';
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useClientPanel } from '@/hooks/useClientPanel';
import type { Order } from './types';

export const ServicesTab = () => {
  const navigate = useNavigate();
  const { services, domains, loading: clientLoading } = useClientPanel();
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

  const handleNewService = (type: string) => {
    switch(type) {
      case 'hosting':
        navigate('/hospedagem-de-sites');
        break;
      case 'domain':
        navigate('/dominios/registrar');
        break;
      case 'email':
        navigate('/Email-profissional');
        break;
      default:
        break;
    }
  };

  return (
    <Tabs defaultValue="orders">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="orders">Meus Pedidos</TabsTrigger>
          <TabsTrigger value="hosting">Hospedagem</TabsTrigger>
          <TabsTrigger value="domains">Domínios</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleNewService('hosting')}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Nova Hospedagem
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleNewService('domain')}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Novo Domínio
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleNewService('email')}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Novo Email
          </Button>
        </div>
      </div>
      
      <TabsContent value="orders" className="space-y-4">
        <OrdersContent
          orders={orders}
          loading={loading}
          error={error}
          fetchOrders={fetchOrders}
        />
      </TabsContent>
      
      <TabsContent value="hosting">
        <HostingContent 
          services={services} 
          loading={clientLoading}
        />
      </TabsContent>
      
      <TabsContent value="domains">
        <DomainsContent 
          domains={domains}
          loading={clientLoading}
        />
      </TabsContent>
      
      <TabsContent value="email">
        <EmailContent 
          loading={clientLoading}
        />
      </TabsContent>
    </Tabs>
  );
};
