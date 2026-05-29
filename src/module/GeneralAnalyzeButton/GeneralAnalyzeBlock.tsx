import { useTheme } from '@/shared/hooks/useTheme';
import Grid, { GridPressable } from '@/shared/ui/grid/Grid';
import Paper from '@/shared/ui/layout/Paper';
import Typography from '@/shared/ui/typography/Typography';
import DreamProgressBar from './DreamProgressBar';
import { useTranslation } from 'react-i18next';
import { useAnalyzePastDreams, useGetProgressOnGeneralAnalysis } from '@/entities/dream/dream.repository';
import { useVibration } from '@/shared/hooks/useVibration';
import LoadingModal from '@/shared/ui/elements/LoadingModal';
import { Alert } from 'react-native';

export default function GeneralAnalyzeBlock() {
  const colors = useTheme();
  const { t } = useTranslation();
  const { data, isLoading } = useGetProgressOnGeneralAnalysis();
  const { analyzePastDreamsFunction, isPending } = useAnalyzePastDreams();
  const { vibrate } = useVibration();

  const onHandlePress = () => {
    if (!isPressable) {
      Alert.alert(t('general-analysis.card.you-need-to-complete'));
      return;
    }

    void analyzePastDreamsFunction();
    vibrate();
  };

  // Values
  const current = Number(data?.current ?? 0);
  const total = Number(data?.total ?? 0);

  // Calculate progress width and button state

  const isPressable = current === total && total !== 0;

  if (isLoading || !data) {
    return null;
  }
  return (
    <Paper
      color="#29145124"
      space="sm"
      style={{ borderRadius: colors.styles.borderRadius, paddingHorizontal: 0, paddingVertical: 0 }}
    >
      <LoadingModal open={isLoading || isPending} />
      <Grid padding={15} space="md">
        <Typography variant="headline" weight="bold">
          {t('general-analysis.card.dream-progress')}
        </Typography>
        <DreamProgressBar total={total} current={current} />
      </Grid>

      <GridPressable
        onPress={onHandlePress}
        padding={15}
        color={isPressable ? colors.text.primary : 'transparent'}
        style={{
          borderTopWidth: 1,
          borderColor: '#ffffff21',
          borderBottomLeftRadius: colors.styles.borderRadius,
          borderBottomRightRadius: colors.styles.borderRadius,
        }}
      >
        <Typography weight="bold" variant="title-4" color={isPressable ? 'white' : 'primary'}>
          {t('general-analysis.card.get-more-insights')}
        </Typography>
      </GridPressable>
    </Paper>
  );
}
