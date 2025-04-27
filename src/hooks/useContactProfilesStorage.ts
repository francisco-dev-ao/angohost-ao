
import { useState, useEffect } from 'react';
import { ContactProfile } from '../types/cart';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useContactProfilesStorage = () => {
  const [contactProfiles, setContactProfiles] = useState<ContactProfile[]>([]);
  const [selectedContactProfileId, setSelectedContactProfileId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const savedContactProfiles = localStorage.getItem('angohost_contact_profiles');
    const savedSelectedId = localStorage.getItem('angohost_selected_contact_profile');
    
    if (savedContactProfiles) {
      try {
        setContactProfiles(JSON.parse(savedContactProfiles));
      } catch (err) {
        console.error('Failed to parse contact profiles from localStorage', err);
      }
    }
    
    if (savedSelectedId) {
      setSelectedContactProfileId(savedSelectedId);
    }
    
    // Also fetch from Supabase if user is authenticated
    fetchContactProfiles();
  }, []);
  
  const fetchContactProfiles = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      
      // Get customer ID
      const { data: customerData } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (customerData?.id) {
        const { data: profilesData, error } = await supabase
          .from('contact_profiles')
          .select('*')
          .eq('customer_id', customerData.id);
        
        if (error) throw error;
        
        if (profilesData && profilesData.length > 0) {
          const formattedProfiles = profilesData.map(profile => ({
            id: profile.id,
            profileName: profile.profile_name || 'Perfil padrão',
            name: profile.name,
            email: profile.email,
            phone: profile.phone || '',
            nif: profile.nif || '',
            billingAddress: profile.billing_address || '',
            city: profile.city || '',
            postalCode: profile.postal_code || '',
            country: profile.country || 'Angola',
          }));
          
          setContactProfiles(formattedProfiles);
          localStorage.setItem('angohost_contact_profiles', JSON.stringify(formattedProfiles));
          
          // If no profile is selected, select the first one
          if (!selectedContactProfileId && formattedProfiles.length > 0) {
            setSelectedContactProfileId(formattedProfiles[0].id);
            localStorage.setItem('angohost_selected_contact_profile', formattedProfiles[0].id);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching contact profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (contactProfiles.length > 0) {
      localStorage.setItem('angohost_contact_profiles', JSON.stringify(contactProfiles));
    }
  }, [contactProfiles]);

  useEffect(() => {
    if (selectedContactProfileId) {
      localStorage.setItem('angohost_selected_contact_profile', selectedContactProfileId);
    } else {
      localStorage.removeItem('angohost_selected_contact_profile');
    }
  }, [selectedContactProfileId]);

  const syncContactProfilesWithSupabase = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      // Get customer ID
      const { data: customerData } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (!customerData?.id) return;
      
      // Sync all local contact profiles to Supabase
      for (const profile of contactProfiles) {
        const { error } = await supabase
          .from('contact_profiles')
          .upsert({
            id: profile.id,
            customer_id: customerData.id,
            profile_name: profile.profileName,
            name: profile.name,
            email: profile.email,
            phone: profile.phone,
            nif: profile.nif,
            billing_address: profile.billingAddress,
            city: profile.city,
            postal_code: profile.postalCode,
            country: profile.country || 'Angola',
            updated_at: new Date().toISOString()
          }, { onConflict: 'id' });
        
        if (error) throw error;
      }
      
      toast.success('Perfis de contato sincronizados com sucesso');
    } catch (error) {
      console.error('Error syncing contact profiles:', error);
      toast.error('Erro ao sincronizar perfis de contato');
    }
  };

  return {
    contactProfiles,
    setContactProfiles,
    selectedContactProfileId,
    setSelectedContactProfileId,
    loading,
    fetchContactProfiles,
    syncContactProfilesWithSupabase
  };
};
