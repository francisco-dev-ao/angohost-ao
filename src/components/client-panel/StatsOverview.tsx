
import React, { useState } from 'react';
import { 
  BarChart, ShoppingCart, CreditCard, Database, 
  Server, Clock, Plus, Mail, ArrowUpRight, Loader2 
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useClientPanel } from '@/hooks/useClientPanel';

interface StatsOverviewProps {
  accountBalance?: number;
}

export const StatsOverview = ({ accountBalance = 0 }: StatsOverviewProps) => {
  const [addFundsOpen, setAddFundsOpen] = useState(false);
  const [fundAmount, setFundAmount] = useState('25000');
  const [isLoading, setIsLoading] = useState(false);
  const { addFunds } = useClientPanel();

  const handleAddFunds = async () => {
    setIsLoading(true);
    try {
      const amount = parseInt(fundAmount);
      if (isNaN(amount) || amount <= 0) {
        alert('Por favor, insira um valor válido');
        return;
      }
      
      const success = await addFunds(amount);
      if (success) {
        setAddFundsOpen(false);
      }
    } catch (error) {
      console.error('Erro ao adicionar fundos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Format currency in Kwanzas
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 mt-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">Saldo da Conta</p>
                <h3 className="text-2xl font-bold text-blue-900 mt-1">{formatCurrency(accountBalance)}</h3>
              </div>
              <div className="bg-white p-2 rounded-full shadow">
                <BarChart className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            
            <Dialog open={addFundsOpen} onOpenChange={setAddFundsOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="mt-4 w-full bg-white hover:bg-blue-50 border-blue-200 text-blue-600 hover:text-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" /> 
                  Adicionar Fundos
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Adicionar Fundos</DialogTitle>
                  <DialogDescription>
                    Adicione fundos à sua conta para pagar por serviços e faturas.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="amount" className="text-right col-span-1">
                      Valor (Kz)
                    </label>
                    <Input
                      id="amount"
                      type="number"
                      value={fundAmount}
                      onChange={(e) => setFundAmount(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddFunds} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Processando...
                      </>
                    ) : (
                      'Prosseguir para Pagamento'
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Meus Serviços</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">2</h3>
                  <span className="text-sm text-gray-500">ativos</span>
                </div>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <Server className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 flex items-center">
                  <Database className="h-4 w-4 mr-1 text-emerald-500" />
                  Hospedagem
                </span>
                <span className="font-medium">1</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 flex items-center">
                  <Mail className="h-4 w-4 mr-1 text-blue-500" />
                  Email
                </span>
                <span className="font-medium">1</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Faturas Pendentes</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">2</h3>
                  <span className="text-sm text-gray-500">não pagas</span>
                </div>
              </div>
              <div className="bg-red-100 p-2 rounded-full">
                <CreditCard className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full" onClick={() => window.location.href = '/painel-cliente/faturas'}>
                <Clock className="h-4 w-4 mr-2" /> 
                Ver Faturas
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-emerald-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-800">Comprar Serviços</p>
                <h3 className="text-2xl font-bold text-emerald-900 mt-1">Loja</h3>
              </div>
              <div className="bg-white p-2 rounded-full shadow">
                <ShoppingCart className="h-6 w-6 text-emerald-500" />
              </div>
            </div>
            <Button 
              variant="outline"
              className="mt-4 w-full bg-white hover:bg-emerald-50 border-emerald-200 text-emerald-600 hover:text-emerald-700"
              onClick={() => window.location.href = '/loja'}
            >
              Ver Produtos <ArrowUpRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
