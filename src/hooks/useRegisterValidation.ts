
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useRegisterValidation = () => {
  const [loading, setLoading] = useState(false);

  const checkExistingAccount = async (field: string, value: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('customers')
        .select('id')
        .eq(field, value)
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error(`Error checking existing ${field}:`, error);
        return false;
      }
      
      return !!data;
    } catch (error) {
      console.error(`Error checking existing ${field}:`, error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, checkExistingAccount };
};
