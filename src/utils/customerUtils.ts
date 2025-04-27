
import { simulateDbOperation } from '@/integrations/postgres/client';
import { Customer } from '@/types/cart';

export const ensureCustomerExists = async (userId: string, customerData: Partial<Customer>) => {
  try {
    // Check if customer exists
    const { success: checkSuccess, data: existingCustomer } = await simulateDbOperation(
      'check_customer_exists',
      { userId }
    );

    // If checking failed, throw an error
    if (!checkSuccess) {
      throw new Error('Failed to check customer existence');
    }

    // If customer exists (in a real implementation this would be checked),
    // return their ID
    if (existingCustomer && existingCustomer.id) {
      return { id: existingCustomer.id, error: null };
    }

    // If customer doesn't exist, create them
    const customerToCreate = {
      user_id: userId,
      name: customerData.name,
      email: customerData.email,
      phone: customerData.phone,
      nif: customerData.nif,
      billing_address: customerData.billingAddress,
      city: customerData.city,
      postal_code: customerData.postalCode,
      country: customerData.country || 'Angola'
    };

    const { success: createSuccess, data: newCustomer } = await simulateDbOperation(
      'create_customer',
      customerToCreate
    );

    if (!createSuccess) {
      throw new Error('Failed to create customer');
    }

    return { id: newCustomer.id, error: null };
  } catch (error) {
    console.error('Error ensuring customer exists:', error);
    return { id: null, error };
  }
};
