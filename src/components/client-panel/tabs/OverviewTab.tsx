
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  Server, 
  CircleDollarSign, 
  LifeBuoy, 
  ChevronRight, 
  PlusCircle,
  AlertCircle
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { PaymentInfoCard } from '../PaymentInfoCard';
import { Link } from 'react-router-dom';

interface OverviewTabProps {
  userData: any;
  services: any[];
  domains: any[];
  invoices: any[];
}

export const OverviewTab = ({ userData, services, domains, invoices }: OverviewTabProps) => {
  const pendingInvoices = invoices?.filter(invoice => invoice.status === 'unpaid' || invoice.status === 'pending') || [];
  const expiringDomains = domains?.filter(domain => {
    if (!domain.expiry_date) return false;
    const expiryDate = new Date(domain.expiry_date);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return expiryDate <= thirtyDaysFromNow;
  }) || [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-AO');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-6">
        {/* Notifications and Alerts */}
        {(pendingInvoices.length > 0 || expiringDomains.length > 0) && (
          <Card className="border-amber-200 bg-amber-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-800">Notificações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingInvoices.length > 0 && (
                <Alert className="bg-white border-amber-200">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertTitle className="text-amber-800">Faturas Pendentes</AlertTitle>
                  <AlertDescription className="text-amber-700">
                    <p>Você possui {pendingInvoices.length} {pendingInvoices.length === 1 ? 'fatura pendente' : 'faturas pendentes'} de pagamento.</p>
                    <Button variant="outline" className="mt-2" asChild>
                      <Link to="/painel-cliente/faturas">
                        Ver Faturas
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </AlertDescription>
                </Alert>
              )}

              {expiringDomains.length > 0 && (
                <Alert className="bg-white border-amber-200">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertTitle className="text-amber-800">Domínios a Expirar</AlertTitle>
                  <AlertDescription className="text-amber-700">
                    <p>Você possui {expiringDomains.length} {expiringDomains.length === 1 ? 'domínio' : 'domínios'} que expirarão em breve:</p>
                    <ul className="list-disc list-inside mt-2">
                      {expiringDomains.slice(0, 3).map(domain => (
                        <li key={domain.id}>
                          {domain.name}.{domain.tld} - Expira em {formatDate(domain.expiry_date)}
                        </li>
                      ))}
                      {expiringDomains.length > 3 && (
                        <li>e {expiringDomains.length - 3} mais...</li>
                      )}
                    </ul>
                    <Button variant="outline" className="mt-2" asChild>
                      <Link to="/painel-cliente/dominios">
                        Gerenciar Domínios
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}

        {/* Domains Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Globe className="mr-2 h-5 w-5 text-primary" />
              Meus Domínios
            </CardTitle>
            <CardDescription>
              {domains?.length > 0 
                ? `Você possui ${domains.length} ${domains.length === 1 ? 'domínio registrado' : 'domínios registrados'}`
                : 'Você ainda não possui domínios registrados'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {domains && domains.length > 0 ? (
              <div className="space-y-4">
                {domains.slice(0, 3).map((domain) => (
                  <div key={domain.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">
                        {domain.name}.{domain.tld}
                      </h3>
                      <span className={`text-sm ${domain.status === 'active' ? 'text-green-600' : 'text-amber-600'}`}>
                        {domain.status === 'active' ? 'Ativo' : 
                         domain.status === 'pending' ? 'Pendente' : 
                         domain.status.charAt(0).toUpperCase() + domain.status.slice(1)}
                      </span>
                    </div>
                    {domain.expiry_date && (
                      <p className="text-sm text-gray-500 mt-1">
                        Expira em {formatDate(domain.expiry_date)}
                      </p>
                    )}
                  </div>
                ))}
                {domains.length > 3 && (
                  <p className="text-sm text-gray-500 text-center">
                    +{domains.length - 3} {domains.length - 3 === 1 ? 'domínio' : 'domínios'} adicionais
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500 mb-4">Você ainda não possui domínios registrados</p>
                <Button asChild>
                  <Link to="/dominios/registrar">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Registrar um Domínio
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
          {domains && domains.length > 0 && (
            <CardFooter>
              <div className="w-full flex flex-col sm:flex-row gap-2">
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/painel-cliente/dominios">
                    Ver Todos os Domínios
                  </Link>
                </Button>
                <Button className="flex-1" asChild>
                  <Link to="/dominios/registrar">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Registrar Novo
                  </Link>
                </Button>
              </div>
            </CardFooter>
          )}
        </Card>

        {/* Services Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Server className="mr-2 h-5 w-5 text-primary" />
              Meus Serviços
            </CardTitle>
            <CardDescription>
              {services?.length > 0 
                ? `Você possui ${services.length} ${services.length === 1 ? 'serviço ativo' : 'serviços ativos'}`
                : 'Você ainda não possui serviços ativos'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {services && services.length > 0 ? (
              <div className="space-y-4">
                {services.slice(0, 3).map((service) => (
                  <div key={service.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">
                        {service.plan_name || 'Hospedagem Web'}
                      </h3>
                      <span className={`text-sm ${service.status === 'active' ? 'text-green-600' : 'text-amber-600'}`}>
                        {service.status === 'active' ? 'Ativo' : 
                         service.status === 'pending' ? 'Pendente' : 
                         service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                      </span>
                    </div>
                    {service.domain && (
                      <p className="text-sm text-gray-500 mt-1">
                        {service.domain}
                      </p>
                    )}
                  </div>
                ))}
                {services.length > 3 && (
                  <p className="text-sm text-gray-500 text-center">
                    +{services.length - 3} {services.length - 3 === 1 ? 'serviço' : 'serviços'} adicionais
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500 mb-4">Você ainda não possui serviços ativos</p>
                <Button asChild>
                  <Link to="/hospedagem">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Contratar Hospedagem
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
          {services && services.length > 0 && (
            <CardFooter>
              <div className="w-full flex flex-col sm:flex-row gap-2">
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/painel-cliente/hospedagem">
                    Ver Todos os Serviços
                  </Link>
                </Button>
                <Button className="flex-1" asChild>
                  <Link to="/hospedagem">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Contratar Novo
                  </Link>
                </Button>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <PaymentInfoCard />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LifeBuoy className="mr-2 h-5 w-5 text-primary" />
              Suporte Técnico
            </CardTitle>
            <CardDescription>
              Precisa de ajuda? Nossa equipe está pronta para lhe atender.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center border rounded-md p-3 bg-gray-50">
                <CircleDollarSign className="h-5 w-5 text-primary mr-3" />
                <div>
                  <p className="font-medium">Pagamentos</p>
                  <p className="text-sm text-gray-500">Dúvidas sobre faturas e pagamentos</p>
                </div>
              </div>
              <div className="flex items-center border rounded-md p-3 bg-gray-50">
                <Server className="h-5 w-5 text-primary mr-3" />
                <div>
                  <p className="font-medium">Hospedagem</p>
                  <p className="text-sm text-gray-500">Problemas ou dúvidas técnicas</p>
                </div>
              </div>
              <div className="flex items-center border rounded-md p-3 bg-gray-50">
                <Globe className="h-5 w-5 text-primary mr-3" />
                <div>
                  <p className="font-medium">Domínios</p>
                  <p className="text-sm text-gray-500">Transferência ou configuração de domínios</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link to="/painel-cliente/suporte">
                Abrir Novo Ticket
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
