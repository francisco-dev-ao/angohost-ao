
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Globe, Server, Mail, FileText, ShoppingCart, LifeBuoy } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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
          { data: pendingTickets, error: pendingTicketsError }
        ] = await Promise.all([
          supabase.from('customers').select('id', { count: 'exact' }),
          supabase.from('domains').select('id', { count: 'exact' }),
          supabase.from('hosting_services').select('id', { count: 'exact' }),
          supabase.from('email_accounts').select('id', { count: 'exact' }),
          supabase.from('invoices').select('id', { count: 'exact' }),
          supabase.from('orders').select('id', { count: 'exact' }),
          supabase.from('support_tickets').select('id', { count: 'exact' }),
          supabase.from('support_tickets').select('id', { count: 'exact' }).eq('status', 'open')
        ]);
        
        // Handle errors and set data
        setStats({
          userCount: users?.length || 0,
          domainCount: domains?.length || 0,
          hostingCount: hosting?.length || 0,
          emailCount: emails?.length || 0,
          invoiceCount: invoices?.length || 0,
          orderCount: orders?.length || 0,
          ticketCount: tickets?.length || 0,
          pendingTickets: pendingTickets?.length || 0
        });
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);
  
  const statCards = [
    { title: "Usuários", value: stats.userCount, icon: <Users className="h-5 w-5 text-blue-600" /> },
    { title: "Domínios", value: stats.domainCount, icon: <Globe className="h-5 w-5 text-green-600" /> },
    { title: "Hospedagem", value: stats.hostingCount, icon: <Server className="h-5 w-5 text-purple-600" /> },
    { title: "Emails", value: stats.emailCount, icon: <Mail className="h-5 w-5 text-orange-600" /> },
    { title: "Faturas", value: stats.invoiceCount, icon: <FileText className="h-5 w-5 text-yellow-600" /> },
    { title: "Pedidos", value: stats.orderCount, icon: <ShoppingCart className="h-5 w-5 text-indigo-600" /> },
    { title: "Tickets", value: stats.ticketCount, icon: <LifeBuoy className="h-5 w-5 text-red-600" /> },
    { title: "Tickets Pendentes", value: stats.pendingTickets, icon: <LifeBuoy className="h-5 w-5 text-red-800" /> }
  ];
  
  return (
    <div>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Visão Geral do Sistema</CardTitle>
          <CardDescription>Estatísticas gerais da sua plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">
                        {loading ? '...' : stat.value}
                      </p>
                    </div>
                    <div className="rounded-full p-2 bg-muted">
                      {stat.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
