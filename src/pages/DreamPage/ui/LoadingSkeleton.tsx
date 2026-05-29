import LoaderIndicator from '@/shared/ui/elements/LoaderIndicator';
import Grid from '@/shared/ui/grid/Grid';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';

export default function LoadingSkeleton() {
  return (
    <PageWrapper background="stars">
      <SafeWrapper>
        <Grid space="md" height="100%" justfity="center" align="center">
          <Typography variant="headline" weight="bold">
            Getting your dream information...
          </Typography>
          <LoaderIndicator />
        </Grid>
      </SafeWrapper>
    </PageWrapper>
  );
}
