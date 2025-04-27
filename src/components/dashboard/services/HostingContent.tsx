
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, ExternalLink } from 'lucide-react';
import { ServiceStatusCard } from '../ServiceStatusCard';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface HostingContentProps {
  services?: any[];
  loading?: boolean;
}

export const HostingContent = ({ services = [], loading = false }: HostingContentProps) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Hospedagem Web</CardTitle>
            <CardDescription>Serviços de hospedagem ativos</CardDescription>
          </div>
          <Server className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
            <span className="ml-2">Carregando serviços...</span>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center p-8">
            <Server className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
            <p className="mb-4">Você não tem serviços de hospedagem ativos</p>
            <Button onClick={() => navigate('/hospedagem-de-sites')}>
              Contratar Hospedagem
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {services.map((service) => (
              <ServiceStatusCard
                key={service.id}
                type="hosting"
                title={service.hosting_plans?.name || "Plano de Hospedagem"}
                description={`Servidor: ${service.server_hostname || 'N/A'}`}
                status={service.status}
                actions={
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      cPanel
                    </Button>
                    <Button variant="outline" size="sm">Gerenciar</Button>
                  </div>
                }
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
