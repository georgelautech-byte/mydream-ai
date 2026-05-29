import AppIcon from '@/images/icons_ios/icon-a.png';
import Grid from '@/shared/ui/grid/Grid';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';
import { Image } from 'expo-image';
import * as StoreReview from 'expo-store-review';

import Button from '@/shared/ui/buttons/Button';
import { normalizedSize } from '@/shared/utils/size';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface HelpUsScreenProps {
  onPressContinue: () => void;
}

export default function HelpUsScreen({ onPressContinue }: HelpUsScreenProps) {
  const ICON_SIZE = normalizedSize(270);
  const { t } = useTranslation();

  // Show review when screen appears
  useEffect(() => {
    const showReview = async () => {
      // Try native store review first (Android 5.0+)
      const available = await StoreReview.isAvailableAsync();
      if (available) {
        await StoreReview.requestReview();
        return;
      }
    };

    // Show review after 0.5 seconds
    const timer = setTimeout(showReview, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeWrapper style={{ flex: 1 }}>
      <Grid paddingVertical={20} flex={1} justfity="space-between">
        <Grid space="sm">
          <Typography variant="largeTitle" weight="extra-bold">
            {t('onboarding.new-screens.help-us-grow')}
          </Typography>
          <Typography color="secondary">{t('onboarding.new-screens.grow-description')}</Typography>
        </Grid>
        <Grid align="center" space="sm">
          <Image source={AppIcon} style={{ width: ICON_SIZE, height: ICON_SIZE, borderRadius: 40 }} />
          <Typography variant="largeTitle" style={{ letterSpacing: 5 }}>
            ⭐️⭐️⭐️⭐️⭐️
          </Typography>
        </Grid>
        <Grid>
          <Button onPress={onPressContinue}>{t('onboarding.continue')}</Button>
        </Grid>
      </Grid>
    </SafeWrapper>
  );
}
