import BlockImage from '@/assets/other/block_image.png';
import { PLACEMENTS } from '@/shared/config/constants/constants';
import { useSubscription } from '@/shared/hooks/useSubscription';
import { useVibration } from '@/shared/hooks/useVibration';
import Button from '@/shared/ui/buttons/Button';
import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import Superwall from '@superwall/react-native-superwall';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { getWeeklyPurchaseCount } from './helpers/generatePeopleNumber';
import { analytics, Events } from '@/shared/service/analytics.service';
import { useLang } from '@/shared/hooks/useLangStore';
import { useTheme } from '@/shared/hooks/useTheme';

interface SubBlockProps {
  title?: string;
}

export default function SubBlock({ title }: SubBlockProps) {
  const colors = useTheme();
  const { subscriptionStatus } = useSubscription();
  const { vibrate } = useVibration();
  const { t } = useTranslation();
  const { lang } = useLang();

  const onPress = () => {
    vibrate();
    analytics.trackEvent(Events.press_subblock, {
      local: lang,
    });
    Superwall.shared.register({
      placement: PLACEMENTS.sub_block_press,
    });
  };

  if (subscriptionStatus !== 'INACTIVE') {
    return null;
  }

  return (
    <Grid
      style={{
        shadowColor: '#380077',
        shadowOpacity: 0.2,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 0 },
      }}
    >
      <Image
        contentFit="cover"
        source={BlockImage}
        style={{
          borderWidth: 1,
          borderColor: '#fff',
          width: '100%',
          height: '100%',
          borderRadius: colors.styles.borderRadius,
          position: 'absolute',
        }}
      />
      <Grid space="lg" justfity="space-between" flex={1} padding={25}>
        <Grid space="md" justfity="center">
          <Typography numberOfLines={2} weight="extra-bold" variant="title-2">
            {title || t('sub-block.mydream-ai-premium')}
          </Typography>
          <Grid
            style={{ shadowColor: '#fff', shadowOpacity: 0.9, shadowRadius: 2, shadowOffset: { height: 0, width: 0 } }}
          >
            <Typography variant="footnote" weight="bold">
              • {t('sub-block.free-trial')}
            </Typography>
            <Typography variant="footnote">• {t('sub-block.decode-dream-in-seconds')}</Typography>
            <Typography variant="footnote">• {t('sub-block.high-fidelity-voice')}</Typography>
            <Typography variant="footnote">• {t('sub-block.continue-dream-one-tap')}</Typography>
            <Typography variant="footnote">
              • {getWeeklyPurchaseCount()} {t('sub-block.people-unlocked-week')}
            </Typography>
          </Grid>
        </Grid>
        <Grid gap={2} width="auto" flex={1} justfity="flex-end">
          <Button style={{ paddingVertical: 9 }} onPress={onPress}>
            {t('sub-block.start-free-trial')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
