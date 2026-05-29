import { useTheme } from '@/shared/hooks/useTheme';
import { PropsWithChildren } from 'react';
import Grid from '../grid/Grid';
import Typography from '../typography/Typography';

interface GroupCardProps extends PropsWithChildren {
  title: string;
}

export default function GroupCard({ title, children }: GroupCardProps) {
  const colors = useTheme();
  return (
    <Grid space="sm">
      <Typography variant="caption-2" weight="light" style={{ letterSpacing: 1.5, textTransform: 'uppercase' }}>
        {title}
      </Typography>
      <Grid space="sm">{children}</Grid>
    </Grid>
  );
}
