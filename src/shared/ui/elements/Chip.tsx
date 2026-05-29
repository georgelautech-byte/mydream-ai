import { useTheme } from '@/shared/hooks/useTheme';
import Grid, { GridProps } from '../grid/Grid';
import Typography from '../typography/Typography';

interface ChipProps extends GridProps {
  label: string;
}

export default function Chip({ label, ...props }: ChipProps) {
  const colors = useTheme();
  return (
    <Grid style={{ borderRadius: 100 }} paddingHorizontal={15} paddingVertical={3} color={'#fff'} {...props}>
      <Typography variant="callout" weight="medium" color="white">
        {label}
      </Typography>
    </Grid>
  );
}
