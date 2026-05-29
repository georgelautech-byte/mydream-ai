import SwitchCustom from '../controller/SwitchCustom';
import Grid, { GridPressable } from '../grid/Grid';
import Typography from '../typography/Typography';

interface LabelSwitchProps {
  onChange: (value: boolean) => void;
  value: boolean;
  label: string;
}

export default function LabelSwitch({ onChange, value, label }: LabelSwitchProps) {
  return (
    <GridPressable
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Grid>
        <Typography weight="bold">{label}</Typography>
      </Grid>
      <SwitchCustom value={value} onValueChange={onChange} />
    </GridPressable>
  );
}
