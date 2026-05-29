// utils/subscriptionStats.ts
// -------------------------------------------------------------
// Возвращает одно и то же «правдоподобное» число покупок за 7 дней
// для всех экранов, пока не начнётся новая календарная неделя.
//
// • Основано на ISO-неделе и годе → стабильное значение весь недельный
//   интервал, но меняется каждую неделю автоматически.
// • Псевдослучайность реализована через простой фиксированный PRNG,
//   чтобы число выглядело «живым», но было детерминированным.
//
// Диапазон можно изменить (сейчас 400-1200).
// -------------------------------------------------------------

/** Детерминированный PRNG (Mulberry32) */
function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296; // 0‒0.999…
  };
}

/** ISO-неделя (1-53) для указанной даты */
function getISOWeek(date: Date): number {
  const tmp = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  // четверг той же недели гарантированно в той же ISO-неделе
  tmp.setUTCDate(tmp.getUTCDate() + 4 - (tmp.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
  return Math.ceil(((tmp.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

/** Генерирует стабильное число покупок за текущую ISO-неделю */
export function getWeeklyPurchaseCount(min = 400, max = 1200): number {
  const now = new Date();
  const isoWeek = getISOWeek(now);
  const year = now.getUTCFullYear();

  // уникальный seed = YYYYWW, напр. 202519 → 19-я неделя 2025 года
  const seed = year * 100 + isoWeek;

  const random = mulberry32(seed)(); // 0-1
  const range = max - min + 1;

  return min + Math.floor(random * range);
}
