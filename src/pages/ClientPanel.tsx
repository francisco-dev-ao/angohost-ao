
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useCart, ContactProfile } from '@/context/CartContext';
import { toast } from 'sonner';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { supabase } from '@/integrations/supabase/client';
import { ProfileOverview } from '@/components/client-panel/ProfileOverview';
import { ContactProfilesList } from '@/components/client-panel/ContactProfilesList';
import { ContactProfileDialogs } from '@/components/client-panel/ContactProfileDialogs';
import { ServicesTab } from '@/components/dashboard/ServicesTab';
import { InvoicesTab } from '@/components/dashboard/InvoicesTab';
import { TicketsTab } from '@/components/dashboard/TicketsTab';

const ClientPanel = () => {
  const { customer, contactProfiles, addContactProfile, removeContactProfile, updateContactProfile } = useCart();
  const [isNewProfileDialogOpen, setIsNewProfileDialogOpen] = useState(false);
  const [isEditProfileDialogOpen, setIsEditProfileDialogOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<ContactProfile | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  
  const [newProfile, setNewProfile] = useState<Omit<ContactProfile, 'id'>>({
    profileName: '',
    name: '',
    email: '',
    phone: '',
    nif: '',
    billingAddress: '',
    city: '',
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        setUserData(user);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);
  
  const handleProfileFormChange = (field: keyof Omit<ContactProfile, 'id'>, value: string) => {
    setNewProfile({
      ...newProfile,
      [field]: value
    });
  };
  
  const handleCreateProfile = () => {
    if (!newProfile.name || !newProfile.email) {
      toast.error('Por favor, preencha pelo menos o nome e email.');
      return;
    }
    
    const profileToCreate = {
      ...newProfile,
      profileName: newProfile.profileName || newProfile.name
    };
    
    addContactProfile({
      ...profileToCreate,
      id: `profile-${Date.now()}`
    });
    
    toast.success('Perfil de contato criado com sucesso!');
    setNewProfile({
      profileName: '',
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
      profileName: profile.profileName || profile.name,
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
    
    if (!newProfile.name || !newProfile.email) {
      toast.error('Por favor, preencha pelo menos o nome e email.');
      return;
    }

    const profileToUpdate = {
      ...newProfile,
      profileName: newProfile.profileName || newProfile.name
    };
    
    updateContactProfile(selectedProfile.id, profileToUpdate);
    
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
  
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/auth');
      toast.success('Sessão encerrada com sucesso');
    } catch (error) {
      console.error('Erro ao sair:', error);
      toast.error('Erro ao encerrar sessão');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span>Carregando painel do cliente...</span>
      </div>
    );
  }
  
  return (
    <RequireAuth>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Painel do Cliente</h1>
              <p className="text-gray-600">
                Gerencie seus domínios, emails e serviços de hospedagem.
              </p>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              Sair
            </Button>
          </div>
          
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="services">Serviços</TabsTrigger>
              <TabsTrigger value="invoices">Faturas</TabsTrigger>
              <TabsTrigger value="contacts">Perfis de Contato</TabsTrigger>
              <TabsTrigger value="tickets">Suporte</TabsTrigger>
              <TabsTrigger value="account">Minha Conta</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <ProfileOverview userData={userData} />
            </TabsContent>
            
            <TabsContent value="services" className="mt-6">
              <ServicesTab />
            </TabsContent>
            
            <TabsContent value="invoices" className="mt-6">
              <InvoicesTab />
            </TabsContent>
            
            <TabsContent value="contacts" className="mt-6">
              <ContactProfilesList 
                contactProfiles={contactProfiles}
                onEditProfile={handleSelectProfileToEdit}
                onDeleteProfile={handleDeleteProfile}
                onNewProfile={() => setIsNewProfileDialogOpen(true)}
              />
              
              <ContactProfileDialogs
                isNewProfileDialogOpen={isNewProfileDialogOpen}
                setIsNewProfileDialogOpen={setIsNewProfileDialogOpen}
                isEditProfileDialogOpen={isEditProfileDialogOpen}
                setIsEditProfileDialogOpen={setIsEditProfileDialogOpen}
                newProfile={newProfile}
                handleProfileFormChange={handleProfileFormChange}
                handleCreateProfile={handleCreateProfile}
                handleUpdateProfile={handleUpdateProfile}
              />
            </TabsContent>
            
            <TabsContent value="tickets" className="mt-6">
              <TicketsTab />
            </TabsContent>
            
            <TabsContent value="account" className="mt-6">
              <ProfileOverview userData={userData} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </RequireAuth>
  );
};

export default ClientPanel;
