import { useRouter } from 'expo-router';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { MMKV } from 'react-native-mmkv';

export const storageUserInactivity = new MMKV({
  id: 'UserInactivity',
});

interface UserInactivityProviderProps extends PropsWithChildren {
  isProtected: boolean;
  blockTime: number;
}

export const UserInactivityProvider = ({ isProtected, blockTime, children }: UserInactivityProviderProps) => {
  const LOCK_TIME = 1000 * (blockTime || 1) * 60; // minutes

  const appState = useRef(AppState.currentState);
  const router = useRouter();
  const wasBlockedRef = useRef(false);

  useEffect(() => {
    const subsciption = AppState.addEventListener('change', handleAppStateChanged);

    return () => {
      subsciption.remove();
    };
  }, []);

  const handleAppStateChanged = (nextAppState: AppStateStatus) => {
    if (!isProtected) {
      return;
    }

    console.log('appState: ', appState.current, nextAppState);
    if (storageUserInactivity.getString('isAppLocked') === 'true') {
      router.push('/utilsScreens/lockScreen');
      return;
    }
    // if (nextAppState === 'inactive') {
    //   router.push('/utilsScreens/blockScreen');
    //   wasBlockedRef.current = true; // Устанавливаем флаг, что был блок
    // } else {
    //   // Возвращаемся назад только если был блок
    //   if (
    //     wasBlockedRef.current &&
    //     ((router.canGoBack() && appState.current === 'background') || appState.current === 'inactive')
    //   ) {
    //     router.back();
    //     wasBlockedRef.current = false; // Сбрасываем флаг после возврата
    //   }
    // }

    console.log(storageUserInactivity.getString('isAppLocked'));

    // Проверячем находится ли приложение в фоне
    // Если да, то записываем время
    // Если приложение переходит в активное состояние и время больше 3 секунд
    // то переходим на экран блокировки
    if (nextAppState === 'background') {
      recordStartTime();
    } else if (nextAppState === 'active' && appState.current.match(/background/)) {
      const elapsed = Date.now() - (storageUserInactivity.getNumber('startTime') || 0);
      console.log(LOCK_TIME, elapsed);
      if (elapsed >= LOCK_TIME) {
        router.push('/utilsScreens/lockScreen');
        storageUserInactivity.set('isAppLocked', 'true');
      }
    }

    appState.current = nextAppState;
  };

  const recordStartTime = () => {
    storageUserInactivity.set('startTime', Date.now());
    storageUserInactivity.set('isAppLocked', true);
  };

  return children;
};
