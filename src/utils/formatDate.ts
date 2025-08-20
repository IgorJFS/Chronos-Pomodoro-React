import { format } from 'date-fns';

export function formatDate(timestamp: number) {
  const date = new Date(timestamp);
  return format(date, 'MM-dd-yyyy HH:mm a');
}
