import { toast } from 'react-toastify';

export const showMessage = {
  success: (msg: string) => toast.success(msg || 'Task created successfully!'),
  error: (msg: string) =>
    toast.error(msg || 'Error creating task. Please try again.'),
  warning: (msg: string) => toast.warning(msg || 'Please enter a task name.'),
  warn: (msg: string) => toast.warn(msg || 'Please enter a task name.'),
  info: (msg: string) => toast.info(msg || 'Please enter a task name.'),
  dismiss: () => toast.dismiss(),
};
