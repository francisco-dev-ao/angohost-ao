
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RefreshCcw, DownloadIcon } from 'lucide-react';

interface OrderFiltersProps {
  dateFilter: string;
  setDateFilter: (value: string) => void;
  isLoading: boolean;
  onRefresh: () => void;
}

export const OrderFilters = ({ dateFilter, setDateFilter, isLoading, onRefresh }: OrderFiltersProps) => {
  return (
    <div className="flex items-center gap-2">
      <Select value={dateFilter} onValueChange={setDateFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Período" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Hoje</SelectItem>
          <SelectItem value="this-week">Esta Semana</SelectItem>
          <SelectItem value="this-month">Este Mês</SelectItem>
          <SelectItem value="last-month">Mês Passado</SelectItem>
          <SelectItem value="this-year">Este Ano</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" size="icon" onClick={onRefresh} disabled={isLoading}>
        <RefreshCcw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
      </Button>
      <Button variant="outline" size="sm">
        <DownloadIcon className="mr-2 h-4 w-4" />
        Exportar
      </Button>
    </div>
  );
};
