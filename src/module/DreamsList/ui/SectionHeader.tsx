import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';

interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <Grid marginTop={20} marginBottom={10}>
      <Typography variant="title-3" weight="light">
        {title}
      </Typography>
    </Grid>
  );
}
