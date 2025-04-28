
import { toast as sonnerToast } from 'sonner';

type ToastProps = {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
  duration?: number;
};

export function useToast() {
  const toast = ({ title, description, variant = 'default', duration = 5000 }: ToastProps) => {
    switch (variant) {
      case 'destructive':
        return sonnerToast.error(title, {
          description,
          duration
        });
      case 'success':
        return sonnerToast.success(title, {
          description,
          duration
        });
      default:
        return sonnerToast(title, {
          description,
          duration
        });
    }
  };

  return { toast };
}

export { sonnerToast as toast };
