import { PropsWithChildren } from 'react';
import Grid from '../grid/Grid';
import Typography from '../typography/Typography';

interface GroupByProps extends PropsWithChildren {
  title: string;
  subtext?: string;
}

export default function GroupBy({ title, children }: GroupByProps) {
  return (
    <Grid gap={8}>
      <Typography weight="bold">{title}</Typography>
      <Grid>{children}</Grid>
    </Grid>
  );
}
