import Button from '@/shared/ui/buttons/Button';
import Grid from '@/shared/ui/grid/Grid';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';
import { useTranslation } from 'react-i18next';

interface GenderChooseScreen {
  genderPickerComponent: React.ReactNode;
  onPressButton: () => void;
}

export default function GenderChooseScreen({ genderPickerComponent, onPressButton }: GenderChooseScreen) {
  const { t } = useTranslation();
  return (
    <SafeWrapper>
      <Grid space="lg" paddingVertical={20} justfity="space-between" height="100%">
        <Grid space="md">
          <Typography variant="largeTitle" weight="extra-bold">
            {t('onboarding.what-your-gender')}
          </Typography>
          <Typography color="secondary">{t('onboarding.personalize-explanation-gender')}</Typography>
        </Grid>
        <Grid space="lg">
          {genderPickerComponent}
          <Button onPress={onPressButton} variant="text">
            {t('onboarding.prefer-not-to-say')}
          </Button>
        </Grid>
        <Grid />
      </Grid>
    </SafeWrapper>
  );
}
