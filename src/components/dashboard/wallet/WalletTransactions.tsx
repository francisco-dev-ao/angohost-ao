
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowUpCircle, ArrowDownCircle, CreditCard } from 'lucide-react';

type Transaction = {
  id: string;
  created_at: string;
  amount: number;
  previous_balance: number;
  current_balance: number;
  transaction_type: string;
  description: string;
};

type WalletTransactionsProps = {
  transactions: Transaction[];
  isLoading: boolean;
  formatCurrency: (amount: number) => string;
};

export const WalletTransactions: React.FC<WalletTransactionsProps> = ({ 
  transactions, 
  isLoading,
  formatCurrency
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const getTransactionIcon = (type: string) => {
    switch(type) {
      case 'deposit':
        return <ArrowUpCircle className="h-5 w-5 text-green-500" />;
      case 'withdrawal':
        return <ArrowDownCircle className="h-5 w-5 text-red-500" />;
      case 'payment':
        return <CreditCard className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };
  
  const getTransactionTitle = (type: string) => {
    switch(type) {
      case 'deposit':
        return 'Depósito';
      case 'withdrawal':
        return 'Saque';
      case 'payment':
        return 'Pagamento';
      default:
        return 'Transação';
    }
  };
  
  const getTransactionBadge = (type: string) => {
    switch(type) {
      case 'deposit':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Depósito</Badge>;
      case 'withdrawal':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Saque</Badge>;
      case 'payment':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Pagamento</Badge>;
      default:
        return <Badge variant="outline">Transação</Badge>;
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Nenhuma transação encontrada.</p>
      </div>
    );
  }
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tipo</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead className="text-right">Valor</TableHead>
          <TableHead className="text-right">Saldo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                {getTransactionIcon(transaction.transaction_type)}
                {getTransactionBadge(transaction.transaction_type)}
              </div>
            </TableCell>
            <TableCell className="text-sm">{formatDate(transaction.created_at)}</TableCell>
            <TableCell>{transaction.description || getTransactionTitle(transaction.transaction_type)}</TableCell>
            <TableCell className={`text-right font-medium ${transaction.transaction_type === 'deposit' ? 'text-green-600' : transaction.transaction_type === 'withdrawal' || transaction.transaction_type === 'payment' ? 'text-red-600' : ''}`}>
              {transaction.transaction_type === 'deposit' ? '+' : '-'} {formatCurrency(transaction.amount)}
            </TableCell>
            <TableCell className="text-right font-medium">
              {formatCurrency(transaction.current_balance)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
