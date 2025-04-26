
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Info, Mail, Loader2, Copy } from 'lucide-react';
import { toast } from 'sonner';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const EmailConfig = () => {
  const [domainName, setDomainName] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<'success' | 'error' | null>(null);
  const [emailPlan, setEmailPlan] = useState('');
  const [quantity, setQuantity] = useState('5');

  const handleVerifyDomain = () => {
    if (!domainName) {
      toast.error('Por favor, insira um nome de domínio.');
      return;
    }
    
    setIsVerifying(true);
    setVerificationResult(null);
    
    // Simulate domain verification
    setTimeout(() => {
      setIsVerifying(false);
      
      // For demo purposes, just validate if it looks like a domain
      if (domainName.includes('.') && domainName.length > 3 && !domainName.includes(' ')) {
        setVerificationResult('success');
        toast.success(`Domínio ${domainName} verificado com sucesso!`);
      } else {
        setVerificationResult('error');
        toast.error(`Não foi possível verificar o domínio ${domainName}. Formato inválido.`);
      }
    }, 2000);
  };
  
  const handleCopyClick = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copiado para a área de transferência!');
  };
  
  const dnsRecords = [
    { type: 'MX', name: '@', value: 'mx1.angohost.co.ao', priority: '10' },
    { type: 'MX', name: '@', value: 'mx2.angohost.co.ao', priority: '20' },
    { type: 'TXT', name: '@', value: 'v=spf1 include:spf.angohost.co.ao ~all', priority: '-' },
    { type: 'CNAME', name: 'mail', value: 'mail.angohost.co.ao', priority: '-' },
    { type: 'CNAME', name: 'webmail', value: 'webmail.angohost.co.ao', priority: '-' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Configurar Email Profissional</h1>
        <p className="text-gray-600 mb-8">
          Configure seu email profissional com seu domínio existente.
        </p>

        <Tabs defaultValue="configure">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="configure">Configurar Domínio</TabsTrigger>
            <TabsTrigger value="existing">Meus Emails</TabsTrigger>
            <TabsTrigger value="purchase">Comprar Plano</TabsTrigger>
          </TabsList>

          <TabsContent value="configure" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuração de DNS</CardTitle>
                <CardDescription>
                  Configure os registros DNS para seu domínio usar nosso serviço de email.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Verificar Domínio</h3>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-grow">
                        <Input 
                          placeholder="exemplo.co.ao" 
                          value={domainName} 
                          onChange={(e) => setDomainName(e.target.value)} 
                        />
                      </div>
                      <Button 
                        onClick={handleVerifyDomain}
                        disabled={isVerifying}
                      >
                        {isVerifying ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Verificando...
                          </>
                        ) : 'Verificar Domínio'}
                      </Button>
                    </div>
                  </div>
                  
                  {verificationResult === 'success' && (
                    <>
                      <Alert className="bg-green-50 border-green-200">
                        <Check className="h-4 w-4 text-green-600" />
                        <AlertTitle>Domínio Verificado</AlertTitle>
                        <AlertDescription>
                          Seu domínio foi verificado com sucesso. Siga as instruções abaixo para configurar os registros DNS.
                        </AlertDescription>
                      </Alert>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Registros DNS Necessários</h3>
                        <p className="text-gray-600 mb-4">
                          Configure estes registros no seu provedor DNS para ativar o serviço de email:
                        </p>
                        
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Nome</TableHead>
                                <TableHead>Valor</TableHead>
                                <TableHead>Prioridade</TableHead>
                                <TableHead></TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {dnsRecords.map((record, index) => (
                                <TableRow key={index}>
                                  <TableCell className="font-medium">{record.type}</TableCell>
                                  <TableCell>{record.name}</TableCell>
                                  <TableCell className="font-mono text-sm">{record.value}</TableCell>
                                  <TableCell>{record.priority}</TableCell>
                                  <TableCell>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleCopyClick(record.value)}
                                    >
                                      <Copy className="h-4 w-4" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                      
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Tempo de Propagação</AlertTitle>
                        <AlertDescription>
                          As alterações de DNS podem levar até 48 horas para se propagar em toda a internet.
                        </AlertDescription>
                      </Alert>
                    </>
                  )}
                  
                  {verificationResult === 'error' && (
                    <Alert className="bg-red-50 border-red-200">
                      <Info className="h-4 w-4 text-red-600" />
                      <AlertTitle>Verificação Falhou</AlertTitle>
                      <AlertDescription>
                        Não foi possível verificar o domínio. Por favor, certifique-se de que o formato está correto e tente novamente.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="existing" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Meus Serviços de Email</CardTitle>
                <CardDescription>
                  Gerencie seus serviços de email existentes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-12">
                  <div className="text-center">
                    <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">Nenhum serviço de email encontrado</h3>
                    <p className="text-gray-600 mt-2 mb-6">
                      Você ainda não tem serviços de email ativos.
                    </p>
                    <Button asChild>
                      <Link to="/email/profissional">Adquirir Email Profissional</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="purchase" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Adquirir Plano de Email</CardTitle>
                <CardDescription>
                  Configure e compre um novo plano de email para seu domínio.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="domain-select">Seu Domínio</Label>
                    <Input 
                      id="domain-select" 
                      placeholder="seu-dominio.co.ao" 
                      className="mt-1"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Digite seu domínio existente para vincular ao email.
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="plan-select">Plano de Email</Label>
                    <Select value={emailPlan} onValueChange={setEmailPlan}>
                      <SelectTrigger id="plan-select" className="mt-1">
                        <SelectValue placeholder="Selecione um plano" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="start">Plano Start (5GB)</SelectItem>
                        <SelectItem value="business">Plano Business (15GB)</SelectItem>
                        <SelectItem value="enterprise">Plano Enterprise (50GB)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="quantity-select">Quantidade de Contas</Label>
                    <Select value={quantity} onValueChange={setQuantity}>
                      <SelectTrigger id="quantity-select" className="mt-1">
                        <SelectValue placeholder="Número de contas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 conta</SelectItem>
                        <SelectItem value="5">5 contas</SelectItem>
                        <SelectItem value="10">10 contas</SelectItem>
                        <SelectItem value="20">20 contas</SelectItem>
                        <SelectItem value="50">50 contas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <Button asChild className="w-full">
                      <Link to="/email/profissional">
                        Ver Planos Detalhados
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Add Link component to avoid errors
import { Link } from 'react-router-dom';

export default EmailConfig;
