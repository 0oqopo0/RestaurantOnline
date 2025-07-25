// 📁 Sidebar.tsx
import { useState, useMemo } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Divider,
  Collapse,
} from '@mui/material';
import {
  Dashboard,
  Restaurant,
  Login,
  HowToReg,
  ShoppingCart,
  Language,
  Brightness4,
  Brightness7,
  Settings,
  ExpandMore,
  ExpandLess,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '../theme.tsx';

interface SidebarProps {
  setSelectedForm: (form: string) => void;
  anchor: 'left' | 'right';
  open: boolean;
  toggleDrawer: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setSelectedForm, anchor, open, toggleDrawer }) => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useThemeContext();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const drawerWidth = open ? 240 : 65;

  const toggleSettings = () => setIsSettingsOpen((prev) => !prev);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    if (!open) setIsSettingsOpen(false);
  };

  const menuItems = useMemo(
    () => [
      { title: t('sidebar.home'), icon: <Dashboard />, onClick: () => setSelectedForm('home') },
      { title: t('sidebar.register'), icon: <HowToReg />, onClick: () => setSelectedForm('register') },
      { title: t('sidebar.login'), icon: <Login />, onClick: () => setSelectedForm('login') },
      { title: t('sidebar.menu'), icon: <Restaurant />, onClick: () => setSelectedForm('menu') },
      { title: t('sidebar.cart'), icon: <ShoppingCart />, onClick: () => setSelectedForm('cart') },
    ],
    [t, setSelectedForm]
  );

  return (
    <Drawer
      variant="permanent"
      anchor={anchor}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        transition: 'width 0.1s ease', // ✅ سریع‌تر
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          transition: 'width 0.1s ease',
          overflowX: 'hidden',
          backgroundColor: theme === 'light' ? '#ffffff' : '#1f2937',
          color: theme === 'light' ? '#000000' : '#e2e8f0',
          borderRight: anchor === 'left' ? '1px solid #ccc' : undefined,
          borderLeft: anchor === 'right' ? '1px solid #ccc' : undefined,
        },
      }}
    >
      <Box
        sx={{
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'space-between' : 'center',
          borderBottom: `1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'}`,
        }}
      >
        {open && (
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', fontFamily: "'Roboto', 'B Nazanin', sans-serif" }}
          >
            {t('sidebar.title')}
          </Typography>
        )}
        <IconButton
          aria-label={t('sidebar.openMenu')}
          onClick={toggleDrawer}
          size="small"
          sx={{ color: theme === 'light' ? '#000' : '#e2e8f0' }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <List sx={{ pt: 1 }}>
        {/* تنظیمات */}
        <ListItem disablePadding sx={{ mb: 1 }}>
          <Tooltip title={!open ? t('sidebar.settings') : ''} placement="left">
            <ListItemButton
              onClick={toggleSettings}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2,
                '&:hover': {
                  backgroundColor: theme === 'light' ? '#f3f4f6' : '#374151',
                  transition: 'background-color 0.15s ease',
                },
                borderRadius: '8px',
                mx: 1,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                  color: theme === 'light' ? '#000000' : '#e2e8f0',
                }}
              >
                <Settings />
              </ListItemIcon>
              {open && (
                <>
                  <ListItemText
                    primary={t('sidebar.settings')}
                    sx={{
                      '& .MuiTypography-root': {
                        fontFamily: "'Roboto', 'B Nazanin', sans-serif",
                        color: theme === 'light' ? '#000000' : '#e2e8f0',
                      },
                    }}
                  />
                  {isSettingsOpen ? <ExpandLess /> : <ExpandMore />}
                </>
              )}
            </ListItemButton>
          </Tooltip>
        </ListItem>

        <Collapse in={isSettingsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: open ? 4 : 2 }}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => changeLanguage('en')}>
                <ListItemIcon sx={{ color: theme === 'light' ? '#000000' : '#e2e8f0' }}>
                  <Language />
                </ListItemIcon>
                <ListItemText primary={open ? 'English' : ''} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => changeLanguage('fa')}>
                <ListItemIcon sx={{ color: theme === 'light' ? '#000000' : '#e2e8f0' }}>
                  <Language />
                </ListItemIcon>
                <ListItemText primary={open ? 'فارسی' : ''} />
              </ListItemButton>
            </ListItem>
            <Divider sx={{ my: 1 }} />
            <ListItem disablePadding>
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon sx={{ color: theme === 'light' ? '#000000' : '#e2e8f0' }}>
                  {theme === 'light' ? <Brightness7 /> : <Brightness4 />}
                </ListItemIcon>
                <ListItemText primary={open ? t('sidebar.theme') : ''} />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>

        <Divider sx={{ my: 1 }} />

        {/* منوهای اصلی */}
        {menuItems.map(({ title, icon, onClick }) => (
          <Tooltip key={title} title={!open ? title : ''} placement="left">
            <ListItem disablePadding>
              <ListItemButton
                onClick={onClick}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2,
                  '&:hover': {
                    backgroundColor: theme === 'light' ? '#f3f4f6' : '#374151',
                    transition: 'background-color 0.15s ease',
                  },
                  borderRadius: '8px',
                  mx: 1,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                    color: theme === 'light' ? '#000000' : '#e2e8f0',
                  }}
                >
                  {icon}
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary={title}
                    sx={{
                      '& .MuiTypography-root': {
                        fontFamily: "'Roboto', 'B Nazanin', sans-serif",
                        color: theme === 'light' ? '#000000' : '#e2e8f0',
                      },
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
