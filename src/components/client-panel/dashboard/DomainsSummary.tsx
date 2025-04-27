
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";
import { DomainsSummaryProps } from './types';

export const DomainsSummary = ({ domains = [] }: DomainsSummaryProps) => {
  return (
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
          {domains.length > 0 ? (
            domains.map((domain) => (
              <div key={domain.id} className="grid grid-cols-3 p-4 border-b last:border-0">
                <div>{domain.name}.{domain.tld}</div>
                <div>{domain.status}</div>
                <div>{new Date(domain.expiry_date).toLocaleDateString()}</div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <Globe className="h-10 w-10 mx-auto mb-3 text-muted-foreground/60" />
              <p>Você não tem domínios registrados</p>
              <Button variant="outline" size="sm" className="mt-4">
                Registrar Domínio
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
