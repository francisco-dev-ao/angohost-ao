
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ServiceStatusCard } from "@/components/dashboard/ServiceStatusCard";
import { ServicesSummaryProps } from './types';

export const ServicesSummary = ({ services = [] }: ServicesSummaryProps) => {
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
          {services.length > 0 ? (
            services.map((service) => (
              <ServiceStatusCard
                key={service.id}
                type={service.type}
                title={service.name}
                description={service.description || ""}
                status={service.status as 'active' | 'suspended' | 'expired' | 'pending'}
                expiryDate={service.expiry_date}
                nextPayment={service.next_payment}
              />
            ))
          ) : (
            <ServiceStatusCard
              title="Hospedagem cPanel"
              description="Nenhum serviço ativo"
              status="pending"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
