import { useEffect, useState, useCallback } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, Avatar, Badge } from '@mui/material';
import moment from 'moment-jalaali';
import { ShoppingCart, Menu as MenuIcon } from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';
import { useThemeContext } from '../theme';

interface NavBarProps {
  setSelectedForm: React.Dispatch<React.SetStateAction<string>>;
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const NavBar = ({ setSelectedForm, toggleSidebar, sidebarOpen }: NavBarProps) => {
  const [currentTime, setCurrentTime] = useState(moment());
  const { cartItems } = useCart();
  const { theme } = useThemeContext();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getTotalItems = useCallback(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: theme === 'light' ? '#ffffff' : '#1f2937',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderBottom: `1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'}`,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: theme === 'light' ? '#000000' : '#e2e8f0',
        width: '100%',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={toggleSidebar}
            sx={{
              color: theme === 'light' ? '#000000' : '#e2e8f0',
              transition: 'color 0.1s ease',
              '&:hover': { bgcolor: theme === 'light' ? '#f3f4f6' : '#374151' },
            }}
            aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
          >
            <MenuIcon />
          </IconButton>

          <Avatar
            sx={{
              bgcolor: theme === 'light' ? '#e5e7eb' : '#374151',
              width: 45,
              height: 45,
              border: `2px solid ${theme === 'light' ? '#d1d5db' : '#4b5563'}`,
              fontFamily: "'Vazirmatn', sans-serif",
              fontSize: '1.2rem',
              color: theme === 'light' ? '#000000' : '#e2e8f0',
            }}
          >
            ر آ
          </Avatar>

          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Vazirmatn', sans-serif",
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
              fontWeight: 'bold',
              color: theme === 'light' ? '#000000' : '#e2e8f0',
            }}
          >
            رستوران آنلاین
          </Typography>
        </Box>

        <Typography
          sx={{
            fontFamily: "'Vazirmatn', sans-serif",
            fontSize: { xs: '0.9rem', sm: '1.1rem' },
            color: theme === 'light' ? '#6b7280' : '#9ca3af',
            direction: 'rtl',
          }}
        >
          {currentTime.format('HH:mm:ss jYYYY/jMM/jDD')}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
          <Typography
            sx={{
              fontFamily: "'Vazirmatn', sans-serif",
              fontSize: { xs: '0.9rem', sm: '1.1rem' },
              color: theme === 'light' ? '#6b7280' : '#9ca3af',
            }}
          >
            خوش آمدید، کاربر گرامی
          </Typography>

          <IconButton sx={{ p: 0 }}>
            <Avatar
              sx={{
                bgcolor: theme === 'light' ? '#e5e7eb' : '#374151',
                border: `2px solid ${theme === 'light' ? '#d1d5db' : '#4b5563'}`,
                width: 40,
                height: 40,
                color: theme === 'light' ? '#000000' : '#e2e8f0',
              }}
            >
              ک
            </Avatar>
          </IconButton>

          <IconButton
            onClick={() => setSelectedForm('cart')}
            sx={{
              color: theme === 'light' ? '#000000' : '#e2e8f0',
              '&:hover': { bgcolor: theme === 'light' ? '#f3f4f6' : '#374151' },
            }}
          >
            <Badge badgeContent={getTotalItems()} color="primary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;