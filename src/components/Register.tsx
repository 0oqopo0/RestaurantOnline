import { useState } from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  FormHelperText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import registerImage from '@assets/IMG/alejandra-cifre-gonzalez-34B36bGmQlc-unsplash.jpg';

const Register = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isRTL = i18n.language === 'fa';
  const fontFamily = isRTL ? "'Vazirmatn', 'B Nazanin', sans-serif" : "'AovelSansRounded', sans-serif";

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setErrors(prev => ({
      ...prev,
      [name]: '',
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.fullName.trim()) {
      newErrors.fullName = t('register.fullname_error');
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = t('register.email_error');
      isValid = false;
    }

    const phoneRegex = /^0\d{10}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
      newErrors.phone = t('register.phone_error');
      isValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = t('register.password_error');
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('register.confirm_password_error');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <Box sx={{ 
      p: { xs: 2, md: 3 },
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 64px)'
    }}>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ width: '100%', maxWidth: '1000px' }}
      >
        <Card
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: theme.shadows[4],
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            minHeight: isMobile ? 'auto' : '500px'
          }}
        >
          {!isMobile && (
            <CardMedia
              component="img"
              sx={{ 
                width: '45%',
                objectFit: 'cover'
              }}
              image={registerImage}
              alt="Register"
              loading="lazy"
            />
          )}

          <CardContent sx={{ 
            width: isMobile ? '100%' : '55%',
            p: { xs: 3, md: 4 },
            overflowY: 'auto'
          }}>
            <Typography
              variant="h3"
              sx={{
                mb: 4,
                textAlign: 'center',
                fontFamily,
                color: 'text.primary',
                fontSize: { xs: '1.8rem', md: '2.2rem' },
                fontWeight: 700
              }}
            >
              {t('register.title')}
            </Typography>

            <form onSubmit={handleSubmit}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                  name="fullName"
                  label={t('register.fullname')}
                  value={formData.fullName}
                  onChange={handleChange}
                  error={!!errors.fullName}
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
                {errors.fullName && (
                  <FormHelperText error sx={{ fontFamily }}>
                    {errors.fullName}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                  name="email"
                  label={t('register.email')}
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
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
                {errors.email && (
                  <FormHelperText error sx={{ fontFamily }}>
                    {errors.email}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                  name="phone"
                  label={t('register.phone')}
                  value={formData.phone}
                  onChange={handleChange}
                  error={!!errors.phone}
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
                {errors.phone && (
                  <FormHelperText error sx={{ fontFamily }}>
                    {errors.phone}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                  name="password"
                  label={t('register.password')}
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
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
                {errors.password && (
                  <FormHelperText error sx={{ fontFamily }}>
                    {errors.password}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  name="confirmPassword"
                  label={t('register.confirm_password')}
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
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
                {errors.confirmPassword && (
                  <FormHelperText error sx={{ fontFamily }}>
                    {errors.confirmPassword}
                  </FormHelperText>
                )}
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontFamily,
                  fontWeight: 600
                }}
              >
                {t('register.submit')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Register;