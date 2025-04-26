
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCcw, ExternalLink, Calendar } from 'lucide-react';
import { Service } from '@/hooks/useCustomerServices';

interface ServiceStatusCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  services: Service[];
  loading: boolean;
  emptyMessage: string;
  emptyActionText: string;
  emptyActionLink: string;
  onManageClick?: (service: Service) => void;
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('pt-AO');
};

const getStatusBadge = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return <Badge className="bg-green-500 ml-2">Ativo</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-500 ml-2">Pendente</Badge>;
    case 'suspended':
      return <Badge className="bg-red-500 ml-2">Suspenso</Badge>;
    case 'expired':
      return <Badge className="bg-gray-500 ml-2">Expirado</Badge>;
    default:
      return <Badge className="bg-blue-500 ml-2">{status || 'N/A'}</Badge>;
  }
};

export const ServiceStatusCard = ({
  title,
  description,
  icon,
  services,
  loading,
  emptyMessage,
  emptyActionText,
  emptyActionLink,
  onManageClick
}: ServiceStatusCardProps) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            {icon}
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-8 flex justify-center">
            <RefreshCcw className="animate-spin h-5 w-5" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {services.length > 0 ? (
          <div className="space-y-4">
            {services.map(service => (
              <div key={service.id} className="p-4 border rounded-md flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{service.name}</div>
                  {getStatusBadge(service.status)}
                </div>
                {service.expiryDate && (
                  <div className="mt-2 flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-3.5 w-3.5" />
                    <span>Expira em: {formatDate(service.expiryDate)}</span>
                  </div>
                )}
                <div className="mt-4 flex justify-end">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onManageClick?.(service)}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Gerenciar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">{emptyMessage}</p>
            <Button onClick={() => window.location.href = emptyActionLink}>
              {emptyActionText}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
