import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Search, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface DomainSearchFormProps {
  variant?: 'default' | 'hero' | 'sidebar';
}

const formSchema = z.object({
  ownerName: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  ownerNif: z.string().min(9, "NIF inválido").max(14, "NIF inválido"),
  ownerContact: z.string().min(9, "Telefone inválido"),
  ownerEmail: z.string().email("Email inválido"),
  organizationName: z.string().optional(),
});

const DomainSearchForm: React.FC<DomainSearchFormProps> = ({ variant = 'default' }) => {
  const [domainName, setDomainName] = useState('');
  const [extension, setExtension] = useState('.co.ao');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<null | { available: boolean, price?: number }>(null);
  const [showTitularityForm, setShowTitularityForm] = useState(false);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  
  const navigate = useNavigate();
  const { addItem } = useCart();
  
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

  const extensionOptions = [
    { value: '.co.ao', label: '.co.ao', price: 35000 },
    { value: '.ao', label: '.ao', price: 25000 },
    { value: '.it.ao', label: '.it.ao', price: 35000 },
    { value: '.edu.ao', label: '.edu.ao', price: 35000 },
    { value: '.com', label: '.com', price: 15000 },
  ];

  useEffect(() => {
    const pendingEmailPlan = sessionStorage.getItem('pendingEmailPlan');
    if (pendingEmailPlan) {
      toast.info('Selecione um domínio para o seu plano de email');
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!domainName) {
      toast.error('Por favor, insira um nome de domínio.');
      return;
    }
    
    setIsSearching(true);
    setSearchResult(null);
    
    setTimeout(() => {
      const randomAvailable = Math.random() > 0.3;
      
      const selectedExt = extensionOptions.find(ext => ext.value === extension);
      
      setSearchResult({
        available: randomAvailable,
        price: selectedExt?.price,
      });
      
      setIsSearching(false);
      
      if (randomAvailable) {
        toast.success(`O domínio ${domainName}${extension} está disponível!`);
      } else {
        toast.error(`O domínio ${domainName}${extension} não está disponível.`);
      }
    }, 1500);
  };

  const handleOpenTitularityForm = () => {
    setShowTitularityForm(true);
  };

  const onTitularitySubmit = (values: z.infer<typeof formSchema>) => {
    setIsProcessingOrder(true);

    setTimeout(() => {
      const price = getPrice();

      addItem({
        id: `domain-${domainName}${extension}-${Date.now()}`,
        type: 'domain',
        name: `${domainName}${extension}`,
        price: price,
        period: 'yearly',
        details: {
          domain: `${domainName}${extension}`,
          period: '1 ano',
          renewalPrice: price,
          privacyProtection: 'Incluída',
          domainName: `${domainName}${extension}`,
          ownerName: values.ownerName,
          ownerNif: values.ownerNif,
          ownerContact: values.ownerContact,
          ownerEmail: values.ownerEmail,
          organizationName: values.organizationName || ""
        }
      });

      toast.success(`Domínio ${domainName}${extension} adicionado ao carrinho!`);
      setIsProcessingOrder(false);
      setShowTitularityForm(false);

      const pendingEmailPlan = sessionStorage.getItem('pendingEmailPlan');
      
      if (pendingEmailPlan) {
        try {
          const emailPlan = JSON.parse(pendingEmailPlan);
          
          addItem({
            id: `${emailPlan.id}-${Date.now()}`,
            type: 'email',
            name: `${emailPlan.title} (${emailPlan.quantity} contas)`,
            price: emailPlan.price * emailPlan.quantity,
            period: 'monthly',
            details: {
              storage: emailPlan.storage,
              antispam: emailPlan.id === 'email-start' ? 'Básico' : (emailPlan.id === 'email-business' ? 'Avançado' : 'Premium'),
              quantity: emailPlan.quantity,
              domainName: `${domainName}${extension}`,
              renewalPrice: emailPlan.price * emailPlan.quantity
            }
          });
          
          sessionStorage.removeItem('pendingEmailPlan');
          toast.success(`Plano de email adicionado ao carrinho!`);
        } catch (e) {
          console.error('Failed to parse pending email plan', e);
        }
      }
      
      navigate('/carrinho');
    }, 1500);
  };

  const getPrice = () => {
    const selectedExt = extensionOptions.find(ext => ext.value === extension);
    const basePrice = selectedExt?.price || 0;
    
    if (domainName.length <= 3) {
      return 300000;
    }
    
    return basePrice;
  };

  const formClasses = {
    default: 'flex flex-col space-y-4 max-w-3xl mx-auto',
    hero: 'flex flex-col md:flex-row items-center gap-3 w-full max-w-4xl mx-auto',
    sidebar: 'flex flex-col space-y-4'
  };

  return (
    <div className={variant === 'hero' ? 'w-full' : ''}>
      <form onSubmit={handleSearch} className={formClasses[variant]}>
        <div className={`flex flex-1 ${variant === 'hero' ? 'flex-col md:flex-row w-full' : ''} relative rounded-lg shadow-lg bg-white/70 backdrop-blur-sm border border-gray-100/50`}>
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Digite o nome do domínio"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value)}
              className={`${
                variant === 'hero' ? 'md:rounded-r-none text-lg' : 'text-base'
              } bg-transparent border-0 shadow-none focus:ring-0 pl-10 h-14 text-gray-800 w-full ${
                variant === 'hero' ? 'md:w-96' : 'w-full'
              }`}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          
          <Select value={extension} onValueChange={setExtension}>
            <SelectTrigger 
              className={`${
                variant === 'hero' ? 'md:w-24 md:rounded-l-none' : 'w-32'
              } bg-transparent text-gray-800 text-base border-0 border-l border-gray-100/50 focus:ring-0 h-14`}
            >
              <SelectValue placeholder=".co.ao" />
            </SelectTrigger>
            <SelectContent>
              {extensionOptions.map((ext) => (
                <SelectItem key={ext.value} value={ext.value}>{ext.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          type="submit" 
          disabled={isSearching}
          className={`${
            variant === 'hero' ? 'w-full md:w-auto' : ''
          } h-14 px-8 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300`}
        >
          {isSearching ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              A verificar...
            </>
          ) : 'Verificar Disponibilidade'}
        </Button>
      </form>
      
      {searchResult && (
        <div className="mt-6 text-center">
          {searchResult.available ? (
            <div className="bg-green-50/80 backdrop-blur-sm border border-green-100 rounded-xl p-6 flex flex-col items-center shadow-lg">
              <h4 className="text-green-800 text-lg font-medium">
                {domainName}{extension} está disponível!
              </h4>
              <p className="text-gray-600 mt-2">
                Preço: {getPrice().toLocaleString('pt-AO')} Kz por ano
              </p>
              <p className="text-gray-600 text-sm">
                Renovação: {getPrice().toLocaleString('pt-AO')} Kz por ano
              </p>
              <Button 
                onClick={handleOpenTitularityForm} 
                className="mt-4 bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300"
              >
                Registrar Domínio
              </Button>
            </div>
          ) : (
            <div className="bg-red-50/80 backdrop-blur-sm border border-red-100 rounded-xl p-6 shadow-lg">
              <h4 className="text-red-800 text-lg font-medium">
                {domainName}{extension} não está disponível
              </h4>
              <p className="text-gray-600 mt-2">
                Tente outro nome ou extensão diferente.
              </p>
            </div>
          )}
        </div>
      )}

      <Dialog open={showTitularityForm} onOpenChange={setShowTitularityForm}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Dados de Titularidade do Domínio</DialogTitle>
            <DialogDescription>
              Preencha os dados do proprietário do domínio {domainName}{extension}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onTitularitySubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="ownerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Proprietário</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="ownerNif"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIF</FormLabel>
                    <FormControl>
                      <Input placeholder="Número de Identificação Fiscal" {...field} />
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
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowTitularityForm(false)}
                  disabled={isProcessingOrder}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isProcessingOrder}>
                  {isProcessingOrder ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processando...
                    </>
                  ) : 'Adicionar ao Carrinho'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DomainSearchForm;
