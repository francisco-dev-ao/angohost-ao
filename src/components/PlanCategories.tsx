
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Package2, Globe, Mail, Grid2X2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    title: "Hospedagem Web",
    description: "Planos de hospedagem otimizados para seu site",
    icon: <Package2 className="h-8 w-8 text-primary" />,
    link: "/hospedagem/cpanel"
  },
  {
    title: "Domínios",
    description: "Registre seu domínio .AO e outros TLDs",
    icon: <Globe className="h-8 w-8 text-primary" />,
    link: "/dominios/registrar"
  },
  {
    title: "Email Profissional",
    description: "Soluções de email corporativo",
    icon: <Mail className="h-8 w-8 text-primary" />,
    link: "/email/profissional"
  },
  {
    title: "Servidores Dedicados",
    description: "Servidores de alto desempenho",
    icon: <Grid2X2 className="h-8 w-8 text-primary" />,
    link: "/servidores-dedicados"
  }
];

const PlanCategories = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category, index) => (
        <Link key={index} to={category.link}>
          <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="mb-4">
                {category.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
              <p className="text-sm text-gray-600">{category.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default PlanCategories;
