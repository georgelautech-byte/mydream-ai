import Ionicons from '@expo/vector-icons/Ionicons';
import WrapIconInPressable from '../wrapper/WrapIconInPressable';
import { useTheme } from '@/shared/hooks/useTheme';

interface GoBackButtonProps {
  onPress?: () => void;
  disabled?: boolean;
}

export default function GoBackButton({ onPress, disabled }: GoBackButtonProps) {
  const colors = useTheme();
  return (
    <WrapIconInPressable onPress={onPress}>
      <Ionicons name="chevron-back" size={24} color={colors.text.primary} />
    </WrapIconInPressable>
  );
}
