import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/locales/en.json';
import ru from '@/locales/ru.json';
import es from '@/locales/es.json';
import de from '@/locales/de.json';
import fr from '@/locales/fr.json';
import ja from '@/locales/ja.json';
import pt from '@/locales/pt.json';
import it from '@/locales/it.json';
import zh from '@/locales/zh.json';
import ar from '@/locales/ar.json';
import nl from '@/locales/nl.json';
import sv from '@/locales/sv.json';
import no from '@/locales/no.json';
import pl from '@/locales/pl.json';
import ko from '@/locales/ko.json';
import hi from '@/locales/hi.json';
import tr from '@/locales/tr.json';
import cs from '@/locales/cs.json';

import { getDeviceLanguage } from '../helpers/getDeviceLanguage';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    es: { translation: es },
    de: { translation: de },
    fr: { translation: fr },
    ja: { translation: ja },
    pt: { translation: pt },
    it: { translation: it },
    zh: { translation: zh },
    ar: { translation: ar },
    nl: { translation: nl },
    sv: { translation: sv },
    no: { translation: no },
    pl: { translation: pl },
    ko: { translation: ko },
    hi: { translation: hi },
    tr: { translation: tr },
    cs: { translation: cs },
  },
  lng: getDeviceLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
