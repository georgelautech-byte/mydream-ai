import { useProtection } from '@/entities/useProtection/useProtection';
import { queryClient } from '@/shared/api/api';
import { Environment } from '@/shared/config/config';
import ThemeProvider from '@/shared/providers/ThemeProvider';
import { UserInactivityProvider } from '@/shared/providers/UserInactivity';
import * as Sentry from '@sentry/react-native';
import { QueryClientProvider } from '@tanstack/react-query';
import { SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ToastManager from 'toastify-react-native';
import { vexo } from 'vexo-analytics';
import GeneralStack from './stack';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '@/shared/providers/i18n';
import { I18nManager, Platform } from 'react-native';
import { useEffect } from 'react';
import Superwall, { LogLevel, LogScope, SuperwallOptions } from '@superwall/react-native-superwall';
import { errorLogger } from '@/shared/service/logger.service/sentry.service';

Sentry.init({
  dsn: 'https://75639b83524ceb4e5cd2f365c943e3a3@o4509188089708544.ingest.us.sentry.io/4509188098949120',

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration()],
  // debug: __DEV__,

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

if (!__DEV__) {
  vexo(Environment.vexo_api_key || '');
}

const isRTL = i18n.language.startsWith('ar');
I18nManager.allowRTL(isRTL);
I18nManager.forceRTL(isRTL);

// Если режим изменился, перезапускаем приложение
// if (I18nManager.isRTL !== isRTL) {
//   RNRestart.Restart();
// }

// Prevent the splash screen from auto-hiding before asset loading is complete.
void SplashScreen.preventAutoHideAsync();

export default Sentry.wrap(function RootLayout() {
  const { blockTime, codeProtection, biometric } = useProtection();
  const { i18n } = useTranslation(); // автоматический re-render при смене языка

  useEffect(() => {
    try {
      const opts = new SuperwallOptions();
      opts.logging.level = LogLevel.Warn;
      opts.logging.scopes = [LogScope.PaywallPresentation];

      console.log(Environment.superwall_api_key_ANDROID);
      Superwall.configure({
        apiKey: Platform.OS === 'ios' ? Environment.superwall_api_key! : Environment.superwall_api_key_ANDROID!,
        options: opts,
      });
      Superwall.shared.preloadAllPaywalls();
    } catch (e) {
      errorLogger.logError('Superwall init');
    }
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <UserInactivityProvider blockTime={blockTime} isProtected={codeProtection || biometric ? true : false}>
          <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <StatusBar style="light" />
              <GeneralStack />
              <ToastManager />
            </GestureHandlerRootView>
          </QueryClientProvider>
        </UserInactivityProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
});
