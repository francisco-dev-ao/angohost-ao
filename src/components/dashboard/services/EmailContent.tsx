
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from 'lucide-react';
import { ServiceStatusCard } from '../ServiceStatusCard';
import { EmailContentProps } from '@/components/client-panel/dashboard/types';

export const EmailContent = ({ loading = false }: EmailContentProps) => {
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
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
            <span className="ml-2">Carregando serviços...</span>
          </div>
        ) : (
          <ServiceStatusCard
            type="email"
            title="Email Profissional"
            description="Status do seu serviço de email"
            status="active"
            expiryDate="31/12/2025"
            nextPayment="01/12/2024"
          />
        )}
      </CardContent>
    </Card>
  );
};
