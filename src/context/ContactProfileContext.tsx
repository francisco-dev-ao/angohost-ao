
import React, { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';
import { ContactProfile } from '@/context/CartContext';

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
}

const ContactProfileContext = createContext<ContactProfileContextType | undefined>(undefined);

export const ContactProfileProvider = ({ children }: { children: React.ReactNode }) => {
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

  const handleCreateProfile = () => {
    if (!newProfile.name || !newProfile.email) {
      toast.error('Por favor, preencha pelo menos o nome e email.');
      return;
    }

    // Add profile logic here
    setIsNewProfileDialogOpen(false);
  };

  const handleUpdateProfile = () => {
    if (!selectedProfile) return;

    if (!newProfile.name || !newProfile.email) {
      toast.error('Por favor, preencha pelo menos o nome e email.');
      return;
    }

    // Update profile logic here
    setIsEditProfileDialogOpen(false);
    setSelectedProfile(null);
  };

  const handleDeleteProfile = (profileId: string) => {
    if (confirm('Tem certeza que deseja excluir este perfil de contato?')) {
      // Delete profile logic here
      toast.success('Perfil de contato excluído com sucesso!');
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
