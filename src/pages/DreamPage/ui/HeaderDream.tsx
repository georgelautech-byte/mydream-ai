import UserAvatar from '@/entities/auth/ui/UserAvatar';
import { GetDreamDto } from '@/shared/api/entities/dream/dream.types';
import { HORIZONTAL_PADDINGS } from '@/shared/config/constants/constants';
import GoBackButton from '@/shared/ui/buttons/GoBackButton';
import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import { router } from 'expo-router';
import HeaderImage from './HeaderImage';

import DropdownOptions from './DropdownOptions';
import { Alert } from 'react-native';
import { useDeleteDream } from '@/entities/dream/dream.repository';
import { useTranslation } from 'react-i18next';

interface HeaderDreamProps {
  dream: GetDreamDto;
}

export default function HeaderDream({ dream }: HeaderDreamProps) {
  const { t } = useTranslation();
  const goBack = () => {
    router.back();
  };

  const { deleteDreamFunction } = useDeleteDream();

  const onDelete = () => {
    Alert.alert(t('dream-page.delete-warning'), t('dream-page.lose-data-warning'), [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        isPreferred: true,
        style: 'destructive',
        onPress: async () => {
          await deleteDreamFunction(dream.id);
          router.replace('/screens/homeScreen');
        },
      },
    ]);
  };

  return (
    <Grid>
      <Grid paddingHorizontal={HORIZONTAL_PADDINGS} row align="center" justfity="space-between" space="lg">
        <GoBackButton onPress={goBack} />
        <Typography textAlign="center" variant="title-3" weight="extra-bold">
          {t('dream-page.dream-word')}
        </Typography>

        <DropdownOptions onDelete={onDelete} />
        {/* <Grid style={{ opacity: 0 }}>
          <GoBackButton onPress={() => {}} />
        </Grid> */}
      </Grid>
      <Grid align="center" space="lg">
        <Grid align="center" paddingHorizontal={HORIZONTAL_PADDINGS}>
          <HeaderImage />
          <Grid space="sm" align="center">
            <Typography textAlign="center" weight="bold" variant="title-1">
              {dream.title}
            </Typography>
            <UserAvatar />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
