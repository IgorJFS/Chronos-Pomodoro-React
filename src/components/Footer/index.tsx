import styles from './styles.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <a href=''>Check more about the Pomodoro Technique</a>
      <a href=''>
        Chronos Pomodoro &copy; {new Date().getFullYear()} - Made with 💚 by
        IgorJFS
      </a>
      <div className={styles.socialLinks}>
        <a
          href='https://github.com/IgorJFS/Chronos-Pomodoro-React'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            src='github.png'
            alt='GitHub'
            style={{ width: '50px', height: '50px' }}
          />
        </a>
        <a
          href='https://ko-fi.com/zackiewackie'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            src='/kofi.png'
            alt='Ko-fi'
            style={{ width: '55px', height: '55px' }}
          />
        </a>
      </div>
    </footer>
  );
}
