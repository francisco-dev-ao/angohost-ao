
import { supabase } from '@/integrations/supabase/client';

// This function can be called from the browser console to create the initial admin user
export const createInitialAdminUser = async () => {
  try {
    // Check if admin user exists
    const { data: existingUser } = await supabase
      .from('customers')
      .select('*')
      .eq('email', 'support@angohost.ao')
      .maybeSingle();
      
    if (existingUser) {
      console.log('Admin user already exists');
      
      // If exists, ensure they have admin privileges
      const { error } = await supabase.rpc('set_admin_status', {
        user_id: existingUser.user_id,
        is_admin_status: true
      });
      
      if (error) {
        console.error('Error setting admin status:', error);
      } else {
        console.log('Admin privileges confirmed for support@angohost.ao');
      }
      
      return;
    }
    
    // Create the initial admin user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'support@angohost.ao',
      password: 'Admin@123456', // This should be changed immediately after creation
      options: {
        data: {
          full_name: 'Administrador AngoHost'
        }
      }
    });
    
    if (authError) {
      console.error('Error creating admin user:', authError);
      return;
    }
    
    // Set as admin
    if (authData.user) {
      await supabase.rpc('set_admin_status', {
        user_id: authData.user.id,
        is_admin_status: true
      });
      
      console.log('Initial admin user created successfully');
    }
  } catch (error) {
    console.error('Error in createInitialAdminUser:', error);
  }
};
