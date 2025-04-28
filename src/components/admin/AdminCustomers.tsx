
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Users, Plus, Search, Eye, Edit, Mail, Trash, FileText, LifeBuoy
} from "lucide-react";
import { toast } from 'sonner';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  nif: string | null;
  country: string | null;
  created_at: string;
}

export const AdminCustomers = () => {
  const { user } = useUser();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    nif: ''
  });
  const [customerServices, setCustomerServices] = useState({
    domains: [],
    hosting: [],
    invoices: []
  });
  
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('customers')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        setCustomers(data || []);
      } catch (error) {
        console.error('Error fetching customers:', error);
        toast.error('Erro ao carregar clientes');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCustomers();
  }, []);
  
  const fetchCustomerDetails = async (customerId: string) => {
    try {
      // Get domains
      const { data: domains, error: domainsError } = await supabase
        .from('domains')
        .select('*')
        .eq('customer_id', customerId);
        
      if (domainsError) throw domainsError;
      
      // Get hosting services
      const { data: hosting, error: hostingError } = await supabase
        .from('hosting_services')
        .select('*')
        .eq('customer_id', customerId);
        
      if (hostingError) throw hostingError;
      
      // Get invoices
      const { data: invoices, error: invoicesError } = await supabase
        .from('invoices')
        .select('*')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false });
        
      if (invoicesError) throw invoicesError;
      
      setCustomerServices({
        domains: domains || [],
        hosting: hosting || [],
        invoices: invoices || []
      });
    } catch (error) {
      console.error('Error fetching customer details:', error);
      toast.error('Erro ao carregar detalhes do cliente');
    }
  };
  
  const handleAddCustomer = async () => {
    try {
      if (!newCustomer.name || !newCustomer.email) {
        toast.error('Nome e email são obrigatórios');
        return;
      }
      
      // Create a new user in auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: newCustomer.email,
        password: Math.random().toString(36).slice(-8), // Random password
        email_confirm: true
      });
      
      if (authError) throw authError;
      
      // Create customer record
      if (authData?.user) {
        const { data, error } = await supabase
          .from('customers')
          .insert({
            user_id: authData.user.id,
            name: newCustomer.name,
            email: newCustomer.email,
            phone: newCustomer.phone || null,
            nif: newCustomer.nif || null
          })
          .select();
          
        if (error) throw error;
        
        // Update local state
        if (data) {
          setCustomers([data[0], ...customers]);
          setAddDialogOpen(false);
          setNewCustomer({
            name: '',
            email: '',
            phone: '',
            nif: ''
          });
          toast.success('Cliente adicionado com sucesso');
        }
      }
    } catch (error: any) {
      console.error('Error adding customer:', error);
      toast.error(`Erro ao adicionar cliente: ${error.message || 'Tente novamente'}`);
    }
  };
  
  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setViewDialogOpen(true);
    fetchCustomerDetails(customer.id);
  };
  
  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setEditDialogOpen(true);
  };
  
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (customer.phone && customer.phone.includes(searchTerm)) ||
    (customer.nif && customer.nif.includes(searchTerm))
  );
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return format(new Date(dateString), 'dd/MM/yyyy', { locale: pt });
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
        <div>
          <h1 className="text-2xl font-bold">Clientes</h1>
          <p className="text-gray-500">Gerencie a base de clientes da plataforma</p>
        </div>
        
        <div>
          <Button onClick={() => setAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Adicionar Cliente
          </Button>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Pesquisar por nome, email, telefone ou NIF..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      
      {filteredCustomers.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="rounded-full bg-blue-50 p-3">
              <Users className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="mt-4 text-lg font-medium">Nenhum cliente encontrado</h3>
            <p className="mt-2 text-sm text-gray-500 text-center">
              {searchTerm 
                ? "Nenhum cliente corresponde à sua pesquisa." 
                : "Você ainda não adicionou nenhum cliente."}
            </p>
            {!searchTerm && (
              <Button className="mt-4" onClick={() => setAddDialogOpen(true)}>
                Adicionar Cliente
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Clientes ({filteredCustomers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>NIF</TableHead>
                  <TableHead>País</TableHead>
                  <TableHead>Data de Registro</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone || '-'}</TableCell>
                    <TableCell>{customer.nif || '-'}</TableCell>
                    <TableCell>{customer.country || 'Angola'}</TableCell>
                    <TableCell>{formatDate(customer.created_at)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewCustomer(customer)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEditCustomer(customer)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
      
      {/* Add Customer Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Cliente</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium">Nome Completo*</label>
                <Input
                  id="name"
                  placeholder="Nome do cliente"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="text-sm font-medium">Email*</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="text-sm font-medium">Telefone</label>
                <Input
                  id="phone"
                  placeholder="+244 XXX XXX XXX"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                />
              </div>
              
              <div>
                <label htmlFor="nif" className="text-sm font-medium">NIF</label>
                <Input
                  id="nif"
                  placeholder="NIF do cliente"
                  value={newCustomer.nif}
                  onChange={(e) => setNewCustomer({ ...newCustomer, nif: e.target.value })}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleAddCustomer}>Adicionar Cliente</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Customer Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes do Cliente</DialogTitle>
          </DialogHeader>
          
          {selectedCustomer && (
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="info" className="flex items-center">
                  <Users className="mr-2 h-4 w-4" /> Informações
                </TabsTrigger>
                <TabsTrigger value="domains" className="flex items-center">
                  <Globe className="mr-2 h-4 w-4" /> Domínios
                </TabsTrigger>
                <TabsTrigger value="services" className="flex items-center">
                  <Server className="mr-2 h-4 w-4" /> Serviços
                </TabsTrigger>
                <TabsTrigger value="invoices" className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" /> Faturas
                </TabsTrigger>
                <TabsTrigger value="tickets" className="flex items-center">
                  <LifeBuoy className="mr-2 h-4 w-4" /> Tickets
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="info">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold">Nome</h3>
                    <p className="text-lg">{selectedCustomer.name}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold">Email</h3>
                    <p className="text-lg">{selectedCustomer.email}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold">Telefone</h3>
                    <p className="text-lg">{selectedCustomer.phone || '-'}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold">NIF</h3>
                    <p className="text-lg">{selectedCustomer.nif || '-'}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold">País</h3>
                    <p className="text-lg">{selectedCustomer.country || 'Angola'}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold">Data de Registro</h3>
                    <p className="text-lg">{formatDate(selectedCustomer.created_at)}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button onClick={() => handleEditCustomer(selectedCustomer)}>
                    <Edit className="mr-2 h-4 w-4" /> Editar Cliente
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="domains">
                {customerServices.domains.length === 0 ? (
                  <div className="text-center py-10">
                    <Globe className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-gray-500">Este cliente não possui domínios.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Domínio</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Data de Registro</TableHead>
                        <TableHead>Data de Expiração</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customerServices.domains.map((domain: any) => (
                        <TableRow key={domain.id}>
                          <TableCell>{domain.name}{domain.tld}</TableCell>
                          <TableCell>
                            <Badge>{domain.status}</Badge>
                          </TableCell>
                          <TableCell>{formatDate(domain.registration_date)}</TableCell>
                          <TableCell>{formatDate(domain.expiry_date)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>
              
              <TabsContent value="services">
                {customerServices.hosting.length === 0 ? (
                  <div className="text-center py-10">
                    <Server className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-gray-500">Este cliente não possui serviços ativos.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Plano</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Data de Ativação</TableHead>
                        <TableHead>Data de Expiração</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customerServices.hosting.map((service: any) => (
                        <TableRow key={service.id}>
                          <TableCell>{service.plan_name}</TableCell>
                          <TableCell>
                            <Badge>{service.status}</Badge>
                          </TableCell>
                          <TableCell>{formatDate(service.created_at)}</TableCell>
                          <TableCell>{formatDate(service.expires_at)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>
              
              <TabsContent value="invoices">
                {customerServices.invoices.length === 0 ? (
                  <div className="text-center py-10">
                    <FileText className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-gray-500">Este cliente não possui faturas.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nº da Fatura</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customerServices.invoices.map((invoice: any) => (
                        <TableRow key={invoice.id}>
                          <TableCell>{invoice.invoice_number || invoice.number || `INV-${invoice.id.substring(0, 8)}`}</TableCell>
                          <TableCell>{formatDate(invoice.created_at)}</TableCell>
                          <TableCell>Kz {invoice.total_amount?.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge>{invoice.status}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>
              
              <TabsContent value="tickets">
                <div className="text-center py-10">
                  <LifeBuoy className="mx-auto h-10 w-10 text-gray-400" />
                  <p className="mt-2 text-gray-500">Nenhum ticket encontrado para este cliente.</p>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Edit Customer Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Cliente</DialogTitle>
          </DialogHeader>
          
          {selectedCustomer && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="edit-name" className="text-sm font-medium">Nome Completo*</label>
                  <Input
                    id="edit-name"
                    placeholder="Nome do cliente"
                    value={selectedCustomer.name}
                    onChange={(e) => setSelectedCustomer({ ...selectedCustomer, name: e.target.value })}
                  />
                </div>
                
                <div>
                  <label htmlFor="edit-email" className="text-sm font-medium">Email*</label>
                  <Input
                    id="edit-email"
                    type="email"
                    placeholder="email@exemplo.com"
                    value={selectedCustomer.email}
                    onChange={(e) => setSelectedCustomer({ ...selectedCustomer, email: e.target.value })}
                  />
                </div>
                
                <div>
                  <label htmlFor="edit-phone" className="text-sm font-medium">Telefone</label>
                  <Input
                    id="edit-phone"
                    placeholder="+244 XXX XXX XXX"
                    value={selectedCustomer.phone || ''}
                    onChange={(e) => setSelectedCustomer({ ...selectedCustomer, phone: e.target.value })}
                  />
                </div>
                
                <div>
                  <label htmlFor="edit-nif" className="text-sm font-medium">NIF</label>
                  <Input
                    id="edit-nif"
                    placeholder="NIF do cliente"
                    value={selectedCustomer.nif || ''}
                    onChange={(e) => setSelectedCustomer({ ...selectedCustomer, nif: e.target.value })}
                  />
                </div>
                
                <div>
                  <label htmlFor="edit-country" className="text-sm font-medium">País</label>
                  <Input
                    id="edit-country"
                    placeholder="País"
                    value={selectedCustomer.country || 'Angola'}
                    onChange={(e) => setSelectedCustomer({ ...selectedCustomer, country: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancelar</Button>
            <Button onClick={() => {
              // Mock update customer
              const updatedCustomers = customers.map(c => 
                c.id === selectedCustomer?.id ? selectedCustomer : c
              );
              setCustomers(updatedCustomers);
              setEditDialogOpen(false);
              toast.success('Cliente atualizado com sucesso');
            }}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
