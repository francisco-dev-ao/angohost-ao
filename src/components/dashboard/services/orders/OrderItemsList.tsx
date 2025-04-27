
import { formatCurrency } from '@/utils/formatters';
import type { OrderItem } from '../../types';

interface OrderItemsListProps {
  items: OrderItem[];
}

export const OrderItemsList = ({ items }: OrderItemsListProps) => {
  return (
    <div className="bg-muted/50 rounded-md p-3">
      <p className="text-sm font-medium mb-2">Itens do pedido:</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="text-sm flex justify-between">
            <div>
              <span>
                {item.product_name} 
                {item.quantity > 1 ? ` (${item.quantity}x)` : ''}
              </span>
              <span className="text-xs text-muted-foreground ml-2">
                {item.period === 'yearly' ? 'Anual' : 'Mensal'}
              </span>
            </div>
            <span>{formatCurrency(item.price)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
