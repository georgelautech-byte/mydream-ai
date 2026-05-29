import { Inform } from '@/shared/service/logger.service/logger.service';
import { errorLogger } from '@/shared/service/logger.service/sentry.service';
import { SleepDataResponse } from '@/shared/types/globalTypes';

export const getDreamAnalysisResponse = (str: string): SleepDataResponse | undefined => {
  try {
    return JSON.parse(str) as SleepDataResponse;
  } catch (e) {
    errorLogger.logError('Error to parse dream analysis response');
    Inform.error(e);
  }
};
