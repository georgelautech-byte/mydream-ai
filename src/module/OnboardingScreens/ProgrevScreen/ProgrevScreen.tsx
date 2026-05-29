import LoadingAnimation from '@/assets/animations/anim3.json';
import ProgressAnimation from '@/assets/animations/progress.json';
import Grid from '@/shared/ui/grid/Grid';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';
import { normalizedSize } from '@/shared/utils/size';
import LottieView from 'lottie-react-native';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface ProgrevScreenProps {
  onFinishAnimation: () => void;
}

export default function ProgrevScreen({ onFinishAnimation }: ProgrevScreenProps) {
  const animation = useRef<LottieView>(null);
  const { t } = useTranslation();
  const handleAnimationFinish = () => {
    onFinishAnimation();
  };

  return (
    <PageWrapper>
      <SafeWrapper style={{ flex: 1 }}>
        <Grid space="lg" flex={1} justfity="center">
          <Grid>
            <LottieView
              autoPlay
              resizeMode="contain"
              ref={animation}
              style={{
                width: '100%',
                height: normalizedSize(290),
                // backgroundColor: 'red',
              }}
              source={LoadingAnimation}
            />
            <Typography weight="bold" variant="largeTitle" textAlign="center">
              {t('onboarding.preparing-text')}
            </Typography>
          </Grid>
          <LottieView
            autoPlay
            loop={false}
            onAnimationFinish={handleAnimationFinish}
            speed={0.3}
            resizeMode="cover"
            style={{
              width: '100%',
              height: normalizedSize(90),
              paddingRight: normalizedSize(15),
            }}
            source={ProgressAnimation}
          />
        </Grid>
      </SafeWrapper>
    </PageWrapper>
  );
}
