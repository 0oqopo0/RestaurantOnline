import { useState } from 'react';
import { CssBaseline, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMomentJalaali } from '@mui/x-date-pickers/AdapterMomentJalaali';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

import Sidebar from './components/Sidebar';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import Register from './components/Register';
import Login from './components/Login';
import Menu from './components/Menu';
import Cart from './components/Cart';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './theme';

function App() {
  const { i18n } = useTranslation();
  const muiTheme = useTheme();
  const [selectedForm, setSelectedForm] = useState<string>('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const renderContent = () => {
    switch (selectedForm) {
      case 'register':
        return <Register />;
      case 'login':
        return <Login />;
      case 'menu':
        return <Menu />;
      case 'cart':
        return <Cart />;
      default:
        return <HomePage />;
    }
  };

  const drawerWidth = sidebarOpen ? 240 : 65;
  const isRTL = i18n.language === 'fa';

  return (
    <LocalizationProvider dateAdapter={AdapterMomentJalaali}>
      <CartProvider>
        <ThemeProvider>
          <Box
            sx={{
              display: 'flex',
              minHeight: '100vh',
              fontFamily: isRTL ? "'Vazirmatn', sans-serif" : "'Inter', sans-serif",
            }}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <CssBaseline />

            <NavBar
              setSelectedForm={setSelectedForm}
              toggleSidebar={toggleSidebar}
              sidebarOpen={sidebarOpen}
            />

            <Box
              component="nav"
              sx={{
                position: 'fixed',
                top: 64,
                [isRTL ? 'right' : 'left']: 0,
                width: drawerWidth,
                height: 'calc(100vh - 64px)',
                zIndex: muiTheme.zIndex?.appBar ? muiTheme.zIndex.appBar - 1 : 1100,
              }}
            >
              <Sidebar
                setSelectedForm={setSelectedForm}
                anchor={isRTL ? 'right' : 'left'}
                open={sidebarOpen}
                toggleDrawer={toggleSidebar}
              />
            </Box>

            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                mt: 8,
                width: `calc(100% - ${drawerWidth}px)`,
                [isRTL ? 'marginRight' : 'marginLeft']: `${drawerWidth}px`,
                transition: (theme) =>
                  theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.standard,
                  }),
              }}
            >
              <motion.div
                key={`${i18n.language}-${muiTheme.palette.mode}`}
                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? -20 : 20 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </Box>
          </Box>
        </ThemeProvider>
      </CartProvider>
    </LocalizationProvider>
  );
}

export default App;