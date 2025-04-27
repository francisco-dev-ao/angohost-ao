
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DomainDialogProps } from '@/types/email';

export const EmailDomainDialog: React.FC<DomainDialogProps> = ({
  isOpen,
  onOpenChange,
  domainOption,
  setDomainOption,
  existingDomain,
  setExistingDomain,
  domainsInCart,
  onConfirm,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Escolha um Domínio</DialogTitle>
          <DialogDescription>
            Seu email profissional precisa estar associado a um domínio.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup 
            defaultValue={domainOption.type} 
            className="space-y-4"
            onValueChange={(value) => setDomainOption({ type: value as 'existing' | 'new' })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="new" id="new-domain" />
              <Label htmlFor="new-domain">Quero registrar um novo domínio</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="existing" id="existing-domain" />
              <Label htmlFor="existing-domain">Já tenho um domínio</Label>
            </div>
          </RadioGroup>
          
          {domainOption.type === 'existing' && (
            <div className="mt-4">
              {domainsInCart.length > 0 ? (
                <div className="space-y-3">
                  <Label>Selecione um domínio do seu carrinho:</Label>
                  <RadioGroup 
                    value={existingDomain}
                    onValueChange={setExistingDomain}
                    className="space-y-2"
                  >
                    {domainsInCart.map(domain => (
                      <div key={domain} className="flex items-center space-x-2">
                        <RadioGroupItem value={domain} id={domain} />
                        <Label htmlFor={domain}>{domain}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ) : (
                <div className="space-y-3">
                  <Label htmlFor="domain-name">Nome do domínio:</Label>
                  <Input 
                    id="domain-name" 
                    placeholder="exemplo.co.ao" 
                    value={existingDomain} 
                    onChange={(e) => setExistingDomain(e.target.value)} 
                  />
                  <p className="text-sm text-gray-500">
                    Você precisará configurar os registros DNS deste domínio para usar nosso serviço de email.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button 
            type="button" 
            onClick={onConfirm}
            disabled={domainOption.type === 'existing' && !existingDomain}
          >
            Continuar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
