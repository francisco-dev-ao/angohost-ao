
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useCart, Customer } from '@/context/CartContext';
import { RegisterFormFields } from './register/RegisterFormFields';
import { useNifSearch } from '@/hooks/useNifSearch';

interface RegisterFormProps {
  onSuccess?: (mode: 'register') => void;
}

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [registerData, setRegisterData] = useState<Customer & { password: string }>({
    name: '',
    email: '',
    phone: '',
    nif: '',
    idNumber: '',
    billingAddress: '',
    city: '',
    country: 'Angola',
    postalCode: '',
    password: '',
  });

  const { setCustomer } = useCart();
  const { isLoading: isNifLoading, fetchNifData } = useNifSearch(setRegisterData);

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));

    if (name === 'nif' && value.length === 9) {
      fetchNifData(value);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredFields: (keyof typeof registerData)[] = [
      'name', 'email', 'phone', 'nif', 'billingAddress', 'city', 'password'
    ];
    const missingFields = requiredFields.filter(field => !registerData[field]);
    
    if (missingFields.length > 0) {
      toast.error(`Por favor, preencha todos os campos obrigatórios: ${missingFields.join(', ')}`);
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      const { password, ...customerData } = registerData;
      setCustomer(customerData);
      
      toast.success('Conta criada com sucesso!');
      if (onSuccess) {
        onSuccess('register');
      }
    }, 1500);
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <RegisterFormFields 
        registerData={registerData}
        handleRegisterChange={handleRegisterChange}
      />
      
      <Button 
        type="submit" 
        className="w-full mt-4 bg-primary hover:bg-primary/90" 
        disabled={isLoading || isNifLoading}
      >
        {isLoading || isNifLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processando...
          </>
        ) : 'Criar Conta'}
      </Button>
    </form>
  );
};
