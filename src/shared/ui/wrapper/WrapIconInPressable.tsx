import { Pressable, PressableProps } from 'react-native-gesture-handler';
import { normalizedSize } from '../../utils/size';
import { useTheme } from '@/shared/hooks/useTheme';

interface WrapIconInPressableProps extends PressableProps {
  primaryColor?: string;
  backgroundColor?: string;
}

export default function WrapIconInPressable({ primaryColor, backgroundColor, ...props }: WrapIconInPressableProps) {
  const colors = useTheme();
  return (
    <Pressable
      {...props}
      style={{
        padding: normalizedSize(6),
        backgroundColor: backgroundColor || 'transparent',
        borderRadius: colors.styles.borderRadius,
        borderWidth: 1,
        borderColor: primaryColor || '#ffffff6c',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  );
}
