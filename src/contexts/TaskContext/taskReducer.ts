import type { TaskStateModel } from '../../models/TaskStateModel';
import { formatSeconds } from '../../utils/formatSeconds';
import { getNextCycle } from '../../utils/getNextCycle';
import { TaskActionTypes, type TaskActionModel } from './taskActions';
import { InitialTaskState } from './initialTaskState';

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel,
): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      const newTask = action.payload;
      const nextCycle = getNextCycle(state.currentCycle);
      const secondsRemaining = newTask.durationInMinutes * 60;
      return {
        ...state,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondsRemaining: formatSeconds(secondsRemaining),
        tasks: [...state.tasks, newTask],
      };
    }
    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          if (state.activeTask && state.activeTask.id === task.id) {
            return {
              ...task,
              interruptDate: Date.now(),
            };
          }
          return task;
        }),
      };
    }
    case TaskActionTypes.COMPLETE_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          if (state.activeTask && state.activeTask.id === task.id) {
            return {
              ...task,
              completeDate: Date.now(),
            };
          }
          return task;
        }),
      };
    }
    case TaskActionTypes.RESET_STATE: {
      return { ...InitialTaskState };
    }
    case TaskActionTypes.COUNT_DOWN: {
      return {
        ...state,
        secondsRemaining: action.payload.secondsRemaining,
        formattedSecondsRemaining: formatSeconds(
          action.payload.secondsRemaining,
        ),
      };
    }
    case TaskActionTypes.CHANGE_SETTINGS: {
      return {
        ...state,
        config: {
          ...action.payload,
        },
      };
    }
  }
  return state;
}
