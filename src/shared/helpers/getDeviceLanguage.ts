/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { getLocales } from 'expo-localization';
import { DEFAUTL_LANGUAGE } from '../config/constants/constants';
import { errorLogger } from '../service/logger.service/sentry.service';

export const getDeviceLanguage = () => {
  try {
    const devLang = getLocales();
    const devLangCode = devLang[0].languageCode || DEFAUTL_LANGUAGE;

    return devLangCode;
  } catch {
    errorLogger.logError('Error to get device language');
    return DEFAUTL_LANGUAGE;
  }
};
