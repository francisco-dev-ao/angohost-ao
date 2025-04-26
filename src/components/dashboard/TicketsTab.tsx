
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw, AlertCircle, CheckCircle } from 'lucide-react';

export const TicketsTab = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Tickets de Suporte</CardTitle>
          <CardDescription>Histórico de atendimentos</CardDescription>
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          <Button size="sm">
            <AlertCircle className="h-4 w-4 mr-2" />
            Abrir Ticket
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="grid grid-cols-5 p-4 font-medium border-b">
            <div>Assunto</div>
            <div>Data</div>
            <div>Status</div>
            <div>Prioridade</div>
            <div className="text-right">Ações</div>
          </div>
          <div className="p-8 text-center text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
            <p>Nenhum ticket de suporte aberto</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
