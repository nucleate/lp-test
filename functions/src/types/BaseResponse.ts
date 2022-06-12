export interface BaseResponse<T = void> {
    status: 'error' | 'sucess';
    message?: string;
    data?: T;
}
