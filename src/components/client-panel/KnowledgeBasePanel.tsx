
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, Book, BookOpen, FileQuestion, ChevronRight,
  ArrowRight, Network, Database, Globe, Mail, Server
} from 'lucide-react';

export const KnowledgeBasePanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = [
    { id: 1, name: 'Hospedagem Web', icon: Server, count: 24 },
    { id: 2, name: 'Domínios', icon: Globe, count: 18 },
    { id: 3, name: 'Email', icon: Mail, count: 15 },
    { id: 4, name: 'Banco de Dados', icon: Database, count: 10 },
    { id: 5, name: 'Redes e DNS', icon: Network, count: 8 }
  ];
  
  const popularArticles = [
    { id: 1, title: 'Como configurar registros DNS para o seu domínio', views: 1250 },
    { id: 2, title: 'Transferir um domínio para a AngoHost', views: 980 },
    { id: 3, title: 'Configurar o email no Microsoft Outlook', views: 875 },
    { id: 4, title: 'Problemas comuns ao instalar o WordPress', views: 760 },
    { id: 5, title: 'Como criar uma conta de email no cPanel', views: 650 }
  ];
  
  const recentArticles = [
    { id: 1, title: 'Guia de segurança para seu site WordPress', date: '20/04/2025' },
    { id: 2, title: 'Dicas para melhorar o desempenho do seu site', date: '15/04/2025' },
    { id: 3, title: 'Como fazer backup do seu site via cPanel', date: '10/04/2025' },
    { id: 4, title: 'Configurando certificado SSL gratuito', date: '05/04/2025' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <h2 className="text-2xl font-bold mb-2">Base de Conhecimento</h2>
            <p className="text-muted-foreground mb-4">
              Encontre soluções, tutoriais e respostas para perguntas frequentes
            </p>
            
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Buscar por tutoriais, artigos ou perguntas..."
                className="pl-10 py-6 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-3">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">Guias e Tutoriais</h3>
                  <p className="text-sm text-muted-foreground">
                    Aprenda passo a passo com nossos tutoriais detalhados
                  </p>
                  <Button variant="link" className="mt-2">
                    Ver Tutoriais <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-3">
                    <FileQuestion className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">Perguntas Frequentes</h3>
                  <p className="text-sm text-muted-foreground">
                    Respostas rápidas para as dúvidas mais comuns
                  </p>
                  <Button variant="link" className="mt-2">
                    Ver FAQ <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-3">
                    <Book className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">Documentação Técnica</h3>
                  <p className="text-sm text-muted-foreground">
                    Informações detalhadas sobre nossas APIs e serviços
                  </p>
                  <Button variant="link" className="mt-2">
                    Ver Documentação <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Categorias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer">
                    <div className="flex items-center">
                      <category.icon className="h-5 w-5 mr-3 text-primary" />
                      <span>{category.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-muted-foreground/20 px-2 py-0.5 rounded-full text-xs mr-2">{category.count}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Artigos Populares</CardTitle>
              <CardDescription>Os artigos mais visualizados pelos usuários</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {popularArticles.map(article => (
                  <div key={article.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-3 text-primary" />
                      <span>{article.title}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <span>{article.views} visualizações</span>
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Artigos Recentes</CardTitle>
              <CardDescription>Conteúdo adicionado recentemente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentArticles.map(article => (
                  <div key={article.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer">
                    <div className="flex items-center">
                      <Book className="h-4 w-4 mr-3 text-primary" />
                      <span>{article.title}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <span>{article.date}</span>
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
