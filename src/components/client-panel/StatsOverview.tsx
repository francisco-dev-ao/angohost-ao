
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useClientPanel } from '@/hooks/useClientPanel';

interface StatsOverviewProps {
  accountBalance: number | null;
}

export const StatsOverview = ({ accountBalance }: StatsOverviewProps) => {
  const { addFunds } = useClientPanel();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [fundAmount, setFundAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddFunds = async () => {
    if (fundAmount <= 0) {
      toast.error("Por favor, insira um valor válido");
      return;
    }
    
    setIsLoading(true);
    try {
      const success = await addFunds(fundAmount);
      if (success) {
        setIsDialogOpen(false);
        setFundAmount(0);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-500 to-teal-600 shadow-md">
      <div className="container max-w-7xl mx-auto py-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center text-white">
            <h3 className="text-3xl font-bold">2</h3>
            <p className="text-sm text-center">Produto e serviço</p>
            <Link to="/client-panel?tab=services" className="text-xs underline mt-1 hover:text-white/80">
              Todos os produtos e serviços
            </Link>
          </div>
          
          <div className="bg-blue-500/90 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center text-white">
            <h3 className="text-3xl font-bold">0</h3>
            <p className="text-sm text-center">Domain Names</p>
            <Link to="/client-panel?tab=domains" className="text-xs underline mt-1 hover:text-white/80">
              Todos os domínios
            </Link>
          </div>
          
          <div className="bg-red-500/90 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center text-white">
            <h3 className="text-3xl font-bold">0</h3>
            <p className="text-sm text-center">Faturas não pagas</p>
            <Link to="/client-panel?tab=invoices" className="text-xs underline mt-1 hover:text-white/80">
              Todas as faturas
            </Link>
          </div>
          
          <div className="bg-gray-600/90 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center text-white">
            <h3 className="text-3xl font-bold">0</h3>
            <p className="text-sm text-center">Active Support Tickets</p>
            <Link to="/client-panel?tab=tickets" className="text-xs underline mt-1 hover:text-white/80">
              Abrir Ticket de Suporte
            </Link>
          </div>
          
          <div className="bg-teal-500/90 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center text-white">
            <h3 className="text-3xl font-bold">{accountBalance ? `${accountBalance}kz` : "0kz"}</h3>
            <p className="text-sm text-center">Saldo de conta</p>
            <button 
              onClick={() => setIsDialogOpen(true)} 
              className="text-xs underline mt-1 hover:text-white/80 bg-transparent border-0 p-0 cursor-pointer"
            >
              Adicionar Fundos
            </button>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar Fundos</DialogTitle>
            <DialogDescription>
              Adicione fundos à sua conta para pagar por serviços e renovações.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Valor
              </Label>
              <Input
                id="amount"
                type="number"
                value={fundAmount}
                onChange={(e) => setFundAmount(Number(e.target.value))}
                min="0"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddFunds} disabled={isLoading}>
              {isLoading ? "Processando..." : "Adicionar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
