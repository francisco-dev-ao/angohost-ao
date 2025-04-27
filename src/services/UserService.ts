
import { supabase } from '@/integrations/supabase/client';

export const UserService = {
  // User methods
  getCurrentUser: async () => {
    const { data } = await supabase.auth.getUser();
    return data.user;
  },
  
  // Get customer profile details
  getCustomerProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('user_id', userId)
      .single();
      
    if (error) {
      console.error('Error fetching customer profile:', error);
      return null;
    }
    
    return data;
  },
  
  // Admin methods
  isAdminUser: async () => {
    const { data, error } = await supabase.rpc('is_admin');
    if (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
    return !!data;
  },
  
  getAllUsers: async () => {
    const { data, error } = await supabase
      .from('customers')
      .select(`
        *,
        profiles:profiles(is_admin)
      `)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching users:', error);
      return [];
    }
    
    return data.map((user: any) => ({
      ...user,
      is_admin: user.profiles?.is_admin || false
    }));
  },
  
  toggleAdminStatus: async (userId: string, isCurrentlyAdmin: boolean) => {
    const { error } = await supabase.rpc('set_admin_status', {
      user_id: userId,
      is_admin_status: !isCurrentlyAdmin
    });
    
    if (error) {
      console.error('Error toggling admin status:', error);
      throw error;
    }
    
    return !isCurrentlyAdmin;
  },
  
  createAdminUser: async (email: string, password: string, fullName: string) => {
    try {
      // Create the user first
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });
      
      if (authError) throw authError;
      
      // Set as admin if user was created
      if (authData.user) {
        await supabase.rpc('set_admin_status', {
          user_id: authData.user.id,
          is_admin_status: true
        });
      }
      
      return authData.user;
    } catch (error) {
      console.error('Error creating admin user:', error);
      throw error;
    }
  }
};
