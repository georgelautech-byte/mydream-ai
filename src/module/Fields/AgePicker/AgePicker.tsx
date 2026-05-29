import { ageMock } from '@/entities/userTags/mock/ageMock';
import { AGE } from '@/shared/types/globalTypes';
import SurfacePicker from '@/shared/ui/elements/SurfacePicker';
import Grid from '@/shared/ui/grid/Grid';

interface AgePickerProps {
  value?: AGE;
  onChange: (age: AGE) => void;
}

export default function AgePicker({ value, onChange }: AgePickerProps) {
  return (
    <Grid space="md">
      {ageMock.map(age => (
        <SurfacePicker
          // height={20}
          paddingVertical={7}
          isPicked={age === value}
          key={age}
          label={age}
          item={age}
          onChange={onChange}
        />
      ))}
    </Grid>
  );
}
