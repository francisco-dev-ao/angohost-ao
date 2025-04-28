
import { supabase } from '@/integrations/supabase/client';
import { Customer } from '@/types/cart';

export const ensureCustomerExists = async (customerData: Partial<Customer>) => {
  try {
    // Verificar se o usuário está autenticado
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session?.user) {
      throw new Error('Usuário não autenticado');
    }
    
    const userId = sessionData.session.user.id;
    
    // Verificar se o cliente já existe
    const { data: existingCustomer, error: getError } = await supabase
      .from('customers')
      .select('id')
      .eq('user_id', userId)
      .single();
    
    // Se o cliente existe, retornar seu ID
    if (existingCustomer) {
      return { id: existingCustomer.id, error: null };
    }
    
    // Se o cliente não existe, criar um novo
    const customerToCreate = {
      user_id: userId,
      name: customerData.name || sessionData.session.user.user_metadata?.full_name || '',
      email: customerData.email || sessionData.session.user.email || '',
      phone: customerData.phone || '',
      nif: customerData.nif || '',
      billing_address: customerData.billingAddress || '',
      city: customerData.city || '',
      postal_code: customerData.postalCode || '',
      country: customerData.country || 'Angola',
      account_balance: 0
    };
    
    const { data: newCustomer, error: createError } = await supabase
      .from('customers')
      .insert([customerToCreate])
      .select('id')
      .single();
    
    if (createError || !newCustomer) {
      throw new Error(createError?.message || 'Falha ao criar cliente');
    }
    
    return { id: newCustomer.id, error: null };
  } catch (error: any) {
    console.error('Erro ao garantir que o cliente existe:', error);
    return { id: null, error };
  }
};
