import i18n from 'i18next/index'
import { initReactI18next } from 'react-i18next'
import en from './locales/en/translate.json'
import de from './locales/de/translate.json'
import it from './locales/it/translate.json'
import es from './locales/es/translate.json'

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: 'en',
  resources: {
    en,
    de,
    it,
    es
  }
})
