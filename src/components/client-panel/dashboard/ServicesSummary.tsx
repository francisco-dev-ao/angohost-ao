
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ServiceStatusCard } from "@/components/dashboard/ServiceStatusCard";

export const ServicesSummary = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Meus Serviços</CardTitle>
          <CardDescription>Status dos seus serviços ativos</CardDescription>
        </div>
        <Button variant="outline" size="sm">Ver Todos</Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ServiceStatusCard
            title="Hospedagem cPanel"
            description="Plano Profissional"
            status="active"
            expiryDate="20/12/2025"
            nextPayment="20/11/2025"
          />
          <ServiceStatusCard
            title="Hospedagem WordPress"
            description="Plano Básico"
            status="active"
            expiryDate="15/10/2025"
            nextPayment="15/09/2025"
          />
        </div>
      </CardContent>
    </Card>
  );
};
