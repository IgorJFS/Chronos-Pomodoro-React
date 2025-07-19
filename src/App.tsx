import { Container } from './components/Container/index';
import { Logo } from './components/Logo';
import './styles/theme.css';
import './styles/global.css';
import { Menu } from './components/Menu';
import { Countdown } from './components/Countdown';

export function App() {
  return (
    <>
      <Container>
        <Logo />
      </Container>

      <Container>
        <Menu />
      </Container>

      <Container>
        <Countdown />
      </Container>

      <Container>
        <form className='form' action=''>
          <div className='formRow'>
            <label htmlFor='task'>Task</label>
            <input
              type='text'
              id='task'
              placeholder='What do you want to do?'
            />
          </div>

          <div className='formRow'>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>

          <div className='formRow'>
            <p>Cycles</p>
            <p>0 0 0 0 0 0 0 0</p>
          </div>

          <div className='formRow'>
            <button type='submit'>Start</button>
          </div>
        </form>
      </Container>
    </>
  );
}
