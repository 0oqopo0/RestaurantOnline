import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  FormHelperText,
  Link,
  Card,
  CardMedia,
  CardContent,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import loginImage from '@assets/IMG/blackieshoot-anCmjb-_g44-unsplash.jpg';

const Login = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isRTL = i18n.language === 'fa';
  const fontFamily = isRTL ? "'Vazirmatn', 'B Nazanin', sans-serif" : "'AovelSansRounded', sans-serif";

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = t('login.email_error');
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = t('login.password_error');
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
      p: { xs: 2, sm: 3 },
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 64px)',
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
            flexDirection: { xs: 'column', md: 'row' },
            height: { xs: 'auto', md: '500px' },
          }}
        >
          <CardMedia
            component="img"
            sx={{ 
              width: { xs: '100%', md: '45%' },
              height: { xs: 200, md: 'auto' },
              objectFit: 'cover',
            }}
            image={loginImage}
            alt="Login"
            loading="lazy"
          />
          <CardContent sx={{ 
            width: { xs: '100%', md: '55%' },
            p: { xs: 3, sm: 4, md: 5 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <Typography
              variant="h3"
              sx={{
                mb: 4,
                textAlign: 'center',
                fontFamily,
                color: 'text.primary',
                fontSize: { xs: '1.8rem', sm: '2.2rem' },
                fontWeight: 700,
              }}
            >
              {t('login.title')}
            </Typography>

            <form onSubmit={handleSubmit}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                  name="email"
                  label={t('login.email')}
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
                  InputLabelProps={{
                    style: { fontFamily }
                  }}
                  inputProps={{
                    style: { fontFamily }
                  }}
                />
                {errors.email && (
                  <FormHelperText error sx={{ fontFamily }}>
                    {errors.email}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  name="password"
                  label={t('login.password')}
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
                  InputLabelProps={{
                    style: { fontFamily }
                  }}
                  inputProps={{
                    style: { fontFamily }
                  }}
                />
                {errors.password && (
                  <FormHelperText error sx={{ fontFamily }}>
                    {errors.password}
                  </FormHelperText>
                )}
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.5,
                  mb: 2,
                  fontSize: '1.1rem',
                  fontFamily,
                  fontWeight: 600,
                }}
              >
                {t('login.submit')}
              </Button>

              <Typography
                variant="body1"
                align="center"
                sx={{
                  color: 'text.secondary',
                  fontFamily,
                }}
              >
                {t('login.no_account')}{' '}
                <Link
                  href="#/register"
                  sx={{
                    color: 'primary.main',
                    textDecoration: 'none',
                    fontFamily,
                    fontWeight: 600,
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {t('login.register')}
                </Link>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Login;