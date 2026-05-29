import { Pressable, PressableProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export default function WrapIconInCircle({ ...props }: PressableProps) {
  const colors = useTheme();
  return (
    <Pressable
      style={{
        borderWidth: 1,
        borderRadius: colors.styles.borderRadius,
        padding: 0,
        width: 50,
        height: 50,
        borderColor: colors.accent.disabled,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...props}
    />
  );
}
