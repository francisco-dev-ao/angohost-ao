
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface RequireAuthProps {
  children: ReactNode;
  redirectTo?: string;
  showToast?: boolean;
  toastMessage?: string;
}

export const RequireAuth = ({
  children,
  redirectTo = '/auth',
  showToast = true,
  toastMessage = 'É necessário fazer login para acessar esta página'
}: RequireAuthProps) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        // Salvar o caminho atual para redirecionamento após login
        sessionStorage.setItem('redirect_after_login', location.pathname + location.search);
        console.log('Salvando redirecionamento após login:', location.pathname + location.search);
        
        if (showToast) {
          toast.info(toastMessage);
        }
        
        navigate(redirectTo, { state: { from: location.pathname + location.search } });
        return;
      }
      
      setAuthenticated(true);
      setLoading(false);
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          setAuthenticated(false);
          navigate(redirectTo, { state: { from: location.pathname + location.search } });
        } else if (session) {
          setAuthenticated(true);
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, [navigate, redirectTo, location, showToast, toastMessage]);

  if (loading && !authenticated) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  return <>{children}</>;
};
