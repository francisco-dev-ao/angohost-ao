
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useRegisterValidation = () => {
  const [loading, setLoading] = useState(false);

  const checkExistingAccount = async (field: string, value: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Use explicit type annotation for the query response
      const { data, error } = await supabase
        .from('customers')
        .select('id')
        .eq(field, value)
        .maybeSingle();
      
      if (error) {
        console.error(`Error checking existing ${field}:`, error);
        return false;
      }
      
      // Simplified boolean check that avoids complex type inference
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
