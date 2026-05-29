import { zodiacSignsMock } from '@/entities/userTags/mock/zodiacSignsMock';
import { IZodiacItem } from '@/entities/userTags/types/types';
import { useVibration } from '@/shared/hooks/useVibration';
import SurfacePicker from '@/shared/ui/elements/SurfacePicker';
import Grid from '@/shared/ui/grid/Grid';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
interface ZodiacSignPickerProps {
  value?: IZodiacItem;
  onChange: (sign: IZodiacItem) => void;
}

export default function ZodiacSignPicker({ onChange, value }: ZodiacSignPickerProps) {
  const { vibrateSelection } = useVibration();
  const { t } = useTranslation();
  const onChahgeZodiacSign = (sign: IZodiacItem) => {
    onChange(sign);
    vibrateSelection();
  };

  return (
    <ScrollView>
      <Grid space="sm" row wrap align="center" justfity="center">
        {zodiacSignsMock.map(item => (
          <Grid key={item.id} width="31%">
            <SurfacePicker
              textProps={{
                variant: 'footnote',
              }}
              height={63}
              justfity="center"
              isPicked={value?.id == item.id}
              label={t(`onboarding.zodiac-signs.${item.name}`)}
              item={item}
              onChange={item => onChahgeZodiacSign(item)}
              header={<MaterialCommunityIcons name={item.icon} size={30} color={item.color} />}
            />
          </Grid>
        ))}
      </Grid>
    </ScrollView>
  );
}
