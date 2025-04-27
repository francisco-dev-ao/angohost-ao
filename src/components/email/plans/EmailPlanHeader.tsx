
import React from 'react';

interface EmailPlanHeaderProps {
  title: string;
  isPopular: boolean;
}

export const EmailPlanHeader: React.FC<EmailPlanHeaderProps> = ({ title, isPopular }) => {
  return (
    <div className="relative">
      {isPopular && (
        <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg font-medium">
          Popular
        </span>
      )}
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
    </div>
  );
};
