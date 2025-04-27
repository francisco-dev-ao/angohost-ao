
export interface ServiceStatusCardProps {
  type?: string;
  title: string;
  description: string;
  status: 'active' | 'pending' | 'suspended' | 'expired';
  expiryDate?: string;
  nextPayment?: string;
}

export interface DashboardOverviewProps {
  userData: any;
  services?: any[];
  domains?: any[];
  invoices?: any[];
}

export interface ServicesSummaryProps {
  services?: any[];
}

export interface DomainsSummaryProps {
  domains?: any[];
}

export interface InvoicesSummaryProps {
  unpaidInvoices?: number;
}

export interface TicketsSummaryProps {
  tickets?: any[];
}
