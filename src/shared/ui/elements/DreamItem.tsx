import { useTheme } from '@/shared/hooks/useTheme';
import Feather from '@expo/vector-icons/Feather';
import Grid from '../grid/Grid';
import { PaperPressable } from '../layout/Paper';
import Typography from '../typography/Typography';

interface DreamItemProps {
  id: string;
  title: string;
  coverImage?: string;
  date: string;
  description: string;
  onPress: (id: string) => void;
}

export default function DreamItem({ id, title, date, description, onPress }: DreamItemProps) {
  const colors = useTheme();
  const onPressHandler = () => {
    onPress(id);
  };

  return (
    <PaperPressable onPress={onPressHandler}>
      <Grid space="md">
        <Grid align="center" justfity="space-between" flex={1} row>
          <Grid flex={0.95} gap={1}>
            <Typography numberOfLines={2} ellipsizeMode="tail" weight="bold" variant="title-2">
              {title}
            </Typography>

            {/* <Typography variant="footnote">{date}</Typography> */}
          </Grid>
          <Feather name="chevron-right" size={28} color={colors.text.primary} />
        </Grid>
        <Typography numberOfLines={5} lineBreakMode="clip">
          {description}
        </Typography>
      </Grid>
    </PaperPressable>
  );
}
