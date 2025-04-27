
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Link, Copy, DollarSign, Users, BarChart4, ArrowUpRight,
  Calculator, CheckCircle, Share2, Wallet
} from 'lucide-react';

interface AffiliatePanelProps {
  userData: any;
}

export const AffiliatePanel = ({ userData }: AffiliatePanelProps) => {
  const affiliateEnabled = false; // Would be fetched from backend
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Show a toast or notification
  };
  
  if (!affiliateEnabled) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Programa de Afiliados</CardTitle>
          <CardDescription>Ganhe comissões indicando nossos serviços</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 text-center space-y-4">
            <Users className="h-16 w-16 mx-auto text-primary/60" />
            <h3 className="text-xl font-medium">Torne-se um Afiliado</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Indique nossos serviços e ganhe comissões por cada cliente que você trouxer. 
              Nosso programa de afiliados oferece até 15% de comissão sobre o primeiro pagamento.
            </p>
            <Button size="lg" className="mt-4">
              <Share2 className="h-4 w-4 mr-2" />
              Solicitar Participação
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-muted p-4 rounded-lg text-center">
              <DollarSign className="h-8 w-8 mx-auto text-primary mb-2" />
              <h4 className="font-medium mb-1">Comissões Atrativas</h4>
              <p className="text-sm text-muted-foreground">
                Ganhe até 15% sobre as compras realizadas
              </p>
            </div>
            
            <div className="bg-muted p-4 rounded-lg text-center">
              <BarChart4 className="h-8 w-8 mx-auto text-primary mb-2" />
              <h4 className="font-medium mb-1">Relatórios Detalhados</h4>
              <p className="text-sm text-muted-foreground">
                Acompanhe seus ganhos e conversões
              </p>
            </div>
            
            <div className="bg-muted p-4 rounded-lg text-center">
              <Wallet className="h-8 w-8 mx-auto text-primary mb-2" />
              <h4 className="font-medium mb-1">Pagamentos Mensais</h4>
              <p className="text-sm text-muted-foreground">
                Receba suas comissões todo mês
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Tabs defaultValue="overview">
      <TabsList className="mb-6 flex flex-wrap">
        <TabsTrigger value="overview">Visão Geral</TabsTrigger>
        <TabsTrigger value="links">Links de Afiliado</TabsTrigger>
        <TabsTrigger value="commissions">Comissões</TabsTrigger>
        <TabsTrigger value="payments">Pagamentos</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <DollarSign className="h-8 w-8 mx-auto text-green-500 mb-2" />
                <p className="text-sm text-muted-foreground">Ganhos Totais</p>
                <h3 className="text-2xl font-bold">12.500 kz</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Users className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                <p className="text-sm text-muted-foreground">Clientes Referidos</p>
                <h3 className="text-2xl font-bold">5</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <ArrowUpRight className="h-8 w-8 mx-auto text-purple-500 mb-2" />
                <p className="text-sm text-muted-foreground">Taxa de Conversão</p>
                <h3 className="text-2xl font-bold">3.2%</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Calculator className="h-8 w-8 mx-auto text-amber-500 mb-2" />
                <p className="text-sm text-muted-foreground">Comissão Pendente</p>
                <h3 className="text-2xl font-bold">2.300 kz</h3>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Últimas conversões e comissões</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-5 p-4 font-medium border-b bg-muted/50">
                <div>Cliente</div>
                <div>Serviço</div>
                <div>Data</div>
                <div>Valor</div>
                <div>Comissão</div>
              </div>
              
              <div className="p-8 text-center text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
                <p>Nenhuma atividade recente</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="links" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Seus Links de Afiliado</CardTitle>
            <CardDescription>Use estes links para direcionar clientes para nosso site</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Link Principal</label>
              <div className="flex mt-1">
                <Input 
                  readOnly 
                  value={`https://angohost.ao/?ref=${userData?.id?.substring(0, 8)}`}
                  className="flex-1"
                />
                <Button onClick={() => copyToClipboard(`https://angohost.ao/?ref=${userData?.id?.substring(0, 8)}`)} className="ml-2">
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar
                </Button>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Link para Hospedagem</label>
              <div className="flex mt-1">
                <Input 
                  readOnly 
                  value={`https://angohost.ao/hospedagem/?ref=${userData?.id?.substring(0, 8)}`}
                  className="flex-1"
                />
                <Button onClick={() => copyToClipboard(`https://angohost.ao/hospedagem/?ref=${userData?.id?.substring(0, 8)}`)} className="ml-2">
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar
                </Button>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Link para Domínios</label>
              <div className="flex mt-1">
                <Input 
                  readOnly 
                  value={`https://angohost.ao/dominios/?ref=${userData?.id?.substring(0, 8)}`}
                  className="flex-1"
                />
                <Button onClick={() => copyToClipboard(`https://angohost.ao/dominios/?ref=${userData?.id?.substring(0, 8)}`)} className="ml-2">
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Materiais Promocionais</CardTitle>
            <CardDescription>Banners e imagens para divulgação</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="overflow-hidden">
              <div className="bg-muted h-32 flex items-center justify-center">
                <Link className="h-10 w-10 text-primary" />
              </div>
              <CardContent className="pt-4">
                <h3 className="font-medium mb-1">Banner 300x250</h3>
                <p className="text-xs text-muted-foreground mb-2">Banner para sidebar</p>
                <Button className="w-full" size="sm">
                  <Copy className="h-3 w-3 mr-2" />
                  Copiar Código
                </Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="bg-muted h-32 flex items-center justify-center">
                <Link className="h-10 w-10 text-primary" />
              </div>
              <CardContent className="pt-4">
                <h3 className="font-medium mb-1">Banner 728x90</h3>
                <p className="text-xs text-muted-foreground mb-2">Banner para topo</p>
                <Button className="w-full" size="sm">
                  <Copy className="h-3 w-3 mr-2" />
                  Copiar Código
                </Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="bg-muted h-32 flex items-center justify-center">
                <Link className="h-10 w-10 text-primary" />
              </div>
              <CardContent className="pt-4">
                <h3 className="font-medium mb-1">Banner 160x600</h3>
                <p className="text-xs text-muted-foreground mb-2">Banner vertical</p>
                <Button className="w-full" size="sm">
                  <Copy className="h-3 w-3 mr-2" />
                  Copiar Código
                </Button>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="commissions" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Suas Comissões</CardTitle>
            <CardDescription>Histórico detalhado das suas comissões</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-5 p-4 font-medium border-b bg-muted/50">
                <div>Cliente</div>
                <div>Serviço</div>
                <div>Data</div>
                <div>Valor</div>
                <div>Status</div>
              </div>
              
              <div className="p-8 text-center text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
                <p>Nenhuma comissão registrada</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="payments" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Pagamentos</CardTitle>
            <CardDescription>Pagamentos de comissões realizados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-4 p-4 font-medium border-b bg-muted/50">
                <div>Data</div>
                <div>Referência</div>
                <div>Método</div>
                <div>Valor</div>
              </div>
              
              <div className="p-8 text-center text-muted-foreground">
                <Wallet className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
                <p>Nenhum pagamento realizado</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Configurações de Pagamento</CardTitle>
            <CardDescription>Configure como deseja receber suas comissões</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Método de Pagamento</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Transferência Bancária</option>
                  <option>Crédito na Conta</option>
                </select>
              </div>
              
              <Button>Salvar Configurações</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
