import { Inform } from '../service/logger.service/logger.service';
import { errorLogger } from '../service/logger.service/sentry.service';

export async function handleMutation<T>(
  mutationFn: () => Promise<T>,
  successMessage?: string,
  error?: { errorMessage?: string; disableError?: boolean },
): Promise<T | undefined> {
  try {
    const res = await mutationFn();
    if (res && successMessage) Inform.success(successMessage);
    return res;
  } catch (e) {
    if (error?.disableError) {
      return;
    }
    if (e instanceof Error) errorLogger.logError(`Error in mutation ${e.message}`);
    else if (typeof e === 'string') errorLogger.logError(`Error in mutation ${e}`);

    Inform.error(e || error?.errorMessage);
  }
}
