import { localizeDate } from '@/entities/dream/helpers/groupDreamsByDate';
import { GetDreamDto } from '@/shared/api/entities/dream/dream.types';
import { useLang } from '@/shared/hooks/useLangStore';
import { useTheme } from '@/shared/hooks/useTheme';
import { SleepDataResponse } from '@/shared/types/globalTypes';
import Logo from '@/shared/ui/elements/Logo/Logo';
import TextLine from '@/shared/ui/elements/TextLine';

import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';

interface SnapProps {
  dream: GetDreamDto;
  analysis: SleepDataResponse | undefined;
}

export default function Snap({ dream, analysis }: SnapProps) {
  const colors = useTheme();
  const { lang } = useLang();
  const { t } = useTranslation();
  return (
    <LinearGradient
      colors={['#241557', '#562089']}
      style={{
        padding: 20,
      }}
    >
      <Grid paddingHorizontal={5} space="md">
        <Grid space="md">
          <Grid>
            <Typography style={{ opacity: 0.8 }} color="secondary" variant="subhead">
              {localizeDate(new Date(dream.createdAt), lang)}
            </Typography>
            <Typography weight="bold" variant="title-2">
              {t('dream-page.i-dreamed')}
            </Typography>
          </Grid>
          <Grid space="sm">
            <Typography weight="bold" variant="headline">
              {dream.title}
            </Typography>
            <Grid row space="sm">
              <TextLine />
              <Typography style={{ lineHeight: 25 }}>{analysis?.summary}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid align="center">
          <Logo />
        </Grid>
        <Grid space="sm">
          <Typography weight="bold" variant="headline">
            {t('dream-page.analysis-showed')}
          </Typography>
          <Grid row space="sm">
            <Typography>{analysis?.interpretations.esoteric}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </LinearGradient>
  );
}
