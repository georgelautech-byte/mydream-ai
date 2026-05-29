import { useAnalyzePastDreams, useGetProgressOnGeneralAnalysis } from '@/entities/dream/dream.repository';
import ArrowAnimation from '@/pages/HomePage/ui/ArrowAnimation';
import { useTheme } from '@/shared/hooks/useTheme';
import LoaderIndicator from '@/shared/ui/elements/LoaderIndicator';
import LoadingModal from '@/shared/ui/elements/LoadingModal';
import Grid, { GridPressable } from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import { useTranslation } from 'react-i18next';
import Animated from 'react-native-reanimated';

export default function GeneralAnalyzeButton() {
  const colors = useTheme();
  const { t } = useTranslation();
  const { data, isLoading } = useGetProgressOnGeneralAnalysis();
  const { analyzePastDreamsFunction, isPending } = useAnalyzePastDreams();

  const onHandlePress = () => {
    void analyzePastDreamsFunction();
  };

  // Values
  const current = Number(data?.current ?? 0);
  const total = Number(data?.total ?? 0);

  // Calculate progress width and button state
  const progressWidth = (current / total) * 100;

  const isPressable = current === total && total !== 0;

  const buttonString = `${String(current ?? 0)}/${String(total ?? 0)} ${t('general-analysis.dreams')}`;

  // Scale animation

  if (isLoading || !data) {
    return null;
  }

  return (
    <Grid
      style={{
        shadowColor: colors.text.primary,
        shadowOpacity: 0.3,
        shadowRadius: 10,
        zIndex: 100,
        shadowOffset: {
          width: 0,
          height: 0,
        },
      }}
    >
      <LoadingModal open={isLoading || isPending} />
      {isPressable && <ArrowAnimation />}
      <GridPressable
        disabled={!isPressable}
        onPress={onHandlePress}
        color={'#ffffff28'}
        paddingVertical={10}
        align="center"
        height={50}
        justfity="center"
        style={{
          borderRadius: colors.styles.borderRadius,
          overflow: 'hidden',
        }}
      >
        {isLoading ? (
          <LoaderIndicator />
        ) : (
          <>
            <Typography weight="bold" variant="title-3">
              {buttonString}
            </Typography>
            <Animated.View
              style={{
                height: 60,
                position: 'absolute',
                width: `${progressWidth}%`,
                backgroundColor: colors.text.primary,
                justifyContent: 'center',
                left: 0,
                overflow: 'hidden',
              }}
            >
              <Typography
                style={{ position: 'absolute', left: 150, zIndex: 20 }}
                weight="bold"
                color="white"
                variant="title-3"
              >
                {buttonString}
              </Typography>
            </Animated.View>
          </>
        )}
      </GridPressable>
    </Grid>
  );
}
