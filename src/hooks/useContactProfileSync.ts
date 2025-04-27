
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useCartStorage } from '@/hooks/useCartStorage';
import { ContactProfile } from '@/types/cart';

export const useContactProfileSync = () => {
  const { contactProfiles, setContactProfiles } = useCartStorage();

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

        const { data: profilesData, error } = await supabase
          .from('contact_profiles')
          .select('*')
          .eq('customer_id', customerData.id);

        if (error) {
          console.error('Erro ao carregar perfis do banco de dados:', error);
          return;
        }

        if (profilesData && profilesData.length > 0) {
          const mappedProfiles: ContactProfile[] = profilesData.map(p => ({
            id: p.id,
            profileName: p.profile_name || p.name,
            name: p.name,
            email: p.email,
            phone: p.phone || '',
            nif: p.nif || '',
            billingAddress: p.billing_address || '',
            city: p.city || '',
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
};
