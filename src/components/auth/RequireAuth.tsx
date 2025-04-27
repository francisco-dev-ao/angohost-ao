
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface RequireAuthProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children, adminOnly = false }) => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Check admin status if required
          if (adminOnly) {
            const { data, error } = await supabase.rpc('is_admin');
            if (error) throw error;
            setIsAdmin(!!data);
          }
        }
        
        setSession(session);
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setSession(session);
        if (session && adminOnly) {
          const { data } = await supabase.rpc('is_admin');
          setIsAdmin(!!data);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [adminOnly]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span>Verificando autenticação...</span>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/auth" state={{ returnTo: location.pathname }} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/painel-cliente" replace />;
  }

  return <>{children}</>;
};
