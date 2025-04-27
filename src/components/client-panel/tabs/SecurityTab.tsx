
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Lock, ShieldCheck } from 'lucide-react';

export const SecurityTab = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Alterar Senha</CardTitle>
          <CardDescription>Atualize sua senha de acesso</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Senha Atual</label>
              <Input type="password" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Nova Senha</label>
              <Input type="password" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Confirmar Nova Senha</label>
              <Input type="password" />
            </div>
            <Button>
              <Lock className="h-4 w-4 mr-2" />
              Atualizar Senha
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Autenticação em Dois Fatores</CardTitle>
          <CardDescription>Aumente a segurança da sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="font-medium">Ativar Autenticação em Dois Fatores</h4>
              <p className="text-sm text-muted-foreground">
                Proteja sua conta com uma camada extra de segurança
              </p>
            </div>
            <Switch 
              checked={twoFactorEnabled} 
              onCheckedChange={setTwoFactorEnabled} 
            />
          </div>
          
          {twoFactorEnabled && (
            <div className="mt-4 space-y-4">
              <div className="p-4 bg-muted rounded-md flex items-center gap-4">
                <ShieldCheck className="h-10 w-10 text-green-500" />
                <div>
                  <h4 className="font-medium mb-1">Configuração necessária</h4>
                  <p className="text-sm text-muted-foreground">
                    Para configurar a autenticação em dois fatores, você precisará escanear um 
                    código QR usando um aplicativo como Google Authenticator ou Authy.
                  </p>
                  <Button size="sm" variant="outline" className="mt-2">
                    Configurar 2FA
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
