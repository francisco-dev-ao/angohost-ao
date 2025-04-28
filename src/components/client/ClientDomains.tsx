
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
  Globe, Settings, RefreshCw, Shield, ExternalLink, Lock, Plus
} from "lucide-react";
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { format, differenceInDays, isBefore, addDays } from 'date-fns';
import { pt } from 'date-fns/locale';

interface Domain {
  id: string;
  name: string;
  tld: string;
  status: string;
  registration_date: string;
  expiry_date: string;
  auto_renew: boolean;
}

export const ClientDomains = () => {
  const { user } = useUser();
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchDomains = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('domains')
          .select('*')
          .eq('customer_id', user.id)
          .order('name', { ascending: true });
          
        if (error) throw error;
        setDomains(data || []);
      } catch (error) {
        console.error('Error fetching domains:', error);
        toast.error('Erro ao carregar domínios');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDomains();
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
  
  const getStatusBadge = (domain: Domain) => {
    const status = domain.status.toLowerCase();
    const daysUntil = domain.expiry_date ? getDaysUntilExpiry(domain.expiry_date) : null;
    
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
    } else if (status === 'expired' || status === 'expirado') {
      return <Badge variant="destructive">Expirado</Badge>;
    }
    
    return <Badge>{domain.status}</Badge>;
  };
  
  const handleToggleAutoRenew = async (domain: Domain) => {
    try {
      const { error } = await supabase
        .from('domains')
        .update({ auto_renew: !domain.auto_renew })
        .eq('id', domain.id);
        
      if (error) throw error;
      
      // Update the local state
      setDomains(domains.map(d => 
        d.id === domain.id ? { ...d, auto_renew: !d.auto_renew } : d
      ));
      
      toast.success(`Renovação automática ${!domain.auto_renew ? 'ativada' : 'desativada'} para ${domain.name}${domain.tld}`);
    } catch (error) {
      console.error('Error toggling auto-renew:', error);
      toast.error('Erro ao alterar renovação automática');
    }
  };
  
  const handleRenewDomain = async (domain: Domain) => {
    try {
      // Mock renewal process
      toast.loading(`Renovando domínio ${domain.name}${domain.tld}...`);
      
      // Simulate API call delay
      setTimeout(async () => {
        try {
          const newExpiryDate = domain.expiry_date 
            ? new Date(addDays(new Date(domain.expiry_date), 365)).toISOString()
            : new Date(addDays(new Date(), 365)).toISOString();
            
          const { error } = await supabase
            .from('domains')
            .update({ 
              expiry_date: newExpiryDate,
              status: 'active'
            })
            .eq('id', domain.id);
            
          if (error) throw error;
          
          // Update the local state
          setDomains(domains.map(d => 
            d.id === domain.id ? { ...d, expiry_date: newExpiryDate, status: 'active' } : d
          ));
          
          toast.dismiss();
          toast.success(`Domínio ${domain.name}${domain.tld} renovado com sucesso até ${formatDate(newExpiryDate)}`);
        } catch (error) {
          console.error('Error renewing domain:', error);
          toast.dismiss();
          toast.error('Erro ao renovar domínio');
        }
      }, 2000);
    } catch (error) {
      console.error('Error renewing domain:', error);
      toast.error('Erro ao renovar domínio');
    }
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
        <h1 className="text-2xl font-bold">Meus Domínios</h1>
        
        <Button asChild>
          <Link to="/dominios/registrar">
            <Plus className="mr-2 h-4 w-4" /> Registrar Novo Domínio
          </Link>
        </Button>
      </div>
      
      {domains.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="rounded-full bg-blue-50 p-3">
              <Globe className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="mt-4 text-lg font-medium">Nenhum domínio encontrado</h3>
            <p className="mt-2 text-sm text-gray-500 text-center">
              Você ainda não possui nenhum domínio registrado.
            </p>
            <Button className="mt-4" asChild>
              <Link to="/dominios/registrar">
                Registrar Domínio
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Lista de Domínios</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Domínio</TableHead>
                  <TableHead>Registro</TableHead>
                  <TableHead>Expiração</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Renovação Auto</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {domains.map((domain) => {
                  const daysUntilExpiry = domain.expiry_date ? getDaysUntilExpiry(domain.expiry_date) : null;
                  const needsRenewal = daysUntilExpiry !== null && daysUntilExpiry <= 30;
                  
                  return (
                    <TableRow key={domain.id}>
                      <TableCell className="font-medium">
                        {domain.name}{domain.tld}
                      </TableCell>
                      <TableCell>{formatDate(domain.registration_date)}</TableCell>
                      <TableCell>{formatDate(domain.expiry_date)}</TableCell>
                      <TableCell>{getStatusBadge(domain)}</TableCell>
                      <TableCell>
                        <Button 
                          variant={domain.auto_renew ? "default" : "outline"} 
                          size="sm"
                          onClick={() => handleToggleAutoRenew(domain)}
                        >
                          {domain.auto_renew ? "Ativada" : "Desativada"}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                          
                          {needsRenewal && (
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => handleRenewDomain(domain)}
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          )}
                          
                          <Button variant="outline" size="sm">
                            <Shield className="h-4 w-4" />
                          </Button>
                          
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4" />
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
