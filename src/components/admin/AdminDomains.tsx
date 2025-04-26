
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Search, RefreshCcw, Globe, MoreHorizontal, Calendar } from 'lucide-react';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface Domain {
  id: string;
  name: string;
  tld: string;
  status: string;
  registration_date: string | null;
  expiry_date: string | null;
  auto_renew: boolean;
  customer: {
    name: string;
    email: string;
  };
  customer_id: string;
}

export const AdminDomains = () => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  
  const fetchDomains = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('domains')
        .select(`
          *,
          customer:customers(name, email)
        `)
        .order('registration_date', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setDomains(data || []);
    } catch (error) {
      console.error('Erro ao buscar domínios:', error);
      toast.error('Erro ao carregar a lista de domínios');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchDomains();
  }, []);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredDomains = domains.filter((domain) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      domain.name.toLowerCase().includes(searchLower) ||
      domain.tld.toLowerCase().includes(searchLower) ||
      domain.status?.toLowerCase().includes(searchLower) ||
      domain.customer?.name?.toLowerCase().includes(searchLower) ||
      domain.customer?.email?.toLowerCase().includes(searchLower)
    );
  });
  
  const handleEditDomain = (domain: Domain) => {
    setSelectedDomain(domain);
    setIsDialogOpen(true);
  };

  const getDomainStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return <Badge className="bg-green-500">Ativo</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500">Pendente</Badge>;
      case 'expired':
        return <Badge className="bg-red-500">Expirado</Badge>;
      case 'transferring':
        return <Badge className="bg-blue-500">Transferindo</Badge>;
      default:
        return <Badge className="bg-gray-500">{status || 'N/A'}</Badge>;
    }
  };
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-AO');
  };
  
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between px-6">
          <div>
            <CardTitle>Gerenciamento de Domínios</CardTitle>
            <CardDescription>Visualize e gerencie todos os domínios registrados</CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Buscar domínio..." 
                className="pl-8 w-[250px]" 
                value={searchQuery} 
                onChange={handleSearch} 
              />
            </div>
            <Button 
              variant="outline" 
              size="icon"
              onClick={fetchDomains}
              title="Atualizar lista"
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domínio</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Registro</TableHead>
                <TableHead>Expiração</TableHead>
                <TableHead>Renovação</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    <RefreshCcw className="h-6 w-6 animate-spin mx-auto" />
                    <p className="mt-2">Carregando domínios...</p>
                  </TableCell>
                </TableRow>
              ) : filteredDomains.length > 0 ? (
                filteredDomains.map((domain) => (
                  <TableRow key={domain.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-blue-500" />
                        {domain.name}.{domain.tld}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{domain.customer?.name || 'N/A'}</p>
                        <p className="text-xs text-gray-500">{domain.customer?.email || 'N/A'}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getDomainStatusBadge(domain.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-2 text-gray-400" />
                        {formatDate(domain.registration_date)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-2 text-gray-400" />
                        {formatDate(domain.expiry_date)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {domain.auto_renew ? (
                        <Badge className="bg-green-500">Automática</Badge>
                      ) : (
                        <Badge variant="outline">Manual</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditDomain(domain)}>
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              toast.info(`Renovação ${domain.auto_renew ? 'desativada' : 'ativada'} para ${domain.name}.${domain.tld}`);
                            }}
                          >
                            {domain.auto_renew ? 'Desativar' : 'Ativar'} Auto-Renovação
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              toast.info(`Iniciado processo de transferência para ${domain.name}.${domain.tld}`);
                            }}
                          >
                            Transferir Domínio
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              toast.info(`Solicitação de exclusão para ${domain.name}.${domain.tld}`);
                            }}
                          >
                            Excluir Domínio
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    <p className="text-gray-500">Nenhum domínio encontrado</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Diálogo de Edição de Domínio */}
      {selectedDomain && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Domínio</DialogTitle>
              <DialogDescription>
                Atualize as informações do domínio {selectedDomain.name}.{selectedDomain.tld}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* Implementar formulário de edição */}
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <select 
                  id="status"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue={selectedDomain.status}
                >
                  <option value="active">Ativo</option>
                  <option value="pending">Pendente</option>
                  <option value="expired">Expirado</option>
                  <option value="transferring">Transferindo</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="registration_date">Data de Registro</Label>
                  <Input 
                    id="registration_date" 
                    type="date" 
                    defaultValue={selectedDomain.registration_date?.split('T')[0] || ''} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="expiry_date">Data de Expiração</Label>
                  <Input 
                    id="expiry_date" 
                    type="date" 
                    defaultValue={selectedDomain.expiry_date?.split('T')[0] || ''} 
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="auto_renew"
                  defaultChecked={selectedDomain.auto_renew}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="auto_renew">Renovação Automática</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => {
                toast.success(`Domínio ${selectedDomain.name}.${selectedDomain.tld} atualizado com sucesso!`);
                setIsDialogOpen(false);
              }}>
                Salvar Alterações
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
