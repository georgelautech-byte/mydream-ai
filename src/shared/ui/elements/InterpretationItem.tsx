import { useTheme } from '@/shared/hooks/useTheme';
import { useVibration } from '@/shared/hooks/useVibration';
import { animationEngine, animationService } from '@/shared/service/animation.service';
import { normalizedSize } from '@/shared/utils/size';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import AnimatedWrapper from '../animations/AnimatedWrapper';
import AnimTouchWrapper from '../animations/AnimTouchWrapper';
import Grid from '../grid/Grid';
import Paper from '../layout/Paper';
import Typography from '../typography/Typography';
import WrapIconInPressable from '../wrapper/WrapIconInPressable';
import { analytics, Events } from '@/shared/service/analytics.service';
import { useLang } from '@/shared/hooks/useLangStore';
import Superwall from '@superwall/react-native-superwall';
import { PLACEMENTS } from '@/shared/config/constants/constants';
import { useTranslation } from 'react-i18next';

interface InterpretationItemProps {
  title: string;
  text: string;
  image: string;
  isBlocked: boolean;
  description?: string;
  onPressBlocked?: () => void;
  interprerationId: string;
}

const ITEM_HEIGHT = 150;

export default function InterpretationItem({
  title,
  text,
  image,
  description,
  isBlocked,
  interprerationId,
  onPressBlocked,
}: InterpretationItemProps) {
  const colors = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const arrowRotation = useSharedValue(0);
  const imageContainerScale = useSharedValue(1);
  const { vibrateSelection, vibrate, vibrateError } = useVibration();
  const { lang } = useLang();
  const { t } = useTranslation();

  const bounce = useSharedValue(0);
  const rotate = useSharedValue(0);
  const scale = useSharedValue(1);

  const callAnimationBlock = () => {
    bounce.value = withSpring(-4, { stiffness: 220 }, () => {
      bounce.value = withSpring(0);
    });
    rotate.value = withSpring(4, { stiffness: 120 }, () => {
      rotate.value = withSpring(-4, {}, () => {
        rotate.value = withSpring(0);
      });
    });
    scale.value = withSpring(1.08, { stiffness: 120 }, () => {
      scale.value = withSpring(1);
    });
  };

  const animatedStyleBlock = useAnimatedStyle(() => ({
    transform: [{ translateY: bounce.value }, { rotate: `${rotate.value}deg` }, { scale: scale.value }],
  }));

  const imageContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imageContainerScale.value }],
  }));

  const arrowStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${arrowRotation.value}deg` }],
  }));

  const toggleExpand = () => {
    if (isBlocked) {
      Superwall.shared.register({
        placement: PLACEMENTS.campaign_trigger,
      });

      analytics.trackEvent(Events.disabled_interpretation, {
        local: lang,
        interpretation: interprerationId,
      });
      vibrateError();
      onPressBlocked?.();
      callAnimationBlock();
      return;
    }

    analytics.trackEvent(Events.open_interpretation, {
      local: lang,
      interpretation: interprerationId,
    });

    vibrateSelection();
    setIsExpanded(prev => !prev);
    arrowRotation.value = withSpring(isExpanded ? 0 : -180, { mass: animationService.animationEngine.MASS });
    imageContainerScale.value = withTiming(isExpanded ? 1 : 1.05);
  };

  return (
    <AnimatedWrapper>
      <AnimTouchWrapper value={isBlocked ? 1 : 0.95} style={{ zIndex: 100 }}>
        <Pressable onPress={toggleExpand}>
          <Animated.View style={[imageContainerStyle, animatedStyleBlock]}>
            <Grid height={ITEM_HEIGHT} style={{ borderRadius: colors.styles.borderRadius }}>
              <Image
                source={image}
                style={{
                  height: '100%',
                  width: '100%',
                  position: 'absolute',
                  borderRadius: colors.styles.borderRadius,
                }}
              />
              <LinearGradient
                colors={['transparent', isBlocked ? 'rgba(0, 0, 0, 0.552)' : 'rgba(0, 0, 0, 0.316)', '#000000be']}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  borderRadius: colors.styles.borderRadius,
                }}
              />
              {isBlocked && (
                <LinearGradient
                  colors={['transparent', 'rgba(0, 0, 0, 0.234)', '#0000009e']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    borderRadius: colors.styles.borderRadius,
                  }}
                />
              )}

              <Grid
                row
                align="center"
                style={{ alignContent: 'flex-end', overflow: 'hidden', borderRadius: 20 }}
                justfity="space-between"
                flex={1}
                paddingVertical={10}
                wrap
              >
                <Grid
                  row
                  align="center"
                  style={{ alignContent: 'flex-end' }}
                  justfity="space-between"
                  wrap
                  space="sm"
                  width="100%"
                  paddingVertical={6}
                  paddingHorizontal={20}
                >
                  <Grid row space="lg" align="center">
                    <Typography style={{ flex: 0.99 }} weight="bold" variant="headline">
                      {title}
                    </Typography>

                    <WrapIconInPressable backgroundColor={isBlocked ? colors.accent.alert : colors.background.disabled}>
                      {isBlocked ? (
                        <Grid row space="sm" paddingHorizontal={5} align="center">
                          <FontAwesome name="lock" size={24} color={colors.text.white} />
                          <Typography weight="extra-bold" variant="headline" color="white">
                            Pro
                          </Typography>
                        </Grid>
                      ) : (
                        <Animated.View style={arrowStyle}>
                          <Entypo name="chevron-down" size={26} color={'#fff'} />
                        </Animated.View>
                      )}
                    </WrapIconInPressable>
                  </Grid>

                  {description && (
                    <Typography variant="caption-1" weight="medium">
                      {description}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Animated.View>
        </Pressable>
      </AnimTouchWrapper>
      {isExpanded && (
        <Animated.View
          style={{ zIndex: 1, marginHorizontal: normalizedSize(15) }}
          exiting={animationEngine.fadeOutUp(0)}
          entering={animationEngine.fadeInUp(0)}
        >
          <Paper paddingHorizontal={15} style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
            <Typography>{text}</Typography>
          </Paper>
        </Animated.View>
      )}
    </AnimatedWrapper>
  );
}
