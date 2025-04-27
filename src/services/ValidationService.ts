
import { supabase } from '@/integrations/supabase/client';

/**
 * Check if an email is already registered
 * @param email Email address to check
 * @returns True if email exists, false otherwise
 */
export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('id')
      .eq('email', email)
      .maybeSingle();
      
    if (error) {
      console.error('Error checking email existence:', error);
      return false;
    }
    
    return !!data;
  } catch (error) {
    console.error('Error in checkEmailExists:', error);
    return false;
  }
};

/**
 * Check if a phone number is already registered
 * @param phone Phone number to check
 * @returns True if phone exists, false otherwise
 */
export const checkPhoneExists = async (phone: string): Promise<boolean> => {
  if (!phone || phone.trim() === '') return false;
  
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('id')
      .eq('phone', phone)
      .maybeSingle();
      
    if (error) {
      console.error('Error checking phone existence:', error);
      return false;
    }
    
    return !!data;
  } catch (error) {
    console.error('Error in checkPhoneExists:', error);
    return false;
  }
};

/**
 * Check if a NIF (tax ID) is already registered
 * @param nif Tax ID number to check
 * @returns True if NIF exists, false otherwise
 */
export const checkNifExists = async (nif: string): Promise<boolean> => {
  if (!nif || nif.trim() === '') return false;
  
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('id')
      .eq('nif', nif)
      .maybeSingle();
      
    if (error) {
      console.error('Error checking NIF existence:', error);
      return false;
    }
    
    return !!data;
  } catch (error) {
    console.error('Error in checkNifExists:', error);
    return false;
  }
};

/**
 * Validate email format
 * @param email Email address to validate
 * @returns True if email format is valid
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number format (Angolan format)
 * @param phone Phone number to validate
 * @returns True if phone format is valid
 */
export const validatePhone = (phone: string): boolean => {
  if (!phone || phone.trim() === '') return true;
  
  // Basic validation for Angolan phone numbers (9 digits, optionally starting with +244)
  const phoneRegex = /^(\+244)?9\d{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};
