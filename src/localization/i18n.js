import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { svgIconClasses } from '@mui/material';

i18n
  .use(LanguageDetector) // Automatically detects user language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    fallbackLng: 'fi', // Fallback language if detection fails
    resources: {
      fi: {
        translation: require('./fi.json'),
      },
      en: {
        translation: require('./en.json'),
      },
      sv: {
        translation: require('./sv.json'),
      },
    }
  })

export default i18n;