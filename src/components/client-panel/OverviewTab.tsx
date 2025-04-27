
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { User, Globe, Mail, CreditCard, Server } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useClientDashboardContext } from '@/context/ClientDashboardContext';

export const OverviewTab = () => {
  const { customerData, orders } = useClientDashboardContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 h-5 w-5" />
            Informações da Conta
          </CardTitle>
        </CardHeader>
        <CardContent>
          {customerData ? (
            <div className="space-y-2">
              <p><span className="font-medium">Nome:</span> {customerData.name}</p>
              <p><span className="font-medium">Email:</span> {customerData.email}</p>
              <p><span className="font-medium">Telefone:</span> {customerData.phone || 'Não informado'}</p>
              <p><span className="font-medium">NIF:</span> {customerData.nif || 'Não informado'}</p>
            </div>
          ) : (
            <p>Faça login para ver suas informações</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button asChild className="w-full" variant="outline">
              <Link to="/dominios/registrar">
                <Globe className="mr-2 h-4 w-4" />
                Registrar Novo Domínio
              </Link>
            </Button>

            <Button asChild className="w-full" variant="outline">
              <Link to="/email/profissional">
                <Mail className="mr-2 h-4 w-4" />
                Adicionar Email Profissional
              </Link>
            </Button>

            <Button asChild className="w-full bg-primary hover:bg-primary/90">
              <Link to="/carrinho">
                <CreditCard className="mr-2 h-4 w-4" />
                Ir para Carrinho
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Últimos Pedidos</CardTitle>
          <CardDescription>Seus pedidos recentes e status</CardDescription>
        </CardHeader>
        <CardContent>
          {orders && orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">Número</th>
                    <th className="text-left py-3 px-2">Data</th>
                    <th className="text-left py-3 px-2">Valor</th>
                    <th className="text-left py-3 px-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((order: any) => (
                    <tr key={order.id} className="border-b">
                      <td className="py-3 px-2">{order.invoice_number || 'N/A'}</td>
                      <td className="py-3 px-2">
                        {new Date(order.created_at).toLocaleDateString('pt-AO')}
                      </td>
                      <td className="py-3 px-2">
                        {(order.total_amount / 100).toLocaleString('pt-AO')} AKZ
                      </td>
                      <td className="py-3 px-2">
                        <Badge variant={
                          order.status === 'completed' ? 'success' : 
                          order.status === 'pending_payment' ? 'warning' : 'default'
                        }>
                          {order.status === 'completed' ? 'Concluído' : 
                          order.status === 'pending_payment' ? 'Aguardando Pagamento' : 
                          order.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex items-center justify-center p-12">
              <div className="text-center">
                <Server className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium">Nenhum pedido</h3>
                <p className="text-gray-600 mt-2 mb-6">
                  Você ainda não fez nenhum pedido.
                </p>
                <Button asChild>
                  <Link to="/">Ver Produtos</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
