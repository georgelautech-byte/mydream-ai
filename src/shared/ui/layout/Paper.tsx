import { withPressable } from '@/shared/hoc/withPressable';
import { BlurView } from 'expo-blur';
import Grid, { GridProps } from '../grid/Grid';
import { useTheme } from '@/shared/hooks/useTheme';

type PaperProps = GridProps;

export default function Paper({ ...props }: PaperProps) {
  const colors = useTheme();
  return (
    <Grid
      style={{
        shadowColor: 'rgb(0, 0, 0)',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: {
          height: 1,
          width: 0,
        },
      }}
    >
      <Grid
        style={[
          {
            overflow: 'hidden',
            borderRadius: colors.styles.borderRadius,
            // backgroundColor: '#ffffff18',
          },
          props.style,
        ]}
      >
        <BlurView
          tint="light"
          style={[
            {
              paddingVertical: props.paddingVertical || 20,
              paddingHorizontal: props.paddingHorizontal || 25,
              backgroundColor: props.color,
            },
            props.style,
          ]}
          intensity={50}
        >
          <Grid {...props} style={[{ backgroundColor: 'transparent' }, props.style]} />
        </BlurView>
      </Grid>
    </Grid>
  );
}

export const PaperPressable = withPressable(Paper);
