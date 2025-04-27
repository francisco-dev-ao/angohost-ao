
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { useRegisterForm } from '@/hooks/useRegisterForm';
import { useRegisterValidation } from '@/hooks/useRegisterValidation';
import { RegisterFormInputs } from './register/RegisterFormInputs';

export const RegisterFormNew = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const { 
    formData, 
    loading, 
    setLoading, 
    companyName, 
    isNifLoading, 
    nifError, 
    handleChange, 
    fetchNifData 
  } = useRegisterForm();
  
  const { checkExistingAccount } = useRegisterValidation();

  useEffect(() => {
    const getRedirectUrl = () => {
      return sessionStorage.getItem('redirect_after_login') || '/dashboard';
    };
    console.log('Redirect URL after login will be:', getRedirectUrl());
  }, []);
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nif.trim()) {
      toast.error("O NIF ou BI é obrigatório para criar uma conta");
      return;
    }
    
    if (!formData.email || !formData.password) {
      toast.error("Email e senha são obrigatórios");
      return;
    }
    
    if (formData.phone && !/^9\d{8}$/.test(formData.phone)) {
      toast.error("Número de telefone inválido. Deve ter 9 dígitos e começar com 9");
      return;
    }
    
    try {
      setLoading(true);
      
      const emailExists = await checkExistingAccount('email', formData.email);
      if (emailExists) {
        toast.error("Este email já está registrado no sistema");
        setLoading(false);
        return;
      }

      const phoneExists = await checkExistingAccount('phone', formData.phone);
      if (phoneExists) {
        toast.error("Este número de telefone já está registrado no sistema");
        setLoading(false);
        return;
      }

      const nifExists = await checkExistingAccount('nif', formData.nif);
      if (nifExists) {
        toast.error("Este NIF já está registrado no sistema");
        setLoading(false);
        return;
      }
      
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            nif: formData.nif,
            phone: formData.phone,
            address: formData.billingAddress,
            company_name: companyName
          },
        },
      });
      
      if (error) throw error;
      
      toast.success('Conta criada com sucesso! Verifique seu email.');
      
      const redirectUrl = sessionStorage.getItem('redirect_after_login');
      if (redirectUrl) {
        console.log('Redirecionando após registro para:', redirectUrl);
        navigate(redirectUrl);
        sessionStorage.removeItem('redirect_after_login');
      } else {
        navigate('/dashboard');
      }
      
    } catch (error: any) {
      toast.error(error.message || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };
  
  const handleNifBlur = () => {
    if (formData.nif.trim().length >= 8) {
      fetchNifData(formData.nif);
    }
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-8">
        <h4 className="text-xl font-bold mb-2">Criar nova conta</h4>
        <p className="mb-6 text-gray-500 text-sm">Por favor, insira seus dados</p>

        <form onSubmit={handleSignUp} className="space-y-4">
          <RegisterFormInputs
            formData={formData}
            handleChange={handleChange}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isNifLoading={isNifLoading}
            nifError={nifError}
            handleNifBlur={handleNifBlur}
          />

          <div className="flex flex-col gap-4 mt-6">
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 h-12"
              disabled={loading || isNifLoading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Criando conta...</span>
                </div>
              ) : 'Criar nova conta'}
            </Button>
            
            <Button 
              type="button" 
              variant="outline"
              className="w-full h-12"
              onClick={() => navigate('/auth?mode=login')}
            >
              Entrar na minha conta
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
