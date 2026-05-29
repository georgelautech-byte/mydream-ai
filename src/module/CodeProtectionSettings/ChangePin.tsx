import { useProtection } from '@/entities/useProtection/useProtection';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import { PinCode } from '../PinCode';
import { useTranslation } from 'react-i18next';

export default function ChangePin() {
  const { t } = useTranslation();
  const { setCodeProtection } = useProtection(state => state);

  const onResultCreateNew = (code: string) => {
    setCodeProtection(Number(code));
    Alert.alert(t('protection.success'), t('protection.new-code-set'));
    router.canGoBack() && router.back();
  };

  return (
    <PinCode newPin title={t('protection.update-code-title')} onResult={onResultCreateNew} isBiometricOn={false} />
  );
}
