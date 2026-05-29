import { useContext } from 'react';
import { ThemeContext } from '../providers/ThemeProvider';

export function useTheme() {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return theme;
}
