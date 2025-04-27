
import React from 'react';
import { Button } from '@/components/ui/button';

interface PeriodSelectorProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

export const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  selectedPeriod,
  onPeriodChange,
}) => {
  return (
    <div className="w-full border-t border-gray-200 pt-4">
      <div className="flex justify-between">
        <span className="text-gray-600">Período:</span>
        <div className="space-x-2">
          <Button 
            variant={selectedPeriod === "1" ? "default" : "outline"} 
            size="sm"
            onClick={() => onPeriodChange("1")}
          >
            1 ano
          </Button>
          <Button 
            variant={selectedPeriod === "2" ? "default" : "outline"} 
            size="sm"
            onClick={() => onPeriodChange("2")}
          >
            2 anos (10% desc.)
          </Button>
          <Button 
            variant={selectedPeriod === "3" ? "default" : "outline"} 
            size="sm"
            onClick={() => onPeriodChange("3")}
          >
            3 anos (20% desc.)
          </Button>
        </div>
      </div>
    </div>
  );
};
