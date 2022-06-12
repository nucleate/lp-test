import * as functions from 'firebase-functions';
import { BaseResponse } from '../types/BaseResponse';
import { ServiceResult } from './ServiceResult';

export class ResponseHandler {
    static handle<T>(response: functions.Response<BaseResponse<T>>, result: ServiceResult<T>) {
        response.statusCode = result.code;

        response.send({
            status: result.failure ? 'error' : 'sucess',
            message: result.errorMessage ?? undefined,
            data: result.content,
        });
    }
}
