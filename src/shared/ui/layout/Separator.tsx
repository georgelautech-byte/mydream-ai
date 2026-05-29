import { useTheme } from '../../hooks/useTheme';
import Grid, { GridProps } from '../grid/Grid';

interface SeparatorProps extends GridProps {}

export default function Separator({ ...props }: SeparatorProps) {
  const colors = useTheme();
  return <Grid height={1} marginVertical={10} width={'100%'} {...props} />;
}
