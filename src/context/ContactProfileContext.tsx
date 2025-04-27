
import React, { createContext, useContext } from 'react';
import { useContactProfileActions } from '@/hooks/useContactProfileActions';
import { useContactProfileSync } from '@/hooks/useContactProfileSync';
import { ContactProfile } from '@/types/cart';

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
  const actions = useContactProfileActions();
  useContactProfileSync();

  return (
    <ContactProfileContext.Provider value={actions}>
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
