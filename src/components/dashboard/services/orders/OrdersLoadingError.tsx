
import { AlertCircle, Package } from 'lucide-react';

interface OrdersLoadingErrorProps {
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
}

export const OrdersLoadingError = ({ loading, error, isEmpty }: OrdersLoadingErrorProps) => {
  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3"></div>
        <p>Carregando pedidos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <AlertCircle className="h-6 w-6 mx-auto mb-3 text-red-500" />
        <p>{error}</p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <Package className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
        <p>Nenhum pedido encontrado</p>
      </div>
    );
  }

  return null;
};
