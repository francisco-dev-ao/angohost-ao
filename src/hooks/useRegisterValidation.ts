
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

export const useRegisterValidation = () => {
  const [loading, setLoading] = useState(false);

  const checkExistingAccount = async (field: string, value: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      const { data }: PostgrestSingleResponse<any> = await supabase
        .from('customers')
        .select('id')
        .eq(field, value)
        .limit(1);
      
      return Array.isArray(data) && data.length > 0;
    } catch (error) {
      console.error(`Error checking existing ${field}:`, error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, checkExistingAccount };
};
