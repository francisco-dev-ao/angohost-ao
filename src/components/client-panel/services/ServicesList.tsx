
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Settings, ArrowUpRight, Package } from 'lucide-react';
import { getStatusBadge } from './utils';

interface Service {
  id: string;
  name: string;
  plan: string;
  status: string;
  domain?: string;
  expiryDate?: string;
}

interface ServicesListProps {
  services: Service[];
}

export const ServicesList = ({ services }: ServicesListProps) => {
  if (services.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <Package className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
        <p>Nenhum serviço encontrado</p>
        <Button variant="outline" size="sm" className="mt-4">
          Adquirir Serviço
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <div className="grid grid-cols-7 p-4 font-medium border-b bg-muted/50">
        <div className="col-span-2">Produto/Serviço</div>
        <div>Domínio</div>
        <div>Data Expiração</div>
        <div>Status</div>
        <div className="col-span-2 text-right">Ações</div>
      </div>
      
      {services.map(service => (
        <div key={service.id} className="grid grid-cols-7 p-4 items-center border-b hover:bg-muted/50">
          <div className="col-span-2">
            <p className="font-medium">{service.name}</p>
            <p className="text-sm text-muted-foreground">{service.plan}</p>
          </div>
          <div>{service.domain}</div>
          <div>{service.expiryDate}</div>
          <div>
            <Badge className={getStatusBadge(service.status)}>
              {service.status === 'active' ? 'Ativo' : 
               service.status === 'pending' ? 'Pendente' : 
               service.status === 'suspended' ? 'Suspenso' : 
               service.status}
            </Badge>
          </div>
          <div className="col-span-2 text-right space-x-1">
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-1" />
              cPanel
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-1" />
              Gerenciar
            </Button>
            <Button variant="outline" size="sm">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              Upgrade
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
