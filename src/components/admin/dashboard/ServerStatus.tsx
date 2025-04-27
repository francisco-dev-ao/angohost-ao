
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

export const ServerStatus = () => {
  const servers = [
    { 
      name: 'Servidor Web Principal',
      status: 'online',
      uptime: '99.98%',
      load: 42
    },
    { 
      name: 'Servidor de Banco de Dados',
      status: 'online',
      uptime: '99.95%',
      load: 38
    },
    { 
      name: 'Servidor de Email',
      status: 'online',
      uptime: '99.92%',
      load: 27
    },
    { 
      name: 'Servidor de Backup',
      status: 'online',
      uptime: '100%',
      load: 15
    },
  ];

  // Helper function to map server status to valid badge variants
  const getStatusVariant = (status: string): "default" | "destructive" | "outline" | "secondary" => {
    if (status === 'online') return "secondary";
    if (status === 'offline') return "destructive";
    return "outline";
  };

  return (
    <div className="space-y-4">
      {servers.map((server, index) => (
        <div key={index}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="font-medium">{server.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={getStatusVariant(server.status)} className="text-xs capitalize">
                  {server.status}
                </Badge>
                <span className="text-xs text-muted-foreground">Uptime: {server.uptime}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={server.load} className="h-2" />
            <span className="text-xs font-medium w-8">{server.load}%</span>
          </div>
          {index < servers.length - 1 && (
            <Separator className="my-4" />
          )}
        </div>
      ))}
    </div>
  );
};
