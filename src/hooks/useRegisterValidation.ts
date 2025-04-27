
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useRegisterValidation = () => {
  const [loading, setLoading] = useState(false);

  const checkExistingAccount = async (field: string, value: string): Promise<boolean> => {
    try {
      if (field === 'email') {
        // Check if email exists using a different approach to avoid the infinite type issue
        const { data, error } = await supabase.auth.signInWithOtp({
          email: value,
          options: { shouldCreateUser: false }
        });
        return !!data.session;
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
