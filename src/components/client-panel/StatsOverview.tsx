
import React from 'react';
import { Link } from 'react-router-dom';

interface StatsOverviewProps {
  accountBalance: number | null;
}

export const StatsOverview = ({ accountBalance }: StatsOverviewProps) => {
  return (
    <div className="bg-gradient-to-r from-green-500 to-teal-600 shadow-md">
      <div className="container max-w-7xl mx-auto py-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center text-white">
            <h3 className="text-3xl font-bold">2</h3>
            <p className="text-sm text-center">Produto e serviço</p>
            <Link to="#" className="text-xs underline mt-1 hover:text-white/80">
              Todos os produtos e serviços
            </Link>
          </div>
          
          <div className="bg-blue-500/90 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center text-white">
            <h3 className="text-3xl font-bold">0</h3>
            <p className="text-sm text-center">Domain Names</p>
            <Link to="#" className="text-xs underline mt-1 hover:text-white/80">
              Todos os domínios
            </Link>
          </div>
          
          <div className="bg-red-500/90 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center text-white">
            <h3 className="text-3xl font-bold">0</h3>
            <p className="text-sm text-center">Faturas não pagas</p>
            <Link to="#" className="text-xs underline mt-1 hover:text-white/80">
              Todas as faturas
            </Link>
          </div>
          
          <div className="bg-gray-600/90 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center text-white">
            <h3 className="text-3xl font-bold">0</h3>
            <p className="text-sm text-center">Active Support Tickets</p>
            <Link to="#" className="text-xs underline mt-1 hover:text-white/80">
              Open Support Ticket
            </Link>
          </div>
          
          <div className="bg-teal-500/90 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center text-white">
            <h3 className="text-3xl font-bold">{accountBalance ? `${accountBalance}kz` : "0kz"}</h3>
            <p className="text-sm text-center">Saldo de conta</p>
            <Link to="#" className="text-xs underline mt-1 hover:text-white/80">
              Add Funds
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
