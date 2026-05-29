import { useTheme } from '@/shared/hooks/useTheme';
import { normalizedSize } from '@/shared/utils/size';
import Grid from '../grid/Grid';
import Typography from '../typography/Typography';

interface ParticipantItemProps {
  name: string;
  role: string;
}

export default function ParticipantItem({ name, role }: ParticipantItemProps) {
  const colors = useTheme();

  return (
    <Grid
      color={colors.text.primary}
      style={{ maxWidth: normalizedSize(220), borderRadius: colors.styles.borderRadius - 5 }}
      paddingVertical={15}
      paddingHorizontal={20}
      gap={2}
    >
      <Typography weight="bold" color="white" variant="callout">
        {name}
      </Typography>

      <Typography variant="footnote" color="white">
        {role}
      </Typography>
    </Grid>
  );
}
