
import React from 'react';
import { Button } from "@/components/ui/button";
import { Package } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EmptyServicesList = () => {
  return (
    <div className="p-8 text-center text-muted-foreground">
      <Package className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
      <p className="mb-4">Nenhum serviço encontrado</p>
      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        <Button variant="outline" size="sm" asChild>
          <Link to="/hospedagem-de-sites">
            Adquirir Hospedagem
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link to="/dominios/registrar">
            Registrar Domínio
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link to="/Email-profissional">
            Email Profissional
          </Link>
        </Button>
      </div>
    </div>
  );
};
