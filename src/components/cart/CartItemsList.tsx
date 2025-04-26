
import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { CartItem } from '@/types/cart';
import { toast } from 'sonner';

interface CartItemsListProps {
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  getContactProfileById: (id: string) => any;
}

export const CartItemsList: React.FC<CartItemsListProps> = ({
  items,
  onRemoveItem,
  getContactProfileById
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Itens do Carrinho</h2>
      </div>
      
      <div className="border-t">
        {items.map((item) => (
          <div key={item.id} className="p-6 border-b">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h3 className="font-medium text-lg">{item.name}</h3>
                {item.type === 'hosting' && (
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Espaço em disco: {item.details.diskSpace}</p>
                    <p>Contas de email: {item.details.emailAccounts}</p>
                    <p>Bancos de dados: {item.details.databases}</p>
                    <p>Período: {item.details.contractYears} {item.details.contractYears === 1 ? 'ano' : 'anos'}</p>
                    <p className="mt-2 text-orange-600">Renovação: {item.details.renewalPrice?.toLocaleString('pt-AO')} Kz/ano</p>
                  </div>
                )}
                {item.type === 'email' && (
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Armazenamento: {item.details.storage}</p>
                    <p>Proteção anti-spam: {item.details.antispam}</p>
                    {item.details.quantity && (
                      <p>Quantidade: {item.details.quantity} contas</p>
                    )}
                    <p>Período: {item.details.contractYears} {item.details.contractYears === 1 ? 'ano' : 'anos'}</p>
                    <p className="mt-2 text-orange-600">Renovação: {item.details.renewalPrice?.toLocaleString('pt-AO')} Kz/ano</p>
                  </div>
                )}
                {item.type === 'domain' && (
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Período: {item.details.registrationPeriod}</p>
                    <p>Proteção de privacidade: Incluída</p>
                    {item.details.contactProfileId && (
                      <p>Perfil de contato: {getContactProfileById(item.details.contactProfileId)?.name || 'Perfil não encontrado'}</p>
                    )}
                    <p className="mt-2 text-orange-600">
                      Renovação: {item.details.renewalPrice?.toLocaleString('pt-AO') || Math.round(item.price / (item.details.contractYears || 1)).toLocaleString('pt-AO')} Kz/ano
                    </p>
                  </div>
                )}
                {item.type === 'office365' && (
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Usuários: {item.details.users}</p>
                    <p>Período: {item.details.contractYears} {item.details.contractYears === 1 ? 'ano' : 'anos'}</p>
                    <p className="mt-2 text-orange-600">Renovação: {item.details.renewalPrice?.toLocaleString('pt-AO')} Kz/ano</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col md:items-end mt-4 md:mt-0">
                <span className="font-semibold text-lg">
                  {item.price.toLocaleString('pt-AO')} Kz
                  {item.period === 'monthly' ? '/mês' : ' total'}
                </span>
                <Button 
                  variant="ghost" 
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-0 h-8 mt-2"
                  onClick={() => {
                    onRemoveItem(item.id);
                    toast.success('Item removido do carrinho!');
                  }}
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Remover
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
