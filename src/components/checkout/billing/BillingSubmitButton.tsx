
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';

interface BillingSubmitButtonProps {
  isLoading: boolean;
}

export const BillingSubmitButton: React.FC<BillingSubmitButtonProps> = ({
  isLoading
}) => {
  return (
    <div className="flex space-x-4 pt-6">
      <Button 
        type="submit" 
        disabled={isLoading} 
        className="flex-1 bg-primary hover:bg-primary/90"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processando...
          </>
        ) : 'Prosseguir com Pagamento'}
      </Button>
    </div>
  );
};
