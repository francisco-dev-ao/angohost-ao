
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CircleDollarSign, Globe, Server, AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/utils/format';

interface StatsOverviewProps {
  accountBalance?: number;
}

interface Stats {
  domains: number;
  hosting: number;
  pendingPayments: number;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ accountBalance = 0 }) => {
  const [stats, setStats] = useState<Stats>({ domains: 0, hosting: 0, pendingPayments: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: customerData, error: customerError } = await supabase
          .from('customers')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (customerError || !customerData) {
          console.error('Erro ao buscar cliente:', customerError);
          return;
        }

        const customerId = customerData.id;

        // Fetch domains count
        const { count: domainsCount, error: domainsError } = await supabase
          .from('domains')
          .select('*', { count: 'exact', head: true })
          .eq('customer_id', customerId);

        if (domainsError) console.error('Erro ao buscar domínios:', domainsError);

        // Fetch hosting services count
        const { count: hostingCount, error: hostingError } = await supabase
          .from('hosting_services')
          .select('*', { count: 'exact', head: true })
          .eq('customer_id', customerId);

        if (hostingError) console.error('Erro ao buscar serviços de hospedagem:', hostingError);

        // Fetch pending payments count
        const { count: paymentsCount, error: paymentsError } = await supabase
          .from('invoices')
          .select('*', { count: 'exact', head: true })
          .eq('customer_id', customerId)
          .eq('status', 'unpaid');

        if (paymentsError) console.error('Erro ao buscar pagamentos pendentes:', paymentsError);

        setStats({
          domains: domainsCount || 0,
          hosting: hostingCount || 0,
          pendingPayments: paymentsCount || 0
        });
      } catch (err) {
        console.error('Erro ao buscar estatísticas:', err);
        setError('Não foi possível carregar as estatísticas');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6 flex justify-center items-center">
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            <span>Carregando estatísticas...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <Alert className="bg-red-50 border-red-200">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {/* Account Balance */}
            <div className="p-6 border-b sm:border-b md:border-b-0 md:border-r border-primary/10">
              <div className="flex flex-col">
                <div className="flex items-center mb-2">
                  <CircleDollarSign className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-sm font-medium">Saldo da Conta</h3>
                </div>
                <p className={`text-2xl font-bold ${accountBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(accountBalance)}
                </p>
                <Link to="/checkout" className="text-xs text-primary hover:underline mt-2">
                  Adicionar fundos
                </Link>
              </div>
            </div>
            
            {/* Domains */}
            <div className="p-6 border-b sm:border-b md:border-b-0 md:border-r border-primary/10">
              <div className="flex flex-col">
                <div className="flex items-center mb-2">
                  <Globe className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-sm font-medium">Domínios</h3>
                </div>
                <div className="flex items-center">
                  <p className="text-2xl font-bold">{stats.domains}</p>
                  <Link to="/painel-cliente/dominios" className="text-xs text-primary hover:underline ml-2">
                    Ver todos
                  </Link>
                </div>
                <Link to="/dominios/registrar" className="text-xs text-primary hover:underline mt-2">
                  Registrar novo domínio
                </Link>
              </div>
            </div>
            
            {/* Hosting */}
            <div className="p-6 border-b sm:border-r sm:border-b md:border-b-0 border-primary/10">
              <div className="flex flex-col">
                <div className="flex items-center mb-2">
                  <Server className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-sm font-medium">Serviços de Hospedagem</h3>
                </div>
                <div className="flex items-center">
                  <p className="text-2xl font-bold">{stats.hosting}</p>
                  <Link to="/painel-cliente/hospedagem" className="text-xs text-primary hover:underline ml-2">
                    Ver todos
                  </Link>
                </div>
                <Link to="/hospedagem" className="text-xs text-primary hover:underline mt-2">
                  Contratar hospedagem
                </Link>
              </div>
            </div>
            
            {/* Payments */}
            <div className="p-6">
              <div className="flex flex-col">
                <div className="flex items-center mb-2">
                  <AlertCircle className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-sm font-medium">Pagamentos Pendentes</h3>
                </div>
                <div className="flex items-center">
                  <p className="text-2xl font-bold">{stats.pendingPayments}</p>
                  {stats.pendingPayments > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      Atenção
                    </Badge>
                  )}
                </div>
                <Link to="/painel-cliente/faturas" className="text-xs text-primary hover:underline mt-2">
                  Ver faturas
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
