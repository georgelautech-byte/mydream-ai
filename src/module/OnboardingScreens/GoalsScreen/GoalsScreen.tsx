import { useUserTags } from '@/entities/userTags/userTags.repository';
import AnimatedWrapper from '@/shared/ui/animations/AnimatedWrapper';
import Button from '@/shared/ui/buttons/Button';
import GoBackButton from '@/shared/ui/buttons/GoBackButton';
import Grid from '@/shared/ui/grid/Grid';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';
import { useTranslation } from 'react-i18next';

interface GoalsScreenProps {
  goalsPickerComponent: React.ReactNode;
  onPressButton: () => void;
  goPrevPage: () => void;
}

export default function GoalsScreen({ goalsPickerComponent, onPressButton, goPrevPage }: GoalsScreenProps) {
  const { goals } = useUserTags();
  const { t } = useTranslation();
  const isDisabled = goals.length === 0;
  return (
    <SafeWrapper>
      <Grid space="md" paddingVertical={20} justfity="space-between" height="100%">
        <Grid space="md">
          <Grid align="flex-start">
            <GoBackButton onPress={goPrevPage} />
          </Grid>
          <Grid space="sm">
            <Typography variant="largeTitle" weight="extra-bold">
              {t('onboarding.goals-question')}
            </Typography>
          </Grid>
        </Grid>
        <AnimatedWrapper>{goalsPickerComponent}</AnimatedWrapper>
        <Grid marginBottom={15} space="lg">
          <Button onPress={onPressButton} disabled={isDisabled}>
            {t('onboarding.continue')}
          </Button>
        </Grid>
      </Grid>
    </SafeWrapper>
  );
}
