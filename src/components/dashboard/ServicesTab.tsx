import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCcw, Server, Globe, Mail, Package, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { ServiceStatusCard } from './ServiceStatusCard';

type Order = {
  id: string;
  invoice_number: string | null;
  created_at: string;
  status: string;
  total_amount: number;
  payment_method: string | null;
  items: OrderItem[];
}

type OrderItem = {
  id: string;
  order_id: string;
  product_name: string;
  product_type: string;
  price: number;
  quantity: number;
  period: string;
}

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'concluído':
        return <Badge className="bg-green-500">Concluído</Badge>;
      case 'pending':
      case 'pendente':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300">Pendente</Badge>;
      case 'processing':
      case 'processando':
        return <Badge variant="outline" className="text-blue-600 border-blue-300">Processando</Badge>;
      case 'cancelled':
      case 'cancelado':
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Meus Pedidos</TabsTrigger>
        <TabsTrigger value="hosting">Hospedagem</TabsTrigger>
        <TabsTrigger value="domains">Domínios</TabsTrigger>
        <TabsTrigger value="email">Email</TabsTrigger>
      </TabsList>
      
      <TabsContent value="orders" className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Histórico de Pedidos</CardTitle>
              <CardDescription>Todos os seus pedidos realizados</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={fetchOrders} disabled={loading}>
              <RefreshCcw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              {loading ? (
                <div className="p-8 text-center text-muted-foreground">
                  <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3"></div>
                  <p>Carregando pedidos...</p>
                </div>
              ) : error ? (
                <div className="p-8 text-center text-muted-foreground">
                  <AlertCircle className="h-6 w-6 mx-auto mb-3 text-red-500" />
                  <p>{error}</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
                  <p>Nenhum pedido encontrado</p>
                </div>
              ) : (
                <div className="divide-y">
                  {orders.map((order) => (
                    <div key={order.id} className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="font-medium">Pedido #{order.invoice_number || order.id.slice(0, 8)}</p>
                          <p className="text-sm text-muted-foreground">Data: {formatDate(order.created_at)}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium">
                            {formatCurrency(order.total_amount)}
                          </span>
                          {getStatusBadge(order.status)}
                        </div>
                      </div>
                      
                      <div className="bg-muted/50 rounded-md p-3">
                        <p className="text-sm font-medium mb-2">Itens do pedido:</p>
                        <ul className="space-y-2">
                          {order.items.map((item) => (
                            <li key={item.id} className="text-sm flex justify-between">
                              <div>
                                <span>
                                  {item.product_name} 
                                  {item.quantity > 1 ? ` (${item.quantity}x)` : ''}
                                </span>
                                <span className="text-xs text-muted-foreground ml-2">
                                  {item.period === 'yearly' ? 'Anual' : 'Mensal'}
                                </span>
                              </div>
                              <span>{formatCurrency(item.price)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {order.payment_method && (
                        <p className="text-sm text-right mt-2">
                          Método de pagamento: {order.payment_method}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="hosting">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Serviços de Hospedagem</CardTitle>
                <CardDescription>Detalhes dos seus serviços de hospedagem</CardDescription>
              </div>
              <Server className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <ServiceStatusCard
              type="hosting"
              title="Plano de Hospedagem"
              description="Seu plano atual de hospedagem web"
              status="active"
              expiryDate="31/12/2025"
              nextPayment="01/12/2024"
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="domains">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Meus Domínios</CardTitle>
                <CardDescription>Domínios registrados e data de expiração</CardDescription>
              </div>
              <Globe className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <ServiceStatusCard
              type="domains"
              title="Domínio Principal"
              description="Status do seu domínio registrado"
              status="active"
              expiryDate="31/12/2025"
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="email">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Serviços de Email</CardTitle>
                <CardDescription>Suas contas de email profissional</CardDescription>
              </div>
              <Mail className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <ServiceStatusCard
              type="email"
              title="Email Profissional"
              description="Status do seu serviço de email"
              status="active"
              expiryDate="31/12/2025"
              nextPayment="01/12/2024"
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
