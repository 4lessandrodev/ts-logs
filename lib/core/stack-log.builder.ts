import { Middleware, MiddlewareOptions } from "../types";
import getLogDataFromRequest from "../utils/get-log-data-from-request.util";
import getStepDataFromRequest from "../utils/get-step-data-from-request.util";
import encryptString from "../utils/encrypt-string.util";
import { deleteObjectKey } from "../utils";
import Step from "./step";
import { Log } from "./log";

/**
 * @description Create a middleware to handle stack error on express
 * @param options Object as MiddlewareOptions
 * @returns Middleware
 */
export const stackLog = (options: MiddlewareOptions): Middleware => {
    const { print, remove: keysToRemoveFromBody = [], callback, writeLocal, encrypt, sendAsResponse = true, encryptOption } = options;

    if(sendAsResponse && callback) throw new Error('[stackLog]: could not sendAsResponse and callback');
    if(!sendAsResponse && !callback && !print && !writeLocal) throw new Error('[stackLog]: invalid options');

    return async (err: Error, req: any, res: any, next: any): Promise<any> => {

        const { name, uid, ip, origin } = getLogDataFromRequest(req);

        const log = req?.log ?? Log.init({ name, uid, ip, origin });

        const { message, method, stack, statusCode, tags, ...param } = getStepDataFromRequest(err, req);

        const body = deleteObjectKey<{}>(param.body, keysToRemoveFromBody);
        const encrypted = encryptString({ data: param.data, encryptOption, encrypt});
        const data = encrypt ? encrypted : JSON.stringify(body);

        const step = Step.stack({ message, stack, statusCode, data, url: origin, method, name }).addTags(tags.slice(0, 5));

        const result = log.addStep(step);

        if(print) result.print();

        if(writeLocal) await result.writeLocal();

        if(sendAsResponse) return res.status(statusCode).json(result);

        if(callback && typeof callback === 'function') return callback(err, req, res, next, result);
    };
}

export default stackLog;
