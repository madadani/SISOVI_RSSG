import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export function formatDate(date, pattern = 'dd MMM yyyy') {
  return format(new Date(date), pattern, { locale: id });
}

export function formatDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm', { locale: id });
}

export function generateQueueNumber(prefix = 'VK') {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const randomNum = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
  return `${prefix}-${dateStr}-${randomNum}`;
}
