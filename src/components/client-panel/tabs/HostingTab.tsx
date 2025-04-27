
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Server, Database, Mail, Globe, RefreshCcw, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export interface HostingService {
  id: string;
  name?: string;
  plan_name: string;
  status: string;
  server_hostname?: string;
  username?: string;
  domain?: string;
  disk_space?: number;
  disk_used?: number;
  bandwidth?: number;
  bandwidth_used?: number;
  email_accounts?: number;
  databases?: number;
  created_at: string;
  expiry_date?: string;
}

export const HostingTab: React.FC = () => {
  const { services = [] } = useOutletContext<{
    services: HostingService[];
  }>();
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-AO');
  };
  
  const calculateUsage = (used: number = 0, total: number = 1) => {
    return Math.min(Math.round((used / total) * 100), 100);
  };
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-500';
      case 'suspended': return 'bg-red-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };
  
  const activeServices = services.filter(service => service.status === 'active');
  const pendingServices = services.filter(service => service.status === 'pending');
  const suspendedServices = services.filter(service => service.status === 'suspended');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-1">Serviços de Hospedagem</h2>
          <p className="text-muted-foreground">Gerencie seus serviços de hospedagem web</p>
        </div>
        <Button asChild>
          <Link to="/hospedagem">Contratar Hospedagem</Link>
        </Button>
      </div>
      
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">
            Ativos 
            <Badge variant="secondary" className="ml-2">{activeServices.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pendentes
            <Badge variant="secondary" className="ml-2">{pendingServices.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="suspended">
            Suspensos
            <Badge variant="secondary" className="ml-2">{suspendedServices.length}</Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          {activeServices.length > 0 ? (
            activeServices.map((service) => (
              <HostingServiceCard key={service.id} service={service} />
            ))
          ) : (
            <EmptyState type="active" />
          )}
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-4">
          {pendingServices.length > 0 ? (
            pendingServices.map((service) => (
              <HostingServiceCard key={service.id} service={service} />
            ))
          ) : (
            <EmptyState type="pending" />
          )}
        </TabsContent>
        
        <TabsContent value="suspended" className="space-y-4">
          {suspendedServices.length > 0 ? (
            suspendedServices.map((service) => (
              <HostingServiceCard key={service.id} service={service} />
            ))
          ) : (
            <EmptyState type="suspended" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface HostingServiceCardProps {
  service: HostingService;
}

const HostingServiceCard: React.FC<HostingServiceCardProps> = ({ service }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-500';
      case 'suspended': return 'bg-red-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const calculateUsage = (used: number = 0, total: number = 1) => {
    return Math.min(Math.round((used / total) * 100), 100);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{service.plan_name}</CardTitle>
            <CardDescription>
              {service.domain || service.server_hostname || 'Sem domínio associado'}
            </CardDescription>
          </div>
          <div className="flex items-center">
            <Badge className={`${getStatusColor(service.status)}`}>
              {service.status === 'active' ? 'Ativo' : 
              service.status === 'pending' ? 'Pendente' : 
              service.status === 'suspended' ? 'Suspenso' : 
              service.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium mb-1">Uso do Espaço</p>
              <Progress value={calculateUsage(service.disk_used, service.disk_space)} className="h-2" />
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>{service.disk_used || 0} MB</span>
                <span>{service.disk_space || 0} MB</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Uso de Largura de Banda</p>
              <Progress value={calculateUsage(service.bandwidth_used, service.bandwidth)} className="h-2" />
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>{service.bandwidth_used || 0} GB</span>
                <span>{service.bandwidth || 0} GB</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="flex flex-col items-center p-2 bg-muted rounded-md">
              <Database className="h-5 w-5 text-primary mb-1" />
              <p className="text-xs text-center">{service.databases || 0} Bases de Dados</p>
            </div>
            <div className="flex flex-col items-center p-2 bg-muted rounded-md">
              <Mail className="h-5 w-5 text-primary mb-1" />
              <p className="text-xs text-center">{service.email_accounts || 0} Contas de Email</p>
            </div>
            <div className="flex flex-col items-center p-2 bg-muted rounded-md">
              <Globe className="h-5 w-5 text-primary mb-1" />
              <p className="text-xs text-center">cPanel</p>
            </div>
            <div className="flex flex-col items-center p-2 bg-muted rounded-md">
              <Server className="h-5 w-5 text-primary mb-1" />
              <p className="text-xs text-center">PHP 8.x</p>
            </div>
          </div>
          
          <div className="flex space-x-2 justify-end">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/painel-cliente/hospedagem/${service.id}`}>
                Gerenciar
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="space-x-1">
              <RefreshCcw className="h-4 w-4" />
              <span>Atualizar</span>
            </Button>
            <Button variant="default" size="sm" asChild>
              <a href={`https://${service.server_hostname}/cpanel`} target="_blank" rel="noopener noreferrer">
                Acessar cPanel
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface EmptyStateProps {
  type: 'active' | 'pending' | 'suspended';
}

const EmptyState: React.FC<EmptyStateProps> = ({ type }) => {
  const getMessage = () => {
    switch (type) {
      case 'active':
        return 'Você não possui serviços de hospedagem ativos.';
      case 'pending':
        return 'Você não possui serviços de hospedagem pendentes.';
      case 'suspended':
        return 'Você não possui serviços de hospedagem suspensos.';
    }
  };
  
  return (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Nenhum serviço encontrado</AlertTitle>
      <AlertDescription>
        {getMessage()}
        {type === 'active' && (
          <div className="mt-2">
            <Button asChild>
              <Link to="/hospedagem">Contratar Hospedagem</Link>
            </Button>
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
};
