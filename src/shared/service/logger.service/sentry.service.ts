import * as Sentry from '@sentry/react-native';

class ErrorLogger {
  logError(error: Error | string) {
    if (error instanceof Error) {
      Sentry.captureException(error.message);
    } else if (typeof error === 'string') {
      Sentry.captureMessage(error);
    }
  }

  logMessage(message: string) {
    Sentry.captureMessage(message);
  }
}

export const errorLogger = new ErrorLogger();
