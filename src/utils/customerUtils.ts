
import { AuthService } from '@/services/AuthService';
import { customerService } from '@/integrations/postgres/client';
import { Customer } from '@/types/cart';

export const ensureCustomerExists = async (customerData: Partial<Customer>) => {
  try {
    // Verificar se o usuário está autenticado
    const session = AuthService.getSession();
    if (!session || !session.user) {
      throw new Error('Usuário não autenticado');
    }
    
    const userId = session.user.id;
    
    // Verificar se o cliente já existe
    const { success: getSuccess, data: existingCustomer } = await customerService.getById(userId);
    
    // Se o cliente existe, retornar seu ID
    if (getSuccess && existingCustomer) {
      return { id: existingCustomer.id, error: null };
    }
    
    // Se o cliente não existe, criar um novo
    const customerToCreate = {
      name: customerData.name || session.user.name,
      email: customerData.email || session.user.email,
      phone: customerData.phone || '',
      nif: customerData.nif || '',
      billing_address: customerData.billingAddress || '',
      city: customerData.city || '',
      postal_code: customerData.postalCode || '',
      country: customerData.country || 'Angola',
      account_balance: 0
    };
    
    const { success: createSuccess, data: newCustomer, error: createError } = await customerService.create(customerToCreate);
    
    if (!createSuccess || !newCustomer) {
      throw new Error(createError?.message || 'Falha ao criar cliente');
    }
    
    return { id: newCustomer.id, error: null };
  } catch (error: any) {
    console.error('Erro ao garantir que o cliente existe:', error);
    return { id: null, error };
  }
};
