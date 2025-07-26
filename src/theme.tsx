import { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

declare module '@mui/material/styles' {
  interface Palette {
    card: {
      main: string;
    };
  }
  interface PaletteOptions {
    card?: {
      main: string;
    };
  }
}

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f3f4f6',
      paper: '#ffffff',
    },
    text: {
      primary: '#111827',
      secondary: '#4b5563',
    },
    primary: {
      main: '#3b82f6',
    },
    secondary: {
      main: '#ef4444',
    },
    card: {
      main: '#e0f2fe',
    },
  },
  typography: {
    fontFamily: "'AovelSansRounded', 'Vazirmatn', sans-serif",
  },
  zIndex: {
    appBar: 1100,
    drawer: 1200,
  },
  direction: 'ltr',
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#111827',
      paper: '#1f2937',
    },
    text: {
      primary: '#e2e8f0',
      secondary: '#9ca3af',
    },
    primary: {
      main: '#3b82f6',
    },
    secondary: {
      main: '#ef4444',
    },
    card: {
      main: '#374151',
    },
  },
  typography: {
    fontFamily: "'AovelSansRounded', 'Vazirmatn', sans-serif",
  },
  zIndex: {
    appBar: 1100,
    drawer: 1200,
  },
  direction: 'ltr',
});

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const selectedTheme = theme === 'light' ? lightTheme : darkTheme;
  const themeWithDirection = createTheme({
    ...selectedTheme,
    direction: i18n.language === 'fa' ? 'rtl' : 'ltr',
    typography: {
      fontFamily: i18n.language === 'fa' 
        ? "'Vazirmatn', 'B Nazanin', sans-serif" 
        : "'AovelSansRounded', sans-serif",
    },
  });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MuiThemeProvider theme={themeWithDirection}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};