
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCustomerStatistics } from '@/hooks/useCustomerStatistics';
import { ServiceStatusCard } from '@/components/dashboard/ServiceStatusCard';
import { AlertCircle, Package, Globe, Receipt, FileText, Ticket, Bell, Clock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface DashboardOverviewProps {
  userData: any;
}

export const DashboardOverview = ({ userData }: DashboardOverviewProps) => {
  const { loading, serviceCounts, unpaidInvoices, spendingData } = useCustomerStatistics();

  return (
    <div className="grid gap-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>Ações mais frequentes no painel</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4">
              <Globe className="h-6 w-6 mb-2" />
              <span>Registrar Domínio</span>
            </Button>
            <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4">
              <Package className="h-6 w-6 mb-2" />
              <span>Comprar Hospedagem</span>
            </Button>
            <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4">
              <Ticket className="h-6 w-6 mb-2" />
              <span>Abrir Ticket</span>
            </Button>
            <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4">
              <Receipt className="h-6 w-6 mb-2" />
              <span>Pagar Fatura</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Service Summary */}
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle>Meus Serviços</CardTitle>
            <CardDescription>Status dos seus serviços ativos</CardDescription>
          </div>
          <Button variant="outline" size="sm">Ver Todos</Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ServiceStatusCard
              title="Hospedagem cPanel"
              description="Plano Profissional"
              status="active"
              expiryDate="20/12/2025"
              nextPayment="20/11/2025"
            />
            <ServiceStatusCard
              title="Hospedagem WordPress"
              description="Plano Básico"
              status="active"
              expiryDate="15/10/2025"
              nextPayment="15/09/2025"
            />
          </div>
        </CardContent>
      </Card>

      {/* Domain Summary */}
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle>Meus Domínios</CardTitle>
            <CardDescription>Status dos seus domínios registrados</CardDescription>
          </div>
          <Button variant="outline" size="sm">Ver Todos</Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-3 p-4 font-medium border-b">
              <div>Domínio</div>
              <div>Status</div>
              <div>Expira em</div>
            </div>
            <div className="p-8 text-center text-muted-foreground">
              <Globe className="h-10 w-10 mx-auto mb-3 text-muted-foreground/60" />
              <p>Você não tem domínios registrados</p>
              <Button variant="outline" size="sm" className="mt-4">
                Registrar Domínio
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Invoices */}
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle>Faturas Recentes</CardTitle>
            <CardDescription>Status dos seus pagamentos</CardDescription>
          </div>
          <Button variant="outline" size="sm">Ver Todas</Button>
        </CardHeader>
        <CardContent>
          {unpaidInvoices > 0 && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Você tem {unpaidInvoices} faturas pendentes. Por favor efetue o pagamento para manter seus serviços ativos.
              </AlertDescription>
            </Alert>
          )}

          <div className="rounded-md border">
            <div className="grid grid-cols-4 p-4 font-medium border-b">
              <div>Nº Fatura</div>
              <div>Data</div>
              <div>Valor</div>
              <div>Status</div>
            </div>
            <div className="p-8 text-center text-muted-foreground">
              <FileText className="h-10 w-10 mx-auto mb-3 text-muted-foreground/60" />
              <p>Nenhuma fatura encontrada</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Tickets */}
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle>Tickets de Suporte</CardTitle>
            <CardDescription>Seus tickets recentes</CardDescription>
          </div>
          <Button variant="outline" size="sm">Ver Todos</Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-4 p-4 font-medium border-b">
              <div>Assunto</div>
              <div>Data</div>
              <div>Status</div>
              <div>Última Atualização</div>
            </div>
            <div className="p-8 text-center text-muted-foreground">
              <Ticket className="h-10 w-10 mx-auto mb-3 text-muted-foreground/60" />
              <p>Nenhum ticket aberto</p>
              <Button variant="outline" size="sm" className="mt-4">
                Abrir Novo Ticket
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Announcements & Notifications */}
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle>Notícias e Comunicados</CardTitle>
            <CardDescription>Últimas atualizações da AngoHost</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-md flex items-start gap-4">
              <Bell className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium">Manutenção Agendada</h4>
                <p className="text-sm text-muted-foreground mb-1">
                  Haverá manutenção nos servidores de email no dia 30/04 entre 02:00 e 04:00.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Publicado: 25/04/2025</span>
                </div>
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-md flex items-start gap-4">
              <Bell className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium">Novos Planos de Hospedagem</h4>
                <p className="text-sm text-muted-foreground mb-1">
                  Lançamos novos planos de hospedagem com mais recursos e melhor performance.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Publicado: 20/04/2025</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
