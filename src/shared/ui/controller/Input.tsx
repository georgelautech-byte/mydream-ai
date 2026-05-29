import { useTheme } from '@/shared/hooks/useTheme';
import { fontWeight } from '@/shared/styles/typography/typography';
import { normalizedSize } from '@/shared/utils/size';
import { useState } from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {}

export default function Input({ ...props }: InputProps) {
  const colors = useTheme();
  const [isFocused, setIsFocused] = useState(props.autoFocus || false);

  return (
    <TextInput
      {...props}
      placeholderTextColor={colors.text.secondary}
      selectionColor={colors.accent.primary}
      style={[
        {
          // borderColor: isFocused ? colors.accent.primary : colors.accent.primary_pale_transparent,
          // borderWidth: 2,
          borderBottomWidth: 2,
          borderBottomColor: isFocused ? colors.text.primary : colors.text.disabled,
          color: colors.text.primary,
          paddingHorizontal: normalizedSize(15),
          paddingVertical: normalizedSize(10),
          fontSize: normalizedSize(20),
          // borderRadius: colors.styles.borderRadius,
          // backgroundColor: isFocused ? colors.backround.neutral : colors.background.neutral,
          fontFamily: fontWeight.medium,
        },
        props.style,
      ]}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
}
