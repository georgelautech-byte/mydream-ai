import backgroundLastAnalysis from '@/assets/background/background-last-analysis.jpg';
import { useGetLastDreamsAnalysis } from '@/entities/dream/dream.repository';
import { localizeDate } from '@/entities/dream/helpers/groupDreamsByDate';
import { useTheme } from '@/shared/hooks/useTheme';
import Chip from '@/shared/ui/elements/Chip';
import TextLine from '@/shared/ui/elements/TextLine';
import Grid from '@/shared/ui/grid/Grid';
import GroupBy from '@/shared/ui/layout/GroupBy';
import Typography from '@/shared/ui/typography/Typography';
import { ImageBackground } from 'expo-image';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useTranslation } from 'react-i18next';
import { useLang } from '@/shared/hooks/useLangStore';

export default function LastDreamAnalysisCard() {
  const { t } = useTranslation();
  const { lang } = useLang();
  const { data, isLoading } = useGetLastDreamsAnalysis();
  const colors = useTheme();

  if (isLoading || !data) {
    return null;
  }

  return (
    // <LinearGradient
    //   colors={data.analysis.colors}
    //   style={{ borderRadius: colors.styles.borderRadius, borderWidth: 1, borderColor: '#ffffff73' }}
    // >

    <Grid
      style={{
        shadowColor: '#000000',
        shadowOpacity: 0.4,
        shadowRadius: 10,
      }}
    >
      <ImageBackground
        source={backgroundLastAnalysis}
        style={{
          borderRadius: colors.styles.borderRadius,
          borderWidth: 1,
          borderColor: '#ffffff73',
          overflow: 'hidden',
        }}
        contentFit="cover"
      >
        <Grid padding={20}>
          <Grid gap={20}>
            <Grid space="sm">
              <Grid row align="center">
                <Typography variant="caption-1">
                  {t('general-analysis.card.date', {
                    date: localizeDate(data.createdAt, lang),
                    amountOfDreams: data.amountOfDreams,
                  })}
                </Typography>
              </Grid>

              <Grid space="md" align="center" row>
                <Typography variant="title-2" weight="bold">
                  {t('general-analysis.card.title')}
                </Typography>
                <FontAwesome6 name="wand-magic-sparkles" size={20} color={colors.text.primary} />
              </Grid>
            </Grid>

            <GroupBy title={t('general-analysis.card.general-description')}>
              <Grid row space="md">
                <TextLine />
                <Typography style={{ lineHeight: 25 }} variant="callout">
                  {data.analysis.summary}
                </Typography>
              </Grid>
            </GroupBy>
            <GroupBy title={t('general-analysis.card.advice')}>
              <Typography style={{ lineHeight: 25 }} variant="callout">
                {data.analysis.advice}
              </Typography>
            </GroupBy>

            <GroupBy title={t('general-analysis.card.emotions')}>
              <Grid row wrap space="sm">
                {data.analysis.emotions.map((emotion, index) => (
                  <Chip key={index} label={emotion} />
                ))}
              </Grid>
            </GroupBy>

            <GroupBy title={t('general-analysis.card.aspects')}>
              <Grid row space="sm">
                <Typography variant="callout" style={{ flex: 1, lineHeight: 25 }}>
                  {data.analysis.psychologicalInsights}
                </Typography>
              </Grid>
            </GroupBy>
          </Grid>
        </Grid>
      </ImageBackground>
    </Grid>
    // </LinearGradient>
  );
}
