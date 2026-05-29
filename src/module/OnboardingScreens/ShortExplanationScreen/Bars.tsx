import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import { useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const DURATION = 1200;
const DELAY = 400;

export default function Bars() {
  const { t } = useTranslation();
  const maxHeight = useSharedValue(0);
  const { colors } = useTheme();
  const progress = useSharedValue(0);

  // animated style for the right bar: height grows from 0..maxHeight
  const animatedFillStyle = useAnimatedStyle(() => ({
    height: maxHeight.value * progress.value,
  }));

  // start animation when layout is known
  const onContainerLayout = (e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height;
    // reserve some top spacing so bar doesn't touch top of image
    maxHeight.value = Math.max(0, h - 20);
    // animate to full
    progress.value = withTiming(1, { duration: DURATION, easing: Easing.out(Easing.cubic) });
  };
  {
    return (
      <View style={styles.imageWrap} onLayout={onContainerLayout}>
        {/* <Image
          contentFit="contain"
          cachePolicy="memory-disk"
          style={{ width: '100%', height: '100%', position: 'absolute' }}
          source={GridOfMatchesImage}
        /> */}
        <Typography
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
          }}
          weight="bold"
        >
          {t('onboarding.new-screens.quality-of-sleep')}
        </Typography>

        {/* Left static small bar (white) */}
        <Grid style={styles.leftBar} />
        <Typography color="secondary" variant="footnote" weight="bold" style={styles.leftBarText}>
          {t('onboarding.new-screens.before')}
        </Typography>

        {/* Right animated gradient bar — grows from bottom */}
        <Animated.View style={[styles.rightBar, animatedFillStyle]}>
          <LinearGradient
            colors={['#8a47ff', colors.background]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
        <Typography variant="footnote" color="primary" weight="bold" style={styles.rightBarText}>
          {t('onboarding.new-screens.with-app')}
        </Typography>
      </View>
    );
  }
}
// ---------------- styles ----------------
const styles = StyleSheet.create({
  imageWrap: {
    width: '100%',
    height: 300,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  // left small white bar — positioned near bottom-left similar to design
  leftBar: {
    position: 'absolute',
    left: 70,
    bottom: 0,
    width: 100,
    height: 45,
    borderRadius: 14,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  leftBarText: {
    position: 'absolute',
    left: 93,
    bottom: -30,
    width: 120,
  },
  rightBarText: {
    position: 'absolute',
    right: 50,
    bottom: -30,
    width: 130,
  },
  // right bar — animated height; align to bottom and centered horizontally to the right column
  rightBar: {
    position: 'absolute',
    right: 70,
    bottom: 0,
    width: 100,
    borderRadius: 16,
    overflow: 'hidden',
    // start with zero height; animatedFillStyle will set height
  },
});
