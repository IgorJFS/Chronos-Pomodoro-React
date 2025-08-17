import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { Input } from '../Input';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { Tips } from '../Tips';
import { loadBeepEnd, loadBeepStart } from '../../utils/loadBeep';
import { toast } from 'react-toastify';
import { showMessage } from '../../adapters/toastifyMessage';

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  //Cycles
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!taskNameInput.current) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      toast.warning('Please enter a task name');
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

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });

    toast.success('Task created!');
  }
  function handleStopTask() {
    showMessage.dismiss();
    showMessage.error('Task stopped!');
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
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
        <Tips />
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
            onClick={() => {
              if (!taskNameInput.current?.value.trim()) return;
              const playSound = loadBeepStart();
              playSound();
            }}
          />
        ) : (
          <DefaultButton
            type='button'
            aria-label='Stop task'
            title='Stop task'
            icon={<StopCircleIcon />}
            color='red'
            onClick={() => {
              handleStopTask();
              const playSound = loadBeepEnd();
              playSound(); // Isso aqui realmente toca o som
            }}
            key={state.activeTask.id}
          />
        )}
      </div>
    </form>
  );
}
