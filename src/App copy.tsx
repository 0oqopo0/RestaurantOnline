import { useState } from 'react';
import { CssBaseline, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMomentJalaali } from '@mui/x-date-pickers/AdapterMomentJalaali';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import Sidebar from './components/Sidebar';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import Register from './components/Register';
import Login from './components/Login';
import Menu from './components/Menu';
import Cart from './components/Cart';
import { CartProvider } from './contexts/CartContext';

import { ThemeProvider, useThemeContext } from './theme.tsx';

function App() {
  const { i18n } = useTranslation();
  const { theme } = useThemeContext();

  const [selectedForm, setSelectedForm] = useState<string>('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

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
              fontFamily: isRTL ? "'B Nazanin', sans-serif" : "'Roboto', sans-serif",
            }}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <CssBaseline />

            {/* Navbar (position fixed) */}
            <NavBar
              setSelectedForm={setSelectedForm}
              toggleSidebar={toggleSidebar}
              sidebarOpen={sidebarOpen}
            />

            {/* Sidebar (under NavBar) */}
            <Box
              sx={{
                position: 'fixed',
                top: 64, // height of AppBar
                [isRTL ? 'right' : 'left']: 0,
                width: drawerWidth,
                height: 'calc(100vh - 64px)',
                zIndex: (theme) => theme.zIndex.appBar - 1,
              }}
            >
              <Sidebar
                setSelectedForm={setSelectedForm}
                anchor={isRTL ? 'right' : 'left'}
                open={sidebarOpen}
                toggleDrawer={toggleSidebar}
              />
            </Box>

            {/* Main content */}
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                mt: 8, // margin top for AppBar
                width: `calc(100% - ${drawerWidth}px)`,
                [isRTL ? 'marginRight' : 'marginLeft']: `${drawerWidth}px`,
                transition: 'all 0.3s ease',
              }}
            >
              <motion.div
                key={`${i18n.language}-${theme}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
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
