
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, FileText } from "lucide-react";

interface InvoicesSummaryProps {
  unpaidInvoices?: number;
}

export const InvoicesSummary = ({ unpaidInvoices = 0 }: InvoicesSummaryProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Faturas Recentes</CardTitle>
          <CardDescription>Status dos seus pagamentos</CardDescription>
        </div>
        <Button variant="outline" size="sm">Ver Todas</Button>
      </CardHeader>
      <CardContent>
        {unpaidInvoices > 0 && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Você tem {unpaidInvoices} faturas pendentes. Por favor efetue o pagamento para manter seus serviços ativos.
            </AlertDescription>
          </Alert>
        )}

        <div className="rounded-md border">
          <div className="grid grid-cols-4 p-4 font-medium border-b">
            <div>Nº Fatura</div>
            <div>Data</div>
            <div>Valor</div>
            <div>Status</div>
          </div>
          <div className="p-8 text-center text-muted-foreground">
            <FileText className="h-10 w-10 mx-auto mb-3 text-muted-foreground/60" />
            <p>Nenhuma fatura encontrada</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
