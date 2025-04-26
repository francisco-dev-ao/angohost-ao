
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { AuthContainer } from '@/components/auth/AuthContainer';
import { AuthTabs } from '@/components/auth/AuthTabs';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const defaultMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  
  useEffect(() => {
    // Salvar o caminho atual se não tiver um redirecionamento já definido
    if (!sessionStorage.getItem('redirect_after_login') && location.state?.from) {
      sessionStorage.setItem('redirect_after_login', location.state.from);
      console.log('Salvando redirecionamento da navegação:', location.state.from);
    }
    
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        // Obtém o URL de redirecionamento armazenado ou usa o dashboard como fallback
        const redirectUrl = sessionStorage.getItem('redirect_after_login') || '/dashboard';
        console.log('Redirecionando após login para:', redirectUrl);
        sessionStorage.removeItem('redirect_after_login');
        navigate(redirectUrl);
      }
    };
    
    checkSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          // Obtém o URL de redirecionamento armazenado ou usa o dashboard como fallback
          const redirectUrl = sessionStorage.getItem('redirect_after_login') || '/dashboard';
          console.log('Redirecionamento após mudança de auth state para:', redirectUrl);
          sessionStorage.removeItem('redirect_after_login');
          navigate(redirectUrl);
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, [navigate, location]);
  
  return (
    <AuthContainer>
      <AuthTabs defaultMode={defaultMode} />
    </AuthContainer>
  );
};

export default Auth;
