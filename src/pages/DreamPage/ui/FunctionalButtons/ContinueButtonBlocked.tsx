import { useTheme } from '@/shared/hooks/useTheme';
import Grid, { GridPressable } from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface ContinueButtonBlockedProps {
  onPress?: () => void;
}

export default function ContinueButtonBlocked({ onPress }: ContinueButtonBlockedProps) {
  const colors = useTheme();

  return (
    <GridPressable
      onPress={onPress}
      padding={10}
      paddingVertical={15}
      color="#fff"
      row
      align="center"
      justfity="center"
      space="md"
      style={{
        shadowColor: '#fff',
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowOffset: { height: 0, width: 0 },
        borderRadius: 20,
      }}
    >
      <AntDesign name="arrowdown" size={24} color={colors.text.white} />
      <Typography variant="title-3" color="white" weight="bold">
        Finish the dream
      </Typography>

      <AntDesign style={{ opacity: 0 }} name="arrowdown" size={24} color={colors.text.white} />

      <Grid style={{ position: 'absolute', right: 20, bottom: 10 }}>
        <FontAwesome name="lock" size={18} color={colors.accent.primary} />
      </Grid>
    </GridPressable>
  );
}
