import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createContext, useContext, useState, ReactNode } from 'react';

// گسترش تایپ Palette برای پشتیبانی از card
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

// تعریف تم دارک
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#111827',
      paper: '#1f2937'
    },
    text: {
      primary: '#e2e8f0',
      secondary: '#9ca3af'
    },
    primary: {
      main: '#3b82f6'
    },
    secondary: {
      main: '#ef4444'
    },
    card: {
      main: '#1f2937' // رنگ کارت‌ها در دارک
    }
  },
  typography: {
    fontFamily: "'Roboto', 'B Nazanin', sans-serif"
  }
});

// تعریف تم لایت
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f3f4f6',
      paper: '#ffffff'
    },
    text: {
      primary: '#111827',
      secondary: '#4b5563'
    },
    primary: {
      main: '#3b82f6'
    },
    secondary: {
      main: '#ef4444'
    },
    card: {
      main: '#87CEEB' // رنگ کارت‌ها در لایت (آبی آسمانی)
    }
  },
  typography: {
    fontFamily: "'Roboto', 'B Nazanin', sans-serif"
  }
});

// Context برای مدیریت تم
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {}
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MuiThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
