import { Step } from '../core/step';
import { CatchError, Method, Steps, Type } from '../types';
import deleteObjectKey from './delete-object-key.util';
import reference from './get-function-name.util';

/**
 * @description Create an instance of Step with axios error data.
 * @param error instance of Error.
 * @param rmKeys array of string as key to remove from data.
 * @returns instance of Step.
 */
export const stepFromAxiosError = (error: CatchError, rmKeys: string[] = []): Steps => {
    const hasResponse = !!error?.response?.data;
    const resData = hasResponse ? error?.response?.data : {};
    const name = reference.fromError(error);
    const headId = error?.config?.headers?.['uid'] ?? error?.config?.headers?.['id'];
    const uid = error?.config?.data?.['id'] ?? headId;
    const reqData = deleteObjectKey(error.config?.data ?? {}, rmKeys);
    const stack = error.stack;
    const message = error.message;
    const statusCode = error?.response?.status ? error.response.status : 500;
    const method = (error?.config?.method ?? 'NONE').toUpperCase() as Method;
    const url = error?.config?.url;
    const tags = Object.keys(reqData ?? {});
    const data = JSON.stringify({ requestData: reqData, responseData: resData });
    const type = 'fatal' as Type;

    const step = Step.create({
        data,
        stack,
        message,
        statusCode,
        method,
        name,
        uid,
        tags,
        type,
        url
    });

    return step;
}

export default stepFromAxiosError;
