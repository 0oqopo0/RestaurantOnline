import { useEffect, useState } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, Avatar, Badge } from '@mui/material';
import { motion } from 'framer-motion';
import moment from 'moment-jalaali';
import { ShoppingCart, Menu as MenuIcon } from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';
import { useThemeContext } from '../theme.tsx';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  addedAt: string;
}

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

  const getTotalItems = () => {
    return cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
  };

  // استفاده dummy از sidebarOpen برای رفع TS6133
  // بعداً می‌تونی اینجا منطق واقعی بذاری (مثلاً تغییر عرض AppBar)
  const appBarWidth = sidebarOpen ? 'calc(100% - 240px)' : 'calc(100% - 65px)';

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: theme === 'light' ? '#ffffff' : '#1f2937',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderBottom: `1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'}`,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: theme === 'light' ? '#000000' : '#e2e8f0',
        width: appBarWidth, // استفاده از sidebarOpen
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* همبرگر و لوگو */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <IconButton
              onClick={toggleSidebar}
              sx={{ color: theme === 'light' ? '#000000' : '#e2e8f0' }}
            >
              <MenuIcon />
            </IconButton>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Avatar
              sx={{
                bgcolor: theme === 'light' ? '#e5e7eb' : '#374151',
                width: 45,
                height: 45,
                border: `2px solid ${theme === 'light' ? '#d1d5db' : '#4b5563'}`,
                fontFamily: "'B Nazanin', sans-serif",
                fontSize: '1.2rem',
                color: theme === 'light' ? '#000000' : '#e2e8f0',
              }}
            >
              ر آ
            </Avatar>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'B Nazanin', sans-serif",
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: theme === 'light' ? '#000000' : '#e2e8f0',
              }}
            >
              رستوران آنلاین
            </Typography>
          </motion.div>
        </Box>

        {/* ساعت */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Typography
            sx={{
              fontFamily: "'B Nazanin', sans-serif",
              fontSize: '1.1rem',
              color: theme === 'light' ? '#6b7280' : '#9ca3af',
              direction: 'rtl',
            }}
          >
            {currentTime.format('HH:mm:ss jYYYY/jMM/jDD')}
          </Typography>
        </motion.div>

        {/* آیکن‌های سمت راست */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Typography
              sx={{
                fontFamily: "'B Nazanin', sans-serif",
                fontSize: '1.1rem',
                color: theme === 'light' ? '#6b7280' : '#9ca3af',
              }}
            >
              خوش آمدید، کاربر گرامی
            </Typography>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
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
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <IconButton
              onClick={() => setSelectedForm('cart')}
              sx={{ color: theme === 'light' ? '#000000' : '#e2e8f0' }}
            >
              <Badge badgeContent={getTotalItems()} color="primary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </motion.div>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;