import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Button,
  Divider,
  TextField,
  FormControl,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useTranslation } from 'react-i18next';

import cartImage from '@assets/IMG/kimia-kazemi-971_E-LvZuc-unsplash.jpg';

type FormData = {
  address: string;
  phone: string;
};

const Cart = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [orderInfo, setOrderInfo] = useState({
    code: '',
    time: '',
    total: 0
  });
  const isRTL = i18n.language === 'fa';
  const fontFamily = isRTL ? "'Vazirmatn', 'B Nazanin', sans-serif" : "'AovelSansRounded', sans-serif";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>();

  // فرمت قیمت
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(i18n.language, {
      style: 'currency',
      currency: 'IRR'
    }).format(price).replace('IRR', '');
  };

  // محاسبه مجموع
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // تغییر تعداد آیتم
  const handleQuantityChange = (itemId: string, change: number) => {
    const item = cartItems.find(i => i.id === itemId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        updateQuantity(itemId, newQuantity);
      } else {
        removeFromCart(itemId);
      }
    }
  };

  // ثبت سفارش
  const onSubmit = () => {
    const now = new Date();
    const trackingCode = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
    
    const orderTime = now.toLocaleString(i18n.language);
    const totalPrice = getTotalPrice();

    setOrderInfo({
      code: trackingCode,
      time: orderTime,
      total: totalPrice
    });

    setOpenSnackbar(true);
    clearCart();
    reset();
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ 
      p: { xs: 2, md: 3 },
      maxWidth: 1400,
      mx: 'auto',
      minHeight: 'calc(100vh - 64px)',
      direction: isRTL ? 'rtl' : 'ltr'
    }}>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Typography
          variant="h3"
          sx={{
            mb: { xs: 3, md: 4 },
            textAlign: 'center',
            fontFamily,
            color: 'text.primary',
            fontSize: { xs: '1.8rem', md: '2.2rem' },
            fontWeight: 700
          }}
        >
          {t('cart.title')}
        </Typography>

        {/* نمایش سفارش قبلی */}
        {orderInfo.code && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              sx={{
                bgcolor: 'success.light',
                mb: 3,
                border: '1px solid',
                borderColor: 'success.main',
                borderRadius: 2
              }}
            >
              <CardContent>
                <Typography
                  sx={{
                    fontFamily,
                    color: 'success.dark',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    mb: 1
                  }}
                >
                  {t('cart.last_order')}
                </Typography>
                <Typography
                  sx={{
                    fontFamily,
                    color: 'text.secondary',
                    mb: 1
                  }}
                >
                  {t('cart.tracking_code')}: <span style={{ color: 'primary.main', fontWeight: 'bold' }}>{orderInfo.code}</span>
                </Typography>
                <Typography
                  sx={{
                    fontFamily,
                    color: 'text.secondary',
                    mb: 1
                  }}
                >
                  {t('cart.order_time')}: {orderInfo.time}
                </Typography>
                <Typography
                  sx={{
                    fontFamily,
                    color: 'text.secondary'
                  }}
                >
                  {t('cart.total')}: {formatPrice(orderInfo.total)} {t('currency')}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          {/* لیست آیتم‌های سبد خرید */}
          <Card
            sx={{
              flex: 1,
              bgcolor: 'background.paper',
              borderRadius: 3,
              boxShadow: theme.shadows[2],
              maxHeight: { md: '60vh' },
              overflow: 'auto'
            }}
          >
            <CardContent>
              {cartItems.length > 0 ? (
                <>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 2,
                      fontFamily,
                      color: 'text.primary',
                      fontWeight: 600
                    }}
                  >
                    {t('cart.items')} ({cartItems.length})
                  </Typography>
                  
                  <List>
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <ListItem
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            py: 2,
                            px: 1
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar 
                              src={item.image} 
                              alt={item.name}
                              sx={{ 
                                width: 250, 
                                height: 250,
                                mr: 2,
                                borderRadius: 1
                              }}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography
                                sx={{
                                  fontFamily,
                                  color: 'text.primary',
                                  fontSize: '1.1rem'
                                }}
                              >
                                {item.name}
                              </Typography>
                            }
                            secondary={
                              <Typography
                                sx={{
                                  fontFamily,
                                  color: 'primary.main',
                                  mt: 0.5
                                }}
                              >
                                {formatPrice(item.price)} {t('currency')}
                              </Typography>
                            }
                          />
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IconButton
                              size="small"
                              onClick={() => handleQuantityChange(item.id, -1)}
                              sx={{ color: 'primary.main' }}
                            >
                              <Remove fontSize="small" />
                            </IconButton>
                            <Typography
                              sx={{
                                fontFamily,
                                color: 'text.primary',
                                minWidth: 24,
                                textAlign: 'center'
                              }}
                            >
                              {item.quantity}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => handleQuantityChange(item.id, 1)}
                              sx={{ color: 'primary.main' }}
                            >
                              <Add fontSize="small" />
                            </IconButton>
                            <IconButton
                              onClick={() => removeFromCart(item.id)}
                              sx={{ color: 'error.main', ml: 1 }}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Box>
                        </ListItem>
                        {index < cartItems.length - 1 && (
                          <Divider sx={{ borderColor: 'divider' }} />
                        )}
                      </motion.div>
                    ))}
                  </List>
                </>
              ) : (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  py: 4,
                  textAlign: 'center'
                }}>
                  <Typography
                    sx={{
                      fontFamily,
                      color: 'text.secondary',
                      mb: 2
                    }}
                  >
                    {t('cart.empty')}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* خلاصه سفارش و فرم */}
          {cartItems.length > 0 ? (
            <Box sx={{ 
              width: { xs: '100%', md: 400 },
              display: 'flex',
              flexDirection: 'column',
              gap: 3
            }}>
              <Card
                sx={{
                  bgcolor: 'background.paper',
                  borderRadius: 3,
                  boxShadow: theme.shadows[2],
                  p: 3
                }}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Typography
                  variant="h5"
                  sx={{
                    mb: 3,
                    fontFamily,
                    color: 'text.primary',
                    fontWeight: 600
                  }}
                >
                  {t('cart.order_summary')}
                </Typography>

                <Box sx={{ mb: 3 }}>
                  {cartItems.map(item => (
                    <Box 
                      key={item.id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily,
                          color: 'text.secondary'
                        }}
                      >
                        {item.name} × {item.quantity}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily,
                          color: 'text.primary'
                        }}
                      >
                        {formatPrice(item.price * item.quantity)}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 3
                }}>
                  <Typography
                    sx={{
                      fontFamily,
                      color: 'text.primary',
                      fontWeight: 600
                    }}
                  >
                    {t('cart.total')}:
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily,
                      color: 'primary.main',
                      fontWeight: 700,
                      fontSize: '1.2rem'
                    }}
                  >
                    {formatPrice(getTotalPrice())}
                  </Typography>
                </Box>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <TextField
                    label={t('cart.address')}
                    multiline
                    rows={3}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                    {...register('address', { 
                      required: t('cart.address_required'),
                      minLength: {
                        value: 10,
                        message: t('cart.address_min_length')
                      }
                    })}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'text.primary',
                        '& fieldset': { borderColor: 'divider' },
                        '&:hover fieldset': { borderColor: 'primary.main' },
                      },
                      '& .MuiInputLabel-root': { color: 'text.secondary' },
                    }}
                    InputLabelProps={{ style: { fontFamily } }}
                    inputProps={{ style: { fontFamily } }}
                  />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 3 }}>
                  <TextField
                    label={t('cart.phone')}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    {...register('phone', { 
                      required: t('cart.phone_required'),
                      pattern: {
                        value: /^[0-9]{10,11}$/,
                        message: t('cart.phone_invalid')
                      }
                    })}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'text.primary',
                        '& fieldset': { borderColor: 'divider' },
                        '&:hover fieldset': { borderColor: 'primary.main' },
                      },
                      '& .MuiInputLabel-root': { color: 'text.secondary' },
                    }}
                    InputLabelProps={{ style: { fontFamily } }}
                    inputProps={{ style: { fontFamily } }}
                  />
                </FormControl>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontFamily,
                    fontWeight: 600
                  }}
                >
                  {t('cart.submit_order')}
                </Button>
              </Card>

              {!isMobile && (
                <CardMedia
                  component="img"
                  sx={{ 
                    borderRadius: 3,
                    height: 200,
                    objectFit: 'cover'
                  }}
                  image={cartImage}
                  alt="Cart"
                />
              )}
            </Box>
          ) : null}
        </Box>
      </motion.div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
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
          <Typography sx={{ fontFamily, fontWeight: 600 }}>
            {t('cart.order_success')}
          </Typography>
          <Typography sx={{ fontFamily, mt: 1 }}>
            {t('cart.tracking_code')}: {orderInfo.code}
          </Typography>
          <Typography sx={{ fontFamily }}>
            {t('cart.order_time')}: {orderInfo.time}
          </Typography>
          <Typography sx={{ fontFamily }}>
            {t('cart.total')}: {formatPrice(orderInfo.total)}
          </Typography>
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Cart;