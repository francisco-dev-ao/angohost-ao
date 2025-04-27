
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useNifSearch } from '@/hooks/useNifSearch';
import { Customer } from '@/types/cart';

export interface RegisterFormData extends Customer {
  password: string;
}

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [formData, setFormData] = useState<RegisterFormData>({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '');
      const trimmedValue = numericValue.slice(0, 9);
      setFormData(prev => ({ ...prev, [name]: trimmedValue }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const { isLoading: isNifLoading, error: nifError, fetchNifData } = useNifSearch((data) => {
    if (data) {
      setFormData(prev => ({
        ...prev,
        name: data.name || data.nome || prev.name,
        billingAddress: data.address || data.endereco || prev.billingAddress,
      }));
      setCompanyName(data.name || data.nome || companyName);
    }
  });

  return {
    formData,
    loading,
    setLoading,
    companyName,
    isNifLoading,
    nifError,
    handleChange,
    fetchNifData
  };
};
