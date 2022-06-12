import * as functions from 'firebase-functions';

export interface FunctionHttpRequestEventProps {
    method: string;
    params?: { [key in number]: string };
    headers?: Array<string>;
    body?: unknown;
}

export class EventGenerator {
    static generateFunctionHttpRequestEvent(props: FunctionHttpRequestEventProps): Partial<functions.https.Request> {
        return {
            method: props.method,
            params: props.params,
            body: props.body,
            rawHeaders: props.headers ?? [],
        };
    }
}
