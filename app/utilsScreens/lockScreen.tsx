import { useProtection } from '@/entities/useProtection/useProtection';
import PinCode from '@/module/PinCode/PinCode';
import { storageUserInactivity } from '@/shared/providers/UserInactivity';
import * as Haptic from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

export default function lockScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { codeProtection, biometric } = useProtection(state => state);

  const onResult = (code: string, isBiometricRight: boolean) => {
    if (Number(code) === codeProtection || isBiometricRight) {
      storageUserInactivity.set('isAppLocked', 'false');
      router.replace('/screens/homeScreen');
    } else {
      Alert.alert(t('protection.error'), t('protection.invalid-code'));
      Haptic.notificationAsync(Haptic.NotificationFeedbackType.Error);
    }
  };

  return (
    <PinCode
      title={t('protection.welcome-back')}
      onResult={onResult}
      isPasscodeOn={codeProtection}
      isBiometricOn={biometric}
    />
  );
}
