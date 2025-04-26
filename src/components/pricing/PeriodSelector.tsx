
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
          <SelectItem value="1">{getPeriodText("1")}</SelectItem>
          <SelectItem value="2">{getPeriodText("2")}</SelectItem>
          <SelectItem value="3">{getPeriodText("3")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
