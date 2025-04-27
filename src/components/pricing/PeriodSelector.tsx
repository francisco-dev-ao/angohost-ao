
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PeriodSelectorProps {
  selectedPeriod: string;
  onPeriodChange: (value: string) => void;
  getPeriodText: (period: string) => string;
}

export const PeriodSelector = ({ selectedPeriod, onPeriodChange, getPeriodText }: PeriodSelectorProps) => {
  return (
    <div className="mt-4">
      <Select value={selectedPeriod} onValueChange={onPeriodChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Periodo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">1 Ano (10% desconto)</SelectItem>
          <SelectItem value="2">2 Anos (15% desconto)</SelectItem>
          <SelectItem value="3">3 Anos (20% desconto)</SelectItem>
          <SelectItem value="5">5 Anos (25% desconto)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
