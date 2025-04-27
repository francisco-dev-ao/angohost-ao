
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useRegisterValidation = () => {
  const [loading, setLoading] = useState(false);

  const checkExistingAccount = async (field: string, value: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Query the customers table directly
      const { data, error } = await supabase
        .from('customers')
        .select('id')
        .eq(field, value)
        .limit(1);
      
      if (error) {
        console.error(`Error checking existing ${field}:`, error);
        return false;
      }
      
      // If we found records, the account exists
      return !!data && data.length > 0;
    } catch (error) {
      console.error(`Error checking existing ${field}:`, error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, setLoading, checkExistingAccount };
};
