import { useTheme } from '@/shared/hooks/useTheme';
import Grid, { GridPressable } from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import { normalizedSize } from '@/shared/utils/size';

interface LangItemProps {
  flag: string;
  label: string;
  isPicked?: boolean;
  onPress?: () => void;
}

export const ITEM_HEIGHT = normalizedSize(45);

export default function LangItem({ label, flag, isPicked, onPress }: LangItemProps) {
  const colors = useTheme();
  return (
    <GridPressable
      style={{
        backgroundColor: isPicked ? colors.accent.primary : 'transparent',
        borderRadius: 10,
        height: ITEM_HEIGHT,
      }}
      justfity="center"
      onPress={onPress}
    >
      <Grid row align="center" space="sm">
        <Grid padding={8} style={{ borderRadius: 8 }}>
          <Typography>{flag}</Typography>
        </Grid>
        <Grid>
          <Typography>{label}</Typography>
        </Grid>
      </Grid>
    </GridPressable>
  );
}
