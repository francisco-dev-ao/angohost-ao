
import React from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon,
  className 
}) => {
  return (
    <div className={cn(
      "feature-card rounded-xl bg-white p-6 shadow-sm border border-gray-100 transition-all duration-300",
      className
    )}>
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-angohost-100 text-angohost-600">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
