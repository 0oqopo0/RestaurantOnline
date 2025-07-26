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
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../theme';

interface SidebarProps {
  anchor: 'left' | 'right';
  open: boolean;
  toggleDrawer: () => void;
  isMobile: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ anchor, open, toggleDrawer, isMobile }) => {
  const { t, i18n } = useTranslation();
  const { theme: themeMode, toggleTheme } = useThemeContext();
  const muiTheme = useTheme();
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(null);

  const drawerWidth = open ? (isMobile ? '100%' : 240) : 65;
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
    document.body.dir = lng === 'fa' ? 'rtl' : 'ltr';
    handleSettingsClose();
  };

  const menuItems = useMemo(
    () => [
      { title: t('sidebar.home'), icon: <Dashboard />, path: '/' },
      { title: t('sidebar.register'), icon: <HowToReg />, path: '/register' },
      { title: t('sidebar.login'), icon: <Login />, path: '/login' },
      { title: t('sidebar.menu'), icon: <Restaurant />, path: '/menu' },
      { title: t('sidebar.cart'), icon: <ShoppingCart />, path: '/cart' },
    ],
    [t]
  );

  const settingsContent = (
    <Box
      sx={{
        p: 2,
        backgroundColor: muiTheme.palette.background.paper,
        boxShadow: muiTheme.shadows[1],
        minWidth: 200,
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => changeLanguage('en')}>
            <ListItemIcon sx={{ color: themeMode === 'dark' ? '#ffffff' : '#000000', fontSize: '1.5rem' }}>
              <Language />
            </ListItemIcon>
            <ListItemText
              primary="English"
              sx={{
                '& .MuiTypography-root': {
                  fontFamily: "'AovelSansRounded', sans-serif",
                  fontWeight: '600',
                  fontSize: '1rem',
                  color: themeMode === 'dark' ? '#ffffff' : '#000000',
                },
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => changeLanguage('fa')}>
            <ListItemIcon sx={{ color: themeMode === 'dark' ? '#ffffff' : '#000000', fontSize: '1.5rem' }}>
              <Language />
            </ListItemIcon>
            <ListItemText
              primary="فارسی"
              sx={{
                '& .MuiTypography-root': {
                  fontFamily: "'Vazirmatn', sans-serif",
                  fontWeight: '600',
                  fontSize: '1rem',
                  color: themeMode === 'dark' ? '#ffffff' : '#000000',
                },
              }}
            />
          </ListItemButton>
        </ListItem>
        <Divider sx={{ my: 1 }} />
        <ListItem disablePadding>
          <ListItemButton onClick={toggleTheme}>
            <ListItemIcon sx={{ color: themeMode === 'dark' ? '#ffffff' : '#000000', fontSize: '1.5rem' }}>
              {themeMode === 'light' ? <Brightness7 /> : <Brightness4 />}
            </ListItemIcon>
            <ListItemText
              primary={t('sidebar.theme')}
              sx={{
                '& .MuiTypography-root': {
                  fontFamily: isRTL ? "'Vazirmatn', sans-serif" : "'AovelSansRounded', sans-serif",
                  fontWeight: '600',
                  fontSize: '1rem',
                  color: themeMode === 'dark' ? '#ffffff' : '#000000',
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
        variant={isMobile ? 'temporary' : 'permanent'}
        anchor={anchor}
        open={open}
        onClose={toggleDrawer}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: muiTheme.palette.background.paper,
            color: themeMode === 'dark' ? '#ffffff' : '#000000',
            borderRight: anchor === 'left' ? `1px solid ${muiTheme.palette.divider}` : undefined,
            borderLeft: anchor === 'right' ? `1px solid ${muiTheme.palette.divider}` : undefined,
            overflowX: 'hidden',
            transition: muiTheme.transitions.create('width', {
              easing: muiTheme.transitions.easing.sharp,
              duration: muiTheme.transitions.duration.enteringScreen,
            }),
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
                fontWeight: '600',
                fontSize: '1.5rem',
                fontFamily: isRTL ? "'Vazirmatn', sans-serif" : "'AovelSansRounded', sans-serif",
                color: themeMode === 'dark' ? '#ffffff' : '#000000',
              }}
            >
              {t('sidebar.title')}
            </Typography>
          )}
          <IconButton
            onClick={toggleDrawer}
            size="large"
            sx={{
              color: themeMode === 'dark' ? '#ffffff' : '#000000',
              fontSize: '1.5rem',
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
                    color: themeMode === 'dark' ? '#ffffff' : '#000000',
                    fontSize: '1.5rem',
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
                          fontWeight: '600',
                          fontSize: '1rem',
                          color: themeMode === 'dark' ? '#ffffff' : '#000000',
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

          {menuItems.map(({ title, icon, path }) => (
            <Tooltip key={title} title={!open ? title : ''} placement={isRTL ? 'left' : 'right'}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(path);
                    if (isMobile) toggleDrawer();
                  }}
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
                      color: themeMode === 'dark' ? '#ffffff' : '#000000',
                      fontSize: '1.5rem',
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
                          fontWeight: '600',
                          fontSize: '1rem',
                          color: themeMode === 'dark' ? '#ffffff' : '#000000',
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