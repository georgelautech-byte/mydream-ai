import { useTheme } from '@/shared/hooks/useTheme';
import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import Entypo from '@expo/vector-icons/Entypo';
import { Pressable } from 'react-native';

interface SettingItemProps {
  title: string;
  prefix?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPress?: () => void;
  removeSeparator?: boolean;
  danger?: boolean;
  rightPrefix?: string;
  color?: string;
  textColor?: string;
}

export default function SettingItem({
  title,
  prefix,
  leftIcon,
  rightIcon,
  removeSeparator,
  rightPrefix,
  danger,
  color,
  textColor,
  onPress,
}: SettingItemProps) {
  const colors = useTheme();
  return (
    <Pressable onPress={onPress}>
      <Grid
        style={{
          borderRadius: colors.styles.borderRadius,
          shadowColor: color,
          shadowOpacity: 0.3,
          shadowRadius: 10,
          shadowOffset: { height: 0, width: 0 },
        }}
        // height={50}
        color={color || (danger ? colors.background.negative : colors.background.secondary)}
        row
        padding={7}
        align="center"
        justfity="space-between"
        width="100%"
      >
        <Grid row align="center" space="sm">
          {leftIcon && (
            <Grid padding={8} style={{ borderRadius: 8 }}>
              {leftIcon}
            </Grid>
          )}
          <Grid>
            <Typography style={{ color: textColor || colors.text.primary }} weight="bold">
              {title}
            </Typography>
            {prefix && (
              <Typography weight="light" variant="caption-1">
                {prefix}
              </Typography>
            )}
          </Grid>
        </Grid>

        <Grid row align="center" space="sm">
          {rightPrefix && (
            <Typography weight="light" variant="caption-1">
              {rightPrefix}
            </Typography>
          )}
          {rightIcon ? rightIcon : <Entypo name="chevron-right" size={24} color={textColor || colors.text.secondary} />}
        </Grid>
      </Grid>
      {/* {removeSeparator || <Separator marginVertical={4} />} */}
    </Pressable>
  );
}
