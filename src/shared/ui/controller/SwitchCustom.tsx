import { Switch, SwitchProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export type SwitchCustomProps = SwitchProps;

export default function SwitchCustom({ ...props }: SwitchCustomProps) {
  const colors = useTheme();
  return (
    <Switch
      {...props}
      thumbColor={colors.text.primary}
      ios_backgroundColor={colors.background.secondary}
      trackColor={{
        false: colors.background.secondary,
        true: colors.accent.primary,
      }}
    />
  );
}
