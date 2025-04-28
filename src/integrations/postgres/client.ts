
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../types/supabase';

const SUPABASE_URL = "https://jyqekseqbbpgupuotuin.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5cWVrc2VxYmJwZ3VwdW90dWluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NDI0NTksImV4cCI6MjA2MTQxODQ1OX0.NTaNilqKyq2xjNXh0P6VdMJgGfvwtWzP0CgQEE1moYY";

export const postgresClient = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

// Function to simulate database operations for development/testing
export const simulateDbOperation = async (
  operation: string, 
  params: any
): Promise<{
  success: boolean;
  data?: any;
  error?: string;
}> => {
  try {
    console.log(`Simulating database operation: ${operation}`, params);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For real implementation, this would call the Supabase client
    // For now, just return success with mock data
    return {
      success: true,
      data: { id: 'mock-id', ...params }
    };
  } catch (err: any) {
    console.error(`Error in db operation ${operation}:`, err);
    return {
      success: false,
      error: err.message || 'An unknown error occurred'
    };
  }
};
