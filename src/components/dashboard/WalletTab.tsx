
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw, CreditCard, FileText } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ActivityChart } from './wallet/ActivityChart';
import { WalletTransactions } from './wallet/WalletTransactions';
import { BalanceCard } from './wallet/BalanceCard';
import { useWalletData } from '@/hooks/useWalletData';

export const WalletTab = () => {
  const { 
    balance, 
    transactions, 
    isLoading, 
    error, 
    chartData, 
    formatCurrency, 
    fetchWalletData 
  } = useWalletData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <BalanceCard 
          balance={balance}
          isLoading={isLoading}
          onRefresh={fetchWalletData}
          formatCurrency={formatCurrency}
        />
        <ActivityChart 
          isLoading={isLoading}
          error={error}
          chartData={chartData}
        />
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
