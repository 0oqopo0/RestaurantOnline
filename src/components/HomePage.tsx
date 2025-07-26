import { Box, Typography, Card, CardMedia, CardContent, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import featureImage1 from '@assets/IMG/alejandra-cifre-gonzalez-34B36bGmQlc-unsplash.jpg';
import featureImage2 from '@assets/IMG/blackieshoot-anCmjb-_g44-unsplash.jpg';
import featureImage3 from '@assets/IMG/blake-wisz-d_hpBZUdQEA-unsplash.jpg';
import aboutImage from '@assets/IMG/jason-briscoe-GrdJp16CPk8-unsplash.jpg';

const HomePage = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isRTL = i18n.language === 'fa';
  const fontFamily = isRTL ? "'Vazirmatn', sans-serif" : "'AovelSansRounded', sans-serif";

  const features = [
    {
      title: t('home.features.variety'),
      description: t('home.features.variety_desc'),
      image: featureImage1,
    },
    {
      title: t('home.features.fast_service'),
      description: t('home.features.fast_service_desc'),
      image: featureImage2,
    },
    {
      title: t('home.features.quality'),
      description: t('home.features.quality_desc'),
      image: featureImage3,
    },
  ];

  return (
    <Box sx={{ 
      p: { xs: 2, md: 3 },
      maxWidth: 1400,
      mx: 'auto',
      mt: { xs: 0, sm: 2 },
    }}>
      {/* عنوان اصلی */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
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
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' },
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          {t('home.welcome')}
        </Typography>
      </motion.div>

      {/* ویژگی‌ها */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
          gap: { xs: 2, md: 3 },
          mb: { xs: 4, md: 6 },
        }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: theme.shadows[2],
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[6],
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  height: { xs: 180, sm: 200, md: 220 },
                  objectFit: 'cover',
                }}
                image={feature.image}
                alt={feature.title}
                loading="lazy"
              />
              <CardContent sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h3"
                  sx={{
                    fontFamily,
                    color: 'text.primary',
                    textAlign: 'center',
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily,
                    color: 'text.secondary',
                    textAlign: 'center',
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    lineHeight: 1.6,
                  }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>

      {/* بخش درباره ما */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: theme.shadows[2],
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              boxShadow: theme.shadows[6],
            },
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: { xs: '100%', md: '45%' },
              height: { xs: 200, md: 'auto' },
              objectFit: 'cover',
            }}
            image={aboutImage}
            alt="About Us"
            loading="lazy"
          />
          <Box sx={{ 
            width: { xs: '100%', md: '55%' },
            p: { xs: 3, md: 4 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                mb: 3,
                fontFamily,
                color: 'text.primary',
                textAlign: 'center',
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 700,
              }}
            >
              {t('home.about_us')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily,
                color: 'text.secondary',
                textAlign: 'center',
                lineHeight: 1.8,
                fontSize: { xs: '0.95rem', md: '1.05rem' },
              }}
            >
              {t('home.about_us_desc')}
            </Typography>
          </Box>
        </Card>
      </motion.div>
    </Box>
  );
};

export default HomePage;