
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, PlusCircle, Book, BookOpen, BookText, FolderPlus, 
  Eye, Edit, Trash2, ChevronDown, ChevronUp 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AdminKnowledgeBase = () => {
  const [activeTab, setActiveTab] = useState('articles');
  const [expandedCategory, setExpandedCategory] = useState<number | null>(1);
  
  // Sample categories
  const categories = [
    {
      id: 1,
      name: 'Hospedagem',
      icon: <Server className="h-4 w-4" />,
      articleCount: 8,
    },
    {
      id: 2,
      name: 'Domínios',
      icon: <Globe className="h-4 w-4" />,
      articleCount: 5,
    },
    {
      id: 3,
      name: 'Email',
      icon: <Mail className="h-4 w-4" />,
      articleCount: 4,
    },
    {
      id: 4,
      name: 'Faturamento',
      icon: <CreditCard className="h-4 w-4" />,
      articleCount: 6,
    },
    {
      id: 5,
      name: 'Segurança',
      icon: <Shield className="h-4 w-4" />,
      articleCount: 3,
    },
  ];
  
  // Sample articles
  const articles = [
    {
      id: 1,
      title: 'Como transferir um domínio para a AngoHost',
      category: 'Domínios',
      author: 'Admin',
      views: 1245,
      createdAt: '2023-04-15',
      updatedAt: '2023-06-20',
      visibility: 'public'
    },
    {
      id: 2,
      title: 'Como configurar o email no Outlook',
      category: 'Email',
      author: 'Admin',
      views: 2560,
      createdAt: '2023-03-10',
      updatedAt: '2023-05-15',
      visibility: 'public'
    },
    {
      id: 3,
      title: 'Como acessar o cPanel da sua hospedagem',
      category: 'Hospedagem',
      author: 'Admin',
      views: 3280,
      createdAt: '2023-02-05',
      updatedAt: '2023-04-20',
      visibility: 'public'
    },
    {
      id: 4,
      title: 'Como gerar uma segunda via da fatura',
      category: 'Faturamento',
      author: 'Admin',
      views: 1850,
      createdAt: '2023-01-20',
      updatedAt: '2023-03-15',
      visibility: 'public'
    },
    {
      id: 5,
      title: 'Como proteger seu site contra invasões',
      category: 'Segurança',
      author: 'Admin',
      views: 980,
      createdAt: '2023-05-08',
      updatedAt: '2023-06-10',
      visibility: 'public'
    },
  ];

  const toggleCategory = (id: number) => {
    if (expandedCategory === id) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">Base de Conhecimento</h2>
          <p className="text-muted-foreground">Gerencie artigos, tutoriais e anúncios para os clientes</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Buscar artigo..." className="pl-8 w-[200px]" />
          </div>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Novo Artigo
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="articles" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="articles" className="px-4">
            <BookOpen className="h-4 w-4 mr-2" />
            Artigos
          </TabsTrigger>
          <TabsTrigger value="categories" className="px-4">
            <FolderPlus className="h-4 w-4 mr-2" />
            Categorias
          </TabsTrigger>
          <TabsTrigger value="announcements" className="px-4">
            <BookText className="h-4 w-4 mr-2" />
            Anúncios
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="articles" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Título</th>
                      <th className="text-left py-3 px-4 font-medium">Categoria</th>
                      <th className="text-left py-3 px-4 font-medium">Autor</th>
                      <th className="text-left py-3 px-4 font-medium">Visualizações</th>
                      <th className="text-left py-3 px-4 font-medium">Data de Criação</th>
                      <th className="text-left py-3 px-4 font-medium">Última Atualização</th>
                      <th className="text-left py-3 px-4 font-medium">Visibilidade</th>
                      <th className="text-right py-3 px-4 font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.map((article) => (
                      <tr key={article.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900/10">
                        <td className="py-3 px-4 font-medium">{article.title}</td>
                        <td className="py-3 px-4">{article.category}</td>
                        <td className="py-3 px-4">{article.author}</td>
                        <td className="py-3 px-4">{article.views}</td>
                        <td className="py-3 px-4">{article.createdAt}</td>
                        <td className="py-3 px-4">{article.updatedAt}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            article.visibility === 'public' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {article.visibility === 'public' ? 'Público' : 'Privado'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Categorias</CardTitle>
                <CardDescription>Gerencie as categorias de artigos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            {category.icon}
                          </div>
                          <div>
                            <h4 className="font-medium">{category.name}</h4>
                            <p className="text-xs text-muted-foreground">
                              {category.articleCount} artigos
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => toggleCategory(category.id)}
                          >
                            {expandedCategory === category.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      {expandedCategory === category.id && (
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-sm mb-3">Artigos nesta categoria:</p>
                          <ul className="space-y-2 text-sm">
                            {articles
                              .filter(article => article.category === category.name)
                              .map(article => (
                                <li key={article.id} className="flex items-center justify-between">
                                  <span>{article.title}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {article.views} visualizações
                                  </span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <Button className="mt-4 w-full">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Nova Categoria
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Adicionar/Editar Categoria</CardTitle>
                <CardDescription>Crie ou edite uma categoria de artigos</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="category-name">
                      Nome da Categoria
                    </label>
                    <Input id="category-name" placeholder="Ex: Hospedagem, Domínios, etc." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="category-description">
                      Descrição
                    </label>
                    <textarea
                      id="category-description"
                      className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Breve descrição da categoria"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="category-icon">
                      Ícone
                    </label>
                    <div className="grid grid-cols-8 gap-2">
                      {["Book", "BookOpen", "BookText", "FileText", "File", "Globe", "Server", "Shield"].map(
                        (iconName) => (
                          <div
                            key={iconName}
                            className="flex items-center justify-center border rounded-md p-2 cursor-pointer hover:border-primary"
                          >
                            <Book className="h-5 w-5" />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">Salvar Categoria</Button>
                    <Button type="button" variant="outline" className="flex-1">Cancelar</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="announcements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Anúncios e Notícias</CardTitle>
              <CardDescription>Gerencie anúncios e notícias para os clientes</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Título</th>
                      <th className="text-left py-3 px-4 font-medium">Tipo</th>
                      <th className="text-left py-3 px-4 font-medium">Data</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-right py-3 px-4 font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-900/10">
                      <td className="py-3 px-4 font-medium">Manutenção Programada: 12/07/2023</td>
                      <td className="py-3 px-4">Manutenção</td>
                      <td className="py-3 px-4">09/07/2023</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Programado
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-900/10">
                      <td className="py-3 px-4 font-medium">Novos Planos de Hospedagem Disponíveis</td>
                      <td className="py-3 px-4">Notícia</td>
                      <td className="py-3 px-4">02/07/2023</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Publicado
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-900/10">
                      <td className="py-3 px-4 font-medium">Promoção de Domínios: 50% OFF</td>
                      <td className="py-3 px-4">Promoção</td>
                      <td className="py-3 px-4">15/06/2023</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Publicado
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-4">
                <Button className="w-full">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Novo Anúncio
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Import missing icons
import { Server, Globe, Mail, CreditCard, Shield } from 'lucide-react';
