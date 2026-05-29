import { useAuth } from '@/entities/auth/auth.repository';
import { useTheme } from '@/shared/hooks/useTheme';
import GroupCard from '@/shared/ui/elements/GroupCard';
import Foundation from '@expo/vector-icons/Foundation';
import { router } from 'expo-router';
import SettingItem from '../../../../shared/ui/elements/SettingsItem';

import { LanguagePicker } from '@/module/LanguagePicker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import { analytics, Events } from '@/shared/service/analytics.service';
import { useLang } from '@/shared/hooks/useLangStore';

export default function AppSettingsBlock() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const colors = useTheme();
  const { lang } = useLang();

  const onPressChangeName = () => {
    router.navigate('/screens/settings/nameUpdateScreen');
  };

  const onPressChangeCodeProtection = () => {
    analytics.trackEvent(Events.press_passcode, {
      local: lang,
    });
    router.navigate('/screens/settings/codeProtection');
  };

  return (
    <GroupCard title={t('settings-page.app-settings')}>
      <SettingItem
        onPress={onPressChangeName}
        title={t('settings-page.name')}
        leftIcon={<Foundation name="text-color" size={24} color={colors.text.primary} />}
        rightPrefix={user?.displayName}
      />

      <SettingItem
        onPress={onPressChangeCodeProtection}
        leftIcon={<MaterialIcons name="password" size={23} color={colors.text.primary} />}
        title={t('settings-page.pin-code-title')}
      />

      <LanguagePicker />
    </GroupCard>
  );
}
