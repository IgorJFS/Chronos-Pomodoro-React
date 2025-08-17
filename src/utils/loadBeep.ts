import Beep from '../assets/audios/audios_pausezin.wav';
import Boop from '../assets/audios/audios_Clickzin.wav';

export function loadBeepEnd() {
  const audio = new Audio(Beep);
  audio.load();
  return () => {
    audio.currentTime = 0;
    audio.play().catch(err => {
      console.error('Error playing audio:', err);
    });
  };
}

export function loadBeepStart() {
  const audio = new Audio(Boop);
  audio.load();
  return () => {
    audio.currentTime = 0;
    audio.play().catch(err => {
      console.error('Error playing audio:', err);
    });
  };
}
