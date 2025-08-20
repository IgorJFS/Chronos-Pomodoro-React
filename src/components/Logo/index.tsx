import { RouterLink } from '../RouterLink';
import styles from './styles.module.css';

export function Logo() {
  return (
    <div className={styles.logo}>
      <RouterLink className={styles.logoLink} href='/'>
        <img
          src='/pomodorosvg.png'
          alt='Chronos Logo'
          style={{ width: '250px', height: '150px' }}
        />
        <span>Chronos</span>
      </RouterLink>
    </div>
  );
}
