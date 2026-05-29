import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { HORIZONTAL_PADDINGS } from '../../config/constants/constants';
import { calcWidth } from '../../utils/calcWidth';
import { normalizedSize } from '../../utils/size';

interface SafeWrapperProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const SafeWrapper: React.FC<SafeWrapperProps> = ({ children, style }) => {
  const insets = useSafeAreaInsets();
  const colors = useTheme();
  return (
    <View
      style={[
        {
          // backgroundColor: colors.background.primary,
          paddingTop: normalizedSize(insets.top || 20),
          paddingBottom: normalizedSize(insets.bottom || 20),
          paddingHorizontal: normalizedSize(HORIZONTAL_PADDINGS),
          width: calcWidth(),
          alignSelf: 'center',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default SafeWrapper;
