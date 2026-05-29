import { useTheme } from '@/shared/hooks/useTheme';
import Grid from '../grid/Grid';

export default function TextLine() {
  const colors = useTheme();
  return <Grid height="100%" width={3} color={colors.accent.alert} style={{ borderRadius: 10 }} />;
}
