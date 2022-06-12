import { HttpStatusCode } from '../types/HttpStatusCode';

export class ServiceResult<T> {
    failure: boolean;
    code: HttpStatusCode;
    content: T;
    errorMessage?: string;

    private constructor(failure: boolean, code: HttpStatusCode, content: T, errorMessage?: string) {
        this.failure = failure;
        this.code = code;
        this.content = content;
        this.errorMessage = errorMessage;
    }

    public static succeeded<T>(content: T, code = 200): ServiceResult<T> {
        return new ServiceResult(false, code, content);
    }

    public static failed<T>(code = HttpStatusCode.INTERNAL_SERVER_ERROR, message?: string): ServiceResult<T> {
        return new ServiceResult(true, code, {} as T, message);
    }
}
