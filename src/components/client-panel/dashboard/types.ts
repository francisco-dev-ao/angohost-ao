
export interface ServiceStatusCardProps {
  type?: string;
  title: string;
  description: string;
  status: 'active' | 'pending' | 'suspended' | 'expired';
  expiryDate?: string;
  nextPayment?: string;
  actions?: React.ReactNode;
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

// Add interfaces for the panels in ClientPanel.tsx
export interface ServicesPanelProps {
  services?: any[];
}

export interface DomainsPanelProps {
  domains?: any[];
}

export interface InvoicesPanelProps {
  invoices?: any[];
}

// Add interface for EmailContent component
export interface EmailContentProps {
  loading?: boolean;
}
