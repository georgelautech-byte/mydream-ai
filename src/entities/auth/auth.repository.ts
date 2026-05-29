import { apiService } from '@/shared/api/api';
import { init } from '@/shared/api/entities/auth/auth.api';
import i18n from '@/shared/providers/i18n';
import { getAppToken } from '@/shared/service/appId.service';
import { Inform } from '@/shared/service/logger.service/logger.service';
import { errorLogger } from '@/shared/service/logger.service/sentry.service';
import { create } from 'zustand';
import { InitUserType, UserType } from './auth.types';

interface State {
  user?: UserType;
  isHydrated: boolean;
}

interface Actions {
  initUser: (body?: InitUserType) => Promise<void>;

  setUser: (user?: UserType) => void;
}

export const useAuth = create<State & Actions>(set => {
  return {
    isHydrated: false,
    //  Только один раз при первом запуске приложения
    //  инициализируем пользователя
    //  и сохраняем токен (приложения) в SecureStore
    //  А также устанавливаем заголовок авторизации
    initUser: async (body?: InitUserType) => {
      try {
        const appToken = await getAppToken();

        if (!appToken) {
          throw new Error('App token is not defined');
        }

        const local = i18n.language;

        const res = await init({
          appToken: appToken,
          displayName: body?.displayName || '',
          local: local,
        });

        apiService.setAuthorizationHeader(res.accessToken);

        set({
          user: res.user,
          isHydrated: true,
        });
      } catch (error) {
        errorLogger.logError('Error to init user');
        Inform.error(error);
      }
    },

    setUser: (user?: UserType) => {
      set({
        user: user,
      });
    },
  };
});
