import '../../styles/theme.css';
import '../../styles/global.css';
import { Container } from '../../components/Container';
import { MainForm } from '../../components/MainForm';
import { Countdown } from '../../components/Countdown';
import { MainTemplate } from '../../templates/MainTemplate';
import type { TaskStateModel } from '../../models/TaskStateModel';

export type HomeProps = {
  state: TaskStateModel;
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
};

export function Home(props: HomeProps) {
  return (
    <>
      <MainTemplate>
        <Container>
          <Countdown {...props} />
        </Container>

        <Container>
          <MainForm {...props} />
        </Container>
      </MainTemplate>
    </>
  );
}
