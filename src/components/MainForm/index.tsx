import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { Input } from '../Input';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { formatSeconds } from '../../utils/formatSeconds';

export function MainForm() {
  const { state, setState } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  //Cycles
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!taskNameInput.current) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      alert('Please enter a task name');
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      durationInMinutes: state.config[nextCycleType],
      type: nextCycleType,
    };

    const secondsRemaining = newTask.durationInMinutes * 60;

    setState(prev => {
      return {
        ...prev,
        config: { ...prev.config },
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining, // its the same as secondsRemaining: secondsRemaining,
        formattedSecondsRemaining: formatSeconds(secondsRemaining),
        tasks: [...prev.tasks, newTask],
      };
    });
  }

  function handleStopTask() {
    setState(prev => {
      return {
        ...prev,
        activeTask: null,
        currentCycle: 0,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: prev.tasks.map(task => {
          if (prev.activeTask?.id === task.id) {
            return {
              ...task,
              interruptDate: Date.now(),
            };
          }
          return task;
        }),
      };
    });
  }

  return (
    <form onSubmit={handleCreateNewTask} className='form' action=''>
      <div className='formRow'>
        <Input
          id='task'
          label='Task'
          type='text'
          placeholder='What do you want to do?'
          ref={taskNameInput}
          disabled={!!state.activeTask}
        />
      </div>

      <div className='formRow'>
        <p>Next break is 25 minutes</p>
      </div>
      {state.currentCycle > 0 && (
        <div className='formRow'>
          <Cycles />
        </div>
      )}

      <div className='formRow'>
        {!state.activeTask ? (
          <DefaultButton
            type='submit'
            aria-label='Start task'
            title='Start task'
            icon={<PlayCircleIcon />}
            color='green'
            key={nextCycle}
          />
        ) : (
          <DefaultButton
            type='button'
            aria-label='Stop task'
            title='Stop task'
            icon={<StopCircleIcon />}
            color='red'
            onClick={handleStopTask}
            key={nextCycle}
          />
        )}
      </div>
    </form>
  );
}
