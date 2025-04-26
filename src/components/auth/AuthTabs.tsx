
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { AuthHeader } from './AuthHeader';

interface AuthTabsProps {
  defaultMode: string;
}

export const AuthTabs = ({ defaultMode }: AuthTabsProps) => {
  return (
    <>
      <AuthHeader />
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
    </>
  );
};
