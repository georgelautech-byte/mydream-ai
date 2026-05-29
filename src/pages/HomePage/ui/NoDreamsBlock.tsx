import { animationEngine } from '@/shared/service/animation.service';
import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import { normalizedSize } from '@/shared/utils/size';
import LottieView from 'lottie-react-native';
import LadyAnimation from '@/assets/animations/lady_animation.json';

import Animated from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';

export default function NoDreamsBlock() {
  const { t } = useTranslation();
  return (
    <Animated.View entering={animationEngine.fadeInUp(1)}>
      <Grid>
        <Typography weight="extra-bold" variant="title-1">
          {t('home.your-dreams-displayed')}
        </Typography>
        <LottieView autoPlay style={{ width: '100%', height: normalizedSize(290) }} source={LadyAnimation} />
      </Grid>
    </Animated.View>
  );
}
