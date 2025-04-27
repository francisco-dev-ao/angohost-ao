
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from 'lucide-react';
import { ServiceStatusCard } from '../ServiceStatusCard';

export const EmailContent = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Serviços de Email</CardTitle>
            <CardDescription>Suas contas de email profissional</CardDescription>
          </div>
          <Mail className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <ServiceStatusCard
          type="email"
          title="Email Profissional"
          description="Status do seu serviço de email"
          status="active"
          expiryDate="31/12/2025"
          nextPayment="01/12/2024"
        />
      </CardContent>
    </Card>
  );
};
