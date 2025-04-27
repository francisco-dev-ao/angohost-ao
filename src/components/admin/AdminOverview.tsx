
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CreditCard, ShoppingCart, TicketIcon, AlertTriangle, BarChart3 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { DashboardWidget } from './dashboard/DashboardWidget';
import { RevenueChart } from './dashboard/RevenueChart';
import { ClientsChart } from './dashboard/ClientsChart';
import { TicketsStatusChart } from './dashboard/TicketsStatusChart';
import { FinancialSummaryCards } from './dashboard/FinancialSummaryCards';
import { RecentActivities } from './dashboard/RecentActivities';
import { ServerStatus } from './dashboard/ServerStatus';

export const AdminOverview = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    domainCount: 0,
    hostingCount: 0,
    emailCount: 0,
    invoiceCount: 0,
    orderCount: 0,
    ticketCount: 0,
    pendingTickets: 0,
    overdueInvoices: 0,
    revenueToday: 0,
    revenueMonth: 0,
    revenueYear: 0,
    newClientsToday: 0,
    activeClients: 0,
    inactiveClients: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Fetch statistics from various tables
        const [
          { data: users, error: usersError },
          { data: domains, error: domainsError },
          { data: hosting, error: hostingError },
          { data: emails, error: emailsError },
          { data: invoices, error: invoicesError },
          { data: orders, error: ordersError },
          { data: tickets, error: ticketsError },
          { data: pendingTickets, error: pendingTicketsError },
          { data: overdueInvoices, error: overdueInvoicesError }
        ] = await Promise.all([
          supabase.from('customers').select('id', { count: 'exact' }),
          supabase.from('domains').select('id', { count: 'exact' }),
          supabase.from('hosting_services').select('id', { count: 'exact' }),
          supabase.from('email_accounts').select('id', { count: 'exact' }),
          supabase.from('invoices').select('id', { count: 'exact' }),
          supabase.from('orders').select('id', { count: 'exact' }),
          supabase.from('support_tickets').select('id', { count: 'exact' }),
          supabase.from('support_tickets').select('id', { count: 'exact' }).eq('status', 'open'),
          supabase.from('invoices').select('id', { count: 'exact' })
            .eq('status', 'unpaid')
            .lt('due_date', new Date().toISOString())
        ]);
        
        // Calculate revenue stats (simulated for demo)
        const revenueToday = 125000;
        const revenueMonth = 3750000;
        const revenueYear = 42000000;
        
        // Calculate client stats (simulated for demo)
        const newClientsToday = 3;
        const activeClients = users?.length * 0.85 || 0;
        const inactiveClients = users?.length * 0.15 || 0;
        
        // Handle errors and set data
        setStats({
          userCount: users?.length || 0,
          domainCount: domains?.length || 0,
          hostingCount: hosting?.length || 0,
          emailCount: emails?.length || 0,
          invoiceCount: invoices?.length || 0,
          orderCount: orders?.length || 0,
          ticketCount: tickets?.length || 0,
          pendingTickets: pendingTickets?.length || 0,
          overdueInvoices: overdueInvoices?.length || 0,
          revenueToday,
          revenueMonth,
          revenueYear,
          newClientsToday,
          activeClients: Math.floor(activeClients),
          inactiveClients: Math.floor(inactiveClients),
        });
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
    // Refresh every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="space-y-6">
      {/* Financial Summary */}
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Resumo Financeiro</CardTitle>
          <CardDescription>Visão geral das receitas</CardDescription>
        </CardHeader>
        <CardContent>
          <FinancialSummaryCards 
            revenueToday={stats.revenueToday}
            revenueMonth={stats.revenueMonth}
            revenueYear={stats.revenueYear}
            loading={loading}
          />
        </CardContent>
      </Card>
      
      {/* Clients Summary */}
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Resumo de Clientes</CardTitle>
          <CardDescription>Visão geral dos clientes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <DashboardWidget 
              title="Novos Clientes Hoje"
              value={stats.newClientsToday}
              icon={<Users className="h-5 w-5 text-blue-600" />}
              loading={loading}
            />
            <DashboardWidget 
              title="Clientes Ativos"
              value={stats.activeClients}
              icon={<Users className="h-5 w-5 text-green-600" />}
              loading={loading}
            />
            <DashboardWidget 
              title="Clientes Inativos"
              value={stats.inactiveClients}
              icon={<Users className="h-5 w-5 text-gray-600" />}
              loading={loading}
            />
          </div>
          <ClientsChart />
        </CardContent>
      </Card>
      
      {/* Quick Alerts */}
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Alertas Rápidos</CardTitle>
          <CardDescription>Itens que requerem atenção</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DashboardWidget 
              title="Tickets Pendentes"
              value={stats.pendingTickets}
              icon={<TicketIcon className="h-5 w-5 text-amber-600" />}
              loading={loading}
              href="/admin/tickets?filter=pending"
            />
            <DashboardWidget 
              title="Faturas Vencidas"
              value={stats.overdueInvoices}
              icon={<CreditCard className="h-5 w-5 text-red-600" />}
              loading={loading}
              href="/admin/invoices?filter=overdue"
            />
            <DashboardWidget 
              title="Novos Pedidos"
              value={Math.floor(stats.orderCount * 0.15)}
              icon={<ShoppingCart className="h-5 w-5 text-green-600" />}
              loading={loading}
              href="/admin/orders?filter=new"
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Dashboard Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Receitas (Últimos 12 Meses)</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <RevenueChart />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Status dos Tickets</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <TicketsStatusChart />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivities />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Status dos Servidores</CardTitle>
          </CardHeader>
          <CardContent>
            <ServerStatus />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
