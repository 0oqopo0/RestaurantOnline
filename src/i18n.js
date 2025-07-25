   import i18next from 'i18next';
   import { initReactI18next } from 'react-i18next';
   import en from './locales/en.json';
   import fa from './locales/fa.json';

   i18next
     .use(initReactI18next)
     .init({
       resources: {
         en: { translation: en },
         fa: { translation: fa }
       },
       lng: 'fa', // Default language
       fallbackLng: 'en',
       interpolation: {
         escapeValue: false
       }
     });

   export default i18next;
   