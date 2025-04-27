
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useCartStorage } from './useCartStorage';

export const useContactProfileSync = () => {
  const { 
    contactProfiles, 
    setContactProfiles, 
    selectedContactProfileId, 
    setSelectedContactProfileId 
  } = useCartStorage();
  
  // Initial fetch from Supabase when component mounts
  useEffect(() => {
    const fetchContactProfiles = async () => {
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
        
        const { data: profilesData, error } = await supabase
          .from('contact_profiles')
          .select('*')
          .eq('customer_id', customerData.id);
        
        if (error) throw error;
        
        if (profilesData && profilesData.length > 0) {
          const formattedProfiles = profilesData.map(profile => ({
            id: profile.id,
            profileName: profile.profile_name || profile.name.substring(0, 20),
            name: profile.name,
            email: profile.email,
            phone: profile.phone || '',
            nif: profile.nif || '',
            billingAddress: profile.billing_address || '',
            city: profile.city || '',
            postalCode: profile.postal_code || '',
            country: profile.country || 'Angola',
            idNumber: '' // Add default empty string for idNumber
          }));
          
          setContactProfiles(formattedProfiles);
          localStorage.setItem('angohost_contact_profiles', JSON.stringify(formattedProfiles));
          
          // If no profile is selected but profiles exist, select the first one
          if (!selectedContactProfileId && formattedProfiles.length > 0) {
            setSelectedContactProfileId(formattedProfiles[0].id);
            localStorage.setItem('angohost_selected_contact_profile', formattedProfiles[0].id);
          }
        }
      } catch (error) {
        console.error('Error fetching contact profiles:', error);
      }
    };
    
    fetchContactProfiles();
  }, []);
  
  // Set up real-time subscription for contact profiles changes
  useEffect(() => {
    const setupContactProfilesSubscription = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const { data: customerData } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (!customerData?.id) return;
      
      const subscription = supabase
        .channel('contact_profiles_changes')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'contact_profiles',
          filter: `customer_id=eq.${customerData.id}`,
        }, (payload) => {
          // Refresh contact profiles when changes occur
          const fetchUpdatedProfiles = async () => {
            const { data: profilesData, error } = await supabase
              .from('contact_profiles')
              .select('*')
              .eq('customer_id', customerData.id);
            
            if (error) {
              console.error('Error fetching updated profiles:', error);
              return;
            }
            
            if (profilesData && profilesData.length > 0) {
              const formattedProfiles = profilesData.map(profile => ({
                id: profile.id,
                profileName: profile.profile_name || profile.name.substring(0, 20),
                name: profile.name,
                email: profile.email,
                phone: profile.phone || '',
                nif: profile.nif || '',
                billingAddress: profile.billing_address || '',
                city: profile.city || '',
                postalCode: profile.postal_code || '',
                country: profile.country || 'Angola',
                idNumber: '' // Add default empty string for idNumber
              }));
              
              setContactProfiles(formattedProfiles);
              localStorage.setItem('angohost_contact_profiles', JSON.stringify(formattedProfiles));
            } else {
              setContactProfiles([]);
              localStorage.removeItem('angohost_contact_profiles');
            }
          };
          
          fetchUpdatedProfiles();
        })
        .subscribe();
      
      return () => {
        supabase.removeChannel(subscription);
      };
    };
    
    setupContactProfilesSubscription();
  }, []);
  
  return null;
};
