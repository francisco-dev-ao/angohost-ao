
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DomainSearchForm from '@/components/DomainSearchForm';
import { Globe, Check } from 'lucide-react';

const RegisterDomain = () => {
  const [activeTab, setActiveTab] = useState('search');
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Registrar Domínio</h1>
        <p className="text-gray-600 mb-8">
          Registre seu domínio .AO e estabeleça sua presença online em Angola.
        </p>
        
        <Tabs defaultValue="search" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">Pesquisar Domínio</TabsTrigger>
            <TabsTrigger value="info">Informações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="search" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Encontre o domínio perfeito</CardTitle>
                <CardDescription>
                  Verifique a disponibilidade de domínios .AO, .CO.AO, .IT.AO e outros.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DomainSearchForm />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="info" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações sobre Domínios .AO</CardTitle>
                <CardDescription>
                  Tudo o que você precisa saber sobre o registro de domínios em Angola.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Extensões Disponíveis</h3>
                    <p className="text-gray-600 mb-4">
                      Oferecemos registro para as seguintes extensões de domínio angolanas:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <li className="flex items-center space-x-2">
                        <Check className="h-5 w-5 text-green-500" />
                        <span>.co.ao - Para empresas e organizações comerciais</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="h-5 w-5 text-green-500" />
                        <span>.ao - Domínio nacional de Angola</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="h-5 w-5 text-green-500" />
                        <span>.it.ao - Para empresas de tecnologia</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="h-5 w-5 text-green-500" />
                        <span>.edu.ao - Para instituições educacionais</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Preços</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="py-2 px-4 text-left">Extensão</th>
                            <th className="py-2 px-4 text-left">Registro (1º ano)</th>
                            <th className="py-2 px-4 text-left">Renovação (anos seguintes)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2 px-4">.co.ao</td>
                            <td className="py-2 px-4">35.000 Kz</td>
                            <td className="py-2 px-4">35.000 Kz</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 px-4">.ao</td>
                            <td className="py-2 px-4">25.000 Kz</td>
                            <td className="py-2 px-4">25.000 Kz</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 px-4">.it.ao</td>
                            <td className="py-2 px-4">35.000 Kz</td>
                            <td className="py-2 px-4">35.000 Kz</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 px-4">.edu.ao</td>
                            <td className="py-2 px-4">35.000 Kz</td>
                            <td className="py-2 px-4">35.000 Kz</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 px-4">Domínios com 3 letras</td>
                            <td className="py-2 px-4">300.000 Kz</td>
                            <td className="py-2 px-4">25.000 Kz - 35.000 Kz</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Requisitos para Registro</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>Para empresas: CNPJ/NIF angolano válido</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>Para pessoas físicas: Bilhete de Identidade angolano</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>Informações de contato válidas (endereço, email, telefone)</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Vantagens de um Domínio .AO</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Globe className="h-5 w-5 text-angohost-600 mr-2" />
                          <h4 className="font-medium">Identidade Local</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Demonstre sua presença e compromisso com o mercado angolano.
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Globe className="h-5 w-5 text-angohost-600 mr-2" />
                          <h4 className="font-medium">Melhor SEO Local</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Melhor posicionamento em buscas feitas em Angola.
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Globe className="h-5 w-5 text-angohost-600 mr-2" />
                          <h4 className="font-medium">Confiabilidade</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Transmita credibilidade aos seus clientes angolanos.
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Globe className="h-5 w-5 text-angohost-600 mr-2" />
                          <h4 className="font-medium">Proteção da Marca</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Garanta sua presença online em Angola antes da concorrência.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center mt-8">
                    <Button 
                      onClick={() => setActiveTab('search')}
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      Verificar Disponibilidade de Domínio
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RegisterDomain;
