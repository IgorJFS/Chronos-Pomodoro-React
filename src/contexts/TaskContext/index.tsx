import { createContext, useContext, useState } from 'react';
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

export const TaskContext = createContext<TaskContextProps>({
  ...initialContextValue,
});

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, setState] = useState(InitialTaskState);
  return (
    <TaskContext.Provider value={{ state, setState }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  return useContext(TaskContext);
}
