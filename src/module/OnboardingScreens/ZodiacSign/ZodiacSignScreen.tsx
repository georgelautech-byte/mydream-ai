import { useUserTags } from '@/entities/userTags/userTags.repository';
import GoBackButton from '@/shared/ui/buttons/GoBackButton';
import Grid from '@/shared/ui/grid/Grid';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';
import { useTranslation } from 'react-i18next';

interface ZodiacSignScreenProps {
  zodiacSignComponent: React.ReactNode;
  onPressButton: () => void;
  goPrevPage: () => void;
}

export default function ZodiacSignScreen({ zodiacSignComponent, onPressButton, goPrevPage }: ZodiacSignScreenProps) {
  const { zodiacSign } = useUserTags();
  const isDisabled = !zodiacSign;
  const { t } = useTranslation();
  return (
    <SafeWrapper>
      <Grid paddingVertical={20} height="100%" space="lg">
        <Grid space="md">
          <Grid align="flex-start">
            <GoBackButton onPress={goPrevPage} />
          </Grid>
          <Grid marginRight={50}>
            <Typography variant="largeTitle" weight="extra-bold">
              {t('onboarding.zodiac-sign-title')}
            </Typography>
          </Grid>
        </Grid>

        <Grid>{zodiacSignComponent}</Grid>
      </Grid>
    </SafeWrapper>
  );
}
