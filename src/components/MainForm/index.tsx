import { PlayCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { Input } from '../Input';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

// type MainFormProps = HomeProps;
//opcional podemos usar o tipo HomeProps aqui, mas não é necessário

export function MainForm() {
  const { setState } = useTaskContext();

  function handleClick() {
    setState(prevState => {
      return {
        ...prevState,
        formattedSecondsRemaining: '21:00',
      };
    });
  }

  return (
    <form className='form' action=''>
      <button onClick={handleClick} type='button'>
        Clicar
      </button>
      <div className='formRow'>
        <Input
          id='task'
          label='Task'
          type='text'
          placeholder='What do you want to do?'
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
