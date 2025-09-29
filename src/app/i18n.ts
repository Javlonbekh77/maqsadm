
'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '../../locales/en.json';
import uz from '../../locales/uz.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      uz: {
        translation: uz,
      },
    },
    fallbackLng: 'uz',
    debug: false, // Set to true to see i18next logs in the console
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    detection: {
      order: ['cookie', 'localStorage', 'navigator'],
      caches: ['cookie', 'localStorage'],
    },
    // Prevent loading on the server
    react: {
      useSuspense: false,
    },
  });

export default i18n;
