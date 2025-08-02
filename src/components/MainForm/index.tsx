import { PlayCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { Input } from '../Input';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

export function MainForm() {
  const { setState } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!taskNameInput.current) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      taskNameInput.current.setCustomValidity('Please enter a task name');
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      durationInMinutes: 50,
      type: 'workTime',
    };

    const secondsRemaining = newTask.durationInMinutes * 60;

    setState(prev => {
      return {
        ...prev,
        config: { ...prev.config },
        activeTask: newTask,
        currentCycle: 1, //conferir depois
        secondsRemaining,
        formattedSecondsRemaining: (newTask.durationInMinutes * 60).toString(),
        tasks: [...prev.tasks, newTask],
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
        />
      </div>

      <div className='formRow'>
        <p>Next break is 25min</p>
      </div>

      <div className='formRow'>
        <Cycles />
      </div>

      <div className='formRow'>
        <DefaultButton icon={<PlayCircleIcon />} color='green' />
      </div>
    </form>
  );
}
