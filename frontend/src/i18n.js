
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Configuring i18next to support multiple languages
i18n
  .use(Backend) // Loads translations from the backend or local files
  .use(LanguageDetector) // Automatically detects the user's language
  .use(initReactI18next) // Initializes i18next for React
  .init({
    fallbackLng: 'en', // Default language if the user's language is not available
    debug: true,
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
    },
    interpolation: {
      escapeValue: false, // React already escapes
    },
    react: {
      useSuspense: false, // Disables suspense for SSR rendering
    },
  });

export default i18n;
