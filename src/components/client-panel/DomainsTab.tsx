
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Globe, Check, X } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useClientDashboardContext } from '@/context/ClientDashboardContext';

export const DomainsTab = () => {
  const { services } = useClientDashboardContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meus Domínios</CardTitle>
        <CardDescription>
          Gerencie seus domínios registrados
        </CardDescription>
      </CardHeader>
      <CardContent>
        {services.domains && services.domains.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Domínio</th>
                  <th className="text-left py-3 px-2">Data de Registro</th>
                  <th className="text-left py-3 px-2">Expiração</th>
                  <th className="text-left py-3 px-2">Status</th>
                  <th className="text-left py-3 px-2">Renovação Auto.</th>
                </tr>
              </thead>
              <tbody>
                {services.domains.map((domain: any) => (
                  <tr key={domain.id} className="border-b">
                    <td className="py-3 px-2 font-medium">{domain.name}.{domain.tld}</td>
                    <td className="py-3 px-2">
                      {domain.registration_date ? 
                        new Date(domain.registration_date).toLocaleDateString('pt-AO') : 'N/A'}
                    </td>
                    <td className="py-3 px-2">
                      {domain.expiry_date ? 
                        new Date(domain.expiry_date).toLocaleDateString('pt-AO') : 'N/A'}
                    </td>
                    <td className="py-3 px-2">
                      <Badge variant={
                        domain.status === 'active' ? 'success' : 
                        domain.status === 'pending' ? 'warning' : 'default'
                      }>
                        {domain.status === 'active' ? 'Ativo' : 
                        domain.status === 'pending' ? 'Pendente' : domain.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-2">
                      {domain.auto_renew ? 
                        <Check className="h-4 w-4 text-green-500" /> : 
                        <X className="h-4 w-4 text-red-500" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex items-center justify-center p-12">
            <div className="text-center">
              <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium">Nenhum domínio registrado</h3>
              <p className="text-gray-600 mt-2 mb-6">
                Você ainda não tem domínios registrados na sua conta.
              </p>
              <Button asChild>
                <Link to="/dominios/registrar">Registrar Domínio</Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
