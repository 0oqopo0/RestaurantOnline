import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Snackbar,
  Alert,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

// Import images
import kebabImage from '@assets/IMG/alejandra-cifre-gonzalez-34B36bGmQlc-unsplash.jpg';
import joojehImage from '@assets/IMG/blackieshoot-anCmjb-_g44-unsplash.jpg';
import ghormehImage from '@assets/IMG/blake-wisz-d_hpBZUdQEA-unsplash.jpg';
import shiraziSaladImage from '@assets/IMG/jason-briscoe-GrdJp16CPk8-unsplash.jpg';
import mastKhiarImage from '@assets/IMG/kimia-kazemi-971_E-LvZuc-unsplash.jpg';
import sodaImage from '@assets/IMG/liubov-ilchuk-_qZOwG2oaj4-unsplash.jpg';

interface MenuItem {
  id: string;
  image: string;
  price: number;
  name: string;
}

const Menu: React.FC = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const { addToCart } = useCart();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const isRTL = i18n.language === 'fa';
  const fontFamily = isRTL ? "'Vazirmatn', 'B Nazanin', sans-serif" : "'AovelSansRounded', sans-serif";

  const [items] = useState<MenuItem[]>([
    {
      id: 'kebab',
      image: kebabImage,
      price: 150000,
      name: t('menu.items.kebab')
    },
    {
      id: 'joojeh',
      image: joojehImage,
      price: 120000,
      name: t('menu.items.joojeh')
    },
    {
      id: 'ghormeh',
      image: ghormehImage,
      price: 100000,
      name: t('menu.items.ghormeh')
    },
    {
      id: 'shirazi_salad',
      image: shiraziSaladImage,
      price: 30000,
      name: t('menu.items.shirazi_salad')
    },
    {
      id: 'mast_khiar',
      image: mastKhiarImage,
      price: 25000,
      name: t('menu.items.mast_khiar')
    },
    {
      id: 'soda',
      image: sodaImage,
      price: 20000,
      name: t('menu.items.soda')
    }
  ]);

  const handleAddToCart = (item: MenuItem) => {
    addToCart({ 
      id: item.id, 
      name: item.name, 
      price: item.price,
      // quantity: 1,
      image: item.image
    });
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ 
      maxWidth: 1400, 
      mx: 'auto', 
      p: { xs: 2, md: 4 },
      direction: isRTL ? 'rtl' : 'ltr'
    }}>
      <Typography
        variant="h3"
        sx={{
          mb: { xs: 3, md: 5 },
          textAlign: 'center',
          fontFamily,
          color: 'text.primary',
          fontSize: { xs: '1.8rem', md: '2.4rem' },
          fontWeight: 700
        }}
      >
        {t('menu.title')}
      </Typography>
      
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                sx={{
                  bgcolor: 'background.paper',
                  color: 'text.primary',
                  borderRadius: 3,
                  boxShadow: theme.shadows[2],
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[6],
                  }
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ 
                    height: { xs: 180, sm: 220, md: 240 },
                    objectFit: 'cover',
                  }}
                  image={item.image}
                  alt={item.name}
                  loading="lazy"
                />
                <CardContent sx={{ 
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  p: { xs: 2, md: 3 }
                }}>
                  <Box>
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{ 
                        fontFamily,
                        fontWeight: 600,
                        mb: 1
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 2,
                        fontFamily,
                        color: 'text.secondary',
                        minHeight: { xs: '40px', md: '60px' }
                      }}
                    >
                      {t(`menu.items.${item.id}_desc`)}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily,
                        color: 'primary.main',
                        fontWeight: 700,
                        mb: 2
                      }}
                    >
                      {new Intl.NumberFormat(i18n.language, {
                        style: 'currency',
                        currency: 'IRR'
                      }).format(item.price).replace('IRR', '')} تومان
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleAddToCart(item)}
                    sx={{ 
                      fontFamily,
                      fontWeight: 600,
                      fontSize: '1rem',
                      py: 1.5,
                      mt: 'auto'
                    }}
                  >
                    {t('menu.add_to_cart')}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{
            fontFamily,
            width: '100%',
            bgcolor: 'success.main',
            color: 'common.white',
            '& .MuiAlert-icon': {
              color: 'common.white'
            }
          }}
        >
          {t('menu.added_to_cart')}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Menu;