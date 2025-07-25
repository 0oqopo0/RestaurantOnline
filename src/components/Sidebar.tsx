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
  Popover,
  useTheme,
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
import { useThemeContext } from '../theme';

interface SidebarProps {
  setSelectedForm: (form: string) => void;
  anchor: 'left' | 'right';
  open: boolean;
  toggleDrawer: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setSelectedForm, anchor, open, toggleDrawer }) => {
  const { t, i18n } = useTranslation();
  const { theme: themeMode, toggleTheme } = useThemeContext();
  const muiTheme = useTheme(); // استفاده از تم MUI
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(null);

  const drawerWidth = open ? 240 : 65;
  const isRTL = i18n.language === 'fa';

  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    if (open) {
      setIsSettingsOpen((prev) => !prev);
    } else {
      setSettingsAnchorEl(event.currentTarget);
    }
  };

  const handleSettingsClose = () => {
    setSettingsAnchorEl(null);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    handleSettingsClose();
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

  const settingsContent = (
    <Box
      sx={{
        p: 2,
        backgroundColor: muiTheme.palette.background.paper,
        boxShadow: muiTheme.shadows[1], // استفاده از shadow تعریف شده در تم
        minWidth: 200,
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => changeLanguage('en')}>
            <ListItemIcon sx={{ color: muiTheme.palette.text.primary }}>
              <Language />
            </ListItemIcon>
            <ListItemText
              primary="English"
              sx={{
                '& .MuiTypography-root': {
                  fontFamily: "'AovelSansRounded', sans-serif",
                },
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => changeLanguage('fa')}>
            <ListItemIcon sx={{ color: muiTheme.palette.text.primary }}>
              <Language />
            </ListItemIcon>
            <ListItemText
              primary="فارسی"
              sx={{
                '& .MuiTypography-root': {
                  fontFamily: "'Vazirmatn', sans-serif",
                },
              }}
            />
          </ListItemButton>
        </ListItem>
        <Divider sx={{ my: 1 }} />
        <ListItem disablePadding>
          <ListItemButton onClick={toggleTheme}>
            <ListItemIcon sx={{ color: muiTheme.palette.text.primary }}>
              {themeMode === 'light' ? <Brightness7 /> : <Brightness4 />}
            </ListItemIcon>
            <ListItemText
              primary={t('sidebar.theme')}
              sx={{
                '& .MuiTypography-root': {
                  fontFamily: isRTL ? "'Vazirmatn', sans-serif" : "'AovelSansRounded', sans-serif",
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="permanent"
        anchor={anchor}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: muiTheme.palette.background.paper,
            color: muiTheme.palette.text.primary,
            borderRight: anchor === 'left' ? `1px solid ${muiTheme.palette.divider}` : undefined,
            borderLeft: anchor === 'right' ? `1px solid ${muiTheme.palette.divider}` : undefined,
            overflowX: 'hidden',
          },
        }}
      >
        <Box
          sx={{
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: open ? 'space-between' : 'center',
            borderBottom: `1px solid ${muiTheme.palette.divider}`,
          }}
        >
          {open && (
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                fontFamily: isRTL ? "'Vazirmatn', sans-serif" : "'AovelSansRounded', sans-serif",
              }}
            >
              {t('sidebar.title')}
            </Typography>
          )}
          <IconButton
            onClick={toggleDrawer}
            size="small"
            sx={{
              color: muiTheme.palette.text.primary,
              '&:hover': { bgcolor: muiTheme.palette.action.hover },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <List sx={{ pt: 1 }}>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <Tooltip title={!open ? t('sidebar.settings') : ''} placement={isRTL ? 'left' : 'right'}>
              <ListItemButton
                onClick={handleSettingsClick}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 1,
                  '&:hover': { backgroundColor: muiTheme.palette.action.hover },
                  borderRadius: '8px',
                  mx: 1,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                    color: muiTheme.palette.text.primary,
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
                          fontFamily: isRTL ? "'Vazirmatn', sans-serif" : "'AovelSansRounded', sans-serif",
                        },
                      }}
                    />
                    {isSettingsOpen ? <ExpandLess /> : <ExpandMore />}
                  </>
                )}
              </ListItemButton>
            </Tooltip>
          </ListItem>

          {open && (
            <Collapse in={isSettingsOpen} timeout="auto" unmountOnExit>
              {settingsContent}
            </Collapse>
          )}

          <Divider sx={{ my: 1 }} />

          {menuItems.map(({ title, icon, onClick }) => (
            <Tooltip key={title} title={!open ? title : ''} placement={isRTL ? 'left' : 'right'}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={onClick}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2,
                    '&:hover': { backgroundColor: muiTheme.palette.action.hover },
                    borderRadius: '8px',
                    mx: 1,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : 'auto',
                      justifyContent: 'center',
                      color: muiTheme.palette.text.primary,
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      primary={title}
                      sx={{
                        '& .MuiTypography-root': {
                          fontFamily: isRTL ? "'Vazirmatn', sans-serif" : "'AovelSansRounded', sans-serif",
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

      <Popover
        open={Boolean(settingsAnchorEl)}
        anchorEl={settingsAnchorEl}
        onClose={handleSettingsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: isRTL ? 'left' : 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: isRTL ? 'right' : 'left',
        }}
      >
        {settingsContent}
      </Popover>
    </>
  );
};

export default Sidebar;