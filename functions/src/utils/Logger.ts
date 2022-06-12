import * as functions from 'firebase-functions';

export class Logger {
    public static info = (message: string, data: unknown): void => functions.logger.info(message, data);

    public static error = (message: string, error?: unknown): void => functions.logger.error(message, error);
}
