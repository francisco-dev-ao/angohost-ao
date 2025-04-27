
import React from 'react';
import { Button } from "@/components/ui/button";
import { Package } from 'lucide-react';

export const EmptyServicesList = () => {
  return (
    <div className="p-8 text-center text-muted-foreground">
      <Package className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
      <p>Nenhum serviço encontrado</p>
      <Button variant="outline" size="sm" className="mt-4">
        Adquirir Serviço
      </Button>
    </div>
  );
};
