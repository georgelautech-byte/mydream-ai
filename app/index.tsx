// app/index.tsx
import { useProtection } from '@/entities/useProtection/useProtection';
import { isAppToken } from '@/shared/service/appId.service';
import Grid from '@/shared/ui/grid/Grid';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
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
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { Redirect, SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync(); // вызываем как можно раньше

export default function Index() {
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

  /* 2. Сохраняем, куда нужно редиректить */
  const [target, setTarget] = useState<string | null>(null);

  const { codeProtection, biometric } = useProtection(); // zustand

  useEffect(() => {
    const init = async () => {
      if (!fontsLoaded) return;

      /*** Логика маршрута ***/
      let href = '/screens/onboarding';
      if (codeProtection || biometric) {
        href = '/utilsScreens/lockScreen';
      } else if (await isAppToken()) {
        href = '/screens/homeScreen';
      }
      setTarget(href);
      SplashScreen.hideAsync(); // теперь можно скрывать Splash
    };

    init();
  }, [fontsLoaded, codeProtection, biometric]);

  if (!target)
    return (
      <LinearGradient
        style={{ flex: 1 }}
        colors={['#0A0C14', '#151832', '#342371', '#7A29C6']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <Grid flex={1}>{null}</Grid>
      </LinearGradient>
    );

  /* 5. Когда всё готово — мгновенный редирект */
  return (
    <PageWrapper>
      {/* <Grid flex={1} color="#0C111C" width="100%"> */}
      <Redirect href={target} />
      {/* </Grid> */}
    </PageWrapper>
  ); // компонент Redirect поддерживается Expo Router :contentReference[oaicite:1]{index=1}
}
