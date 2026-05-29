import { useTheme } from '@/shared/hooks/useTheme';
import { normalizedSize } from '@/shared/utils/size';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Grid from '../grid/Grid';

export default function HeaderPlaceholder() {
  const insets = useSafeAreaInsets();
  const colors = useTheme();
  return null;

  const headerHeight = normalizedSize(insets.top) - normalizedSize(insets.top) * 0.2;
  return (
    <Grid
      height={headerHeight}
      color={colors.background.primary}
      style={{
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 1000,
        shadowOpacity: 1,
        shadowColor: colors.background.primary,
        // shadowOffset: { width: 0, height: 20 },
        shadowRadius: 5,
      }}
      width="100%"
    />
  );
}
