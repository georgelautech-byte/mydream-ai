import ScientificImage from '@/assets/Interpretations/forest-o3.png';
import EsotericImage from '@/assets/Interpretations/flowers2-o3.png';
import SelfDevelopmentImage from '@/assets/Interpretations/lamp-o3.png';
import Fraid from '@/assets/Interpretations/fraid3.png';
import Juing from '@/assets/Interpretations/juing2.png';
import { HORIZONTAL_PADDINGS } from '@/shared/config/constants/constants';
import { SleepDataResponse } from '@/shared/types/globalTypes';
import InterpretationItem from '@/shared/ui/elements/InterpretationItem';
import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import { useTranslation } from 'react-i18next';

interface InterpretationsProps {
  analysis: SleepDataResponse;
  isActive?: boolean;
}

export default function Interpretations({ analysis, isActive }: InterpretationsProps) {
  const { t } = useTranslation();
  return (
    <Grid paddingHorizontal={HORIZONTAL_PADDINGS} space="md">
      <Typography weight="extra-bold" variant="title-2">
        {t('dream-page.interpretations-label')}
      </Typography>
      <Grid space="md">
        <InterpretationItem
          isBlocked={false}
          title={t('dream-page.interpretations.esoteric')}
          text={analysis.interpretations.esoteric}
          image={EsotericImage}
          description={t('dream-page.interpretations.esoteric-desc')}
          interprerationId="esoteric"
        />
        <InterpretationItem
          isBlocked={!isActive}
          title={t('dream-page.interpretations.freudian')}
          text={analysis.interpretations.freudian}
          image={Fraid}
          description={t('dream-page.interpretations.freudian-desc')}
          interprerationId="freudian"
        />
        <InterpretationItem
          isBlocked={!isActive}
          title={t('dream-page.interpretations.jungian')}
          text={analysis.interpretations.jungian}
          image={Juing}
          description={t('dream-page.interpretations.jungian-desc')}
          interprerationId="jungian"
        />
        <InterpretationItem
          isBlocked={!isActive}
          title={t('dream-page.interpretations.scientific')}
          text={analysis.interpretations.scientific}
          image={ScientificImage}
          description={t('dream-page.interpretations.scientific-desc')}
          interprerationId="scientific"
        />
        <InterpretationItem
          isBlocked={!isActive}
          title={t('dream-page.interpretations.self-development')}
          text={analysis.interpretations.self_development}
          image={SelfDevelopmentImage}
          description={t('dream-page.interpretations.self-development-desc')}
          interprerationId="self-development"
        />
      </Grid>
    </Grid>
  );
}
