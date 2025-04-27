
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
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col">
              <div className="text-sm text-gray-500 mb-1">Saldo da Conta</div>
              <div className="flex items-center">
                <CircleDollarSign className="h-5 w-5 text-primary mr-2" />
                <span className="text-xl font-semibold">{formatCurrency(accountBalance)}</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex justify-between">
                <div className="text-sm text-gray-500 mb-1">Domínios</div>
                {stats.domains > 0 && 
                  <Link to="/painel-cliente/dominios">
                    <Badge className="text-xs cursor-pointer bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                      Ver todos
                    </Badge>
                  </Link>
                }
              </div>
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-primary mr-2" />
                <span className="text-xl font-semibold">{stats.domains}</span>
                <span className="text-sm text-gray-500 ml-2">
                  {stats.domains === 1 ? 'domínio' : 'domínios'}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex justify-between">
                <div className="text-sm text-gray-500 mb-1">Hospedagem</div>
                {stats.hosting > 0 && 
                  <Link to="/painel-cliente/hospedagem">
                    <Badge className="text-xs cursor-pointer bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                      Ver todos
                    </Badge>
                  </Link>
                }
              </div>
              <div className="flex items-center">
                <Server className="h-5 w-5 text-primary mr-2" />
                <span className="text-xl font-semibold">{stats.hosting}</span>
                <span className="text-sm text-gray-500 ml-2">
                  {stats.hosting === 1 ? 'serviço' : 'serviços'}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex justify-between">
                <div className="text-sm text-gray-500 mb-1">Pagamentos Pendentes</div>
                {stats.pendingPayments > 0 && 
                  <Link to="/painel-cliente/faturas">
                    <Badge className="text-xs cursor-pointer bg-red-100 text-red-700 border-red-200 hover:bg-red-200">
                      Pagar agora
                    </Badge>
                  </Link>
                }
              </div>
              <div className="flex items-center">
                <AlertCircle className={`h-5 w-5 ${stats.pendingPayments > 0 ? 'text-red-500' : 'text-green-500'} mr-2`} />
                <span className="text-xl font-semibold">{stats.pendingPayments}</span>
                <span className="text-sm text-gray-500 ml-2">
                  {stats.pendingPayments === 1 ? 'pendente' : 'pendentes'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
