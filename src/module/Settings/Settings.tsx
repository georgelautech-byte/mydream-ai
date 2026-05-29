import { useTheme } from '@/shared/hooks/useTheme';
import { useVibration } from '@/shared/hooks/useVibration';
import { analytics, Events } from '@/shared/service/analytics.service';
import Grid from '@/shared/ui/grid/Grid';
import WrapIconInPressable from '@/shared/ui/wrapper/WrapIconInPressable';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

export default function Settings() {
  const colors = useTheme();
  const { vibrateSelection } = useVibration();

  const handleSub = async () => {
    analytics.trackEvent(Events.press_settings, {});
    vibrateSelection();
    router.push('/screens/settings');
  };

  return (
    <Grid row justfity="flex-end">
      <WrapIconInPressable onPress={handleSub}>
        <Ionicons name="settings" size={24} color={colors.text.primary} />
      </WrapIconInPressable>
    </Grid>
  );
}
