
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Server, 
  Database, 
  Mail, 
  HardDrive, 
  Globe,
  AlertCircle,
  Loader2,
  ExternalLink,
  PlusCircle
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { formatDate } from '@/utils/format';
import { Link } from 'react-router-dom';

export const HostingTab = () => {
  const [hostingServices, setHostingServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHostingServices();
  }, []);

  const fetchHostingServices = async () => {
    try {
      setLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('Usuário não autenticado');
        return;
      }

      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (customerError || !customerData) {
        setError('Não foi possível encontrar dados do cliente');
        return;
      }

      const { data: services, error: servicesError } = await supabase
        .from('hosting_services')
        .select(`
          *,
          plan:plan_id (name, features),
          domain:domain_id (name, tld)
        `)
        .eq('customer_id', customerData.id);

      if (servicesError) {
        console.error('Erro ao buscar serviços de hospedagem:', servicesError);
        setError('Erro ao carregar serviços de hospedagem');
        return;
      }

      setHostingServices(services || []);
    } catch (error) {
      console.error('Erro ao buscar serviços de hospedagem:', error);
      setError('Erro ao carregar serviços de hospedagem');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Ativo</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Pendente</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Suspenso</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div>
            <CardTitle className="flex items-center">
              <Server className="mr-2 h-5 w-5" />
              Meus Serviços de Hospedagem
            </CardTitle>
            <CardDescription>Gerencie seus serviços de hospedagem web</CardDescription>
          </div>
          <Button asChild>
            <Link to="/hospedagem">
              <PlusCircle className="h-4 w-4 mr-2" />
              Contratar Hospedagem
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Carregando serviços de hospedagem...</span>
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : hostingServices.length === 0 ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Nenhum serviço de hospedagem encontrado</AlertTitle>
            <AlertDescription>
              Você ainda não possui serviços de hospedagem. Contrate um plano de hospedagem para começar.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-6">
            {hostingServices.map((service) => (
              <div key={service.id} className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 border-b flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <h3 className="font-medium text-lg flex items-center">
                      <Server className="h-5 w-5 mr-2 text-primary" />
                      {service.plan?.name || 'Plano de Hospedagem'}
                      <span className="ml-3">{getStatusBadge(service.status)}</span>
                    </h3>
                    <p className="text-sm text-gray-600">
                      {service.domain ? 
                        `${service.domain.name}.${service.domain.tld}` : 
                        service.server_hostname || 'Sem domínio associado'}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={`https://${service.domain ? `${service.domain.name}.${service.domain.tld}` : service.server_hostname}`} target="_blank" rel="noopener noreferrer">
                        Visitar Site
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    </Button>
                    <Button variant="outline" size="sm">
                      Painel de Controle
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="border rounded-md p-3">
                      <div className="flex items-center mb-1">
                        <HardDrive className="h-4 w-4 mr-2 text-primary" />
                        <span className="text-sm font-medium">Espaço em Disco</span>
                      </div>
                      <div className="text-xl font-semibold">
                        {service.disk_space || service.plan?.features?.disk_space || '10'} GB
                      </div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="flex items-center mb-1">
                        <Database className="h-4 w-4 mr-2 text-primary" />
                        <span className="text-sm font-medium">Bancos de Dados</span>
                      </div>
                      <div className="text-xl font-semibold">
                        {service.databases || service.plan?.features?.databases || 'Ilimitado'}
                      </div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="flex items-center mb-1">
                        <Mail className="h-4 w-4 mr-2 text-primary" />
                        <span className="text-sm font-medium">Contas de Email</span>
                      </div>
                      <div className="text-xl font-semibold">
                        {service.email_accounts || service.plan?.features?.email_accounts || 'Ilimitado'}
                      </div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="flex items-center mb-1">
                        <Globe className="h-4 w-4 mr-2 text-primary" />
                        <span className="text-sm font-medium">Data de Criação</span>
                      </div>
                      <div className="text-lg font-medium">
                        {formatDate(service.created_at)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
