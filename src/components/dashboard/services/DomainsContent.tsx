
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from 'lucide-react';
import { ServiceStatusCard } from '../ServiceStatusCard';

export const DomainsContent = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Meus Domínios</CardTitle>
            <CardDescription>Domínios registrados e data de expiração</CardDescription>
          </div>
          <Globe className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <ServiceStatusCard
          type="domains"
          title="Domínio Principal"
          description="Status do seu domínio registrado"
          status="active"
          expiryDate="31/12/2025"
        />
      </CardContent>
    </Card>
  );
};
