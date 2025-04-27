
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useRegisterValidation = () => {
  const [loading, setLoading] = useState(false);

  const checkExistingAccount = async (field: string, value: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Remove explicit type annotation and let TypeScript infer the type
      const { data, error } = await supabase
        .from('customers')
        .select('id')
        .eq(field, value)
        .limit(1);
      
      if (error) throw error;
      
      // Simplified check that avoids complex type inference
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
