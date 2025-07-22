import type { HomeProps } from '../../pages/Home';
import styles from './styles.module.css';

// type CountdownProps = HomeProps;
// opcional: podemos usar o tipo HomeProps aqui, mas não é necessário

export function Countdown({ state }: HomeProps) {
  return (
    <div className={styles.container}>{state.formattedSecondsRemaining}</div>
  );
}
