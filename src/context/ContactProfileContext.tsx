import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { useCartStorage } from '@/hooks/useCartStorage';
import { supabase } from '@/integrations/supabase/client';
import { ContactProfile } from '@/types/cart';

const ContactProfileContext = createContext<ContactProfileContextType | undefined>(undefined);

interface ContactProfileContextType {
  isNewProfileDialogOpen: boolean;
  setIsNewProfileDialogOpen: (open: boolean) => void;
  isEditProfileDialogOpen: boolean;
  setIsEditProfileDialogOpen: (open: boolean) => void;
  selectedProfile: ContactProfile | null;
  setSelectedProfile: (profile: ContactProfile | null) => void;
  newProfile: Omit<ContactProfile, 'id'>;
  handleProfileFormChange: (field: keyof Omit<ContactProfile, 'id'>, value: string) => void;
  handleCreateProfile: () => void;
  handleUpdateProfile: () => void;
  handleDeleteProfile: (profileId: string) => void;
  handleSelectProfileToEdit: (profile: ContactProfile) => void;
  contactProfiles: ContactProfile[];
}

export const ContactProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const { contactProfiles, setContactProfiles } = useCartStorage();
  const [isNewProfileDialogOpen, setIsNewProfileDialogOpen] = useState(false);
  const [isEditProfileDialogOpen, setIsEditProfileDialogOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<ContactProfile | null>(null);
  const [newProfile, setNewProfile] = useState<Omit<ContactProfile, 'id'>>({
    profileName: '',
    name: '',
    email: '',
    phone: '',
    nif: '',
    billingAddress: '',
    city: '',
    country: 'Angola'
  });

  const handleProfileFormChange = (field: keyof Omit<ContactProfile, 'id'>, value: string) => {
    setNewProfile({
      ...newProfile,
      [field]: value
    });
  };

  const handleCreateProfile = async () => {
    if (!newProfile.name || !newProfile.email) {
      toast.error('Por favor, preencha pelo menos o nome e email.');
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Você precisa estar logado para criar um perfil de contato.');
        return;
      }

      const profileId = uuidv4();
      const profile: ContactProfile = {
        id: profileId,
        ...newProfile
      };

      const { data: customerData } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!customerData) {
        toast.error('Erro ao encontrar dados do cliente.');
        return;
      }

      const { error } = await supabase
        .from('contact_profiles')
        .insert({
          id: profileId,
          customer_id: customerData.id,
          profile_name: newProfile.profileName,
          name: newProfile.name,
          email: newProfile.email,
          phone: newProfile.phone,
          nif: newProfile.nif,
          billing_address: newProfile.billingAddress,
          city: newProfile.city,
          postal_code: newProfile.postalCode,
          country: newProfile.country || 'Angola'
        });

      if (error) {
        throw error;
      }

      setContactProfiles([...contactProfiles, profile]);
      
      toast.success('Perfil de contato criado com sucesso!');
      setIsNewProfileDialogOpen(false);
      setNewProfile({
        profileName: '',
        name: '',
        email: '',
        phone: '',
        nif: '',
        billingAddress: '',
        city: '',
        postalCode: '',
        country: 'Angola'
      });
    } catch (error) {
      console.error('Erro ao criar perfil:', error);
      toast.error('Erro ao criar perfil de contato.');
    }
  };

  const handleUpdateProfile = async () => {
    if (!selectedProfile) return;

    if (!newProfile.name || !newProfile.email) {
      toast.error('Por favor, preencha pelo menos o nome e email.');
      return;
    }

    try {
      const updatedProfiles = contactProfiles.map(profile => 
        profile.id === selectedProfile.id 
          ? { ...profile, ...newProfile }
          : profile
      );
      
      setContactProfiles(updatedProfiles);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { error } = await supabase
          .from('contact_profiles')
          .update({
            profile_name: newProfile.profileName,
            name: newProfile.name,
            email: newProfile.email,
            phone: newProfile.phone,
            nif: newProfile.nif,
            billing_address: newProfile.billingAddress,
            city: newProfile.city,
            postal_code: newProfile.postalCode,
            country: newProfile.country || 'Angola'
          })
          .eq('id', selectedProfile.id);
          
        if (error) {
          console.error('Erro ao atualizar perfil no banco de dados:', error);
        }
      }

      toast.success('Perfil de contato atualizado com sucesso!');
      setIsEditProfileDialogOpen(false);
      setSelectedProfile(null);
      
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      toast.error('Erro ao atualizar perfil de contato.');
    }
  };

  const handleDeleteProfile = async (profileId: string) => {
    if (confirm('Tem certeza que deseja excluir este perfil de contato?')) {
      try {
        const updatedProfiles = contactProfiles.filter(profile => profile.id !== profileId);
        setContactProfiles(updatedProfiles);
        
        const { error } = await supabase
          .from('contact_profiles')
          .delete()
          .eq('id', profileId);
          
        if (error) {
          console.error('Erro ao excluir perfil do banco de dados:', error);
        }
        
        toast.success('Perfil de contato excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir perfil:', error);
        toast.error('Erro ao excluir perfil de contato.');
      }
    }
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
      country: profile.country || 'Angola'
    });
    setIsEditProfileDialogOpen(true);
  };

  useEffect(() => {
    const loadProfilesFromDb = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) return;

        const { data: customerData } = await supabase
          .from('customers')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (!customerData) return;

        const { data: profiles, error } = await supabase
          .from('contact_profiles')
          .select('*')
          .eq('customer_id', customerData.id);

        if (error) {
          throw error;
        }

        if (profiles && profiles.length > 0) {
          const mappedProfiles: ContactProfile[] = profiles.map(p => ({
            id: p.id,
            profileName: p.profile_name || p.name,
            name: p.name,
            email: p.email,
            phone: p.phone || '',
            nif: p.nif || '',
            billingAddress: p.billing_address || '',
            city: p.city || '',
            postalCode: p.postal_code || '',
            country: p.country || 'Angola'
          }));

          if (contactProfiles.length === 0) {
            setContactProfiles(mappedProfiles);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar perfis:', error);
      }
    };

    loadProfilesFromDb();
  }, []);

  const value = {
    isNewProfileDialogOpen,
    setIsNewProfileDialogOpen,
    isEditProfileDialogOpen,
    setIsEditProfileDialogOpen,
    selectedProfile,
    setSelectedProfile,
    newProfile,
    handleProfileFormChange,
    handleCreateProfile,
    handleUpdateProfile,
    handleDeleteProfile,
    handleSelectProfileToEdit,
    contactProfiles
  };

  return (
    <ContactProfileContext.Provider value={value}>
      {children}
    </ContactProfileContext.Provider>
  );
};

export const useContactProfile = () => {
  const context = useContext(ContactProfileContext);
  if (context === undefined) {
    throw new Error('useContactProfile must be used within a ContactProfileProvider');
  }
  return context;
};
