import * as Haptics from 'expo-haptics';

export function useVibration() {
  const vibrate = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  };

  const vibrateError = () => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  const vibrateMedium = () => {
    void Haptics.notificationAsync();
  };

  const vibrateSelection = () => {
    void Haptics.selectionAsync();
  };

  return { vibrate, vibrateSelection, vibrateMedium, vibrateError };
}
