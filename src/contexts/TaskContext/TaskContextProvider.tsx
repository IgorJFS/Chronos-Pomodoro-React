import { useEffect, useReducer, useRef } from 'react';
import { InitialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './taskReducer';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import { TaskActionTypes } from './taskActions';
import { loadBeepEnd } from '../../utils/loadBeep';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(
    taskReducer,
    InitialTaskState,
    initial => {
      const savedState = localStorage.getItem('state');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        return {
          ...parsedState,
          activeTask: null,
          formattedSecondsRemaining: '00:00',
        };
      }
      return initial;
    },
  );
  const playBeepRef = useRef<(() => void) | null>(null);

  const worker = TimerWorkerManager.getInstance();

  worker.onMessage(message => {
    const countDownSeconds = message.data;

    if (countDownSeconds <= 0) {
      if (playBeepRef.current) {
        playBeepRef.current();
        playBeepRef.current = null;
      }
      dispatch({
        type: TaskActionTypes.COMPLETE_TASK,
      });
      worker.terminate();
    } else {
      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
    }
  });

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));
    if (!state.activeTask) {
      worker.terminate();
    }
    worker.postMessage(state);
  }, [worker, state]);

  document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;

  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeepEnd();
    } else {
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
