import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { fontsWeights, getColorsStyles, TypographyProps, TypographyStyles } from '../../styles/typography/typography';
import { forwardRef } from 'react';
import i18n from '@/shared/providers/i18n';

const Typography = forwardRef<Text, TypographyProps>((props, ref) => {
  const colors = useTheme();
  const isRTL = i18n.dir() === 'rtl';

  const fontStyles = fontsWeights[props.weight || 'regular'];
  const typographyStyle = TypographyStyles[props.variant || 'body'];
  const colorStyle: TextProps['style'] = getColorsStyles(colors)[props.color || 'primary'];

  const directionStyle: TextStyle = {
    writingDirection: isRTL ? 'rtl' : 'ltr',
  };
  const alignStyle: TextStyle = {
    textAlign: props.textAlign ?? (isRTL ? 'right' : 'left'),
  };

  const stylesText: StyleProp<TextStyle> = StyleSheet.flatten([
    directionStyle,
    alignStyle,
    typographyStyle,
    fontStyles,
    colorStyle,
    props.style,
  ]);

  return (
    <Text {...props} ref={ref} style={stylesText}>
      {props.children}
    </Text>
  );
});

export default Typography;
