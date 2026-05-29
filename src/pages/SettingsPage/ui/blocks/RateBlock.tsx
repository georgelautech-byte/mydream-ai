import GroupCard from '@/shared/ui/elements/GroupCard';
import SettingsItem from '../../../../shared/ui/elements/SettingsItem';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '@/shared/hooks/useTheme';
import * as StoreReview from 'expo-store-review';
import { Linking } from 'react-native';
import { APP_STORE_LINK } from '@/shared/config/constants/constants';
import { useTranslation } from 'react-i18next';
import { analytics, Events } from '@/shared/service/analytics.service';
import { useLang } from '@/shared/hooks/useLangStore';
import { useSubscription } from '@/shared/hooks/useSubscription';

export default function RateBlock() {
  const colors = useTheme();
  const { t } = useTranslation();
  const { lang } = useLang();
  const { subscriptionStatus } = useSubscription();

  const handleRatePress = async () => {
    if (await StoreReview.isAvailableAsync()) {
      StoreReview.requestReview();
      analytics.trackEvent(Events.press_rate_us, {
        local: lang,
        sub_status: subscriptionStatus,
      });
    }
  };

  const handleFeedbackPress = async () => {
    if (await Linking.canOpenURL(APP_STORE_LINK)) {
      await Linking.openURL(APP_STORE_LINK);
      analytics.trackEvent(Events.press_leave_a_review, {
        local: lang,
        sub_status: subscriptionStatus,
      });
    }
  };

  return (
    <GroupCard title={t('settings-page.make-better')}>
      <SettingsItem
        onPress={handleFeedbackPress}
        leftIcon={<FontAwesome name="commenting" size={24} color={colors.text.primary} />}
        title={t('settings-page.review')}
        prefix={t('settings-page.feedback-important')}
      />
      <SettingsItem
        textColor={colors.background.primary}
        color={colors.background.alert}
        onPress={handleRatePress}
        leftIcon={<FontAwesome name="star" size={24} color={colors.text.white} />}
        title={t('settings-page.rate-us')}
      />
    </GroupCard>
  );
}
