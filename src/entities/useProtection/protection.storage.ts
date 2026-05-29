import { errorLogger } from '@/shared/service/logger.service/sentry.service';
import * as SecureStore from 'expo-secure-store';
import { StateStorage } from 'zustand/middleware';

export const zustandStoreProtection: StateStorage = {
  setItem: async (name, value) => {
    try {
      await SecureStore.setItemAsync(name, value);
    } catch (error) {
      errorLogger.logError('Error setting item in storage');
    }
  },

  getItem: async (name: string) => {
    try {
      const value = await SecureStore.getItemAsync(name);
      return value;
    } catch (error) {
      errorLogger.logError('Error getting item from storage');
      return null;
    }
  },

  removeItem: async name => {
    try {
      await SecureStore.deleteItemAsync(name);
    } catch (error) {
      errorLogger.logError('Error removing item from storage');
    }
  },
};
