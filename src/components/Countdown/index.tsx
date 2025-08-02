import styles from './styles.module.css';
import { useTaskContext } from '../../contexts/TaskContext';

// type CountdownProps = HomeProps;
// opcional: podemos usar o tipo HomeProps aqui, mas não é necessário

export function Countdown() {
  const { state } = useTaskContext();
  return (
    <div className={styles.container}>{state.formattedSecondsRemaining}</div>
  );
}
