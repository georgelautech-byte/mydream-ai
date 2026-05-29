import React, { useRef } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

interface AnimTouchWrapperProps {
  children: React.ReactNode;
  value?: number;
  style?: StyleProp<ViewStyle>;
}

const AnimTouchWrapper: React.FC<AnimTouchWrapperProps> = ({ children, style, value = 0.95 }) => {
  const animationControlScaleShowProgress = useRef(new Animated.Value(1)).current;

  const onTouchStart = () => {
    Animated.spring(animationControlScaleShowProgress, {
      // duration: ANIMATION_SPEED,
      toValue: value,
      useNativeDriver: true,
    }).start();
  };
  const onTouchCancel = () => {
    Animated.spring(animationControlScaleShowProgress, {
      // duration: ANIMATION_SPEED,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchCancel}
      style={[
        {
          transform: [{ scale: animationControlScaleShowProgress }],
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default AnimTouchWrapper;
