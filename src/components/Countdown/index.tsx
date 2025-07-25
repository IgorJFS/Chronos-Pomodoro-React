import { useContext } from 'react';
import styles from './styles.module.css';
import { TaskContext } from '../../contexts/TaskContext';

// type CountdownProps = HomeProps;
// opcional: podemos usar o tipo HomeProps aqui, mas não é necessário

export function Countdown() {
  const taskContext = useContext(TaskContext);
  console.log(taskContext);
  return <div className={styles.container}>00:00</div>;
}
