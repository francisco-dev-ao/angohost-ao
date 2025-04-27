
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { AuthContainer } from '@/components/auth/AuthContainer';
import { AuthTabs } from '@/components/auth/AuthTabs';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = useCart();
  const defaultMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  
  useEffect(() => {
    // Salvar o caminho atual se não tiver um redirecionamento já definido e tiver state.from
    if (!sessionStorage.getItem('redirect_after_login') && location.state?.from) {
      sessionStorage.setItem('redirect_after_login', location.state.from);
      console.log('Auth: Salvando redirecionamento da navegação:', location.state.from);
    }
    
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        // Obtém o URL de redirecionamento armazenado ou usa o dashboard como fallback
        const redirectUrl = sessionStorage.getItem('redirect_after_login') || '/dashboard';
        console.log('Auth: Redirecionando após login para:', redirectUrl);
        
        // Verificar se tem itens no carrinho para redirecionar para o carrinho
        const hasItemsInCart = items && items.length > 0;
        
        sessionStorage.removeItem('redirect_after_login');
        
        if (redirectUrl === '/dashboard' && hasItemsInCart) {
          toast.info("Você tem itens no carrinho! Redirecionando para finalizar sua compra.");
          navigate('/carrinho');
        } else {
          navigate(redirectUrl);
        }
      }
    };
    
    checkSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Obtém o URL de redirecionamento armazenado ou usa o dashboard como fallback
          const redirectUrl = sessionStorage.getItem('redirect_after_login') || '/dashboard';
          console.log('Auth: Redirecionamento após mudança de auth state para:', redirectUrl);
          
          // Verificar se tem itens no carrinho para redirecionar para o carrinho
          const hasItemsInCart = items && items.length > 0;
          
          sessionStorage.removeItem('redirect_after_login');
          
          if (redirectUrl === '/dashboard' && hasItemsInCart) {
            toast.info("Você tem itens no carrinho! Redirecionando para finalizar sua compra.");
            navigate('/carrinho');
          } else {
            navigate(redirectUrl);
          }
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, [navigate, location, items]);
  
  return (
    <AuthContainer>
      <AuthTabs defaultMode={defaultMode} />
    </AuthContainer>
  );
};

export default Auth;
