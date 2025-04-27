
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useRegisterValidation = () => {
  const [loading, setLoading] = useState(false);

  const checkExistingAccount = async (field: string, value: string): Promise<boolean> => {
    try {
      if (field === 'email') {
        const { data } = await supabase.auth.signInWithOtp({
          email: value,
          options: { shouldCreateUser: false }
        });
        return !!data.session;
      } else {
        const { data } = await supabase
          .from('customers')
          .select('id')
          .eq(field, value)
          .limit(1);
        return !!data && data.length > 0;
      }
    } catch (error) {
      console.error(`Error checking existing ${field}:`, error);
      return false;
    }
  };

  return { loading, setLoading, checkExistingAccount };
};
