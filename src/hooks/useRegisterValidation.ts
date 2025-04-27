
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useRegisterValidation = () => {
  const [loading, setLoading] = useState(false);

  const checkExistingAccount = async (field: string, value: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      const { data } = await supabase
        .from('customers')
        .select('id')
        .eq(field, value)
        // Use .maybeSingle() instead of .single() to handle potential multiple or no results
        .maybeSingle();
      
      return data !== null;
    } catch (error) {
      console.error(`Error checking existing ${field}:`, error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, checkExistingAccount };
};
