
export interface Service {
  id: string;
  type: 'domain' | 'hosting' | 'email';
  name: string;
  status: 'active' | 'suspended' | 'expired';
  expiryDate?: string;
}

export const useCustomerServices = () => {
  // Mock data for now - this would typically fetch from your backend
  const services: Service[] = [];
  const loading = false;

  return { services, loading };
};
