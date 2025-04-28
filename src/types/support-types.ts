
export interface NotificationPreference {
  id: string;
  customer_id: string;
  email: boolean;
  sms: boolean;
  whatsapp: boolean;
  push_notifications: boolean;
  created_at: string;
}

export interface Notification {
  id: string;
  customer_id: string;
  title: string | null;
  message: string | null;
  type: string | null;
  is_read: boolean;
  sent_at: string;
}

export interface SupportTicket {
  id: string;
  customer_id: string;
  subject: string | null;
  department: string | null;
  priority: string | null;
  status: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface TicketMessage {
  id: string;
  ticket_id: string;
  sender_type: string | null;
  message: string | null;
  attachments: string | null;
  sent_at: string;
}
