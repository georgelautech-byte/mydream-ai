import { LINKS } from '@/shared/config/constants/constants';
import { useTheme } from '@/shared/hooks/useTheme';
import GroupCard from '@/shared/ui/elements/GroupCard';
import Feather from '@expo/vector-icons/Feather';
import { Linking } from 'react-native';
import SettingItem from '../../../../shared/ui/elements/SettingsItem';
import { useTranslation } from 'react-i18next';

export default function LegalBlock() {
  const { t } = useTranslation();
  const colors = useTheme();

  return (
    <GroupCard title={t('settings-page.legal')}>
      <SettingItem
        onPress={() => Linking.openURL(LINKS.privacyPolicy)}
        leftIcon={<Feather name="shield" size={24} color={colors.text.primary} />}
        title={t('settings-page.privacy')}
      />
      <SettingItem
        onPress={() => Linking.openURL(LINKS.termsOfService)}
        leftIcon={<Feather name="book" size={24} color={colors.text.primary} />}
        title={t('settings-page.terms')}
      />
    </GroupCard>
  );
}
