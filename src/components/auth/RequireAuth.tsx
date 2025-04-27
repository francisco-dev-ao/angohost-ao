
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface RequireAuthProps {
  children: ReactNode;
  redirectTo?: string;
  showToast?: boolean;
  toastMessage?: string;
  adminOnly?: boolean;
}

export const RequireAuth = ({
  children,
  redirectTo = '/auth',
  showToast = true,
  toastMessage = 'É necessário fazer login para acessar esta página',
  adminOnly = false
}: RequireAuthProps) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check session
        const { data } = await supabase.auth.getSession();
        
        if (!data.session) {
          // Save current path for redirect after login
          const currentPath = location.pathname + location.search;
          sessionStorage.setItem('redirect_after_login', currentPath);
          console.log('RequireAuth: Saving redirect after login:', currentPath);
          
          if (showToast) {
            toast.info(toastMessage);
          }
          
          navigate(redirectTo);
          return;
        }

        // If admin check is required
        if (adminOnly) {
          const { data: adminData, error } = await supabase.rpc('is_admin');
          
          if (error || !adminData) {
            toast.error('Acesso restrito a administradores');
            navigate('/painel-cliente'); // Redirect to client panel if not admin
            return;
          }
          
          setIsAdmin(true);
        }
        
        setAuthenticated(true);
        setLoading(false);
      } catch (error) {
        console.error('Error checking authentication:', error);
        setAuthenticated(false);
        setLoading(false);
        navigate(redirectTo);
      }
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          setAuthenticated(false);
          setIsAdmin(false);
          // Also save current path when signing out
          sessionStorage.setItem('redirect_after_login', location.pathname + location.search);
          navigate(redirectTo);
        } else if (session) {
          setAuthenticated(true);
          // Check admin status when auth changes
          if (adminOnly) {
            supabase.rpc('is_admin').then(({ data }) => {
              if (!data) {
                toast.error('Acesso restrito a administradores');
                navigate('/painel-cliente');
              } else {
                setIsAdmin(true);
              }
            });
          }
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, [navigate, redirectTo, location, showToast, toastMessage, adminOnly]);

  if (loading && !authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span>Verificando autenticação...</span>
      </div>
    );
  }

  // If admin is required and user is not admin, don't render anything
  if (adminOnly && !isAdmin) {
    return null;
  }

  return <>{children}</>;
};
