import { GetDreamDto } from '@/shared/api/entities/dream/dream.types';
import { errorLogger } from '@/shared/service/logger.service/sentry.service';

export type GroupedDreams = {
  title: string;
  data: GetDreamDto[];
};

const TODAY_LABELS: Record<string, string> = {
  en: 'Today',
  ru: 'Сегодня',
  tr: 'Bugün',
  cs: 'Dnes',
  de: 'Heute',
  es: 'Hoy',
  fr: 'Aujourd’hui',
  it: 'Oggi',
  nl: 'Vandaag',
  pl: 'Dziś',
  sv: 'Idag',
  no: 'I dag',
  ja: '今日',
  zh: '今天',
  pt: 'Hoje',
  ar: 'اليوم',
  ko: '오늘',
  hi: 'आज',
};
const YESTERDAY_LABELS: Record<string, string> = {
  en: 'Yesterday',
  ru: 'Вчера',
  tr: 'Dün',
  cs: 'Včera',
  de: 'Gestern',
  es: 'Ayer',
  fr: 'Hier',
  it: 'Ieri',
  nl: 'Gisteren',
  pl: 'Wczoraj',
  sv: 'Igår',
  no: 'I går',
  ja: '昨日',
  zh: '昨天',
  pt: 'Ontem',
  ar: 'أمس',
  ko: '어제',
  hi: 'कल',
};

/**
 * Группирует записи по дате, возвращая заголовки "Today", "Yesterday" или форматированные даты.
 */
export function groupDreamsByDate(dreams: GetDreamDto[], locale = 'ru'): GroupedDreams[] {
  try {
    const map = new Map<string, GetDreamDto[]>();
    const now = new Date();
    const todayKey = TODAY_LABELS[locale] || TODAY_LABELS.en;
    const yesterdayKey = YESTERDAY_LABELS[locale] || YESTERDAY_LABELS.en;

    // Функция форматирования произвольной даты
    const dateFormatter = new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });

    for (const dream of dreams) {
      const dt = new Date(dream.createdAt);
      let title: string;
      const diff = Math.floor(
        (new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() -
          new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()).getTime()) /
          (1000 * 60 * 60 * 24),
      );

      if (diff === 0) {
        title = todayKey;
      } else if (diff === 1) {
        title = yesterdayKey;
      } else {
        // приводит к "monday, 17 april"
        title = dateFormatter.format(dt);
        // капитализируем первую букву
        title = title.charAt(0).toUpperCase() + title.slice(1);
      }

      if (!map.has(title)) {
        map.set(title, []);
      }
      map.get(title)!.push(dream);
    }

    // Сортировка групп по дате: сегодня → вчера → более старые
    const groups = Array.from(map.entries());
    groups.sort(([aKey, aList], [bKey, bList]) => {
      const parseKey = (key: string, firstDate: string) => {
        if (key === todayKey) return now;
        if (key === yesterdayKey) return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
        return new Date(firstDate);
      };
      const dateA = parseKey(aKey, new Date(aList[0].createdAt).toISOString());
      const dateB = parseKey(bKey, new Date(bList[0].createdAt).toISOString());
      return dateB.getTime() - dateA.getTime();
    });

    return groups.map(([title, data]) => ({ title, data }));
  } catch (e) {
    errorLogger.logError('groupDreamsByDate');
    console.error('Error grouping dreams by date:', e);
    return [];
  }
}

/**
 * Возвращает локализованное название даты.
 *
 * @param input   Дата, которую нужно отформатировать (Date | число | строка ISO/UTC).
 * @param locale  Язык‑локаль (по умолчанию 'ru').
 *
 * @example
 * localizeDate('2025‑05‑13T09:20:00Z', 'en')  // → "Today"
 */
export function localizeDate(input: string | number | Date, locale: string = 'en'): string {
  try {
    const dt = new Date(input);
    if (Number.isNaN(dt.getTime())) return '';

    const now = new Date();
    const todayKey = TODAY_LABELS[locale] ?? TODAY_LABELS.en;
    const yesterdayKey = YESTERDAY_LABELS[locale] ?? YESTERDAY_LABELS.en;

    const diffDays = Math.floor(
      (new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() -
        new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()).getTime()) /
        86_400_000, // 1000 * 60 * 60 * 24
    );

    if (diffDays === 0) return todayKey;
    if (diffDays === 1) return yesterdayKey;

    const formatted = new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }).format(dt);

    // Делает первую букву заглавной (некоторые локали возвращают строчные).
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  } catch (e) {
    errorLogger.logError('localizeDate');
    console.error('Error in localizeDate:', e);
    return '';
  }
}
