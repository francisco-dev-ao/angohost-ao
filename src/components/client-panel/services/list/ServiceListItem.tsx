
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Settings, ArrowUpRight } from 'lucide-react';
import { getStatusBadge } from '../utils';

interface ServiceListItemProps {
  service: {
    id: string;
    name: string;
    plan: string;
    status: string;
    domain?: string;
    expiryDate?: string;
  };
}

export const ServiceListItem = ({ service }: ServiceListItemProps) => {
  return (
    <div className="grid grid-cols-7 p-4 items-center border-b hover:bg-muted/50">
      <div className="col-span-2">
        <p className="font-medium">{service.name}</p>
        <p className="text-sm text-muted-foreground">{service.plan}</p>
      </div>
      <div>{service.domain}</div>
      <div>{service.expiryDate}</div>
      <div>{getStatusBadge(service.status)}</div>
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
  );
};
