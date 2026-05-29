import { useProtection } from '@/entities/useProtection/useProtection';
import { Environment } from '@/shared/config/config';
import { isAppToken } from '@/shared/service/appId.service';
import { errorLogger } from '@/shared/service/logger.service/sentry.service';
import {
  Nunito_200ExtraLight,
  Nunito_200ExtraLight_Italic,
  Nunito_300Light,
  Nunito_300Light_Italic,
  Nunito_400Regular,
  Nunito_400Regular_Italic,
  Nunito_500Medium,
  Nunito_500Medium_Italic,
  Nunito_600SemiBold,
  Nunito_600SemiBold_Italic,
  Nunito_700Bold,
  Nunito_700Bold_Italic,
  Nunito_800ExtraBold,
  Nunito_800ExtraBold_Italic,
  Nunito_900Black,
  Nunito_900Black_Italic,
} from '@expo-google-fonts/nunito';
import Superwall, { LogLevel, LogScope, SuperwallOptions } from '@superwall/react-native-superwall';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';

export default function LoaderWrapper() {
  const [fontsLoaded] = useFonts({
    Nunito_200ExtraLight,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
    Nunito_200ExtraLight_Italic,
    Nunito_300Light_Italic,
    Nunito_400Regular_Italic,
    Nunito_500Medium_Italic,
    Nunito_600SemiBold_Italic,
    Nunito_700Bold_Italic,
    Nunito_800ExtraBold_Italic,
    Nunito_900Black_Italic,
  });
  const [isAppReady, setIsAppReady] = useState<boolean>(false);
  const { codeProtection, biometric } = useProtection();

  useEffect(() => {
    const init = async () => {
      if (!fontsLoaded) return;

      try {
        const opts = new SuperwallOptions();
        opts.logging.level = LogLevel.Warn;
        opts.logging.scopes = [LogScope.PaywallPresentation];
        Superwall.configure({ apiKey: Environment.superwall_api_key!, options: opts });
        Superwall.shared.preloadAllPaywalls();
      } catch (e) {
        errorLogger.logError('Superwall init');
      }

      /*** Логика маршрута ***/
      let href = '/screens/onboarding';
      if (codeProtection || biometric) {
        href = '/utilsScreens/lockScreen';
      } else if (await isAppToken()) {
        href = '/screens/homeScreen';
      }
      setIsAppReady(true);
      SplashScreen.hideAsync(); // теперь можно скрывать Splash
    };

    init();
  }, [fontsLoaded, codeProtection, biometric]); // добавляем зависимости
}
