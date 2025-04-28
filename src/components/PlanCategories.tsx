
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Database, RocketIcon, Shield, Server } from 'lucide-react';

interface PlanCategoryProps {
  title: string;
  description: string;
  features: string[];
  icon: string;
}

interface PlanCategoriesProps {
  categories: PlanCategoryProps[];
}

const PlanCategories: React.FC<PlanCategoriesProps> = ({ categories }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'rocket':
        return <RocketIcon className="h-8 w-8 text-blue-500" />;
      case 'database':
        return <Database className="h-8 w-8 text-blue-500" />;
      case 'shield':
        return <Shield className="h-8 w-8 text-blue-500" />;
      default:
        return <Server className="h-8 w-8 text-blue-500" />;
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map((category, index) => (
        <Card key={index} className="border-2 border-blue-100 hover:border-blue-300 transition-all">
          <CardContent className="pt-6">
            <div className="mb-4">
              {getIcon(category.icon)}
            </div>
            <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
            <p className="text-gray-600 mb-4">{category.description}</p>
            <ul className="space-y-2">
              {category.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PlanCategories;
