
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from '@/integrations/supabase/client';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { AuthHero } from '@/components/auth/AuthHero';

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
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <AuthHero />
      
      <div className="flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img 
              src="/public/lovable-uploads/b8702021-42ee-4d88-af7a-590e5dae0e08.png" 
              alt="ANGOHOST" 
              className="h-16 mx-auto mb-6" 
            />
            <h1 className="text-3xl font-bold mb-2">Acesse a sua conta</h1>
            <p className="text-gray-500">Bem-vindo de volta! Por favor, insira seus detalhes</p>
          </div>
          
          <Tabs defaultValue={defaultMode} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="register">Criar Conta</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
