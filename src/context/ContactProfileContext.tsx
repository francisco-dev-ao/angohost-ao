
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { ContactProfile } from '@/types/cart';
import { useCartStorage } from '@/hooks/useCartStorage';
import { supabase } from '@/integrations/supabase/client';

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

const ContactProfileContext = createContext<ContactProfileContextType | undefined>(undefined);

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
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Você precisa estar logado para criar um perfil de contato.');
        return;
      }

      // Create profile ID
      const profileId = uuidv4();
      
      // Save to local storage first
      const profile: ContactProfile = {
        id: profileId,
        ...newProfile
      };
      
      const updatedProfiles = [...contactProfiles, profile];
      setContactProfiles(updatedProfiles);
      
      // Also save to database if available
      const { data: customerData } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', user.id)
        .single();
      
      if (customerData) {
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
            city: newProfile.city
          });
          
        if (error) {
          console.error('Erro ao salvar perfil no banco de dados:', error);
        }
      }

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
      // Update the profile in the local array first
      const updatedProfiles = contactProfiles.map(profile => 
        profile.id === selectedProfile.id 
          ? { ...profile, ...newProfile }
          : profile
      );
      
      setContactProfiles(updatedProfiles);
      
      // Also update in database if available
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
            city: newProfile.city
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
        // Remove from local storage first
        const updatedProfiles = contactProfiles.filter(profile => profile.id !== profileId);
        setContactProfiles(updatedProfiles);
        
        // Also remove from database if available
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
    });
    setIsEditProfileDialogOpen(true);
  };
  
  // Load profiles from database on initial load
  useEffect(() => {
    const loadProfilesFromDb = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) return;
        
        // Get customer ID
        const { data: customerData } = await supabase
          .from('customers')
          .select('id')
          .eq('user_id', user.id)
          .single();
          
        if (!customerData) return;
        
        // Get profiles
        const { data: profilesData, error } = await supabase
          .from('contact_profiles')
          .select('*')
          .eq('customer_id', customerData.id);
          
        if (error) {
          console.error('Erro ao carregar perfis do banco de dados:', error);
          return;
        }
        
        if (profilesData && profilesData.length > 0) {
          // Map to our ContactProfile format
          const mappedProfiles: ContactProfile[] = profilesData.map(p => ({
            id: p.id,
            profileName: p.profile_name,
            name: p.name,
            email: p.email,
            phone: p.phone || '',
            nif: p.nif || '',
            billingAddress: p.billing_address || '',
            city: p.city || '',
          }));
          
          // Only update if we don't have these profiles already
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
