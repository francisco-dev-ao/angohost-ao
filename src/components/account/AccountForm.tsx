
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

type FormMode = 'login' | 'register';

interface AccountFormProps {
  onSuccess?: (mode: FormMode) => void;
  defaultMode?: FormMode;
}

const AccountForm: React.FC<AccountFormProps> = ({ 
  onSuccess,
  defaultMode = 'login'
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Tabs defaultValue={defaultMode} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="login">Entrar</TabsTrigger>
          <TabsTrigger value="register">Criar Conta</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <LoginForm onSuccess={onSuccess} />
        </TabsContent>
        
        <TabsContent value="register">
          <RegisterForm onSuccess={onSuccess} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountForm;
