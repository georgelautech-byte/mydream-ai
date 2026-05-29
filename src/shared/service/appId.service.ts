import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { StorageKeys } from '../config/constants/storageKeys';
import { errorLogger } from './logger.service/sentry.service';

export const getAppToken = async () => {
  try {
    let id = await SecureStore.getItemAsync(StorageKeys.appToken);

    if (!id) {
      id = uuidv4();
      await SecureStore.setItemAsync(StorageKeys.appToken, id);
    }
    return id;
  } catch {
    errorLogger.logError('Error to get app token');
  }
};

export const isAppToken = async () => {
  // if (__DEV__) {
  //   return '7a0f9f48-03b0-4c8d-9c54-411fb5df6f04';
  // }

  try {
    const id = await SecureStore.getItemAsync(StorageKeys.appToken);
    return !!id;
  } catch {
    errorLogger.logError('Error to get app token (isAppToken)');
    return false;
  }
};
