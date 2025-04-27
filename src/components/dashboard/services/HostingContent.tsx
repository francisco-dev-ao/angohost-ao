
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Server } from 'lucide-react';
import { ServiceStatusCard } from '../ServiceStatusCard';

export const HostingContent = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Serviços de Hospedagem</CardTitle>
            <CardDescription>Detalhes dos seus serviços de hospedagem</CardDescription>
          </div>
          <Server className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <ServiceStatusCard
          type="hosting"
          title="Plano de Hospedagem"
          description="Seu plano atual de hospedagem web"
          status="active"
          expiryDate="31/12/2025"
          nextPayment="01/12/2024"
        />
      </CardContent>
    </Card>
  );
};
