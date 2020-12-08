import { createContext, FC, useCallback, useEffect, useState } from 'react';
import {
  createGlobalStyle,
  ThemeProvider as StyledThemeProvider,
} from 'styled-components';

export type ThemeType = 'light' | 'dark';

const Global = createGlobalStyle`
body {
  font-family: Roboto, 'Segoe UI', sans-serif;
  font-size:16px;
  font-weight:100;
  background-color: ${props => props.theme.colors.background};
  margin:0
}`;

const getTheme = (mode: ThemeType) => ({
  colors: {
    header: mode === 'light' ? '#60A5FA' : '#1F2937',
    background: mode === 'light' ? '#FFFFF' : '#4B5563',
    font: mode === 'light' ? '#000000' : '#FFFFFF',
  },
});

type ContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

const getInitialTheme = (): ThemeType => {
  const savedTheme = localStorage.getItem('theme') as ThemeType;
  return savedTheme ?? 'light';
};

const ThemeProvider: FC = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(getInitialTheme);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(
    () =>
      setTheme((prevTheme: ThemeType) =>
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
