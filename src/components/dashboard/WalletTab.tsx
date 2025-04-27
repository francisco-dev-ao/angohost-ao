
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WalletIcon, PlusCircle, RefreshCcw, CreditCard, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { WalletChart } from './wallet/WalletChart';
import { WalletTransactions } from './wallet/WalletTransactions';
import { Alert, AlertDescription } from '@/components/ui/alert';

type Transaction = {
  id: string;
  created_at: string;
  amount: number;
  previous_balance: number;
  current_balance: number;
  transaction_type: string;
  description: string;
}

export const WalletTab = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<{name: string; amount: number}[]>([]);

  const fetchWalletData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data: session } = await supabase.auth.getSession();
      
      if (!session?.session?.user) {
        setError("Você precisa estar logado para acessar essa funcionalidade");
        setIsLoading(false);
        return;
      }
      
      // Get the customer details
      const { data: customerData } = await supabase
        .from('customers')
        .select('id, account_balance')
        .eq('user_id', session.session.user.id)
        .single();
      
      if (!customerData) {
        setError("Não foi possível encontrar seus dados de cliente");
        setIsLoading(false);
        return;
      }
      
      setBalance(customerData.account_balance || 0);
      
      // Fetch transactions
      const { data: transactionsData, error: transactionsError } = await supabase
        .from('account_transactions')
        .select('*')
        .eq('customer_id', customerData.id)
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (transactionsError) throw transactionsError;
      
      setTransactions(transactionsData || []);
      
      // Prepare chart data
      if (transactionsData && transactionsData.length > 0) {
        // Group transactions by month
        const last6Months = getLastMonths(6);
        
        // Create data for chart
        const chartData = last6Months.map(month => {
          const monthlyTransactions = transactionsData.filter(t => {
            const transactionDate = new Date(t.created_at);
            return transactionDate.getMonth() === month.monthIndex && 
                  transactionDate.getFullYear() === month.year;
          });
          
          const deposits = monthlyTransactions
            .filter(t => t.transaction_type === 'deposit')
            .reduce((sum, t) => sum + t.amount, 0);
          
          return {
            name: month.label,
            amount: deposits
          };
        });
        
        setChartData(chartData);
      }
      
    } catch (err: any) {
      console.error('Erro ao buscar dados da carteira:', err);
      setError('Não foi possível carregar os dados da sua carteira. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  const getLastMonths = (count: number) => {
    const months = [];
    const currentDate = new Date();
    
    for (let i = 0; i < count; i++) {
      const date = new Date();
      date.setMonth(currentDate.getMonth() - i);
      
      months.unshift({
        monthIndex: date.getMonth(),
        year: date.getFullYear(),
        label: date.toLocaleString('pt-BR', { month: 'short' })
      });
    }
    
    return months;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  const handleAddFunds = async () => {
    try {
      const amountValue = parseInt(amount);
      
      if (isNaN(amountValue) || amountValue <= 0) {
        toast.error('Por favor, insira um valor válido.');
        return;
      }
      
      setIsLoading(true);
      
      const { data: session } = await supabase.auth.getSession();
      
      if (!session?.session?.user) {
        toast.error('Você precisa estar logado para adicionar fundos');
        setIsLoading(false);
        return;
      }
      
      // Get the customer ID
      const { data: customerData } = await supabase
        .from('customers')
        .select('id, account_balance')
        .eq('user_id', session.session.user.id)
        .single();
      
      if (!customerData) {
        toast.error('Não foi possível encontrar seus dados de cliente');
        setIsLoading(false);
        return;
      }
      
      const currentBalance = customerData.account_balance || 0;
      const newBalance = currentBalance + amountValue;
      
      // Update the customer balance
      const { error: updateError } = await supabase
        .from('customers')
        .update({ account_balance: newBalance })
        .eq('id', customerData.id);
      
      if (updateError) throw updateError;
      
      // Add transaction record
      const { error: transactionError } = await supabase
        .from('account_transactions')
        .insert({
          customer_id: customerData.id,
          amount: amountValue,
          previous_balance: currentBalance,
          current_balance: newBalance,
          transaction_type: 'deposit',
          description: 'Depósito de fundos'
        });
      
      if (transactionError) throw transactionError;
      
      toast.success(`AOA ${amountValue.toLocaleString()} adicionados à sua conta!`);
      setAmount('');
      setIsDialogOpen(false);
      fetchWalletData();
      
    } catch (err: any) {
      console.error('Erro ao adicionar fundos:', err);
      toast.error('Não foi possível adicionar fundos. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Seu Saldo</CardTitle>
            <CardDescription>Saldo disponível na sua conta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <div className="text-3xl font-bold text-primary">
                {isLoading ? "Carregando..." : formatCurrency(balance)}
              </div>
              <p className="text-muted-foreground mt-2">
                Use seu saldo para pagar por serviços e faturas
              </p>
              <div className="flex gap-3 mt-6">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Adicionar Fundos
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Adicionar Fundos</DialogTitle>
                      <DialogDescription>
                        Insira o valor que deseja adicionar à sua conta.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div>
                        <Label htmlFor="amount">Valor (AOA)</Label>
                        <Input
                          id="amount"
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="10000"
                          className="mt-1"
                          min="1"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddFunds} disabled={isLoading}>
                        {isLoading ? "Processando..." : "Adicionar Fundos"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" onClick={fetchWalletData} disabled={isLoading}>
                  <RefreshCcw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Atualizar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Histórico dos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent className="h-[220px]">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-red-500">{error}</p>
              </div>
            ) : (
              <WalletChart data={chartData} />
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Histórico de Transações</CardTitle>
            <CardDescription>Suas transações recentes</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={fetchWalletData} disabled={isLoading}>
            <RefreshCcw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </CardHeader>
        <CardContent>
          {error ? (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            <WalletTransactions 
              transactions={transactions} 
              isLoading={isLoading}
              formatCurrency={formatCurrency}
            />
          )}
        </CardContent>
      </Card>
      
      <div className="flex flex-col md:flex-row gap-4">
        <Button variant="outline" className="flex-1" asChild>
          <a href="/checkout">
            <CreditCard className="mr-2 h-4 w-4" />
            Fazer um Pagamento
          </a>
        </Button>
        <Button variant="outline" className="flex-1" asChild>
          <a href="#invoices">
            <FileText className="mr-2 h-4 w-4" />
            Ver Minhas Faturas
          </a>
        </Button>
      </div>
    </div>
  );
};
