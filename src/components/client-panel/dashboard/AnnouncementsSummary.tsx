
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Clock } from "lucide-react";

export const AnnouncementsSummary = () => {
  return (
    <Card>
      <CardHeader>
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
  );
};
