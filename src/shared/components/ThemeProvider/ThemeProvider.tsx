import { createContext, FC, useCallback, useEffect, useState } from 'react';
import {
  createGlobalStyle,
  ThemeProvider as StyledThemeProvider,
  DefaultTheme as ThemeType,
} from 'styled-components';

export type ModeType = 'light' | 'dark';
type ContextType = {
  theme: ModeType;
  toggleTheme: () => void;
};

const Global = createGlobalStyle`
body {
  font-family: Roboto, 'Segoe UI', sans-serif;
  font-size:16px;
  font-weight:100;
  background-color: ${props => props.theme.colors.background};
  margin:0
}`;

const themeLight: ThemeType = {
  colors: { header: '#60A5FA', background: '#FFFFFF', font: '#000000' },
};

const themeDark: ThemeType = {
  colors: { header: '#1F2937', background: '#4B5563', font: '#FFFFFF' },
};

const themes = { light: themeLight, dark: themeDark };
const getTheme = (mode: ModeType) => themes[mode] ?? themeLight;

export const ThemeContext = createContext<ContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

const getInitialTheme = (): ModeType => {
  const savedTheme = localStorage.getItem('theme') as ModeType;
  return savedTheme ?? 'light';
};

const ThemeProvider: FC = ({ children }) => {
  const [theme, setTheme] = useState<ModeType>(getInitialTheme);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(
    () =>
      setTheme((prevTheme: ModeType) =>
        prevTheme === 'light' ? 'dark' : 'light',
      ),
    [],
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={getTheme(theme)}>
        <Global />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
