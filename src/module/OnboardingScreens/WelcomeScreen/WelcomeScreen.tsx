import WelcomScreenAnimation from '@/assets/animations/welcom_page.json';
import { animationEngine } from '@/shared/service/animation.service';
import Button from '@/shared/ui/buttons/Button';
import Grid from '@/shared/ui/grid/Grid';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';
import { isTablet, normalizedSize } from '@/shared/utils/size';
import LottieView from 'lottie-react-native';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';

interface WelcomeScreenProps {
  onPressButton: () => void;
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function WelcomeScreen({ onPressButton }: WelcomeScreenProps) {
  const { t } = useTranslation();
  const animation = useRef<LottieView>(null);

  return (
    <SafeWrapper>
      <LottieView
        autoPlay
        resizeMode="cover"
        speed={0.5}
        ref={animation}
        style={{
          width: windowWidth,
          height: windowHeight,
          backgroundColor: '#201b1b0',
          position: 'absolute',
          top: 0,
          left: isTablet() ? -normalizedSize(108) : 0,
        }}
        source={WelcomScreenAnimation}
      />

      <Grid paddingVertical={20} justfity="space-between" height="100%">
        <Grid space="md" width={'100%'}>
          <Animated.View entering={animationEngine.zoomInDown(1)}>
            <Typography variant="title-0" weight="extra-bold" textAlign="center">
              {t('onboarding.grettings-text')}
            </Typography>
          </Animated.View>
        </Grid>
        <Animated.View entering={animationEngine.zoomInDown(2)}>
          <Grid align="center" marginBottom={16}>
            <Button style={{ width: '75%' }} onPress={onPressButton}>
              {t('onboarding.continue')}
            </Button>
          </Grid>
        </Animated.View>
      </Grid>
    </SafeWrapper>
  );
}
