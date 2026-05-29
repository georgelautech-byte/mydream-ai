import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';
import { errorLogger } from '../service/logger.service/sentry.service';

export const langUserMMKV = new MMKV({
  id: 'device-language',
});

export const zustandMMKVStorageLang: StateStorage = {
  setItem: async (name, value) => {
    try {
      langUserMMKV.set(name, value);
    } catch (error) {
      errorLogger.logError('Error setting item in storage');
    }
  },

  getItem: (name: string) => {
    try {
      const value = langUserMMKV.getString(name);
      if (value === undefined) {
        return null;
      }
      return value;
    } catch (error) {
      errorLogger.logError('Error getting item from storage');
      return null;
    }
  },

  removeItem: async name => {
    try {
      langUserMMKV.delete(name);
    } catch (error) {
      errorLogger.logError('Error removing item from storage');
    }
  },
};
