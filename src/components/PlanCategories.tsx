import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Package2, Globe, Mail, Grid2X2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/lib/animations';

const categories = [
  {
    title: "Hospedagem Web",
    description: "Planos de hospedagem otimizados para seu site",
    icon: <Package2 className="h-12 w-12 text-primary" />,
    link: "/hospedagem/cpanel",
    bgColor: "bg-gradient-to-br from-blue-50 to-blue-100"
  },
  {
    title: "Domínios",
    description: "Registre seu domínio .AO e outros TLDs",
    icon: <Globe className="h-12 w-12 text-primary" />,
    link: "/dominios/registrar",
    bgColor: "bg-gradient-to-br from-green-50 to-green-100"
  },
  {
    title: "Email Profissional",
    description: "Soluções de email corporativo",
    icon: <Mail className="h-12 w-12 text-primary" />,
    link: "/email/profissional",
    bgColor: "bg-gradient-to-br from-orange-50 to-orange-100"
  },
  {
    title: "Servidores Dedicados",
    description: "Servidores de alto desempenho",
    icon: <Grid2X2 className="h-12 w-12 text-primary" />,
    link: "/servidores-dedicados",
    bgColor: "bg-gradient-to-br from-purple-50 to-purple-100"
  }
];

const PlanCategories = () => {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {categories.map((category, index) => (
        <motion.div key={index} variants={itemVariants}>
          <Link to={category.link}>
            <Card className={`h-full transition-all duration-300 hover:shadow-lg border-2 hover:border-primary hover:scale-105 overflow-hidden ${category.bgColor}`}>
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="mb-6 bg-white/70 p-4 rounded-full shadow-md">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{category.title}</h3>
                <p className="text-gray-600">{category.description}</p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PlanCategories;
