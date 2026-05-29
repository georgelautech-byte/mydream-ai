import { createContext, PropsWithChildren, useState } from 'react';
import { ITheme, themes } from '../config/theme/theme';

type ContextPalitraInterface = ITheme;

export const ThemeContext = createContext<ContextPalitraInterface>(themes[1]);

export default function ThemeProvider({ children }: PropsWithChildren) {
  const [currentTheme, setCurrentTheme] = useState(themes[1]);

  return <ThemeContext.Provider value={currentTheme}>{children}</ThemeContext.Provider>;
}
