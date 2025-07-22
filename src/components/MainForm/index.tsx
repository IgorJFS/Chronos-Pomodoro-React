import { PlayCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { Input } from '../Input';
import type { HomeProps } from '../../pages/Home';

// type MainFormProps = HomeProps;
//opcional podemos usar o tipo HomeProps aqui, mas não é necessário

export function MainForm({ state, setState }: HomeProps) {
  function handleClick() {
    setState(prevState => {
      return {
        ...prevState,
        config: {
          ...prevState.config,
          workTime: 34,
        },
        formattedSecondsRemaining: '34:00',
      };
    });
  }

  return (
    <form className='form' action=''>
      <div>
        <button type='button' onClick={handleClick}>
          Click me
        </button>
      </div>
      <div className='formRow'>
        <Input
          id='task'
          label='Task'
          type='text'
          placeholder='What do you want to do?'
        />
      </div>

      <div className='formRow'>
        <p>Next break is {state.config.workTime}min</p>
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
