
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Package, Receipt, Ticket } from "lucide-react";

export const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
        <CardDescription>Ações mais frequentes no painel</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4">
            <Globe className="h-6 w-6 mb-2" />
            <span>Registrar Domínio</span>
          </Button>
          <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4">
            <Package className="h-6 w-6 mb-2" />
            <span>Comprar Hospedagem</span>
          </Button>
          <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4">
            <Ticket className="h-6 w-6 mb-2" />
            <span>Abrir Ticket</span>
          </Button>
          <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4">
            <Receipt className="h-6 w-6 mb-2" />
            <span>Pagar Fatura</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
