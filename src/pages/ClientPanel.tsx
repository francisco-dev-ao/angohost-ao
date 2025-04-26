
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Mail, Globe, Server, CreditCard, Settings, User, UserPlus, Edit, Trash2 } from 'lucide-react';
import { useCart, ContactProfile } from '@/context/CartContext';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const ClientPanel = () => {
  const { customer, contactProfiles, addContactProfile, removeContactProfile, updateContactProfile } = useCart();
  const [isNewProfileDialogOpen, setIsNewProfileDialogOpen] = useState(false);
  const [isEditProfileDialogOpen, setIsEditProfileDialogOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<ContactProfile | null>(null);
  
  const [newProfile, setNewProfile] = useState<Omit<ContactProfile, 'id'>>({
    name: '',
    email: '',
    phone: '',
    nif: '',
    billingAddress: '',
    city: '',
  });
  
  const handleProfileFormChange = (field: keyof Omit<ContactProfile, 'id'>, value: string) => {
    setNewProfile({
      ...newProfile,
      [field]: value
    });
  };
  
  const handleCreateProfile = () => {
    // Validate required fields
    if (!newProfile.name || !newProfile.email) {
      toast.error('Por favor, preencha pelo menos o nome e email.');
      return;
    }
    
    // Add new profile
    addContactProfile({
      ...newProfile,
      id: `profile-${Date.now()}`
    });
    
    // Reset form and close dialog
    toast.success('Perfil de contato criado com sucesso!');
    setNewProfile({
      name: '',
      email: '',
      phone: '',
      nif: '',
      billingAddress: '',
      city: '',
    });
    setIsNewProfileDialogOpen(false);
  };
  
  const handleSelectProfileToEdit = (profile: ContactProfile) => {
    setSelectedProfile(profile);
    setNewProfile({
      name: profile.name,
      email: profile.email,
      phone: profile.phone || '',
      nif: profile.nif || '',
      billingAddress: profile.billingAddress || '',
      city: profile.city || '',
      postalCode: profile.postalCode || '',
      idNumber: profile.idNumber || '',
    });
    setIsEditProfileDialogOpen(true);
  };
  
  const handleUpdateProfile = () => {
    if (!selectedProfile) return;
    
    // Validate required fields
    if (!newProfile.name || !newProfile.email) {
      toast.error('Por favor, preencha pelo menos o nome e email.');
      return;
    }
    
    // Update profile
    updateContactProfile(selectedProfile.id, newProfile);
    
    // Reset and close dialog
    toast.success('Perfil de contato atualizado com sucesso!');
    setSelectedProfile(null);
    setIsEditProfileDialogOpen(false);
  };
  
  const handleDeleteProfile = (profileId: string) => {
    if (confirm('Tem certeza que deseja excluir este perfil de contato?')) {
      removeContactProfile(profileId);
      toast.success('Perfil de contato excluído com sucesso!');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Painel do Cliente</h1>
        <p className="text-gray-600 mb-8">
          Gerencie seus domínios, emails e serviços de hospedagem.
        </p>
        
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="domains">Domínios</TabsTrigger>
            <TabsTrigger value="emails">Emails</TabsTrigger>
            <TabsTrigger value="hosting">Hospedagem</TabsTrigger>
            <TabsTrigger value="contacts">Perfis de Contato</TabsTrigger>
            <TabsTrigger value="account">Minha Conta</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Informações da Conta
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {customer ? (
                    <div className="space-y-2">
                      <p><span className="font-medium">Nome:</span> {customer.name}</p>
                      <p><span className="font-medium">Email:</span> {customer.email}</p>
                      <p><span className="font-medium">Telefone:</span> {customer.phone}</p>
                      <p><span className="font-medium">NIF:</span> {customer.nif}</p>
                    </div>
                  ) : (
                    <p>Faça login para ver suas informações</p>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="mr-2 h-5 w-5" />
                    Ações Rápidas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button asChild className="w-full" variant="outline">
                      <Link to="/dominios/registrar">
                        <Globe className="mr-2 h-4 w-4" />
                        Registrar Novo Domínio
                      </Link>
                    </Button>
                    
                    <Button asChild className="w-full" variant="outline">
                      <Link to="/email/profissional">
                        <Mail className="mr-2 h-4 w-4" />
                        Adicionar Email Profissional
                      </Link>
                    </Button>
                    
                    <Button asChild className="w-full bg-primary hover:bg-primary/90">
                      <Link to="/carrinho">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Ir para Carrinho
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Serviços Ativos</CardTitle>
                  <CardDescription>
                    Visualize seus serviços ativos e datas de vencimento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center p-12">
                    <div className="text-center">
                      <Server className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Nenhum serviço ativo</h3>
                      <p className="text-gray-600 mt-2 mb-6">
                        Você ainda não tem serviços ativos na sua conta.
                      </p>
                      <Button asChild>
                        <Link to="/">Ver Produtos</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="domains" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Meus Domínios</CardTitle>
                <CardDescription>
                  Gerencie seus domínios registrados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-12">
                  <div className="text-center">
                    <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">Nenhum domínio registrado</h3>
                    <p className="text-gray-600 mt-2 mb-6">
                      Você ainda não tem domínios registrados na sua conta.
                    </p>
                    <Button asChild>
                      <Link to="/dominios/registrar">Registrar Domínio</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="emails" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Serviços de Email</CardTitle>
                <CardDescription>
                  Gerencie seus planos de email profissional
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-12">
                  <div className="text-center">
                    <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">Nenhum serviço de email</h3>
                    <p className="text-gray-600 mt-2 mb-6">
                      Você ainda não tem serviços de email ativos na sua conta.
                    </p>
                    <Button asChild>
                      <Link to="/email/profissional">Adquirir Email Profissional</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="hosting" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Hospedagem Web</CardTitle>
                <CardDescription>
                  Gerencie seus serviços de hospedagem
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-12">
                  <div className="text-center">
                    <Server className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">Nenhum serviço de hospedagem</h3>
                    <p className="text-gray-600 mt-2 mb-6">
                      Você ainda não tem serviços de hospedagem ativos na sua conta.
                    </p>
                    <Button asChild>
                      <Link to="/">Ver Planos de Hospedagem</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contacts" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Perfis de Contato</CardTitle>
                  <CardDescription>
                    Gerencie seus perfis de contato para registro de domínios
                  </CardDescription>
                </div>
                <Dialog open={isNewProfileDialogOpen} onOpenChange={setIsNewProfileDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Novo Perfil
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Criar Novo Perfil de Contato</DialogTitle>
                      <DialogDescription>
                        Preencha as informações para criar um novo perfil de contato
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Nome *</Label>
                          <Input 
                            id="name" 
                            value={newProfile.name} 
                            onChange={(e) => handleProfileFormChange('name', e.target.value)}
                            placeholder="Nome completo ou empresa"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={newProfile.email} 
                            onChange={(e) => handleProfileFormChange('email', e.target.value)}
                            placeholder="email@exemplo.com"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Telefone</Label>
                          <Input 
                            id="phone" 
                            value={newProfile.phone} 
                            onChange={(e) => handleProfileFormChange('phone', e.target.value)}
                            placeholder="Número de telefone"
                          />
                        </div>
                        <div>
                          <Label htmlFor="nif">NIF</Label>
                          <Input 
                            id="nif" 
                            value={newProfile.nif} 
                            onChange={(e) => handleProfileFormChange('nif', e.target.value)}
                            placeholder="Número de NIF"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="billingAddress">Endereço</Label>
                        <Input 
                          id="billingAddress" 
                          value={newProfile.billingAddress} 
                          onChange={(e) => handleProfileFormChange('billingAddress', e.target.value)}
                          placeholder="Endereço completo"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">Cidade</Label>
                          <Input 
                            id="city" 
                            value={newProfile.city} 
                            onChange={(e) => handleProfileFormChange('city', e.target.value)}
                            placeholder="Cidade"
                          />
                        </div>
                        <div>
                          <Label htmlFor="idNumber">Bilhete de Identidade</Label>
                          <Input 
                            id="idNumber" 
                            value={newProfile.idNumber || ''} 
                            onChange={(e) => handleProfileFormChange('idNumber', e.target.value)}
                            placeholder="Número do BI"
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleCreateProfile}>Criar Perfil</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Dialog open={isEditProfileDialogOpen} onOpenChange={setIsEditProfileDialogOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar Perfil de Contato</DialogTitle>
                      <DialogDescription>
                        Atualize as informações do perfil de contato
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="edit-name">Nome *</Label>
                          <Input 
                            id="edit-name" 
                            value={newProfile.name} 
                            onChange={(e) => handleProfileFormChange('name', e.target.value)}
                            placeholder="Nome completo ou empresa"
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-email">Email *</Label>
                          <Input 
                            id="edit-email" 
                            type="email" 
                            value={newProfile.email} 
                            onChange={(e) => handleProfileFormChange('email', e.target.value)}
                            placeholder="email@exemplo.com"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="edit-phone">Telefone</Label>
                          <Input 
                            id="edit-phone" 
                            value={newProfile.phone} 
                            onChange={(e) => handleProfileFormChange('phone', e.target.value)}
                            placeholder="Número de telefone"
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-nif">NIF</Label>
                          <Input 
                            id="edit-nif" 
                            value={newProfile.nif} 
                            onChange={(e) => handleProfileFormChange('nif', e.target.value)}
                            placeholder="Número de NIF"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="edit-address">Endereço</Label>
                        <Input 
                          id="edit-address" 
                          value={newProfile.billingAddress} 
                          onChange={(e) => handleProfileFormChange('billingAddress', e.target.value)}
                          placeholder="Endereço completo"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="edit-city">Cidade</Label>
                          <Input 
                            id="edit-city" 
                            value={newProfile.city} 
                            onChange={(e) => handleProfileFormChange('city', e.target.value)}
                            placeholder="Cidade"
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-idNumber">Bilhete de Identidade</Label>
                          <Input 
                            id="edit-idNumber" 
                            value={newProfile.idNumber || ''} 
                            onChange={(e) => handleProfileFormChange('idNumber', e.target.value)}
                            placeholder="Número do BI"
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleUpdateProfile}>Atualizar Perfil</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              
              <CardContent>
                {contactProfiles.length === 0 ? (
                  <div className="flex items-center justify-center p-12">
                    <div className="text-center">
                      <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Nenhum perfil de contato</h3>
                      <p className="text-gray-600 mt-2 mb-6">
                        Você ainda não tem perfis de contato cadastrados.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {contactProfiles.map((profile) => (
                      <Card key={profile.id} className="overflow-hidden">
                        <CardHeader className="p-4 bg-gray-50">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{profile.name}</CardTitle>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleSelectProfileToEdit(profile)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDeleteProfile(profile.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="text-sm space-y-1">
                            <p><span className="font-medium">Email:</span> {profile.email}</p>
                            <p><span className="font-medium">Telefone:</span> {profile.phone || 'Não informado'}</p>
                            <p><span className="font-medium">NIF:</span> {profile.nif || 'Não informado'}</p>
                            <p><span className="font-medium">Cidade:</span> {profile.city || 'Não informado'}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Minha Conta</CardTitle>
                <CardDescription>
                  Gerencie suas informações pessoais e configurações
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-12">
                  <div className="text-center">
                    <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">Funcionalidade em Desenvolvimento</h3>
                    <p className="text-gray-600 mt-2 mb-6">
                      Esta funcionalidade estará disponível em breve.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientPanel;
