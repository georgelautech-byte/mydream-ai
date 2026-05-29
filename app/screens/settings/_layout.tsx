import { Stack } from 'expo-router';
import DismissModalButton from '@/shared/ui/elements/DismissModalButton';
import { useTheme } from '@/shared/hooks/useTheme';
import { fontWeight } from '@/shared/styles/typography/typography';
import { useTranslation } from 'react-i18next';

export default function SettingsLayout() {
  const color = useTheme();
  const { t } = useTranslation();
  return (
    <Stack
      screenOptions={{
        presentation: 'modal',
        headerTransparent: true,
        headerBlurEffect: 'regular',
        gestureEnabled: true,
        animation: 'slide_from_right', // плавное смещение влево
        headerTitleStyle: {
          fontFamily: fontWeight['extra-bold'],
          color: color.text.primary,
        },
        headerLeft: () => <DismissModalButton />,
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: t('settings-page.header-title') }} />
      <Stack.Screen name="nameUpdateScreen" options={{ headerTitle: t('settings-page.update-name-header') }} />
      <Stack.Screen name="newPinScreen" options={{ headerTitle: '' }} />
      <Stack.Screen name="changePinScreen" options={{ headerTitle: '' }} />

      <Stack.Screen
        name="codeProtection"
        options={{ headerTitle: t('settings-page.pin-code-title'), presentation: 'containedModal' }}
      />
      {/* добавляйте здесь другие экраны настроек */}
    </Stack>
  );
}
