import { getDeviceLanguage } from '@/shared/helpers/getDeviceLanguage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware'; // ⬅︎ сохраняем язык между запусками
import { immer } from 'zustand/middleware/immer';
import i18n from '../providers/i18n';
import { zustandMMKVStorageLang } from './lang.storage';

interface State {
  lang: string;
  _hasHydrated: boolean;
}
interface Actions {
  setLang: (lang: string) => void;
  setHasHydrated: (v: boolean) => void;
}

/**
 * Глобальный стор приложения
 * Сохраняем только выбранный язык; сами переводы живут в i18next
 */
export const useLang = create<State & Actions>()(
  persist(
    immer((set /*, get */) => ({
      lang: getDeviceLanguage(), // fallback
      setLang: lang =>
        set(s => {
          if (s.lang !== lang) {
            s.lang = lang;
            i18n.changeLanguage(lang); // переключаем сразу
          }
        }),
      _hasHydrated: false, // флаг, чтобы UI знал, что всё готово
      setHasHydrated: (v: boolean) => set({ _hasHydrated: v }),
    })),
    {
      name: 'lang',
      storage: createJSONStorage(() => zustandMMKVStorageLang),

      /** выстрелит ровно один раз после подгрузки сохранённого стейта */
      onRehydrateStorage: state => persistedState => {
        const saved = persistedState?.lang;
        i18n.changeLanguage(saved ?? state.lang); // если был — применяем
        state.setHasHydrated(true); // даём знать UI
      },
    },
  ),
);
