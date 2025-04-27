
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Globe,
  Search,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Loader2,
  Clock,
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from '@/integrations/supabase/client';
import { formatDate } from '@/utils/format';
import { Link } from 'react-router-dom';

export const DomainsTab = () => {
  const [domains, setDomains] = useState<any[]>([]);
  const [filteredDomains, setFilteredDomains] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState('all');

  useEffect(() => {
    fetchDomains();
  }, []);

  useEffect(() => {
    filterDomains();
  }, [domains, searchQuery, selectedTab]);

  const fetchDomains = async () => {
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

      const { data, error } = await supabase
        .from('domains')
        .select('*')
        .eq('customer_id', customerData.id)
        .order('name', { ascending: true });

      if (error) {
        console.error('Erro ao buscar domínios:', error);
        setError('Erro ao carregar domínios');
        return;
      }

      setDomains(data || []);
    } catch (error) {
      console.error('Erro ao buscar domínios:', error);
      setError('Erro ao carregar domínios');
    } finally {
      setLoading(false);
    }
  };

  const filterDomains = () => {
    let filtered = [...domains];
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(domain => 
        `${domain.name}.${domain.tld}`.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by tab/status
    if (selectedTab !== 'all') {
      filtered = filtered.filter(domain => domain.status === selectedTab);
    }
    
    setFilteredDomains(filtered);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const getDomainStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Ativo
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <Clock className="h-3 w-3 mr-1" />
            Pendente
          </Badge>
        );
      case 'expired':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Expirado
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
    }
  };

  const isExpiring = (expiryDate: string) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return expiry <= thirtyDaysFromNow && expiry >= new Date();
  };

  const calculateActiveCount = () => domains.filter(d => d.status === 'active').length;
  const calculatePendingCount = () => domains.filter(d => d.status === 'pending').length;
  const calculateExpiringCount = () => domains.filter(d => isExpiring(d.expiry_date)).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div>
            <CardTitle className="flex items-center">
              <Globe className="mr-2 h-5 w-5" />
              Meus Domínios
            </CardTitle>
            <CardDescription>Gerencie seus domínios registrados</CardDescription>
          </div>
          <Button asChild>
            <Link to="/dominios/registrar">
              <PlusCircle className="h-4 w-4 mr-2" />
              Registrar Novo Domínio
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Carregando domínios...</span>
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar domínios..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => fetchDomains()}
                title="Atualizar lista"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            
            <Tabs defaultValue="all" onValueChange={setSelectedTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">
                  Todos ({domains.length})
                </TabsTrigger>
                <TabsTrigger value="active">
                  Ativos ({calculateActiveCount()})
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Pendentes ({calculatePendingCount()})
                </TabsTrigger>
                {calculateExpiringCount() > 0 && (
                  <TabsTrigger value="expiring" className="bg-amber-50 data-[state=active]:bg-amber-200 text-amber-700">
                    Expirando ({calculateExpiringCount()})
                  </TabsTrigger>
                )}
              </TabsList>
            </Tabs>
            
            {filteredDomains.length === 0 ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Nenhum domínio encontrado</AlertTitle>
                <AlertDescription>
                  {searchQuery ? 
                    `Não encontramos domínios correspondentes à sua busca "${searchQuery}".` : 
                    selectedTab !== 'all' ? 
                      `Você não possui domínios com status "${selectedTab}".` :
                      'Você ainda não possui domínios registrados.'}
                </AlertDescription>
              </Alert>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Domínio</TableHead>
                      <TableHead>Registro</TableHead>
                      <TableHead>Expiração</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Renovação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDomains.map((domain) => (
                      <TableRow key={domain.id}>
                        <TableCell className="font-medium">
                          {domain.name}.{domain.tld}
                        </TableCell>
                        <TableCell>{formatDate(domain.registration_date)}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className={isExpiring(domain.expiry_date) ? 'text-amber-600 font-medium' : ''}>
                              {formatDate(domain.expiry_date)}
                            </span>
                            {isExpiring(domain.expiry_date) && (
                              <AlertCircle className="h-4 w-4 text-amber-600 ml-1" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{getDomainStatusBadge(domain.status)}</TableCell>
                        <TableCell className="text-right">
                          {domain.auto_renew ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Automática
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-50 text-gray-700">
                              Manual
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
