
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useRegisterValidation = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('customers')
        .select('email')
        .eq('email', email)
        .maybeSingle(); // Use maybeSingle instead of single to prevent infinite type instantiation
      
      if (error) {
        throw error;
      }
      
      return !!data; // If data exists, email is already taken
    } catch (error) {
      console.error('Error checking email existence:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const checkNifExists = async (nif: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('customers')
        .select('nif')
        .eq('nif', nif)
        .maybeSingle(); // Use maybeSingle instead of single
      
      if (error) {
        throw error;
      }
      
      return !!data; // If data exists, NIF is already taken
    } catch (error) {
      console.error('Error checking NIF existence:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Modified this function to fix the infinite type instantiation
  const checkExistingAccount = async (field: string, value: string): Promise<boolean> => {
    if (!value) return false;
    
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('customers')
        .select(field)
        .eq(field, value)
        .maybeSingle(); // Using maybeSingle to prevent infinite type instantiation
      
      if (error) {
        console.error(`Error checking ${field} existence:`, error);
        return false;
      }
      
      return !!data; // If data exists, the value is already taken
    } catch (error) {
      console.error(`Error checking ${field} existence:`, error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return { 
    isLoading,
    checkEmailExists,
    checkNifExists,
    checkExistingAccount
  };
};
