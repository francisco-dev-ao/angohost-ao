
/**
 * Format a number as currency in AOA (Angolan Kwanza)
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Format a date to a readable string
 */
export const formatDate = (dateString: string | Date): string => {
  const date = dateString instanceof Date ? dateString : new Date(dateString);
  return date.toLocaleDateString('pt-AO');
};
