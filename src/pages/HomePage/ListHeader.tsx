import { useGetDreams } from '@/entities/dream/dream.repository';
import { AddDreamButton } from '@/module/AddDreamButton';
import { AudioRecorderButton } from '@/module/AudioRecorderButton';
import { Settings } from '@/module/Settings';
import { SubBlock } from '@/module/SubBlock';
import { animationEngine } from '@/shared/service/animation.service';
import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import Animated from 'react-native-reanimated';
import ArrowAnimation from './ui/ArrowAnimation';
import ListHeaderTitles from './ui/ListHeaderTitles';
import NoDreamsBlock from './ui/NoDreamsBlock';
import { useTranslation } from 'react-i18next';
import { GeneralAnalyzeButton } from '@/module/GeneralAnalyzeButton';
import LastDreamAnalysisCard from '@/module/LastDreamAnalysisCard/LastDreamAnalysisCard';
import GeneralAnalyzeBlock from '@/module/GeneralAnalyzeButton/GeneralAnalyzeBlock';

export default function ListHeader() {
  const { data, isLoading } = useGetDreams();
  const { t } = useTranslation();

  const dreamTitle = data?.pages[0][0]?.title || undefined;
  const decodeDream = dreamTitle ? `${t('home.decode-word')} ${dreamTitle}` : undefined;

  const isDreamsExists = data?.pages[0].length !== 0;

  const isShowSubBlock = isDreamsExists && decodeDream;

  return (
    <Grid gap={30}>
      <Grid gap={90}>
        <Grid gap={40}>
          <Grid space="sm">
            <Settings />
            <Grid space="lg">
              <ListHeaderTitles showDescription={!isDreamsExists} />
              <Grid space="md">
                <Grid space="sm">
                  <GeneralAnalyzeBlock />
                </Grid>
                <Grid align="stretch" row space="md">
                  <AddDreamButton />
                  <AudioRecorderButton />
                  {!isDreamsExists && <ArrowAnimation />}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {isShowSubBlock && (
            <Animated.View entering={animationEngine.fadeInUp(0).mass(0.5)}>
              <SubBlock title={decodeDream} />
            </Animated.View>
          )}

          <LastDreamAnalysisCard />
        </Grid>

        {!isDreamsExists && <NoDreamsBlock />}
      </Grid>

      {isDreamsExists && !isLoading && (
        <Grid>
          <Typography weight="extra-bold" variant="title-1">
            {t('home.your-dreams')}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
