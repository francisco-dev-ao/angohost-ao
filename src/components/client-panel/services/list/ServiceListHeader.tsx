
import React from 'react';

export const ServiceListHeader = () => {
  return (
    <div className="grid grid-cols-7 p-4 font-medium border-b bg-muted/50">
      <div className="col-span-2">Produto/Serviço</div>
      <div>Domínio</div>
      <div>Data Expiração</div>
      <div>Status</div>
      <div className="col-span-2 text-right">Ações</div>
    </div>
  );
};
