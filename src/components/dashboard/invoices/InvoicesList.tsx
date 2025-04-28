
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate, formatCurrency } from '@/utils/formatters';
import { Invoice } from '@/types/database';
import { CreditCard } from 'lucide-react';

interface InvoicesListProps {
  loading: boolean;
  error: string | null;
  invoices: Invoice[];
  onPayInvoice: (invoice: Invoice) => void;
}

export const getStatusBadge = (status: string) => {
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
    case 'processing':
      return <Badge className="bg-blue-500">Processando</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export const InvoicesList = ({ loading, error, invoices, onPayInvoice }: InvoicesListProps) => {
  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3"></div>
        <p>Carregando faturas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <FileText className="h-6 w-6 mx-auto mb-3 text-red-500" />
        <p>{error}</p>
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
        <p>Nenhuma fatura encontrada</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <div className="grid grid-cols-6 p-4 font-medium border-b bg-muted/50">
        <div>Nº Fatura</div>
        <div>Data</div>
        <div>Vencimento</div>
        <div>Valor</div>
        <div>Status</div>
        <div className="text-right">Ações</div>
      </div>
      
      {invoices.map((invoice) => (
        <div key={invoice.id} className="grid grid-cols-6 p-4 items-center border-b hover:bg-muted/50">
          <div>{invoice.number}</div>
          <div>{formatDate(invoice.created_at)}</div>
          <div>{formatDate(invoice.due_date)}</div>
          <div>{formatCurrency(invoice.total_amount || 0)}</div>
          <div>{getStatusBadge(invoice.status || '')}</div>
          <div className="text-right">
            {['unpaid', 'pending', 'overdue', 'não pago', 'pendente', 'vencido'].includes(invoice.status?.toLowerCase() || '')} && (
              <Button 
                size="sm"
                onClick={() => onPayInvoice(invoice)}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Pagar
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
