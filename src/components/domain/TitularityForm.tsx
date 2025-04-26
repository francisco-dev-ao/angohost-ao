import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from '@/context/CartContext';
import { useNifSearch } from '@/hooks/useNifSearch';
import { toast } from 'sonner';

export const formSchema = z.object({
  ownerName: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  ownerNif: z.string().min(9, "NIF inválido").max(14, "NIF inválido"),
  ownerContact: z.string().min(9, "Telefone inválido"),
  ownerEmail: z.string().email("Email inválido"),
  organizationName: z.string().optional(),
  useExistingProfile: z.boolean().optional(),
  selectedProfileId: z.string().optional(),
});

interface TitularityFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isProcessing: boolean;
  domainName: string;
  extension: string;
}

export const TitularityForm: React.FC<TitularityFormProps> = ({
  open,
  onOpenChange,
  onSubmit,
  isProcessing,
  domainName,
  extension
}) => {
  const { getContactProfiles } = useCart();
  const contactProfiles = getContactProfiles();
  const { isLoading: isNifLoading, fetchNifData } = useNifSearch((data) => {
    if (data) {
      form.setValue('ownerName', data.nome);
      form.setValue('ownerContact', data.numero_contacto || '');
      form.setValue('organizationName', data.nome);
      toast.success('Dados do NIF carregados com sucesso!');
    }
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ownerName: "",
      ownerNif: "",
      ownerContact: "",
      ownerEmail: "",
      organizationName: "",
      useExistingProfile: false,
      selectedProfileId: "",
    },
  });

  const useExistingProfile = form.watch('useExistingProfile');
  const selectedProfileId = form.watch('selectedProfileId');

  React.useEffect(() => {
    if (useExistingProfile && selectedProfileId) {
      const profile = contactProfiles.find(p => p.id === selectedProfileId);
      if (profile) {
        form.setValue('ownerName', profile.name);
        form.setValue('ownerNif', profile.nif || '');
        form.setValue('ownerContact', profile.phone);
        form.setValue('ownerEmail', profile.email);
      }
    }
  }, [useExistingProfile, selectedProfileId, contactProfiles]);

  const handleNifBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const nif = e.target.value;
    if (nif.length >= 8) {
      const success = await fetchNifData(nif);
      if (!success) {
        form.setError('ownerNif', { 
          type: 'manual', 
          message: 'NIF não encontrado ou inválido' 
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Dados de Titularidade do Domínio</DialogTitle>
          <DialogDescription>
            Preencha os dados do proprietário do domínio {domainName}{extension}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {contactProfiles.length > 0 && (
              <FormField
                control={form.control}
                name="useExistingProfile"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.checked);
                          if (!e.target.checked) {
                            form.setValue('selectedProfileId', '');
                            form.setValue('ownerName', '');
                            form.setValue('ownerNif', '');
                            form.setValue('ownerContact', '');
                            form.setValue('ownerEmail', '');
                          }
                        }}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Usar perfil existente</FormLabel>
                      <FormDescription>
                        Selecione um perfil de contato existente
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            )}

            {(!form.watch('useExistingProfile') || !form.watch('selectedProfileId')) && (
              <>
                <FormField
                  control={form.control}
                  name="ownerNif"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NIF/BI do Proprietário</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            {...field} 
                            placeholder="Digite o NIF ou BI"
                            onBlur={handleNifBlur}
                            disabled={isNifLoading}
                          />
                          {isNifLoading && (
                            <div className="absolute right-3 top-3">
                              <Loader2 className="h-4 w-4 animate-spin" />
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        Ao informar o NIF, preencheremos alguns campos automaticamente.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ownerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Proprietário</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Nome completo" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="ownerContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 923456789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="ownerEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="exemplo@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="organizationName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Organização (opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome da empresa ou organização" {...field} />
                      </FormControl>
                      <FormDescription>
                        Para registros empresariais ou institucionais.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isProcessing}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isProcessing || isNifLoading}>
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : 'Confirmar Dados'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
