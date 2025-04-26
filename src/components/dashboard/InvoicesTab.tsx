
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw, FileText } from 'lucide-react';

export const InvoicesTab = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Minhas Faturas</CardTitle>
          <CardDescription>Histórico de pagamentos</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCcw className="h-4 w-4 mr-2" />
          Atualizar
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="grid grid-cols-5 p-4 font-medium border-b">
            <div>Nº Fatura</div>
            <div>Data</div>
            <div>Valor</div>
            <div>Status</div>
            <div className="text-right">Ações</div>
          </div>
          <div className="p-8 text-center text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
            <p>Nenhuma fatura encontrada</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
