import styles from './styles.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <a href=''>Check more about the Pomodoro Technique 🍎</a>
      <a href=''>
        Chronos Pomodoro &copy; {new Date().getFullYear()} - Made with ❤️ by
        IgorJFS
      </a>
    </footer>
  );
}
