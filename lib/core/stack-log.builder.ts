import { Log } from "./log";
import { Middleware, MiddlewareOptions } from "../types";
import Step from "./step";

/**
 * @description Create a middleware to handle stack error on express
 * @param options Object as MiddlewareOptions
 * @returns Middleware
 */
export const stackLog = (options: MiddlewareOptions): Middleware => {
    const { print, remove: keysToRemoveFromBody, callback, writeLocal, encrypt, sendAsResponse = true, encryptOption } = options;

    if(sendAsResponse && callback) throw new Error('[stackLog]: could not sendAsResponse and callback');
    if(!sendAsResponse && !callback && !print && !writeLocal) throw new Error('[stackLog]: invalid options');

    return async (err: Error, req: any, res: any, next: any): Promise<any> => {

        const uid = req?.headers['uid'] as string;
        const route = req?.originalUrl?.replace(/\//, '') ?? 'default';
        const origin = req?.protocol + '://' + req?.headers['host'] + req?.originalUrl;
        let ip = req?.ip ?? req?.connection?.remoteAddress ?? req.headers?.['x-forwarded-for'];
        ip = ip?.replace(/[:]|[\s]|[f]/g, '');
        if (ip === '1') ip = '127.0.0.1';

        const log = Log.init({ name: route, uid, ip, origin });

        const message = err?.message ?? 'Internal Server Error';
        const stack = err.stack ?? '';
        const statusCode = 500;
        const url = origin;
        const method = req?.method ?? 'NONE';
        const hasData = typeof req?.body === 'object' && (Object.keys(req?.body ?? {}).length > 0);
        const body = req?.body ?? {};

        if(keysToRemoveFromBody && Array.isArray(keysToRemoveFromBody) && keysToRemoveFromBody.length > 0){
            /** @todo remove keys from deep body objects */
            let i = 0;
            while(keysToRemoveFromBody[i]){
                const key = keysToRemoveFromBody[i];
                delete body?.[key];
                i++;
            }
        }

        let data = hasData ? JSON.stringify(body) : '{}';

        if(encrypt || encryptOption) {
            if(encryptOption?.level === 'cypher'){
                /** @todo encrypt data on body */
                console.log('[encryptOption]: cypher is not implemented yet');
            }
            const payload = hasData ? JSON.stringify(body) : '{}';
            data = Buffer.from(payload).toString('base64');
        }

        const tags = hasData ? Object.keys(body) : [];
        const name = route;

        const step = Step.stack({ message, stack, statusCode, data, url, method, name }).addTags(tags.slice(0, 5));

        const result = log.addStep(step);

        if(print) result.print();

        if(writeLocal) await result.writeLocal();

        if(sendAsResponse) return res.status(statusCode).json(result);

        if(callback && typeof callback === 'function') return callback(err, req, res, next, result);
    };
}

export default stackLog;
