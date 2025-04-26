
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from 'lucide-react';
import { formSchema } from "@/schemas/formSchema";
import { useNifValidation } from '@/hooks/useNifValidation';
import { NifField } from './titularity/NifField';
import { OwnerInfoFields } from './titularity/OwnerInfoFields';
import { toast } from 'sonner';

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
  const { isLoading: isNifLoading, validateNif } = useNifValidation();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ownerName: "",
      ownerNif: "",
      ownerContact: "",
      ownerEmail: "",
      organizationName: "",
    },
  });

  const handleNifBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const nif = e.target.value;
    if (nif.length >= 8) {
      const data = await validateNif(nif);
      if (data) {
        form.setValue('ownerName', data.nome);
        form.setValue('ownerContact', data.numero_contacto || '');
        form.setValue('organizationName', data.nome);
        toast.success('Dados do NIF carregados com sucesso!');
      } else {
        form.setError('ownerNif', { 
          type: 'manual', 
          message: 'NIF não encontrado ou inválido' 
        });
        toast.error('NIF não encontrado ou inválido');
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
            <NifField isLoading={isNifLoading} onBlur={handleNifBlur} />
            <OwnerInfoFields />
            
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
