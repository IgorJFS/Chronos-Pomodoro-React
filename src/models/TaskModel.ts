import type { TaskStateModel } from './TaskStateModel';

export type TaskModel = {
  id: string;
  name: string;
  startDate: number;
  durationInMinutes: number;
  completeDate: number | null;
  interruptDate: boolean | null;
  type: keyof TaskStateModel['config'];
};
