import { StackMiddleware, MiddlewareOptions, NextFunctions, Requests, Responses, SProps } from "../types";
import GetLogDataFromRequest from "../utils/get-log-data-from-request.util";
import GetStepDataFromRequest from "../utils/get-step-data-from-request.util";
import EncryptString from "../utils/encrypt-string.util";
import DeleteObjectKey from "../utils/delete-object-key.util";
import Step from "./step";
import Log from "./log";

/**
 * @description Create a middleware to handle stack error on express
 * @param options Object as MiddlewareOptions
 * @returns Middleware
 */
export const stackLog = (options: MiddlewareOptions): StackMiddleware => {
    const { print, remove: keysToRemoveFromBody = [], callback, writeLocal, encrypt, sendAsResponse = true, encryptOption, ...opt } = options;

    const publish = !!opt?.publish;
    if (sendAsResponse && callback) throw new Error('[stackLog]: could not sendAsResponse and callback');
    if (!sendAsResponse && !callback && !print && !writeLocal && !publish) throw new Error('[stackLog]: invalid options');

    return async (err: Error, req: Requests, res: Responses, next: NextFunctions): Promise<any> => {

        const { name, uid, ip, origin } = GetLogDataFromRequest(req);

        const log = req?.log ?? Log.init({ name, uid, ip, origin });

        const { message, method, stack, statusCode, tags, ...param } = GetStepDataFromRequest(err, req);

        const body = DeleteObjectKey<{}>(param.body, keysToRemoveFromBody);

        const maybeMasked = Array.isArray(opt?.mask) ? Step.create({ data: body }).mask(opt.mask).data : body;

        const encrypted = await EncryptString({ data: param.data, encryptOption, encrypt });
        const data = encrypt ? encrypted : maybeMasked;

        const stepId = param.uid;
        const props = { message, stack, statusCode, data, url: origin, method, name, uid: stepId } satisfies Partial<SProps>;
        const step = Step.stack(props).addTags(tags.slice(0, 5));

        log.addStep(step);

        if (print) log.print();

        if (writeLocal) await log.writeLocal();

        if (opt.publish && !opt.provider) {
            throw new Error('[stackLog]: could not publish log missing provider settings');
        }

        if (opt.publish && opt.provider) {
            await log.publish(opt.provider);
        }

        if (sendAsResponse) return res.status(statusCode).json(log);

        if (callback && typeof callback === 'function') return callback(err, req, res, next, log);

        return next();
    };
};

export default stackLog;
