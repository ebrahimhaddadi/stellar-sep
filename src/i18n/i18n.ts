import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './translations/en.json';
import ar from './translations/ar.json';

i18n
  .use(initReactI18next) // ادغام با React
  .use(LanguageDetector) // تشخیص زبان مرورگر
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar }
    },
    fallbackLng: 'en', // زبان پیش‌فرض (انگلیسی)
    interpolation: {
      escapeValue: false // برای React لازم است
    },
    detection: {
      order: ['localStorage', 'navigator'], // اولویت تشخیص
      caches: ['localStorage'] // ذخیره در localStorage
    }
  });

export default i18n;
