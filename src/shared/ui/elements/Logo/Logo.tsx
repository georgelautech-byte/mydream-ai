import ImageIcon from '@/assets/icons/app_icon_transparent.png';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import Grid from '../../grid/Grid';
import Typography from '../../typography/Typography';

export default function Logo() {
  const { t } = useTranslation();
  return (
    <Grid
      // style={{ borderWidth: 1, borderColor: '#ffffff8f', borderRadius: 20 }}
      style={{
        shadowColor: '#fff',
        shadowOpacity: 0.35,
        shadowRadius: 1,
        shadowOffset: {
          height: 0,
          width: 0,
        },
      }}
      row
      wrap
      justfity="center"
      align="center"
      space="md"
      paddingHorizontal={20}
      paddingRight={30}
      paddingVertical={8}
    >
      <Image source={ImageIcon} style={{ width: 40, height: 40 }} />
      <Grid>
        <Typography variant="title-4">{t('dream-page.created-by')}</Typography>
        <Typography variant="title-4" weight="extra-bold">
          MyDream AI
        </Typography>
      </Grid>
    </Grid>
  );
}
