import { useTheme } from '@/shared/hooks/useTheme';
import AnimatedWrapper from '@/shared/ui/animations/AnimatedWrapper';
import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import WrapIconInPressable from '@/shared/ui/wrapper/WrapIconInPressable';
import AntDesign from '@expo/vector-icons/AntDesign';

interface GeneralFeedbackProps {
  title: string;
  onPressLike?: () => void;
  onPressDislike?: () => void;
}

export default function GeneralFeedback({ title, onPressDislike, onPressLike }: GeneralFeedbackProps) {
  const colors = useTheme();
  return (
    <AnimatedWrapper>
      <Grid space="lg">
        <Typography weight="bold" textAlign="center">
          {title}
        </Typography>
        <Grid row align="center" justfity="space-evenly">
          <WrapIconInPressable>
            <AntDesign name="like1" size={36} color={colors.text.primary} />
          </WrapIconInPressable>
          <WrapIconInPressable>
            <AntDesign name="dislike1" size={36} color={colors.text.primary} />
          </WrapIconInPressable>
        </Grid>
      </Grid>
    </AnimatedWrapper>
  );
}
