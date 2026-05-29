//currnetTime = 120 => 02:00 => 01:59

import { errorLogger } from '@/shared/service/logger.service/sentry.service';

// 120 ; 1 * 60 = 60 => 120 - 60
export const generateTimerTime = (currentTime: number): string => {
  try {
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime - minutes * 60);

    const minutesString = ('0' + String(minutes)).slice(-2);
    const secondsString = ('0' + String(seconds)).slice(-2);
    return `${minutesString}:${secondsString}`;
  } catch {
    errorLogger.logError('Error to generate timer time');
    return '00:00';
  }
};
