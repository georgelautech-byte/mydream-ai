import GroupCard from '@/shared/ui/elements/GroupCard';
import Feather from '@expo/vector-icons/Feather';
import SettingItem from '../../../../shared/ui/elements/SettingsItem';
import { useTheme } from '@/shared/hooks/useTheme';
import { Linking } from 'react-native';
import { EMAIL_FEEDBACK } from '@/shared/config/constants/constants';
import { useTranslation } from 'react-i18next';

export default function FeedbackBlock() {
  const { t } = useTranslation();
  const colors = useTheme();
  const subject = t('settings-page.feedback-from');
  const bugSubject = t('settings-page.bug-from');
  const featureSubject = t('settings-page.feature-from');
  return (
    <GroupCard title={t('settings-page.reach-us')}>
      <SettingItem
        onPress={() => Linking.openURL(`mailto:${EMAIL_FEEDBACK}?subject=${subject}`)}
        leftIcon={<Feather name="mail" size={24} color={colors.text.primary} />}
        title={t('settings-page.send-email')}
        prefix={EMAIL_FEEDBACK}
      />
      <SettingItem
        onPress={() => Linking.openURL(`mailto:${EMAIL_FEEDBACK}?subject=${bugSubject}`)}
        leftIcon={<Feather name="repeat" size={24} color={colors.text.primary} />}
        title={t('settings-page.report-bug')}
      />
      <SettingItem
        onPress={() => Linking.openURL(`mailto:${EMAIL_FEEDBACK}?subject=${featureSubject}`)}
        leftIcon={<Feather name="feather" size={24} color={colors.text.primary} />}
        title={t('settings-page.request-a-feature')}
      />
    </GroupCard>
  );
}
