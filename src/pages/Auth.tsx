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
    // Save current path if no redirect is defined and there is state.from
    if (!sessionStorage.getItem('redirect_after_login') && location.state?.from) {
      sessionStorage.setItem('redirect_after_login', location.state.from);
      console.log('Auth: Saving redirect from navigation:', location.state.from);
    }
    
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        // Check if user is administrator
        const { data: isAdmin } = await supabase.rpc('is_admin');
        
        // Get the stored redirect URL
        const redirectUrl = sessionStorage.getItem('redirect_after_login');
        console.log('Auth: Redirecting after login to:', redirectUrl);
        
        // Check if cart has items
        const hasItemsInCart = items && items.length > 0;
        
        // Clear the stored redirect URL
        sessionStorage.removeItem('redirect_after_login');
        
        if (isAdmin) {
          // Administrators always go to the admin panel
          navigate('/admin');
          toast.success('Bem-vindo ao painel administrativo!');
        } else {
          // For regular clients
          if (hasItemsInCart) {
            // If there are items in cart, redirect to checkout
            toast.info("Você tem itens no carrinho! Redirecionando para finalizar sua compra.");
            navigate('/carrinho');
          } else if (redirectUrl && redirectUrl !== '/admin') {
            // If there's a specific redirect (except admin), use it
            navigate(redirectUrl);
          } else {
            // Otherwise, go to the client panel
            navigate('/painel-cliente');
          }
        }
      }
    };
    
    checkSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Check if user is administrator
          const { data: isAdmin } = await supabase.rpc('is_admin');
          
          // Get the stored redirect URL
          const redirectUrl = sessionStorage.getItem('redirect_after_login');
          console.log('Auth: Redirect after auth state change to:', redirectUrl);
          
          // Check if cart has items
          const hasItemsInCart = items && items.length > 0;
          
          // Clear the stored redirect URL
          sessionStorage.removeItem('redirect_after_login');
          
          if (isAdmin) {
            // Administrators always go to admin panel
            navigate('/admin');
            toast.success('Bem-vindo ao painel administrativo!');
          } else {
            // For regular clients
            if (hasItemsInCart) {
              // If there are items in cart, redirect to checkout
              toast.info("Você tem itens no carrinho! Redirecionando para finalizar sua compra.");
              navigate('/carrinho');
            } else if (redirectUrl && redirectUrl !== '/admin') {
              // If there's a specific redirect (except admin), use it
              navigate(redirectUrl);
            } else {
              // Otherwise, go to the client panel
              navigate('/painel-cliente');
            }
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
