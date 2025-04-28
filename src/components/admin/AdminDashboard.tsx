
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from '@/hooks/useUser';
import { supabase } from '@/integrations/supabase/client';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { 
  Users, Globe, Server, FileText, LifeBuoy, Zap, CreditCard, ArrowRight 
} from "lucide-react";
import { toast } from 'sonner';
import { format, subDays } from 'date-fns';
import { pt } from 'date-fns/locale';

export const AdminDashboard = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    customers: 0,
    domains: 0,
    hosting: 0,
    invoices: 0,
    tickets: 0,
    pendingInvoicesAmount: 0,
    newCustomersToday: 0,
    newTickets: 0,
  });
  
  const [salesData, setSalesData] = useState([]);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
        
        // Get total customers
        const { count: customersCount } = await supabase
          .from('customers')
          .select('*', { count: 'exact', head: true });
        
        // Get total domains
        const { count: domainsCount } = await supabase
          .from('domains')
          .select('*', { count: 'exact', head: true });
          
        // Get total hosting services
        const { count: hostingCount } = await supabase
          .from('hosting_services')
          .select('*', { count: 'exact', head: true });
          
        // Get total invoices
        const { count: invoicesCount } = await supabase
          .from('invoices')
          .select('*', { count: 'exact', head: true });
          
        // Get total open tickets
        const { count: ticketsCount } = await supabase
          .from('tickets')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'open');
          
        // Get pending invoices amount
        const { data: pendingInvoices } = await supabase
          .from('invoices')
          .select('total_amount')
          .eq('status', 'unpaid');
          
        const pendingAmount = pendingInvoices?.reduce((acc, inv) => acc + Number(inv.total_amount), 0) || 0;
        
        // Get new customers today
        const { count: newCustomersCount } = await supabase
          .from('customers')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', startOfDay);
          
        // Get new tickets today
        const { count: newTicketsCount } = await supabase
          .from('tickets')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', startOfDay);
          
        setStats({
          customers: customersCount || 0,
          domains: domainsCount || 0,
          hosting: hostingCount || 0,
          invoices: invoicesCount || 0,
          tickets: ticketsCount || 0,
          pendingInvoicesAmount: pendingAmount,
          newCustomersToday: newCustomersCount || 0,
          newTickets: newTicketsCount || 0,
        });
        
        // Generate mock sales data for the chart
        const mockSalesData = [];
        for (let i = 30; i >= 0; i--) {
          const date = subDays(new Date(), i);
          mockSalesData.push({
            date: format(date, 'dd/MM', { locale: pt }),
            amount: Math.floor(Math.random() * 10000) + 1000
          });
        }
        
        setSalesData(mockSalesData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Erro ao carregar informações do painel');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [user]);
  
  const statusData = [
    { name: 'Ativo', value: 65 },
    { name: 'Pendente', value: 15 },
    { name: 'Vencido', value: 10 },
    { name: 'Cancelado', value: 10 },
  ];
  
  const COLORS = ['#22c55e', '#3b82f6', '#f97316', '#ef4444'];
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Painel de Controle</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.customers}</div>
            <p className="text-xs text-muted-foreground">
              {stats.newCustomersToday} novos hoje
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Domínios</CardTitle>
            <Globe className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.domains}</div>
            <p className="text-xs text-muted-foreground">
              Domínios registrados
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Hospedagens</CardTitle>
            <Server className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.hosting}</div>
            <p className="text-xs text-muted-foreground">
              Serviços ativos
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Tickets</CardTitle>
            <LifeBuoy className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.tickets}</div>
            <p className="text-xs text-muted-foreground">
              {stats.newTickets} novos hoje
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Vendas (Últimos 30 dias)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`Kz ${value.toLocaleString()}`, 'Receita']}
                  />
                  <Bar dataKey="amount" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Status de Serviços</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentual']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Faturas Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">
                  Kz {stats.pendingInvoicesAmount.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Total de faturas não pagas
                </p>
              </div>
              <div>
                <Button variant="outline" className="flex items-center gap-1">
                  Ver todas <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Suporte</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">
                  {stats.tickets}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Tickets aguardando resposta
                </p>
              </div>
              <div>
                <Button variant="outline" className="flex items-center gap-1">
                  Responder <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="border-t pt-6 mt-4">
        <h2 className="text-xl font-bold mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
            <Users className="h-5 w-5" />
            <span>Novo Cliente</span>
          </Button>
          
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
            <Globe className="h-5 w-5" />
            <span>Registrar Domínio</span>
          </Button>
          
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
            <FileText className="h-5 w-5" />
            <span>Criar Fatura</span>
          </Button>
          
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
            <Zap className="h-5 w-5" />
            <span>Novo Serviço</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
