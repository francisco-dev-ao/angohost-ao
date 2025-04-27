
import React, { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Users, Database, Globe, FileText, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/utils/format';

const AdminDashboard = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [stats, setStats] = useState({
    customers: 0,
    domains: 0,
    hosting: 0,
    invoices: 0,
    pendingPayments: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await supabase.auth.getUser();
      setUserData(data.user);
    };

    const fetchStats = async () => {
      try {
        // Get statistics from database
        const { count: customersCount } = await supabase
          .from('customers')
          .select('*', { count: 'exact', head: true });

        const { count: domainsCount } = await supabase
          .from('domains')
          .select('*', { count: 'exact', head: true });

        const { count: hostingCount } = await supabase
          .from('hosting_services')
          .select('*', { count: 'exact', head: true });

        const { count: invoicesCount } = await supabase
          .from('invoices')
          .select('*', { count: 'exact', head: true });

        const { count: pendingPaymentsCount } = await supabase
          .from('invoices')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'unpaid');

        // Get total revenue
        const { data: paidInvoices } = await supabase
          .from('invoices')
          .select('amount')
          .eq('status', 'paid');

        const totalRevenue = paidInvoices?.reduce((sum, invoice) => sum + invoice.amount, 0) || 0;

        setStats({
          customers: customersCount || 0,
          domains: domainsCount || 0,
          hosting: hostingCount || 0,
          invoices: invoicesCount || 0,
          pendingPayments: pendingPaymentsCount || 0,
          totalRevenue
        });
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen">
        <AdminHeader userData={userData} />
        <div className="flex items-center justify-center mt-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
          <span>Carregando dados do painel...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader userData={userData} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard Administrativo</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-500" />
                Clientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.customers}</div>
              <p className="text-sm text-muted-foreground mt-1">Total de clientes registrados</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Globe className="h-5 w-5 mr-2 text-green-500" />
                Domínios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.domains}</div>
              <p className="text-sm text-muted-foreground mt-1">Total de domínios registrados</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Database className="h-5 w-5 mr-2 text-purple-500" />
                Serviços de Hospedagem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.hosting}</div>
              <p className="text-sm text-muted-foreground mt-1">Total de serviços de hospedagem</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2 text-orange-500" />
                Faturamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
              <p className="text-sm text-muted-foreground mt-1">Receita total</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-500" />
                Faturas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.invoices}</div>
              <p className="text-sm text-muted-foreground mt-1">Total de faturas emitidas</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                Pagamentos Pendentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.pendingPayments}</div>
              <p className="text-sm text-muted-foreground mt-1">Faturas pendentes de pagamento</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
