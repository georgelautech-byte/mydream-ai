import Button from '@/shared/ui/buttons/Button';
import GoBackButton from '@/shared/ui/buttons/GoBackButton';
import Grid from '@/shared/ui/grid/Grid';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';
import { useTranslation } from 'react-i18next';

interface AgeScreenProps {
  agePickerComponent: React.ReactNode;
  onPressButton: () => void;
  goPrevPage: () => void;
}

export default function AgeScreen({ agePickerComponent, onPressButton, goPrevPage }: AgeScreenProps) {
  const { t } = useTranslation();
  return (
    <SafeWrapper>
      <Grid height="100%" space="md" paddingVertical={20}>
        <Grid align="flex-start">
          <GoBackButton onPress={goPrevPage} />
        </Grid>
        <Grid>
          <Typography variant="largeTitle" weight="bold">
            {t('onboarding.age-question')}
          </Typography>
        </Grid>

        <Grid space="lg" justfity="center" flex={1}>
          {agePickerComponent}
          <Button onPress={onPressButton} variant="text">
            {t('onboarding.prefer-not-to-say')}
          </Button>
        </Grid>
      </Grid>
    </SafeWrapper>
  );
}
