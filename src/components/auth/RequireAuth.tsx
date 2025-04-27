
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface RequireAuthProps {
  children: ReactNode;
  redirectTo?: string;
  showToast?: boolean;
  toastMessage?: string;
  requireAdmin?: boolean;
}

export const RequireAuth = ({
  children,
  redirectTo = '/auth',
  showToast = true,
  toastMessage = 'É necessário fazer login para acessar esta página',
  requireAdmin = false
}: RequireAuthProps) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        // Salvar o caminho atual para redirecionamento após login
        // Incluindo query params para capturar informações importantes
        const currentPath = location.pathname + location.search;
        sessionStorage.setItem('redirect_after_login', currentPath);
        console.log('RequireAuth: Salvando redirecionamento após login:', currentPath);
        
        if (showToast) {
          toast.info(toastMessage);
        }
        
        navigate(redirectTo);
        return;
      }
      
      // Check if admin access is required
      if (requireAdmin) {
        const { data: adminData, error: adminError } = await supabase.rpc('is_admin');
        
        if (adminError || !adminData) {
          toast.error('Esta página é restrita a administradores');
          navigate('/painel-cliente');
          return;
        }
        
        setIsAdmin(true);
      }
      
      setAuthenticated(true);
      setLoading(false);
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          setAuthenticated(false);
          setIsAdmin(false);
          // Ao sair, também salvar o caminho atual
          sessionStorage.setItem('redirect_after_login', location.pathname + location.search);
          navigate(redirectTo);
        } else if (session) {
          setAuthenticated(true);
          
          // Re-check admin status if admin access is required
          if (requireAdmin) {
            const checkAdminStatus = async () => {
              const { data: adminData } = await supabase.rpc('is_admin');
              if (!adminData) {
                toast.error('Esta página é restrita a administradores');
                navigate('/painel-cliente');
              } else {
                setIsAdmin(true);
              }
            };
            
            checkAdminStatus();
          }
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, [navigate, redirectTo, location, showToast, toastMessage, requireAdmin]);

  if (loading && !authenticated) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  // If admin access is required and user is not an admin, redirect
  if (requireAdmin && !isAdmin && !loading) {
    return <div className="min-h-screen flex items-center justify-center">Acesso negado</div>;
  }

  return <>{children}</>;
};
