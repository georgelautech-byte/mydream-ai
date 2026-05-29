import { StorageKeys } from '@/shared/config/constants/storageKeys';
import Button from '@/shared/ui/buttons/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export default function ClearCacheButton() {
  const clearCache = async () => {
    await SecureStore.deleteItemAsync(StorageKeys.appToken); // Перенести в LogOut
    await AsyncStorage.clear(); // Обязательно очищаем в конце
  };

  return <Button onPress={clearCache}>Clear cache</Button>;
}
