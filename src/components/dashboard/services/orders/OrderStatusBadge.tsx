
import { Badge } from "@/components/ui/badge";

interface OrderStatusBadgeProps {
  status: string;
}

export const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  switch (status.toLowerCase()) {
    case 'completed':
    case 'concluído':
      return <Badge className="bg-green-500">Concluído</Badge>;
    case 'pending':
    case 'pendente':
      return <Badge variant="outline" className="text-yellow-600 border-yellow-300">Pendente</Badge>;
    case 'processing':
    case 'processando':
      return <Badge variant="outline" className="text-blue-600 border-blue-300">Processando</Badge>;
    case 'cancelled':
    case 'cancelado':
      return <Badge variant="destructive">Cancelado</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};
