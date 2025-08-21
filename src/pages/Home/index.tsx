import '../../styles/theme.css';
import '../../styles/global.css';
import { Container } from '../../components/Container';
import { MainForm } from '../../components/MainForm';
import { Countdown } from '../../components/Countdown';
import { MainTemplate } from '../../templates/MainTemplate';
import { useEffect } from 'react';

export function Home() {
  useEffect(() => {
    document.title = 'Chronos Pomodoro';
  }, []);
  return (
    <>
      <MainTemplate>
        <Container>
          <Countdown />
        </Container>

        <Container>
          <MainForm />
        </Container>
      </MainTemplate>
    </>
  );
}
