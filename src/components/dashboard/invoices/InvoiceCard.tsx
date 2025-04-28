
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { formatDate, formatCurrency } from '@/utils/formatters';
import { Invoice } from '@/types/database-types';
import { getStatusBadge } from './InvoicesList';

interface InvoiceCardProps {
  invoice: Invoice;
  onPayInvoice: (invoice: Invoice) => void;
}

export const InvoiceCard = ({ invoice, onPayInvoice }: InvoiceCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">{invoice.number}</CardTitle>
          {getStatusBadge(invoice.status || '')}
        </div>
        <CardDescription>
          Emitida em {formatDate(invoice.created_at)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Vencimento:</span>
            <span>{formatDate(invoice.due_date)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total:</span>
            <span className="font-bold">{formatCurrency(invoice.total_amount || 0)}</span>
          </div>
          
          {['unpaid', 'pending', 'overdue', 'não pago', 'pendente', 'vencido'].includes(invoice.status?.toLowerCase() || '') && (
            <Button 
              className="w-full mt-2"
              onClick={() => onPayInvoice(invoice)}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Pagar Agora
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
