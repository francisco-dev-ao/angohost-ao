
import React from 'react';
import { Dialog } from "@/components/ui/dialog";
import { useContactProfile } from '@/context/ContactProfileContext';
import { ProfileForm } from './ProfileForm';
import { ContactProfile } from '@/types/cart';

export const EditProfileDialog = () => {
  const {
    isEditProfileDialogOpen,
    setIsEditProfileDialogOpen,
    newProfile,
    handleProfileFormChange,
    handleUpdateProfile
  } = useContactProfile();

  return (
    <Dialog open={isEditProfileDialogOpen} onOpenChange={setIsEditProfileDialogOpen}>
      <ProfileForm 
        title="Editar Perfil de Contato"
        description="Atualize as informações do perfil de contato"
        profile={newProfile as Omit<ContactProfile, 'id'>}
        onProfileChange={handleProfileFormChange}
        onSubmit={handleUpdateProfile}
        submitLabel="Atualizar Perfil"
      />
    </Dialog>
  );
};
