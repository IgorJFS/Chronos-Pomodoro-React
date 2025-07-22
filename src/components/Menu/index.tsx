import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';
import styles from './styles.module.css';
import React, { useState, useEffect } from 'react';

type AvailableThemes = 'light' | 'dark';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const savedTheme =
      (localStorage.getItem('theme') as AvailableThemes) || 'dark';
    return savedTheme;
  });

  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };

  function toggleTheme(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return nextTheme;
    });
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    // Cleanup function // ISSO É IMPORTANTE
    // return () => {
    //   console.log(`Cleanup for theme change: ${theme}`);
    // };
  }, [theme]);

  return (
    <nav className={styles.menu}>
      <a className={styles.menuLink} href='#' aria-label='Home' title='Home'>
        <HouseIcon />
      </a>
      <a
        className={styles.menuLink}
        href='#'
        aria-label='History'
        title='History'
      >
        <HistoryIcon />
      </a>
      <a
        className={styles.menuLink}
        href='#'
        aria-label='Settings'
        title='Settings'
      >
        <SettingsIcon />
      </a>
      <a
        className={styles.menuLink}
        href='#'
        aria-label='Toggle Theme'
        title='Toggle Theme'
        onClick={toggleTheme}
      >
        {nextThemeIcon[theme]}
        {/* MÉTODO ALTERNATIVO  👇 usando if/else*/}
        {/* {theme === 'dark' ? <SunIcon /> : <MoonIcon />} */}
      </a>
    </nav>
  );
}
