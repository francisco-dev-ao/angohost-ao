
import React, { useEffect, useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Server, ExternalLink, RefreshCw, Settings, Plus, Key, Lock
} from "lucide-react";
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { format, differenceInDays, addDays } from 'date-fns';
import { pt } from 'date-fns/locale';

interface HostingService {
  id: string;
  plan_name: string;
  plan_type: string;
  status: string;
  created_at: string;
  expires_at: string;
  auto_renew: boolean;
}

export const ClientHosting = () => {
  const { user } = useUser();
  const [services, setServices] = useState<HostingService[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchHostingServices = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('hosting_services')
          .select('*')
          .eq('customer_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        setServices(data || []);
      } catch (error) {
        console.error('Error fetching hosting services:', error);
        toast.error('Erro ao carregar serviços de hospedagem');
      } finally {
        setLoading(false);
      }
    };
    
    fetchHostingServices();
  }, [user]);
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return format(new Date(dateString), 'dd/MM/yyyy', { locale: pt });
  };
  
  const getDaysUntilExpiry = (expiryDate: string) => {
    if (!expiryDate) return null;
    
    const expiry = new Date(expiryDate);
    const today = new Date();
    return differenceInDays(expiry, today);
  };
  
  const getStatusBadge = (service: HostingService) => {
    const status = service.status.toLowerCase();
    const daysUntil = service.expires_at ? getDaysUntilExpiry(service.expires_at) : null;
    
    if (status === 'active' || status === 'ativo') {
      if (daysUntil !== null) {
        if (daysUntil < 0) {
          return <Badge variant="destructive">Expirado</Badge>;
        } else if (daysUntil <= 30) {
          return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Expira em {daysUntil} dias</Badge>;
        } else {
          return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Ativo</Badge>;
        }
      }
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Ativo</Badge>;
    } else if (status === 'pending' || status === 'pendente') {
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Pendente</Badge>;
    } else if (status === 'suspended' || status === 'suspenso') {
      return <Badge variant="destructive">Suspenso</Badge>;
    }
    
    return <Badge>{service.status}</Badge>;
  };
  
  const handleToggleAutoRenew = async (service: HostingService) => {
    try {
      const { error } = await supabase
        .from('hosting_services')
        .update({ auto_renew: !service.auto_renew })
        .eq('id', service.id);
        
      if (error) throw error;
      
      // Update the local state
      setServices(services.map(s => 
        s.id === service.id ? { ...s, auto_renew: !s.auto_renew } : s
      ));
      
      toast.success(`Renovação automática ${!service.auto_renew ? 'ativada' : 'desativada'} para ${service.plan_name}`);
    } catch (error) {
      console.error('Error toggling auto-renew:', error);
      toast.error('Erro ao alterar renovação automática');
    }
  };
  
  const handleRenewService = async (service: HostingService) => {
    try {
      // Mock renewal process
      toast.loading(`Renovando serviço ${service.plan_name}...`);
      
      // Simulate API call delay
      setTimeout(async () => {
        try {
          const newExpiryDate = service.expires_at 
            ? new Date(addDays(new Date(service.expires_at), 365)).toISOString()
            : new Date(addDays(new Date(), 365)).toISOString();
            
          const { error } = await supabase
            .from('hosting_services')
            .update({ 
              expires_at: newExpiryDate,
              status: 'active'
            })
            .eq('id', service.id);
            
          if (error) throw error;
          
          // Update the local state
          setServices(services.map(s => 
            s.id === service.id ? { ...s, expires_at: newExpiryDate, status: 'active' } : s
          ));
          
          toast.dismiss();
          toast.success(`Serviço ${service.plan_name} renovado com sucesso até ${formatDate(newExpiryDate)}`);
        } catch (error) {
          console.error('Error renewing service:', error);
          toast.dismiss();
          toast.error('Erro ao renovar serviço');
        }
      }, 2000);
    } catch (error) {
      console.error('Error renewing service:', error);
      toast.error('Erro ao renovar serviço');
    }
  };

  const handleResetPassword = (service: HostingService) => {
    toast.success(`Link para redefinição de senha de ${service.plan_name} enviado para seu email`);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Meus Serviços</h1>
        
        <Button asChild>
          <Link to="/hospedagem-de-sites">
            <Plus className="mr-2 h-4 w-4" /> Contratar Novo Serviço
          </Link>
        </Button>
      </div>
      
      {services.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="rounded-full bg-blue-50 p-3">
              <Server className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="mt-4 text-lg font-medium">Nenhum serviço encontrado</h3>
            <p className="mt-2 text-sm text-gray-500 text-center">
              Você ainda não possui nenhum serviço de hospedagem contratado.
            </p>
            <Button className="mt-4" asChild>
              <Link to="/hospedagem-de-sites">
                Contratar Hospedagem
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Lista de Serviços</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plano</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Ativação</TableHead>
                  <TableHead>Expiração</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Renovação Auto</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => {
                  const daysUntilExpiry = service.expires_at ? getDaysUntilExpiry(service.expires_at) : null;
                  const needsRenewal = daysUntilExpiry !== null && daysUntilExpiry <= 30;
                  
                  return (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">
                        {service.plan_name}
                      </TableCell>
                      <TableCell>{service.plan_type || 'cPanel'}</TableCell>
                      <TableCell>{formatDate(service.created_at)}</TableCell>
                      <TableCell>{formatDate(service.expires_at)}</TableCell>
                      <TableCell>{getStatusBadge(service)}</TableCell>
                      <TableCell>
                        <Button 
                          variant={service.auto_renew ? "default" : "outline"} 
                          size="sm"
                          onClick={() => handleToggleAutoRenew(service)}
                        >
                          {service.auto_renew ? "Ativada" : "Desativada"}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href="https://cpanel.angohost.ao" target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                          
                          {needsRenewal && (
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => handleRenewService(service)}
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          )}
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleResetPassword(service)}
                          >
                            <Key className="h-4 w-4" />
                          </Button>
                          
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
