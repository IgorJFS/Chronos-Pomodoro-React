import '../../styles/theme.css';
import '../../styles/global.css';
import { Container } from '../../components/Container';
import { MainTemplate } from '../../templates/MainTemplate';
import { Heading } from '../../components/Heading';
import { Input } from '../../components/Input';
import { DefaultButton } from '../../components/DefaultButton';
import { SaveIcon } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { showMessage } from '../../adapters/toastifyMessage';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';

export function Settings() {
  const { state, dispatch } = useTaskContext();
  const workTimeInput = useRef<HTMLInputElement>(null);
  const shortBreakTimeInput = useRef<HTMLInputElement>(null);
  const longBreakTimeInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = 'Settings - Chronos';
  }, []);

  function handleSaveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showMessage.dismiss();

    const formErrors = [];
    const workTime = Number(workTimeInput.current?.value);
    const shortBreakTime = Number(shortBreakTimeInput.current?.value);
    const longBreakTime = Number(longBreakTimeInput.current?.value);

    if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      formErrors.push('Please enter valid numbers for all fields.');
    }

    if (workTime < 1 || workTime > 99) {
      formErrors.push(
        'Please enter a value between 1 and 99 for the focus timer.',
      );
    }

    if (shortBreakTime < 1 || shortBreakTime > 30) {
      formErrors.push(
        'Please enter a value between 1 and 30 for the short break timer.',
      );
    }

    if (longBreakTime < 1 || longBreakTime > 60) {
      formErrors.push(
        'Please enter a value between 1 and 60 for the long break timer.',
      );
    }

    if (formErrors.length > 0) {
      formErrors.forEach(error => {
        showMessage.error(error);
      });
      return;
    }
    dispatch({
      type: TaskActionTypes.CHANGE_SETTINGS,
      payload: {
        workTime,
        shortBreakTime,
        longBreakTime,
      },
    });
    showMessage.info('Settings saved successfully!');
  }

  return (
    <>
      <MainTemplate>
        <Heading>Settings</Heading>
        <Container>
          <p>Configure the settings for your Pomodoro timer.</p>
        </Container>
        <Container>
          <form onSubmit={handleSaveSettings} action='' className='form'>
            <div className='formRow'>
              <Input
                id='workTime'
                label='Focus Timer'
                ref={workTimeInput}
                defaultValue={state.config.workTime}
                type='number'
              />
            </div>
            <div className='formRow'>
              <Input
                id='shortBreakTime'
                label='Short Break Timer'
                ref={shortBreakTimeInput}
                defaultValue={state.config.shortBreakTime}
                type='number'
              />
            </div>
            <div className='formRow'>
              <Input
                id='longBreakTime'
                label='Long Break Timer'
                ref={longBreakTimeInput}
                defaultValue={state.config.longBreakTime}
                type='number'
              />
            </div>
            <div className='formRow'>
              <DefaultButton
                icon={<SaveIcon />}
                aria-label='Save Settings'
                title='Save Settings'
              />
            </div>
          </form>
        </Container>
      </MainTemplate>
    </>
  );
}
