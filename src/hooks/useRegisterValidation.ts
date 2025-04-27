
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useRegisterValidation = () => {
  const [loading, setLoading] = useState(false);

  const checkExistingAccount = async (field: string, value: string): Promise<boolean> => {
    try {
      if (field === 'email') {
        // Avoid TypeScript infinite type instantiation by using a simpler approach
        const response = await supabase.auth.signInWithOtp({
          email: value,
          options: { shouldCreateUser: false }
        });
        
        // Simply check if there's a session in the response
        return response.data && response.data.session !== null;
      } else {
        // For non-email fields, query the customers table
        const { data, error } = await supabase
          .from('customers')
          .select('id')
          .eq(field, value)
          .limit(1);
        
        if (error) {
          console.error(`Error checking existing ${field}:`, error);
          return false;
        }
        
        return !!data && data.length > 0;
      }
    } catch (error) {
      console.error(`Error checking existing ${field}:`, error);
      return false;
    }
  };

  return { loading, setLoading, checkExistingAccount };
};
