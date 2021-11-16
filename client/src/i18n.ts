import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from './locales/en/translation.json';
import translationRU from './locales/ru/translation.json';

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  ru: {
    translation: translationRU
  },
};
i18n
  .use(initReactI18next)
  // .use(reactI18nextModule as Module) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: localStorage.getItem("i18nextLng") as string || "en",
    // keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });
export default i18n;