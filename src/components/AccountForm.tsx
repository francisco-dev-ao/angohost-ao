
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2, User, Mail, Key, Building, MapPin, Phone } from 'lucide-react';
import { useCart, Customer } from '@/context/CartContext';

type FormMode = 'login' | 'register';

interface AccountFormProps {
  onSuccess?: (mode: FormMode) => void;
  defaultMode?: FormMode;
}

const AccountForm: React.FC<AccountFormProps> = ({ 
  onSuccess,
  defaultMode = 'login'
}) => {
  const [mode, setMode] = useState<FormMode>(defaultMode);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
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

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));

    // Check for NIF and fetch customer data if available
    if (name === 'nif' && value.length === 9) {
      fetchNifData(value);
    }
  };

  const fetchNifData = async (nif: string) => {
    setIsLoading(true);
    try {
      toast.info("Consultando dados do NIF...");
      
      // Make the actual API call to the endpoint
      const response = await fetch(`http://consulta.edgarsingui.ao/public/consultar-por-nif/${nif}`);
      
      if (!response.ok) {
        throw new Error('Falha ao consultar o NIF');
      }
      
      const data = await response.json();
      
      if (data) {
        setRegisterData(prev => ({
          ...prev,
          name: data.nome || prev.name,
          city: data.provincia || prev.city,
          billingAddress: data.endereco || prev.billingAddress
        }));
        toast.success("Dados do contribuinte carregados com sucesso!");
      } else {
        toast.error("NIF não encontrado.");
      }
    } catch (error) {
      console.error("Error fetching NIF data:", error);
      toast.error("Erro ao consultar o NIF. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Login realizado com sucesso!');
      
      // In a real app, you would validate credentials with your backend here
      // For now, we'll just simulate a successful login
      
      if (onSuccess) {
        onSuccess('login');
      }
    }, 1500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields: (keyof typeof registerData)[] = ['name', 'email', 'phone', 'nif', 'billingAddress', 'city', 'password'];
    const missingFields = requiredFields.filter(field => !registerData[field]);
    
    if (missingFields.length > 0) {
      toast.error(`Por favor, preencha todos os campos obrigatórios: ${missingFields.join(', ')}`);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Save customer data to cart context
      const { password, ...customerData } = registerData;
      setCustomer(customerData);
      
      toast.success('Conta criada com sucesso!');
      if (onSuccess) {
        onSuccess('register');
      }
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Tabs defaultValue={mode} onValueChange={(value) => setMode(value as FormMode)}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="login">Entrar</TabsTrigger>
          <TabsTrigger value="register">Criar Conta</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="login-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  id="login-email" 
                  name="email" 
                  type="email" 
                  placeholder="seu.email@exemplo.com" 
                  className="pl-10"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="login-password">Senha</Label>
              <div className="relative">
                <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  id="login-password" 
                  name="password" 
                  type="password" 
                  placeholder="Sua senha" 
                  className="pl-10"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando...
                </>
              ) : 'Entrar'}
            </Button>
          </form>
        </TabsContent>
        
        <TabsContent value="register">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="register-nif">NIF (Número de Contribuinte)*</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="register-nif" 
                    name="nif" 
                    placeholder="Insira seu NIF" 
                    className="pl-10"
                    value={registerData.nif}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="register-name">Nome Completo*</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="register-name" 
                    name="name" 
                    placeholder="Seu nome completo" 
                    className="pl-10"
                    value={registerData.name}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="register-email">Email*</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="register-email" 
                    name="email" 
                    type="email" 
                    placeholder="seu.email@exemplo.com" 
                    className="pl-10"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="register-phone">Telefone*</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="register-phone" 
                    name="phone" 
                    placeholder="Seu número de telefone" 
                    className="pl-10"
                    value={registerData.phone}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="register-idnumber">Nº de Bilhete de Identidade</Label>
                <Input 
                  id="register-idnumber" 
                  name="idNumber" 
                  placeholder="Seu BI" 
                  value={registerData.idNumber}
                  onChange={handleRegisterChange}
                />
              </div>
              
              <div>
                <Label htmlFor="register-city">Cidade*</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="register-city" 
                    name="city" 
                    placeholder="Sua cidade" 
                    className="pl-10"
                    value={registerData.city}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="register-address">Endereço*</Label>
                <Input 
                  id="register-address" 
                  name="billingAddress" 
                  placeholder="Seu endereço completo" 
                  value={registerData.billingAddress}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="register-password">Senha*</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="register-password" 
                    name="password" 
                    type="password" 
                    placeholder="Crie uma senha" 
                    className="pl-10"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full mt-4 bg-primary hover:bg-primary/90" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando...
                </>
              ) : 'Criar Conta'}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountForm;
