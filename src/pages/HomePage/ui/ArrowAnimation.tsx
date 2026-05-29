import LottieView from 'lottie-react-native';
import ArrowAnimationI from '@/assets/animations/arrow.json';
import Grid from '@/shared/ui/grid/Grid';

export default function ArrowAnimation() {
  return (
    <Grid
      pointerEvents="none"
      style={{
        position: 'absolute',
        top: 35,
        zIndex: 100,
        right: -70,
        transform: [{ rotate: '0deg' }],
        width: '100%',
        height: 130,
      }}
    >
      <LottieView
        autoPlay
        loop={false}
        source={ArrowAnimationI}
        style={{
          shadowColor: '#924fffa1',
          shadowOpacity: 1,
          shadowRadius: 0,
          shadowOffset: { width: 0, height: 4 },
          width: '100%',
          height: 130,
        }}
      />
    </Grid>
  );
}
