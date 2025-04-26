
// Custom types for Supabase data
import { Database } from '@/integrations/supabase/types';

// Export types from the generated Database type
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];

// Types for dedicated servers
export type DedicatedServerPlan = {
  id: string;
  name: string;
  price: number;
  features: {
    cpu: string;
    ram: string;
    storage: string;
    bandwidth: string;
    ips: string;
  };
};
