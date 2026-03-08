import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en';
import ru from './locales/ru';
import bg from './locales/bg';
import fr from './locales/fr';
import it from './locales/it';
import de from './locales/de';
import ar from './locales/ar';
import id from './locales/id';
import pt from './locales/pt';
import es from './locales/es';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      bg: { translation: bg },
      fr: { translation: fr },
      it: { translation: it },
      de: { translation: de },
      ar: { translation: ar },
      id: { translation: id },
      pt: { translation: pt },
      es: { translation: es },
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'pride_language',
    },
  });

export default i18n;
