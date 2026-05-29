import { useTheme } from '@/shared/hooks/useTheme';
import { GridPressable } from '@/shared/ui/grid/Grid';
import { normalizedSize } from '@/shared/utils/size';
import { Image } from 'expo-image';

interface AppIconItemProps {
  name: string;
  image: string;
  onPress: (name: string) => void;
  isPicked: boolean;
}

export default function AppIconItem({ name, image, isPicked, onPress }: AppIconItemProps) {
  const colors = useTheme();
  return (
    <GridPressable
      onPress={() => onPress(name)}
      color={isPicked ? colors.background.active : 'transparent'}
      padding={7}
      style={{ borderRadius: 25 }}
    >
      <Image source={image} style={{ width: normalizedSize(70), height: normalizedSize(70), borderRadius: 23 }} />
    </GridPressable>
  );
}
