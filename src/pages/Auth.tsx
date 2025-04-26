
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from '@/integrations/supabase/client';
import { AuthContainer } from '@/components/auth/AuthContainer';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthTabs } from '@/components/auth/AuthTabs';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const defaultMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        const redirectUrl = sessionStorage.getItem('redirect_after_login') || '/dashboard';
        sessionStorage.removeItem('redirect_after_login');
        navigate(redirectUrl);
      }
    };
    
    checkSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          const redirectUrl = sessionStorage.getItem('redirect_after_login') || '/dashboard';
          sessionStorage.removeItem('redirect_after_login');
          navigate(redirectUrl);
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, [navigate]);
  
  return (
    <AuthContainer>
      <AuthTabs defaultMode={defaultMode} />
    </AuthContainer>
  );
};

export default Auth;
