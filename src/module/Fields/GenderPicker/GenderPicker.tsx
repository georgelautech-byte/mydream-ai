import { binaryGenderMock, genderMock } from '@/entities/userTags/mock/genderMock';
import { IGenderItem } from '@/entities/userTags/types/types';
import { useLang } from '@/shared/hooks/useLangStore';
import SurfacePicker from '@/shared/ui/elements/SurfacePicker';
import Grid from '@/shared/ui/grid/Grid';
import { useTranslation } from 'react-i18next';

interface GenderPickerProps {
  onChange: (gender: IGenderItem) => void;
  value?: IGenderItem;
}

export default function GenderPicker({ onChange, value }: GenderPickerProps) {
  const { t } = useTranslation();
  const { lang } = useLang();

  const genderPickerFiltered = lang === 'ru' ? binaryGenderMock : genderMock;

  return (
    <Grid row space="md" wrap justfity="center">
      {genderPickerFiltered.map(item => (
        <Grid key={item.id} flex={0.4}>
          <SurfacePicker
            paddingHorizontal={0}
            height={70}
            justfity="center"
            isPicked={value?.id === item.id}
            item={item}
            key={item.id}
            label={t(`onboarding.genders.${item.name}`)}
            onChange={item => onChange(item)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
