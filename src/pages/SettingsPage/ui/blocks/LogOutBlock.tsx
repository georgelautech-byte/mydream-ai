import { apiService } from '@/shared/api/api';
import { StorageKeys } from '@/shared/config/constants/storageKeys';
import { useTheme } from '@/shared/hooks/useTheme';
import { Inform } from '@/shared/service/logger.service/logger.service';
import { errorLogger } from '@/shared/service/logger.service/sentry.service';
import GroupCard from '@/shared/ui/elements/GroupCard';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import SettingItem from '../../../../shared/ui/elements/SettingsItem';
import { AppIconsPicker } from '@/module/AppIconsPicker';
import { useProtection } from '@/entities/useProtection/useProtection';

export default function LogOutBlock() {
  const colors = useTheme();

  const { t } = useTranslation();
  const { reset } = useProtection();

  const logout = async () => {
    Alert.alert(t('settings-page.logout-alert-title'), t('settings-page.log-out-warn'), [
      {
        text: t('yes'),
        style: 'destructive',
        onPress: async () => {
          try {
            await SecureStore.deleteItemAsync(StorageKeys.appToken);
            reset();
            apiService.setAuthorizationHeader('');
            router.replace('/screens/onboarding');
          } catch (error) {
            errorLogger.logError('Error to logout user');
            Inform.error(error);
          }
        },
      },
      {
        text: t('no'),
        onPress: () => {},
        style: 'cancel',
      },
    ]);
  };

  return (
    <GroupCard title={t('settings-page.account-info')}>
      {/* <SettingItem
        onPress={restorePurchases}
        leftIcon={<Feather name="package" size={24} color={colors.text.primary} />}
        title="Restore purchases"
      /> */}
      {/* <SettingItem leftIcon={<Feather name="user" size={24} color={colors.text.primary} />} title="Account settings" /> */}
      {__DEV__ && <AppIconsPicker />}
      <SettingItem
        danger
        leftIcon={<Feather name="log-out" size={24} color={colors.text.primary} />}
        title={t('settings-page.log-out')}
        onPress={logout}
        rightIcon={<></>}
      />
    </GroupCard>
  );
}
