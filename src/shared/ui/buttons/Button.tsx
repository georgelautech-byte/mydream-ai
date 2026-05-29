import { normalizedSize } from '@/shared/utils/size';
import React, { useMemo, useState } from 'react';
import { Pressable, PressableProps, StyleSheet, Text, TextProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { fontWeight } from '../../styles/typography/typography';
import Grid from '../grid/Grid';

type TColorsButton = 'primary' | 'neutral' | 'error';
type TSizeButton = 'large' | 'small';
type TVariantButton = 'default' | 'outline' | 'ghost' | 'text';

export interface ButtonProps extends PressableProps {
  variant?: TVariantButton;
  children?: React.ReactNode;
  color?: TColorsButton;
  size?: TSizeButton;
  textStyle?: TextProps['style'];
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  size = 'large',
  color = 'primary',
  variant = 'default',
  textStyle,
  loading,
  fullWidth,
  leftIcon,
  ...props
}: ButtonProps) => {
  const colors = useTheme();
  const [isPressed, setIsPressed] = useState(false);

  const variantStyles = useMemo(
    () => ({
      default: {
        primary: {
          backgroundColor: props.disabled
            ? colors.background.disabled
            : isPressed
              ? colors.background.active
              : colors.text.primary,
          // borderColor: colors.background.secondary,
          borderWidth: 0,
        },
        neutral: {
          backgroundColor: props.disabled ? colors.accent.disabled : isPressed ? '#4D4D53' : colors.text.primary,
        },
        error: {
          backgroundColor: colors.accent.red,
        },
      },
      outline: {
        primary: { backgroundColor: colors.accent.primary_pale_transparent },
        neutral: { backgroundColor: colors.background.neutral },
        error: {
          backgroundColor: colors.accent.red,
        },
      },
      ghost: {
        primary: { backgroundColor: isPressed ? colors.background.success : 'transparent' },
        neutral: { backgroundColor: isPressed ? colors.background.neutral : 'transparent' },
        error: {
          backgroundColor: colors.accent.red,
        },
      },
      text: {
        primary: { backgroundColor: 'transparent' },
        neutral: { backgroundColor: 'transparent' },
        error: {
          backgroundColor: colors.accent.red,
        },
      },
    }),
    [colors, isPressed, props.disabled],
  );
  const textVariants = useMemo(
    () => ({
      default: {
        primary: { color: props.disabled ? colors.text.disabled : colors.text.white },
        neutral: { color: colors.text.primary },
        error: { color: colors.text.primary },
      },
      outline: {
        primary: { color: colors.accent.primary },
        neutral: { color: colors.text.primary },
        error: { color: colors.text.primary },
      },
      ghost: {
        primary: { color: colors.accent.primary },
        neutral: { color: colors.text.primary },
        error: { color: colors.text.primary },
      },
      text: {
        primary: { color: colors.text.primary },
        neutral: { color: colors.text.primary },
        error: { color: colors.text.primary },
      },
    }),
    [colors, props.disabled],
  );
  const textVariant = textVariants[variant][color];
  const currentVariant = variantStyles[variant][color];

  const styleButton: PressableProps['style'] = {
    paddingVertical: size === 'large' ? normalizedSize(13) : normalizedSize(8),
    paddingHorizontal: size === 'large' ? normalizedSize(10) : normalizedSize(12),
    borderRadius: colors.styles.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#fff',
    shadowOpacity: props.disabled ? 0 : 0.3,
    shadowRadius: 10,
    gap: 15,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  };

  const styleText: TextProps['style'] = {
    // color: props.disabled ? colors.background.neutral : colors.text.white,
    fontFamily: fontWeight.bold,
    textAlign: 'center',
    fontSize: normalizedSize(size === 'large' ? 20 : 13),
    // flex: 1, // Ensures the text takes up available space for centering
  };

  const onTouchStart = () => {
    setIsPressed(true);
  };
  const onTouchEnd = () => {
    setIsPressed(false);
  };

  const buttonS: ButtonProps['style'] = StyleSheet.flatten([
    fullWidth !== undefined && { width: '100%' },
    styleButton,
    currentVariant,
    props.style,
  ]);
  const textS = StyleSheet.flatten([styleText, textVariant, textStyle]);

  return (
    <Pressable {...props} style={buttonS} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {leftIcon && <>{leftIcon}</>}
      <Text style={textS} numberOfLines={1}>
        {props.children}
      </Text>
      <Grid style={{ opacity: 0 }}>{leftIcon && <>{leftIcon}</>}</Grid>
    </Pressable>
  );
};

export default Button;
