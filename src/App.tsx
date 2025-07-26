// src/App.tsx
import { useState, useEffect } from 'react';
import { CssBaseline, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMomentJalaali } from '@mui/x-date-pickers/AdapterMomentJalaali';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'; // اضافه کردن useNavigate

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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [selectedForm, setSelectedForm] = useState<string>(''); // state برای selectedForm
  const isRTL = i18n.language === 'fa';
  const drawerWidth = sidebarOpen ? (isMobile ? '100%' : 240) : 65;
  const location = useLocation();
  const navigate = useNavigate(); // برای تغییر مسیر

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
      if (window.innerWidth <= 600) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // استفاده از selectedForm برای تغییر مسیر
  useEffect(() => {
    if (selectedForm === 'cart') {
      navigate('/cart');
    } else if (selectedForm === 'home') {
      navigate('/');
    } else if (selectedForm === 'menu') {
      navigate('/menu');
    } // می‌توانید مسیرهای دیگر را نیز اضافه کنید
  }, [selectedForm, navigate]);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <LocalizationProvider dateAdapter={AdapterMomentJalaali}>
      <CartProvider>
        <ThemeProvider>
          <Box
            sx={{
              display: 'flex',
              minHeight: '100vh',
              fontFamily: isRTL
                ? "'Vazirmatn', 'B Nazanin', sans-serif"
                : "'AovelSansRounded', sans-serif",
            }}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <CssBaseline />

            <NavBar
              toggleSidebar={toggleSidebar}
              sidebarOpen={sidebarOpen}
              setSelectedForm={setSelectedForm}
            />

            <Box
              component="nav"
              sx={{
                position: 'fixed',
                top: 64,
                [isRTL ? 'right' : 'left']: 0,
                width: drawerWidth,
                height: 'calc(100vh - 64px)',
                zIndex: muiTheme.zIndex.appBar - 1,
                transition: muiTheme.transitions.create('width', {
                  easing: muiTheme.transitions.easing.sharp,
                  duration: muiTheme.transitions.duration.enteringScreen,
                }),
                overflowX: 'hidden',
              }}
            >
              <Sidebar
                anchor={isRTL ? 'right' : 'left'}
                open={sidebarOpen}
                toggleDrawer={toggleSidebar}
                isMobile={isMobile}
              />
            </Box>

            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                pt: 8,
                width: isMobile && !sidebarOpen ? '100%' : `calc(100% - ${drawerWidth}px)`,
                [isRTL ? 'marginRight' : 'marginLeft']: isMobile && !sidebarOpen ? 0 : `${drawerWidth}px`,
                transition: muiTheme.transitions.create(['margin', 'width'], {
                  easing: muiTheme.transitions.easing.sharp,
                  duration: muiTheme.transitions.duration.standard,
                }),
              }}
            >
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/RestaurantOnline" element={<HomePage />} />                  
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/cart" element={<Cart />} />
                </Routes>
              </motion.div>
            </Box>
          </Box>
        </ThemeProvider>
      </CartProvider>
    </LocalizationProvider>
  );
}

export default App;