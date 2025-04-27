
import { supabase } from '@/integrations/supabase/client';
import { Customer } from '@/types/cart';

export const ensureCustomerExists = async (userId: string, customerData: Partial<Customer>) => {
  try {
    // First check if customer already exists
    const { data: existingCustomer, error: fetchError } = await supabase
      .from('customers')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (fetchError) throw fetchError;

    // If customer exists, return their id
    if (existingCustomer) {
      return { id: existingCustomer.id, error: null };
    }

    // If customer doesn't exist, create them
    const { data: newCustomer, error: insertError } = await supabase
      .from('customers')
      .insert({
        user_id: userId,
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
        nif: customerData.nif,
        billing_address: customerData.billingAddress,
        city: customerData.city,
        postal_code: customerData.postalCode,
        country: customerData.country || 'Angola'
      })
      .select('id')
      .single();

    if (insertError) throw insertError;

    return { id: newCustomer.id, error: null };
  } catch (error) {
    console.error('Error ensuring customer exists:', error);
    return { id: null, error };
  }
};
