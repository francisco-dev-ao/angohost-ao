
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, AlertCircle } from 'lucide-react';
import { ServiceStatusCard } from '../ServiceStatusCard';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';

interface DomainsContentProps {
  domains?: any[];
  loading?: boolean;
}

export const DomainsContent = ({ domains = [], loading = false }: DomainsContentProps) => {
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-500">Ativo</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300">Pendente</Badge>;
      case 'expired':
        return <Badge className="bg-red-500">Expirado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

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
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
            <span className="ml-2">Carregando domínios...</span>
          </div>
        ) : domains.length === 0 ? (
          <div className="text-center p-8">
            <Globe className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
            <p className="mb-4">Você não tem domínios registrados</p>
            <Button onClick={() => navigate('/dominios/registrar')}>
              Registrar Domínio
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {domains.map((domain) => (
              <ServiceStatusCard
                key={domain.id}
                type="domains"
                title={domain.name + '.' + domain.tld}
                description="Domínio registrado"
                status={domain.status}
                expiryDate={formatDate(domain.expiry_date)}
                actions={
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Gerenciar DNS</Button>
                    <Button variant="outline" size="sm">Renovar</Button>
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
