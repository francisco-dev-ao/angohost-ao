
import { useState, useEffect } from 'react';
import { ContactProfile } from '../types/cart';

export const useContactProfilesStorage = () => {
  const [contactProfiles, setContactProfiles] = useState<ContactProfile[]>([]);
  const [selectedContactProfileId, setSelectedContactProfileId] = useState<string | null>(null);
  
  useEffect(() => {
    const savedContactProfiles = localStorage.getItem('angohost_contact_profiles');
    const savedSelectedProfile = localStorage.getItem('angohost_selected_profile');
    
    if (savedContactProfiles) {
      try {
        setContactProfiles(JSON.parse(savedContactProfiles));
      } catch (err) {
        console.error('Failed to parse contact profiles from localStorage', err);
      }
    }
    
    if (savedSelectedProfile) {
      try {
        setSelectedContactProfileId(JSON.parse(savedSelectedProfile));
      } catch (err) {
        console.error('Failed to parse selected profile from localStorage', err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('angohost_contact_profiles', JSON.stringify(contactProfiles));
  }, [contactProfiles]);

  useEffect(() => {
    localStorage.setItem('angohost_selected_profile', JSON.stringify(selectedContactProfileId));
  }, [selectedContactProfileId]);

  return {
    contactProfiles,
    setContactProfiles,
    selectedContactProfileId,
    setSelectedContactProfileId
  };
};
