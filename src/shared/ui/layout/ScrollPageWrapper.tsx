import { ScrollView, ScrollViewProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { GridProps } from '../grid/Grid';

interface ScrollPageWrapper extends ScrollViewProps, GridProps {}

export default function ScrollPageWrapper({ ...props }: ScrollPageWrapper) {
  const colors = useTheme();
  return <ScrollView {...props} style={{ backgroundColor: colors.background.primary }} />;
}
