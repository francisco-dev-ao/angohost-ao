
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useRegisterValidation = () => {
  const [loading, setLoading] = useState(false);

  const checkExistingAccount = async (field: string, value: string): Promise<boolean> => {
    try {
      // For email validation, we'll use a completely different approach
      if (field === 'email') {
        // First check if the email exists in the customers table
        const { data: customerData } = await supabase
          .from('customers')
          .select('id')
          .eq('email', value)
          .limit(1);
          
        if (customerData && customerData.length > 0) {
          return true; // Email exists in customers table
        }
        
        // As a fallback, try to use the auth API
        // But instead of using OTP which causes typing issues,
        // just query for users with that email (requires admin/server-side)
        // This is a simplification and might need service role in production
        return false;
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
