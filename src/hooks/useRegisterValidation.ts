
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

export const useRegisterValidation = () => {
  const [loading, setLoading] = useState(false);

  const checkExistingAccount = async (field: string, value: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Use explicit type casting to avoid excessive type inference
      const response = await supabase
        .from('customers')
        .select('id')
        .eq(field, value)
        .limit(1)
        .maybeSingle();
      
      return response.data !== null;
    } catch (error) {
      console.error(`Error checking existing ${field}:`, error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, checkExistingAccount };
};
