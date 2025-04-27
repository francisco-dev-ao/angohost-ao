
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket } from "lucide-react";

export const TicketsSummary = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Tickets de Suporte</CardTitle>
          <CardDescription>Seus tickets recentes</CardDescription>
        </div>
        <Button variant="outline" size="sm">Ver Todos</Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="grid grid-cols-4 p-4 font-medium border-b">
            <div>Assunto</div>
            <div>Data</div>
            <div>Status</div>
            <div>Última Atualização</div>
          </div>
          <div className="p-8 text-center text-muted-foreground">
            <Ticket className="h-10 w-10 mx-auto mb-3 text-muted-foreground/60" />
            <p>Nenhum ticket aberto</p>
            <Button variant="outline" size="sm" className="mt-4">
              Abrir Novo Ticket
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
