
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, CalendarDays, CalendarCheck } from 'lucide-react';

interface FinancialSummaryCardsProps {
  revenueToday: number;
  revenueMonth: number;
  revenueYear: number;
  loading?: boolean;
}

export const FinancialSummaryCards = ({
  revenueToday,
  revenueMonth,
  revenueYear,
  loading = false
}: FinancialSummaryCardsProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Hoje</p>
              {loading ? (
                <Skeleton className="h-8 w-28 mt-1 bg-blue-200" />
              ) : (
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-50">{formatCurrency(revenueToday)}</p>
              )}
            </div>
            <div className="rounded-full p-3 bg-blue-200 dark:bg-blue-800">
              <CalendarDays className="h-6 w-6 text-blue-700 dark:text-blue-300" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200 dark:border-emerald-800">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">Este Mês</p>
              {loading ? (
                <Skeleton className="h-8 w-28 mt-1 bg-emerald-200" />
              ) : (
                <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-50">{formatCurrency(revenueMonth)}</p>
              )}
            </div>
            <div className="rounded-full p-3 bg-emerald-200 dark:bg-emerald-800">
              <CalendarCheck className="h-6 w-6 text-emerald-700 dark:text-emerald-300" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-800 dark:text-purple-300">Este Ano</p>
              {loading ? (
                <Skeleton className="h-8 w-28 mt-1 bg-purple-200" />
              ) : (
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-50">{formatCurrency(revenueYear)}</p>
              )}
            </div>
            <div className="rounded-full p-3 bg-purple-200 dark:bg-purple-800">
              <TrendingUp className="h-6 w-6 text-purple-700 dark:text-purple-300" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
