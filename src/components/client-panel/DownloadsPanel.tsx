
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, FileText, FileCode, Monitor, Server
} from 'lucide-react';

export const DownloadsPanel = () => {
  const downloads = [
    {
      id: 1,
      title: 'Manual do cPanel',
      description: 'Guia completo de utilização do cPanel',
      icon: FileText,
      type: 'PDF',
      size: '2.4 MB',
      updated: '15/03/2025'
    },
    {
      id: 2,
      title: 'Configuração FTP para Windows',
      description: 'Tutorial de instalação e configuração de cliente FTP',
      icon: Monitor,
      type: 'PDF',
      size: '1.8 MB',
      updated: '10/03/2025'
    },
    {
      id: 3,
      title: 'Theme AngoHost para WordPress',
      description: 'Template exclusivo da AngoHost para WordPress',
      icon: FileCode,
      type: 'ZIP',
      size: '4.5 MB',
      updated: '02/04/2025'
    },
    {
      id: 4,
      title: 'Plugin WordPress de Otimização',
      description: 'Plugin exclusivo para otimizar sites WordPress',
      icon: FileCode,
      type: 'ZIP',
      size: '1.2 MB',
      updated: '05/04/2025'
    },
    {
      id: 5,
      title: 'Guia de Segurança do Servidor',
      description: 'Melhores práticas para segurança em servidores',
      icon: Server,
      type: 'PDF',
      size: '3.1 MB',
      updated: '20/03/2025'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Downloads</CardTitle>
        <CardDescription>Acesso a manuais, tutoriais e ferramentas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {downloads.map(download => (
            <Card key={download.id} className="overflow-hidden">
              <div className="bg-muted p-4 flex items-center justify-center">
                <download.icon className="h-10 w-10 text-primary" />
              </div>
              <CardContent className="pt-4">
                <h3 className="font-medium mb-1">{download.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{download.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div>
                    <span className="font-medium">{download.type}</span> • {download.size}
                  </div>
                  <div>
                    Atualizado: {download.updated}
                  </div>
                </div>
                <Button className="w-full mt-3">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
