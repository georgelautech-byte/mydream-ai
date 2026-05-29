import { HORIZONTAL_PADDINGS } from '@/shared/config/constants/constants';
import { SleepDataResponse } from '@/shared/types/globalTypes';
import ParticipantItem from '@/shared/ui/elements/ParticipantItem';
import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

interface ParticipantsProps {
  analysis: SleepDataResponse;
}

export default function Participants({ analysis }: ParticipantsProps) {
  const { t } = useTranslation();
  if (analysis.characters.length === 0) {
    return null;
  }

  return (
    <Grid space="md">
      <Typography variant="title-2" weight="extra-bold" marginLeft={HORIZONTAL_PADDINGS}>
        {t('dream-page.characters')}
      </Typography>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: HORIZONTAL_PADDINGS }}
      >
        <Grid row space="md">
          {analysis.characters.map((character, index) => (
            <ParticipantItem name={character.name} role={character.role} key={index} />
          ))}
        </Grid>
      </ScrollView>
    </Grid>
  );
}
