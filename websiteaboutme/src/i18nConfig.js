import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import languageNames from './translations/languageNames.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: require('./translations/en.json')
            },
            de: {
                translation: require('./translations/de.json')
            },
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        lng: localStorage.getItem('selectedLanguage') || 'en',
    });

export { languageNames };
export default i18n;
