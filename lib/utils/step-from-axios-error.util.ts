import { CatchError, Method, SProps, Type } from '../types';
import DeleteObjectKey from './delete-object-key.util';
import ExtractBodyAsObject from './extract-body.util';
import TagsFromBody from './get-tags-from-body.util';

/**
 * @description Create an instance of Step with axios error data.
 * @param error instance of Error.
 * @param rmKeys array of string as key to remove from data.
 * @returns instance of Step.
 */
export const StepPropsFromAxiosError = (error: CatchError, rmKeys: string[] = []): Partial<SProps> => {
    const hasResponse = !!error?.response?.data;
    const resData = hasResponse ? error?.response?.data : {};
    const name = error.name;
    const headId = error?.config?.headers?.['uid'] ?? error?.config?.headers?.['id'];
    const uid = error?.config?.data?.['id'] ?? headId;
    const body = ExtractBodyAsObject(error?.config?.data);
    const reqData = DeleteObjectKey(body, rmKeys);
    const stack = error.stack ?? 'none';
    const message = error.message;
    const statusCode = error?.response?.status ? error.response.status : 500;
    const method = (error?.config?.method ?? 'NONE').toUpperCase() as Method;
    const url = error?.config?.url ?? 'none';
    const tags = TagsFromBody(reqData);
    const data = { "requestData": reqData, "responseData": resData };
    const type = 'fatal' as Type;
    const createdAt = new Date();

    const props = {
        data,
        stack,
        message,
        statusCode,
        method,
        name,
        uid,
        tags,
        type,
        url,
        createdAt,
        additionalInfo: null,
        category: 'catch'
    } satisfies SProps;

    return props;
}

export default StepPropsFromAxiosError;
