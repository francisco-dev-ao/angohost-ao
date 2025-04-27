
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      
      // Check if user is admin
      if (session?.user) {
        checkAdminStatus(session.user.id);
      }
    });

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      
      // Check if user is admin
      if (session?.user) {
        checkAdminStatus(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });

    const checkAdminStatus = async (userId: string) => {
      try {
        const { data } = await supabase.rpc('is_admin');
        setIsAdmin(data === true);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      }
    };

    return () => subscription.unsubscribe();
  }, []);

  return { user, isAdmin, loading };
};
