
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Server, Globe, FileText } from 'lucide-react';
import type { ServiceCount } from '@/hooks/useCustomerStatistics';

interface StatisticsCardsProps {
  loading: boolean;
  serviceCounts: ServiceCount;
  totalServices: number;
  unpaidInvoices: number;
}

export const StatisticsCards: React.FC<StatisticsCardsProps> = ({
  loading,
  serviceCounts,
  totalServices,
  unpaidInvoices
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Serviços</CardTitle>
          <Server className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{loading ? '...' : totalServices}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Todos os seus serviços ativos
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Hospedagem</CardTitle>
          <Server className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{loading ? '...' : serviceCounts.hosting}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Planos de hospedagem ativos
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Domínios</CardTitle>
          <Globe className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{loading ? '...' : serviceCounts.domains}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Domínios registrados
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Faturas Pendentes</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{loading ? '...' : unpaidInvoices}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Faturas aguardando pagamento
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
