
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './translations/en.json';
import es from './translations/es.json';
import ar from './translations/ar.json';
import de from './translations/de.json';
import zh from './translations/zh.json';
import ja from './translations/ja.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    ar: { translation: ar },
    de: { translation: de },
    zh: { translation: zh },
    ja: { translation: ja }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
