
import React from 'react';
import { Dialog } from "@/components/ui/dialog";
import { useContactProfile } from '@/context/ContactProfileContext';
import { ProfileForm } from './ProfileForm';
import { ContactProfile } from '@/types/cart';

export const CreateProfileDialog = () => {
  const {
    isNewProfileDialogOpen,
    setIsNewProfileDialogOpen,
    newProfile,
    handleProfileFormChange,
    handleCreateProfile
  } = useContactProfile();

  return (
    <Dialog open={isNewProfileDialogOpen} onOpenChange={setIsNewProfileDialogOpen}>
      <ProfileForm 
        title="Criar Novo Perfil de Contato"
        description="Preencha as informações para criar um novo perfil de contato"
        profile={newProfile as Omit<ContactProfile, 'id'>}
        onProfileChange={handleProfileFormChange}
        onSubmit={handleCreateProfile}
        submitLabel="Criar Perfil"
      />
    </Dialog>
  );
};
