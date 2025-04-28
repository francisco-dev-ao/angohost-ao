
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw, AlertCircle, Filter, FileText } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { InvoicesList } from './invoices/InvoicesList';
import { InvoiceCard } from './invoices/InvoiceCard';
import { PaymentDialog } from './invoices/PaymentDialog';
import { useInvoices } from '@/hooks/useInvoices';

export const InvoicesTab = () => {
  const {
    invoices,
    loading,
    error,
    selectedInvoice,
    isPaymentDialogOpen,
    isProcessing,
    customerData,
    filterStatus,
    hasUnpaidInvoices,
    setFilterStatus,
    setIsPaymentDialogOpen,
    handlePayInvoice,
    handlePayWithBalance,
    handlePayWithCreditCard,
    fetchInvoices
  } = useInvoices();

  const filterOptions = [
    { value: null, label: 'Todas' },
    { value: 'unpaid', label: 'Não pagas' },
    { value: 'paid', label: 'Pagas' },
    { value: 'pending', label: 'Pendentes' },
    { value: 'overdue', label: 'Vencidas' }
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Minhas Faturas</CardTitle>
          <CardDescription>Histórico de pagamentos</CardDescription>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {filterOptions.map(option => (
                  <DropdownMenuItem 
                    key={option.label}
                    className={filterStatus === option.value ? "bg-muted" : ""}
                    onClick={() => setFilterStatus(option.value)}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" size="sm" onClick={fetchInvoices} disabled={loading}>
            <RefreshCcw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
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

        <Tabs defaultValue="list">
          <TabsList className="mb-4">
            <TabsTrigger value="list">Lista</TabsTrigger>
            <TabsTrigger value="grid">Grade</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <InvoicesList 
              loading={loading}
              error={error}
              invoices={invoices}
              onPayInvoice={handlePayInvoice}
            />
          </TabsContent>
          
          <TabsContent value="grid">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {invoices.map((invoice) => (
                  <InvoiceCard 
                    key={invoice.id}
                    invoice={invoice}
                    onPayInvoice={handlePayInvoice}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <PaymentDialog
          isOpen={isPaymentDialogOpen}
          onOpenChange={setIsPaymentDialogOpen}
          selectedInvoice={selectedInvoice}
          customerBalance={customerData?.account_balance || 0}
          isProcessing={isProcessing}
          onPayWithBalance={handlePayWithBalance}
          onPayWithCreditCard={handlePayWithCreditCard}
        />
      </CardContent>
    </Card>
  );
};
