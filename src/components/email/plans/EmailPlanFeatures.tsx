
import React from 'react';
import { Check } from "lucide-react";

interface EmailPlanFeaturesProps {
  features: string[];
}

export const EmailPlanFeatures: React.FC<EmailPlanFeaturesProps> = ({ features }) => {
  return (
    <ul className="mt-6 space-y-4">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <div className="flex-shrink-0">
            <Check className="h-5 w-5 text-green-500" />
          </div>
          <p className="ml-3 text-sm text-gray-700">{feature}</p>
        </li>
      ))}
    </ul>
  );
};
