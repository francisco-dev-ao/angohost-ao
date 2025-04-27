
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, CreditCard, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

export const PaymentInfoCard = () => {
  const [loading, setLoading] = useState(true);
  const [pendingPayments, setPendingPayments] = useState(0);
  const [lastPayment, setLastPayment] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      setLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setError('Usuário não autenticado');
          return;
        }

        // Fetch customer ID
        const { data: customerData, error: customerError } = await supabase
          .from('customers')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (customerError || !customerData) {
          setError('Não foi possível encontrar dados do cliente');
          return;
        }

        // Fetch pending invoices
        const { data: pendingInvoices, error: pendingError } = await supabase
          .from('invoices')
          .select('*')
          .eq('customer_id', customerData.id)
          .eq('status', 'unpaid');

        if (pendingError) {
          console.error('Erro ao buscar faturas pendentes:', pendingError);
        } else {
          setPendingPayments(pendingInvoices?.length || 0);
        }

        // Fetch last payment
        const { data: paymentData, error: paymentError } = await supabase
          .from('invoices')
          .select('*')
          .eq('customer_id', customerData.id)
          .eq('status', 'paid')
          .order('paid_date', { ascending: false })
          .limit(1)
          .single();

        if (!paymentError && paymentData) {
          setLastPayment(paymentData);
        }
      } catch (error) {
        console.error('Erro ao buscar informações de pagamento:', error);
        setError('Erro ao carregar informações de pagamento');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentInfo();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-AO');
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            Informações de Pagamento
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <div className="flex items-center">
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            <span>Carregando informações de pagamento...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            Informações de Pagamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5 text-primary" />
            Informações de Pagamento
          </div>
          {pendingPayments > 0 && (
            <Badge variant="destructive">{pendingPayments} pendentes</Badge>
          )}
        </CardTitle>
        <CardDescription>Visualize e gerencie seus pagamentos</CardDescription>
      </CardHeader>
      <CardContent>
        {pendingPayments > 0 ? (
          <Alert className="mb-4 bg-amber-50 border-amber-200">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-800">Pagamentos Pendentes</AlertTitle>
            <AlertDescription className="text-amber-700">
              Você possui {pendingPayments} {pendingPayments === 1 ? 'fatura pendente' : 'faturas pendentes'}.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="mb-4 bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Pagamento em dia</AlertTitle>
            <AlertDescription className="text-green-700">
              Você não possui faturas pendentes de pagamento.
            </AlertDescription>
          </Alert>
        )}

        {lastPayment && (
          <div className="border rounded-md p-4 mb-4">
            <h3 className="font-medium mb-2">Último Pagamento</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-600">Referência:</div>
              <div>{lastPayment.invoice_number}</div>
              <div className="text-gray-600">Valor:</div>
              <div className="font-medium">{formatCurrency(lastPayment.amount)}</div>
              <div className="text-gray-600">Data:</div>
              <div>{formatDate(lastPayment.paid_date)}</div>
              <div className="text-gray-600">Status:</div>
              <div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Pago
                </Badge>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col space-y-2">
          <Button asChild>
            <Link to="/painel-cliente/faturas">
              Ver Todas as Faturas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          {pendingPayments > 0 && (
            <Button variant="destructive">
              <Link to="/painel-cliente/faturas" className="text-white w-full h-full flex items-center justify-center">
                Pagar Faturas Pendentes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
