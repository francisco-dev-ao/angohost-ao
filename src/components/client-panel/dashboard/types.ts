
export interface ServiceStatusCardProps {
  type?: string;
  title: string;
  description?: string;
  status: 'active' | 'suspended' | 'expired' | 'pending';
  expiryDate?: string;
  nextPayment?: string;
  actions?: React.ReactNode;
}

export interface DashboardOverviewProps {
  userData?: any;
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

export interface EmailContentProps {
  loading?: boolean;
}

export interface ServicesPanelProps {
  services?: any[];
}

export interface DomainsPanelProps {
  domains?: any[];
}

export interface InvoicesPanelProps {
  invoices?: any[];
}

export interface ProfilePanelProps {
  userData?: any;
}

export interface AffiliatePanelProps {
  userData?: any;
}
