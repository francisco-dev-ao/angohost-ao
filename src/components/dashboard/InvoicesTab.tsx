
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw, FileText, AlertCircle, CreditCard } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useClientPanel } from '@/hooks/useClientPanel';

export const InvoicesTab = () => {
  const { invoices: clientInvoices, loading: clientLoading } = useClientPanel();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!clientLoading && clientInvoices) {
      setInvoices(clientInvoices);
      setLoading(false);
    }
  }, [clientInvoices, clientLoading]);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: session } = await supabase.auth.getSession();
      
      if (!session?.session?.user) {
        setError("Você precisa estar logado para ver suas faturas");
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
      
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .eq('customer_id', customerData.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setInvoices(data || []);
    } catch (err: any) {
      console.error('Erro ao buscar faturas:', err);
      setError('Não foi possível carregar suas faturas. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
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
      case 'paid':
      case 'pago':
        return <Badge className="bg-green-500">Pago</Badge>;
      case 'pending':
      case 'pendente':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300">Pendente</Badge>;
      case 'unpaid':
      case 'não pago':
        return <Badge variant="outline" className="text-red-600 border-red-300">Não Pago</Badge>;
      case 'overdue':
      case 'vencido':
        return <Badge className="bg-red-500">Vencido</Badge>;
      case 'cancelled':
      case 'cancelado':
        return <Badge variant="secondary">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const hasUnpaidInvoices = invoices.some(invoice => 
    ['unpaid', 'pending', 'overdue', 'não pago', 'pendente', 'vencido'].includes(invoice.status.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Minhas Faturas</CardTitle>
          <CardDescription>Histórico de pagamentos</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={fetchInvoices} disabled={loading}>
          <RefreshCcw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
      </CardHeader>
      <CardContent>
        {hasUnpaidInvoices && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Você possui faturas pendentes de pagamento. Por favor, efetue o pagamento para manter seus serviços ativos.
            </AlertDescription>
          </Alert>
        )}

        <div className="rounded-md border">
          <div className="grid grid-cols-5 p-4 font-medium border-b">
            <div>Nº Fatura</div>
            <div>Data</div>
            <div>Vencimento</div>
            <div>Valor</div>
            <div className="text-right">Status</div>
          </div>
          
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">
              <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3"></div>
              <p>Carregando faturas...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-muted-foreground">
              <AlertCircle className="h-6 w-6 mx-auto mb-3 text-red-500" />
              <p>{error}</p>
            </div>
          ) : invoices.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
              <p>Nenhuma fatura encontrada</p>
            </div>
          ) : (
            invoices.map((invoice) => (
              <div key={invoice.id} className="grid grid-cols-5 p-4 items-center border-b hover:bg-muted/50">
                <div>{invoice.invoice_number}</div>
                <div>{formatDate(invoice.created_at)}</div>
                <div>{formatDate(invoice.due_date)}</div>
                <div>{formatCurrency(invoice.amount)}</div>
                <div className="text-right flex justify-end items-center gap-2">
                  {getStatusBadge(invoice.status)}
                  {['unpaid', 'pending', 'overdue', 'não pago', 'pendente', 'vencido'].includes(invoice.status.toLowerCase()) && (
                    <Button size="sm">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Pagar
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
