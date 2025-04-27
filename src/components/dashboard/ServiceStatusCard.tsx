import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface ServiceStatusCardProps {
  type?: string;  // Adding the type prop to fix the error
  title: string;
  description: string;
  status: string;
  expiryDate?: string;
  nextPayment?: string;
}

export const ServiceStatusCard = ({ 
  type,
  title, 
  description, 
  status, 
  expiryDate, 
  nextPayment 
}: ServiceStatusCardProps) => {
  let statusBadge;

  switch (status) {
    case 'active':
      statusBadge = <Badge className="bg-green-500">Ativo</Badge>;
      break;
    case 'pending':
      statusBadge = <Badge variant="outline" className="text-yellow-600 border-yellow-300">Pendente</Badge>;
      break;
    case 'expired':
      statusBadge = <Badge className="bg-red-500">Expirado</Badge>;
      break;
    default:
      statusBadge = <Badge variant="outline">{status}</Badge>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">Status:</div>
            {statusBadge}
          </div>
          <div>
            {expiryDate && (
              <>
                <div className="text-sm font-medium">Expira em:</div>
                <div className="text-sm">{expiryDate}</div>
              </>
            )}
            {nextPayment && (
              <>
                <div className="text-sm font-medium">Próximo pagamento:</div>
                <div className="text-sm">{nextPayment}</div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
