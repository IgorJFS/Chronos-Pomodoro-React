import { createContext } from 'react';
import type { TaskStateModel } from '../../models/TaskStateModel';
import { InitialTaskState } from './initialTaskState';

type TaskContextProps = {
  state: TaskStateModel;
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
};

const initialContextValue: TaskContextProps = {
  state: InitialTaskState,
  setState: () => {},
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue);
