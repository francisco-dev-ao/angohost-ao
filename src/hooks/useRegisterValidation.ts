
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthOtpResponse } from '@supabase/supabase-js';

export const useRegisterValidation = () => {
  const [loading, setLoading] = useState(false);

  const checkExistingAccount = async (field: string, value: string): Promise<boolean> => {
    try {
      if (field === 'email') {
        // Use explicit type casting to avoid TypeScript infinite type instantiation
        const response = await supabase.auth.signInWithOtp({
          email: value,
          options: { shouldCreateUser: false }
        });
        
        // Access session property safely
        return !!response?.data?.session;
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
